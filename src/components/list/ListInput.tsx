import React from 'react'
import { View, Picker } from 'native-base'

import MultiChoiceInputHOC from '../base/MultiChoiceInputHOC'
import { BaseInput, MultiInputQuestion, MultiInputQuestionOption } from '../'

interface ListInputState {
    selection?: string
}

class ListInput extends React.Component<MultiInputQuestion, ListInputState> implements BaseInput<MultiInputQuestion> {

    constructor(props: MultiInputQuestion) {
        super(props)
        this.state = this.getInitialState()
        this.renderOptions = this.renderOptions.bind(this)
        this.setValue = this.setValue.bind(this)
    }

    private getInitialState(): ListInputState {
        return { selection: undefined }
    }

    public componentDidMount() {
        if (this.props.defaultValue) {
            this.setState({ selection: this.props.defaultValue.toString() })
        }
    }

    public componentWillUpdate(nextProps: MultiInputQuestion, nextState: ListInputState) {
        if (this.state.selection !== nextState.selection) {
            this.triggerCascadedQuestions(nextState.selection)
        }
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
        this.triggerCascadedQuestions(selection)
    }

    public isValid(): boolean {
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
        this.triggerCascadedQuestions(initialState.selection)
    }

}

export default MultiChoiceInputHOC(ListInput)
