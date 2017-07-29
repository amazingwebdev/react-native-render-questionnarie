import React from 'react'
import { View } from 'native-base'

import Wrapper from './Wrapper'
import { BaseState, MultiInputQuestion, MultiInputQuestionOption } from '../'
import Http from '../../utility/Http'

interface MultiChoiceInputState extends BaseState {
	loading: boolean
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
				loading: true,
				options: [],
			}
		}

		async componentDidMount() {
			let options: MultiInputQuestionOption[]
			if (this.props.options.type === 'static') {
				options = this.props.options.values.slice(0)
			} else if (this.props.options.type === 'http') {
				const response = await Http.request({
					url: this.props.options.request.url,
				})
				options = await response.json()
			}
			this.setState({ options, loading: false })
		}

		render() {
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

	}

}