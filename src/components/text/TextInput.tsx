import React from 'react'
import { Item, Input } from 'native-base'

import BaseInputHOC from '../base/BaseInputHOC'
import { BaseInput, TextInputQuestion } from '../'

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
        if (this.props.defaultValue) {
            this.setValue(this.props.defaultValue)
        }
    }

    public render(): JSX.Element {
        return (
            <Item rounded>
                <Input
                    onChange={this.onChange.bind(this)}
                    placeholder={this.props.placeholder}
                    value={this.state.value}
                />
            </Item>
        )
    }

    private onChange(event: { nativeEvent: { text: string } }): void {
        this.setValue(event.nativeEvent.text)
    }

    public getTitle(): string {
        return this.props.title
    }

    public getValue(): string | undefined {
        return this.state.value ? this.state.value : undefined
    }
    public setValue(value: string): void {
        this.setState({ value })
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

}

export default BaseInputHOC(TextInput)
