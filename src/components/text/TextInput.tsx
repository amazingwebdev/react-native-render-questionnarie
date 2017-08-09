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
        this.state = this.getInitialState()
        if (this.props.validation !== undefined) {
            this.regExp = new RegExp(this.props.validation)
        }
        this.onChange = this.onChange.bind(this)
    }

    private getInitialState(): TextInputState {
        if (this.props.answer) {
            return { value: this.props.answer.toString() }
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

    public triggerCascadedQuestions(value: string) {
        if (this.props.trigger && this.props.onChange) {
            this.props.trigger(this.props.tag, value, this.props.onChange)
        }
    }

    public reset(): void {
        const initialState = this.getInitialState()
        this.setState(initialState)
    }

}

export default BaseInputHOC(TextInput)
