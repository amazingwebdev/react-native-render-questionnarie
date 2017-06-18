import React from 'react'
import { Platform, StyleSheet } from 'react-native'
import { View, Header, Text } from 'native-base'

import { Question } from '../Form'
import Style from './BaseInputStyle'

export enum QuestionType {
	Textfield, Slider, Checkbox, RadioButton, Dropdown,
}

export interface BaseState {
	display?: boolean
}

export abstract class BaseInput<P extends Question, S extends BaseState> extends React.Component<P, S>  {

	protected ruleExecutors: (() => void)[]

	constructor(props: P) {
		super(props)
		this.ruleExecutors = []
		this.setValue = this.setValue.bind(this)
	}

	public abstract getValue(): any | undefined

	public abstract setValue(value: any): void

	public componentWillMount() {
		if (this.props.tag === undefined || this.props.tag === '') {
			throw new Error(`${this.constructor.name} has no proper tag.`)
		}
	}

	public componentDidUpdate() {
		this.executeRuleListeners()
	}

	public render(...components: any[]): JSX.Element {
		if (this.state.display) {
			return (
				<View>
					{this.getTitle()}
					{components}
				</View>
			)
		}
		return <View />
	}

	public isValid(): boolean {
		const value = this.getValue()
		if (this.props.required && value === undefined) {
			return false
		}
		return true
	}

	public addRuleExecutor(ruleExecutor: () => void): void {
		this.ruleExecutors.push(ruleExecutor)
	}

	public show(): void {
		this.setState({ display: true })
	}

	public hide(): void {
		this.setState({ display: false })
	}

	protected getTitle(): JSX.Element | undefined {
		return (this.props.title === undefined ? undefined :
			<Header style={Style.header}>
				<Text style={Style.title}>{this.props.title}</Text>
			</Header>
		)
	}

	private executeRuleListeners(): void {
		this.ruleExecutors.map(ruleExecutor => ruleExecutor.call(null, this.getValue()))
	}

}
