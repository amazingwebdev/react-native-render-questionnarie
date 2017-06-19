import React from 'react'
import { Text, Slider } from 'react-native'

import { View } from 'native-base'

import { SliderInputQuestion } from '../../Form'
import { BaseInput, BaseState } from '../'

interface SliderState extends BaseState {
    value?: number
}

export class SliderInput extends BaseInput<SliderInputQuestion, SliderState> {

    constructor(props: SliderInputQuestion) {
        super(props)
        this.state = {
            value: props.value || 0,
            display: true,
        }
        this.onValueChange = this.onValueChange.bind(this)
    }

    public componentWillMount() {
        super.componentWillMount()
        if (this.props.defaultValue !== undefined) {
            if (typeof this.props.defaultValue === 'number') {
                this.setValue(this.props.defaultValue)
            } else {
                console.error(`SliderInput tag:${this.props.tag}, default value is not number`)
            }
        } else {
            console.warn(`SliderInput tag:${this.props.tag}, no default value`)
        }
    }

    public render(): JSX.Element {
        return super.render(
            <Slider
                minimumValue={this.props.min}
                maximumValue={this.props.max}
                step={this.props.step}
                value={this.state.value}
                onValueChange={this.onValueChange}
            />,
            <Text style={{ textAlign: 'center' }}>
                {this.state.value}
            </Text>,
        )
    }

    public setValue(value: number) {
        this.setState({ value })
    }

    public getValue() {
        return this.state.value
    }

    private onValueChange(value: number) {
        this.setState({ value })
    }

}
