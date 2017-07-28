import React from 'react'
import { View, Item, Input, Icon, Toast } from 'native-base'

import { TextInputQuestion } from '../../survey'
import { BaseInput, BaseState } from '../'
import BaseInputHOC from '../BaseInputHOC'

interface TextInputState {
    value?: string
}

class TextInput extends React.Component<TextInputQuestion, TextInputState> implements BaseInput<TextInputQuestion> {

    private regExp: RegExp

    constructor(props: TextInputQuestion) {
        super(props)
        this.state = {
            value: props.value,
        }
        if (this.props.validation !== undefined) {
            this.regExp = new RegExp(this.props.validation)
        }
    }

    public componentDidMount() {
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
        return (
            <Item rounded>
                <Input
                    onBlur={this.onBlur.bind(this)}
                    onChange={this.onChange.bind(this)}
                    placeholder={this.props.placeholder}
                    value={this.state.value} />
            </Item>
        )
    }

    private onChange(event: { nativeEvent: { text: string } }): void {
        this.setValue(event.nativeEvent.text)
    }

    public setValue(value: string): void {
        this.setState({ value })
    }

    public getValue(): string | undefined {
        return this.state.value ? this.state.value : undefined
    }

    public isValid(): boolean {
        if (this.regExp === undefined) {
            return true
        }
        if (this.state.value !== undefined) {
            return this.regExp.test(this.state.value)
        }
        return true
    }

    private onBlur(): void {
        if (!this.isValid()) {
            Toast.show({ text: 'Girdiğiniz karakterleri kontrol ediniz.', buttonText: 'TAMAM', position: 'bottom', type: 'warning' })
        }
    }

    public getTitle(): string {
        return this.props.title
    }

}

export default BaseInputHOC(TextInput)
