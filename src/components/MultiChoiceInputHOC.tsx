import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Header, Text, View } from 'native-base'

import { BaseState } from './BaseInput'
import { MultiInputQuestion, MultiInputQuestionOption } from '../survey/Form'
import BaseInputHOC, { HOCInput } from './BaseInputHOC'

import Http from './Http'

import Style from './BaseInputStyle'

interface MultiState extends BaseState {
	loading: boolean
	options: MultiInputQuestionOption[]
}

export interface HOCInput extends React.Component {
	show: () => void
	hide: () => void
}

// tslint:disable-next-line:function-name
export default function MultiChoiceInputHOC<Props extends MultiInputQuestion>(Component: React.ComponentClass<Props>) {

	return class HOCBase extends React.Component<Props, MultiState> implements HOCInput {

		constructor(props: Props) {
			super(props)
			this.state = {
				display: true,
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
				const json = await response.json()
				options = json
			}
			this.setState({ options, loading: false })
		}

		render() {
			if (this.state.display) {
				if (this.state.loading) {
					return (
						<View>
							<Header style={Style.header}>
								<Text style={Style.title}>{this.props.title}</Text>
							</Header>
							<ActivityIndicator
								animating={this.state.loading}
								color="#3498db"
								size="large"
							/>
						</View>
					)
				}
				return (
					<View>
						<Header style={Style.header}>
							<Text style={Style.title}>{this.props.title}</Text>
						</Header>
						<Component {...this.props} pureOptions={this.state.options} />
					</View>
				)
			}
			return <View />
		}

		public show(): void {
			this.setState({ display: true })
		}

		public hide(): void {
			this.setState({ display: false })
		}

	}

}
