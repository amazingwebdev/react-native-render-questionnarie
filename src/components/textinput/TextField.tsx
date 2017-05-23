import React from 'react'
import { View, Item, Input, Icon } from 'native-base'

import { BaseProps, BaseState, BaseComponent } from '../'

interface TextFieldProps extends BaseProps {
    value?: string
    validation?: string
    placeholder?: string
}

interface TextFieldState extends BaseState {
    value?: string
}

export class TextField extends BaseComponent<TextFieldProps, TextFieldState> {

    constructor(props: TextFieldProps) {
        super(props)
        this.state = {
            value: props.value
        }
    }

    public componentWillMount() {
        if (this.props.defaultValue !== undefined) {
            if (typeof this.props.defaultValue === 'string') {
                this.setValue(this.props.defaultValue)
            } else {
                console.error(`TextInput tag:${this.props.tag}", default value is not string`)
            }
        } else {
            console.debug(`TextInput tag:${this.props.tag}", no default value`)
        }
    }

    public render(): JSX.Element {
        return (
            <View >
                {this.getTitle()}
                <Item rounded>
                    <Input
                        onChangeText={this.setValue}
                        placeholder={this.props.placeholder}
                        value={this.state.value} />
                </Item>
            </View>
        )
    }

    public setValue(value: string) {
        this.setState({ value })
    }

    public getValue() {
        return this.state.value ? this.state.value : undefined;
    }

}