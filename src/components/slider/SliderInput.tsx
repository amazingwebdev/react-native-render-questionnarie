import React from 'react'
import { Text, Slider } from 'react-native'
import { View } from 'native-base'

import BaseInputHOC from '../base/BaseInputHOC'
import { BaseInput, SliderInputQuestion } from '../'

interface SliderState {
    value?: number
}

class SliderInput extends React.Component<SliderInputQuestion, SliderState> implements BaseInput<SliderInputQuestion> {

    constructor(props: SliderInputQuestion) {
        super(props)
        this.state = {

        }
        this.onValueChange = this.onValueChange.bind(this)
    }

    private getInitialState(): SliderState {
        return { value: this.props.value || 0 } // TODO: bitwise?
    }

    public componentWillMount() {
        if (this.props.defaultValue) {
            this.setValue(this.props.defaultValue)
        }
    }

    public render(): JSX.Element {
        return (
            <View>
                <Slider
                    minimumValue={this.props.min}
                    maximumValue={this.props.max}
                    step={this.props.step}
                    value={this.state.value}
                    onValueChange={this.onValueChange}
                />
                <Text style={{ textAlign: 'center' }}>
                    {this.state.value}
                </Text>
            </View>
        )
    }

    private onValueChange(value: number) {
        this.setState({ value })
    }

    public getTitle(): string {
        return this.props.title
    }

    public getValue() {
        return this.state.value
    }

    public setValue(value: number) {
        this.setState({ value })
    }

    public isValid(): boolean {
        return true
    }

    public triggerCascadedQuestions(value: number) {
        if (this.props.trigger && this.props.onChange) {
            this.props.trigger(this.props.tag, value, this.props.onChange)
        }
    }

    public reset(): void {
        const initialState = this.getInitialState()
        this.setState(initialState)
        this.triggerCascadedQuestions(initialState.value)
    }

}

export default BaseInputHOC(SliderInput)
