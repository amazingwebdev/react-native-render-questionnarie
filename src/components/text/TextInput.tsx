import React from 'react'
import { Item, Input } from 'native-base'

import AnswerStore from '../survey/AnswerStore'
import BaseInputHOC from '../base/BaseInputHOC'
import { BaseInput, TextInputQuestion } from '../'

interface TextInputState {
    value?: string
}

class TextInput extends React.Component<TextInputQuestion, TextInputState> implements BaseInput<TextInputQuestion> {

    private regExp: RegExp

    constructor(props: TextInputQuestion) {
        super(props)
        this.state = this.getInitialState()
        if (this.props.validation !== undefined) {
            this.regExp = new RegExp(this.props.validation)
        }
        this.onChange = this.onChange.bind(this)
    }

    private getInitialState(): TextInputState {
        if (typeof this.props.answer === 'string') {
            return { value: this.props.answer }
        }
        return { value: undefined }
    }

    public render(): JSX.Element {
        return (
            <Item rounded>
                <Input
                    onChange={this.onChange}
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

    public getValue(): string {
        return this.state.value ? this.state.value : undefined
    }
    public setValue(value: string): void {
        this.setState({ value })
        AnswerStore.put(this.props.tag, value)
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

    public reset(): void {
        this.setValue(undefined)
    }

}

export default BaseInputHOC(TextInput)
