import React from 'react'
import { Slider } from 'react-native'
import { View, Text } from 'native-base'

import AnswerStore from '../survey/AnswerStore'
import BaseInputHOC from '../base/BaseInputHOC'
import { BaseInput, SliderInputQuestion } from '../'

interface SliderInputState {
    value?: number
}

class SliderInput extends React.Component<SliderInputQuestion, SliderInputState> implements BaseInput<SliderInputQuestion> {

    constructor(props: SliderInputQuestion) {
        super(props)
        this.state = this.getInitialState()
        this.onValueChange = this.onValueChange.bind(this)
    }

    private getInitialState(): SliderInputState {
        if (typeof this.props.answer === 'number') {
            return { value: this.props.answer }
        }
        return { value: 0 }
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
        this.setValue(value)
    }

    public getTitle(): string {
        return this.props.title
    }

    public getValue(): number {
        return this.state.value
    }

    public setValue(value: number) {
        this.setState({ value })
        AnswerStore.put(this.props.tag, value)
    }

    public isValid(): boolean {
        return true
    }

    public reset(): void {
        this.setValue(0)
    }

}

export default BaseInputHOC(SliderInput)
