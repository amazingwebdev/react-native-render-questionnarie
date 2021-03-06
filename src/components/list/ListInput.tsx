import React from 'react'
import { View, Picker } from 'native-base'

import AnswerStore from '../survey/AnswerStore'
import MultiChoiceInputHOC from '../base/MultiChoiceInputHOC'
import { BaseInput, MultiInputQuestion, MultiInputQuestionOption } from '../'

interface ListInputState {
    selection: string
}

class ListInput extends React.Component<MultiInputQuestion, ListInputState> implements BaseInput<MultiInputQuestion> {

    constructor(props: MultiInputQuestion) {
        super(props)
        this.state = this.getInitialState()
        this.renderOptions = this.renderOptions.bind(this)
        this.setValue = this.setValue.bind(this)
    }

    private getInitialState(): ListInputState {
        if (typeof this.props.answer === 'string') {
            return { selection: this.props.answer }
        }
        return { selection: undefined }
    }

    public render(): JSX.Element {
        return (
            <Picker
                ref={this.props.tag}
                key={this.props.tag}
                selectedValue={this.state.selection}
                onValueChange={this.setValue}>
                {this.props.pureOptions.map(this.renderOptions)}
            </Picker>
        )
    }

    private renderOptions(option: MultiInputQuestionOption) {
        const name = option[this.props.titleKey]
        const value = option[this.props.valueKey]
        const key = this.props.tag + '_' + value
        return (
            <Picker.Item key={key} label={name} value={value} />
        )
    }

    public getTitle(): string {
        return this.props.title
    }

    public getValue(): string {
        if (this.state.selection === undefined || this.state.selection === '-1') {
            return undefined
        }
        return this.state.selection
    }

    public setValue(selection: string) {
        this.setState({ selection })
        AnswerStore.put(this.props.tag, selection)
    }

    public isValid(): boolean {
        return true
    }

    public reset(): void {
        this.setValue(undefined)
    }

}
export default MultiChoiceInputHOC(ListInput)
