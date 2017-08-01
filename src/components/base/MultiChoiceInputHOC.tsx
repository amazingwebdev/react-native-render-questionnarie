import React from 'react'
import { View } from 'native-base'
import * as _ from 'lodash'

import Wrapper from './Wrapper'
import { BaseState, MultiInputQuestion, MultiInputQuestionOption } from '../'
import Http, { HttpRequest } from '../../utility/Http'

interface MultiChoiceInputState extends BaseState {
	options: MultiInputQuestionOption[]
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
			}

		}

		componentDidMount() {
			/* if (this.isOptionsComesFromHttp && this.doesHttpRequiresParameters()) {
				const { requestParams } = this.state
				_.forEach(this.props.options.request.params, (value: string, name: string) => {
					if (!_.startsWith(value, '$')) {
						requestParams[name] = value
					}
				})
				this.setState({ requestParams })
			} */
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
						<Component ref={(ref) => { this.wrappedComponent = ref }} {...this.props} pureOptions={this.state.options} />
					</View>
				)
			}
			return <View />
		}

		public getWrappedComponent(): React.Component<Props> {
			return this.wrappedComponent
		}

		shouldComponentUpdate(nextProps: Props, nextState: MultiChoiceInputState): boolean {
			if (_.isEqual(this.state.options, nextState.options)) {

			}
				
			return true
			/* 	if (_.isEmpty(this.state.options))
					return true
				if (_.isEqual(this.state.requestParams, nextState.requestParams)) {
					return false
				}
				console.warn('cidok')
				return true */
		}

		private async loadOptions() {
			console.warn(this.props.tag, 'loadOptions')
			let options: MultiInputQuestionOption[]
			switch (this.props.options.type) {
				case 'static':
					options = this.props.options.values.slice(0)
					this.setState({ options })
					break
				case 'http':
					const request = this.props.options.request
					const httpRequest: HttpRequest = {}

					if (request.url && _.size(request.params) > 0 && this.isParamsReadyForRequest()) {
						httpRequest.url = request.url
						httpRequest.query = this.state.requestParams
					} else if (request.url && _.isEmpty(request.params)) {
						httpRequest.url = request.url
					}

					if (!_.isEmpty(httpRequest)) {
						const response = await Http.request(httpRequest)
						const options = await response.json()
						this.setState({ options })
					}
					break
			}
		}

		public onDependedAnswerChanged(tag: string, value: string) {
			console.warn(this.props.tag, 'onDependedAnswerChanged')
			_.forEach(this.props.options.request.params, (paramValue, paramName) => {
				if (paramValue === `$\{${tag}}`) {
					const requestParams = _.clone(this.state.requestParams)
					if (_.isUndefined(value) || value === '-') {
						delete requestParams[paramName]
					} else {
						requestParams[paramName] = value
					}
					this.setState({ requestParams })
				}
			})
		}

		private isOptionsComesFromHttp(): boolean {
			return this.props.options.type === 'http'
		}

		private doesHttpRequiresParameters(): boolean {
			return !_.isEmpty(this.props.options.request.params)
		}

		private isParamsReadyForRequest(): boolean {
			console.warn(this.props.tag, 'isParamsReadyForRequest')
			return this.isOptionsComesFromHttp &&
				!_.isEmpty(this.props.options.request.params) &&
				_.isEqual(_.keys(this.state.requestParams), _.keys(this.props.options.request.params))
		}

	}

}
