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
        this.state = {
            selection: undefined,
        }
        this.renderOptions = this.renderOptions.bind(this)
        this.setValue = this.setValue.bind(this)
    }

    componentDidMount() {
        if (this.props.defaultValue) {
            this.setState({ selection: this.props.defaultValue.toString() }) // TODO: 
        } else {
            this.setState({ selection: '-' })
        }
    }

    componentDidUpdate() {
        if (this.props.trigger) {
            this.props.trigger(this.props.tag, this.state.selection, this.props.onChange)
        }
    }

    render(): JSX.Element {
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
    }

    public isValid(): boolean {
        return true
    }

}

export default MultiChoiceInputHOC(ListInput)
