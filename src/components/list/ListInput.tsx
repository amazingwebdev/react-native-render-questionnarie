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
        this.reset = this.reset.bind(this)
    }

    private getInitialState(): ListInputState {
        return { selection: undefined }
    }

    componentDidMount() {
        let defaultSelection
        if (this.props.defaultValue) {
            defaultSelection = this.props.defaultValue.toString()
            this.setState({ selection: defaultSelection })
            this.triggerCascadedQuestions(defaultSelection)
        }

    }

    componentDidUpdate() {
        this.triggerCascadedQuestions(this.state.selection)
    }

    componentWillReceiveProps(props: MultiInputQuestion) {
        if (props.reset) {
            this.triggerCascadedQuestions(undefined)
        }
    }

    render(): JSX.Element {
        return (
            <Picker
                ref={this.props.tag}
                key={this.props.tag}
                selectedValue={this.state.selection}
                onValueChange={this.setValue}>
                {!this.props.reset &&
                    this.props.pureOptions.map(this.renderOptions)
                }
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
