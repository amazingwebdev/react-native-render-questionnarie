import React from 'react'
import { View, Picker } from 'native-base'

import MultiChoiceInputHOC from '../base/MultiChoiceInputHOC'
import { BaseInput, MultiInputQuestion, MultiInputQuestionOption } from '../'

interface ListInputState {
    selection?: string | string[] | number
}

class ListInput extends React.Component<MultiInputQuestion, ListInputState> implements BaseInput<MultiInputQuestion> {

    constructor(props: MultiInputQuestion) {
        super(props)
        this.state = this.getInitialState()
        this.renderOptions = this.renderOptions.bind(this)
        this.setValue = this.setValue.bind(this)
    }

    private getInitialState(): ListInputState {
        const state = { selection: this.props.answer }
        return state
    }

    public componentWillUpdate(nextProps: MultiInputQuestion, nextState: ListInputState) {
        this.triggerCascadedQuestions(nextState.selection)
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

    public getValue() {
        if (this.state.selection === undefined || this.state.selection === '-1') {
            return undefined
        }
        return this.state.selection
    }

    public setValue(selection: string) {
        this.setState({ selection })
        this.props.onValueChanged(this.props.tag, selection)
    }

    public isValid(): boolean {
        return true
    }

    public triggerCascadedQuestions(value: string | string[] | number) {
        if (this.props.trigger && this.props.onChange) {
            this.props.trigger(this.props.tag, value, this.props.onChange)
        }
    }

} export default MultiChoiceInputHOC(ListInput)
