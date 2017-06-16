import React from 'react'
import { View, Item, Input, Icon, Toast } from 'native-base'

import { BaseInput, BaseProps, BaseState } from '../'

interface TextInputProps extends BaseProps {
    value?: string
    validation?: string
    placeholder?: string
}

interface TextInputState extends BaseState {
    value?: string
}

export class TextInput extends BaseInput<TextInputProps, TextInputState> {

    private regExp: RegExp

    constructor(props: TextInputProps) {
        super(props)
        this.state = {
            value: props.value,
            display: true,
        }

        if (this.props.validation !== undefined) {
            this.regExp = new RegExp(this.props.validation)
        }
    }

    public componentWillMount() {
        super.componentWillMount()
        if (this.props.defaultValue !== undefined) {
            if (typeof this.props.defaultValue === 'string') {
                this.setValue(this.props.defaultValue)
            } else {
                console.error(`TextInput tag:${this.props.tag}', default value is not string`)
            }
        } else {
            console.warn(`TextInput tag:${this.props.tag}', no default value`)
        }
    }

    public render(): JSX.Element {
        return super.render(
            <Item rounded>
                <Input
                    onBlur={this.onBlur.bind(this)}
                    onChange={this.onChange.bind(this)}
                    placeholder={this.props.placeholder}
                    value={this.state.value} />
            </Item>,
        )
    }

    private onChange(event: any): void {
        this.setValue(event.target.value)
    }

    public setValue(value: any): void {
        this.setState({ value })
    }

    public getValue() {
        return this.state.value ? this.state.value : undefined
    }

    public isValid(): boolean {
        if (this.regExp === undefined) {
            return super.isValid()
        }
        if (this.state.value !== undefined) {
            return this.regExp.test(this.state.value)
        }
        return super.isValid()
    }

    private onBlur() {
        if (!this.isValid()) {
            Toast.show({ text: 'Girdiğiniz karakterleri kontrol ediniz.', buttonText: 'TAMAM', position: 'bottom', type: 'warning' })
        }
    }

}
