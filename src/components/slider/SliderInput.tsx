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
        this.state = { value: props.value || 0 }

        this.onChange = this.onChange.bind(this)
    }

    public render(): JSX.Element {
        return (
            <View>
                <Slider
                    minimumValue={this.props.min}
                    maximumValue={this.props.max}
                    step={this.props.step}
                    value={this.props.value}
                    onValueChange={this.onChange}
                />
                <Text style={{ textAlign: 'center' }}>
                    {this.state.value}
                </Text>
            </View>
        )
    }

    private onChange(e: any) {
        this.setState({ value: e })
    }

    public getValue() {
        return this.state.value;
    }

}