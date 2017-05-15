import React from 'react'
import { TextInput } from 'react-native'

import { BaseProps, BaseState, BaseComponent } from '../'

interface TextFieldProps extends BaseProps {
    value?: string
    validation?: string
}

interface TextFieldState extends BaseState {
    value?: string
}

const style = {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
}

export class TextField extends BaseComponent<TextFieldProps, TextFieldState> {

    constructor(props: TextFieldProps) {
        super(props)
        this.state = {
            value: props.value
        }
        if(props.required) {
            style.borderColor = "red"
        }
        this.onChange = this.onChange.bind(this);
    }

    public render(): JSX.Element {
        return (
            <TextInput editable={true} maxLength={40} style={style} onChangeText={(value) => this.setState({ value })} value={this.state.value} />
        )
    }

    public onChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            value: e.currentTarget.value
        });
    }

    public getValue() {
        return this.state.value;
    }

}