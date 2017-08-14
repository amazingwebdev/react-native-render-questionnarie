import React from 'react'
import { View } from 'native-base'
import { isEmpty, forEach, clone, isEqual, keys, values } from 'lodash'

import AnswerStore, { Answer } from '../survey/AnswerStore'
import Wrapper from './Wrapper'
import { BaseState, MultiInputQuestion, MultiInputQuestionOption } from '../'
import Http, { HttpRequest } from '../../utility/Http'

interface MultiChoiceInputState extends BaseState {
	requestParams: { [key: string]: string }
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
			this.refreshOptions = this.refreshOptions.bind(this)
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
					options = clone(this.props.options.values)
					this.refreshOptions(options)
					break
				case 'http':
					const request = this.props.options.request
					const httpRequest: HttpRequest = {}

					if (this.hasHttpSource()) {
						if (this.hasHttpParameters() && this.areHttpParametersReady()) {
							httpRequest.url = request.url
							httpRequest.query = this.state.requestParams
							httpRequest.expiration = this.props.options.request.expiration
						}
						if (!this.hasHttpParameters()) {
							httpRequest.url = request.url
							httpRequest.expiration = this.props.options.request.expiration
						}
					}

					if (!isEmpty(httpRequest)) {
						Http.request(httpRequest).then(this.refreshOptions).catch(this.refreshOptions)
					} else {
						this.refreshOptions([])
					}
					break
			}
		}

		private refreshOptions(options: MultiInputQuestionOption[]): void {
			this.setState({
				options: options ? options : [],
				optionsLoaded: true,
				display: options.length > 0,
			})
		}

		private initializeRequestParams(): {} {
			if (!this.hasHttpSource()) {
				return {}
			}
			const requestParams: { [key: string]: string } = {}
			forEach(this.props.options.request.params, (paramValue, paramName) => {
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
			const requestParams = clone(this.state.requestParams)
			if (value) {
				requestParams[this.tagAndQueryMapping[tag]] = value.toString()
			} else {
				delete requestParams[this.tagAndQueryMapping[tag]]
			}
			this.setState({ requestParams, options: [], display: true, optionsLoaded: false })
		}

		private hasHttpSource(): boolean {
			return this.props.options.type === 'http'
		}

		private hasHttpParameters(): boolean {
			return !isEmpty(this.props.options.request.params)
		}

		private areHttpParametersReady(): boolean {
			return isEqual(keys(this.state.requestParams).sort(), values(this.tagAndQueryMapping).sort())
		}

	}
}
