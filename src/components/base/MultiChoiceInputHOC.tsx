import React from 'react'
import { View } from 'native-base'
import * as _ from 'lodash'

import AnswerStore, { Answer } from '../survey/AnswerStore'
import Wrapper from './Wrapper'
import { BaseState, MultiInputQuestion, MultiInputQuestionOption } from '../'
import Http, { HttpRequest } from '../../utility/Http'

interface MultiChoiceInputState extends BaseState {
	options: MultiInputQuestionOption[]
	optionsLoaded: boolean
}

// tslint:disable-next-line:function-name
export default function MultiChoiceInputHOC<Props extends MultiInputQuestion>(Component: React.ComponentClass<Props>) {

	return class MultiChoiceInputHOC extends Wrapper<Props, MultiChoiceInputState>  {

		private wrappedComponent: React.Component<Props>

		private tagAndQueryMapping: { [key: string]: string } = {}

		constructor(props: Props) {
			super(props)
			this.onCascadingAnswerChanged = this.onCascadingAnswerChanged.bind(this)
			this.state = {
				...super.getInitialState(),
				requestParams: this.initializeRequestParams(),
				options: [],
				optionsLoaded: false,
			}
		}

		componentDidMount() {
			this.loadOptions()
		}

		componentDidUpdate() {
			if (!this.state.optionsLoaded) {
				this.loadOptions()
			}
		}

		render() {
			if (this.state.display) {
				return (
					<View>
						{super.renderTitle()}
						<Component
							ref={(ref) => { this.wrappedComponent = ref }}
							{...this.props}
							pureOptions={this.state.options}
						/>
					</View>
				)
			}
			return <View />
		}

		public getWrappedComponent(): React.Component<Props> {
			return this.wrappedComponent
		}

		private loadOptions() {
			let options: MultiInputQuestionOption[]
			switch (this.props.options.type) {
				case 'static':
					options = this.props.options.values.slice(0)
					this.setState({ options, optionsLoaded: true, display: true })
					break
				case 'http':
					const request = this.props.options.request
					const httpRequest: HttpRequest = {}

					if (request.url && _.size(request.params) > 0 && this.isParamsReadyForRequest()) {
						httpRequest.url = request.url
						httpRequest.query = this.state.requestParams
						httpRequest.expiration = this.props.options.request.expiration
					} else if (request.url && _.isEmpty(request.params)) {
						httpRequest.url = request.url
						httpRequest.expiration = this.props.options.request.expiration
					}

					if (!_.isEmpty(httpRequest)) {
						Http.request(httpRequest).then((options) => {
							if (_.isEmpty(options)) { // if options is empty then hide the question.
								this.setState({ options: [], optionsLoaded: true, display: true })
							} else {
								this.setState({ options, optionsLoaded: true, display: true })
							}
						}).catch(() => {
							this.setState({ options: [], optionsLoaded: true, display: true })
						})
					} else {
						this.setState({ options: [], optionsLoaded: true, display: true })
					}
					break
			}
		}

		private initializeRequestParams(): {} {
			if (this.props.options.type !== 'http') {
				return {}
			}
			const requestParams: { [key: string]: string } = {}
			_.forEach(this.props.options.request.params, (paramValue, paramName) => {
				if (paramValue && paramValue.toString().startsWith('${')) {
					const tag = paramValue.replace('${', '').replace('}', '')
					this.tagAndQueryMapping[tag] = paramName
					AnswerStore.subscribe(tag, this.onCascadingAnswerChanged)
				} else {
					requestParams[paramName] = paramValue
					this.tagAndQueryMapping[paramName] = paramName
				}
			})
			return requestParams
		}

		private onCascadingAnswerChanged(tag: string, value: Answer) {
			const requestParams = _.clone(this.state.requestParams)
			requestParams[this.tagAndQueryMapping[tag]] = value.toString()
			this.setState({ requestParams, options: [], display: true, optionsLoaded: false })
		}

		private isParamsReadyForRequest(): boolean {
			return this.props.options.type === 'http' &&
				!_.isEmpty(this.props.options.request.params) &&
				_.isEqual(_.keys(this.state.requestParams).sort(), _.values(this.tagAndQueryMapping).sort())
		}

	}

}
