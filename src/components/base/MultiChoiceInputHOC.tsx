import React from 'react'
import { View } from 'native-base'
import * as _ from 'lodash'

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

		constructor(props: Props) {
			super(props)
			this.state = {
				...super.getInitialState(),
				options: [],
				optionsLoaded: false,
			}

		}

		componentDidMount() {
			this.loadOptions()
		}

		componentDidUpdate() {
			this.loadOptions()
		}

		render() {
			console.warn(this.props.tag, 'render')
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
			console.warn(this.props.tag, 'loadOptions')
			let options: MultiInputQuestionOption[]
			switch (this.props.options.type) {
				case 'static':
					options = this.props.options.values.slice(0)
					this.setState({ options })
					break
				case 'http':
					if (!this.state.optionsLoaded) {
						const request = this.props.options.request
						const httpRequest: HttpRequest = {}

						if (request.url && _.size(request.params) > 0 && this.isParamsReadyForRequest()) {
							httpRequest.url = request.url
							httpRequest.query = this.state.requestParams
						} else if (request.url && _.isEmpty(request.params)) {
							httpRequest.url = request.url
						}

						if (!_.isEmpty(httpRequest)) {
							Http.request(httpRequest).then((response) => {
								response.json().then((options) => {
									if (_.isEmpty(options)) { // if options is empty then hide the question.
										this.setState({ optionsLoaded: true, display: false })
									} else {
										this.setState({ options, optionsLoaded: true, display: true })
									}
								})
							}).catch(() => {
								this.setState({ optionsLoaded: true, display: false })
							})
						} else {
							this.setState({ optionsLoaded: true, display: false })
						}
					}
					break
			}
		}

		public onCascadedAnswerChanged(tag: string, value: string) {
			console.warn(this.props.tag, 'onCascadedAnswerChanged')
			_.forEach(this.props.options.request.params, (paramValue, paramName) => {
				if (paramValue === `$\{${tag}}`) {
					const requestParams = _.clone(this.state.requestParams)
					if (_.isUndefined(value) || value === '-') {
						delete requestParams[paramName]
					} else {
						requestParams[paramName] = value
					}
					this.setState({ requestParams, options: [], display: false, optionsLoaded: false })
				}
			})
		}

		private isParamsReadyForRequest(): boolean {
			console.warn(this.props.tag, 'isParamsReadyForRequest')
			return this.props.options.type === 'http' &&
				!_.isEmpty(this.props.options.request.params) &&
				_.isEqual(_.keys(this.state.requestParams), _.keys(this.props.options.request.params))
		}

	}

}
