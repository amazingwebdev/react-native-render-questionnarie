import React from 'react'
import { Text, Slider } from 'react-native'

import { View } from 'native-base'

import { BaseProps, BaseState, BaseComponent } from '../'

interface SliderProps extends BaseProps {
    min: number
    max: number
    step: number
    value?: number
}

interface SliderState extends BaseState {
    value?: number
}

export class SliderInput extends BaseComponent<SliderProps, SliderState> {

    constructor(props: SliderProps) {
        super(props)
        this.state = { 
            value: props.value || 0,
            display: true
        }
        this.onValueChange = this.onValueChange.bind(this)
    }

    public componentWillMount() {
        if (this.props.defaultValue !== undefined) {
            if (typeof this.props.defaultValue === 'number') {
                this.setValue(this.props.defaultValue)
            } else {
                console.error(`SliderInput tag:${this.props.tag}", default value is not number`)
            }
        } else {
            console.debug(`SliderInput tag:${this.props.tag}", no default value`)
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
            </Text>
        )
    }

    public setValue(value: number) {
        this.setState({ value })
    }

    public getValue() {
        return this.state.value;
    }

    private onValueChange(value: number) {
        this.setState({ value })
    }

}