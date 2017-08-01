import React from 'react'
import { View, ListItem, Text, Radio } from 'native-base'

import MultiChoiceInputHOC from '../base/MultiChoiceInputHOC'
import { BaseInput, MultiInputQuestion, MultiInputQuestionOption } from '../'

interface RadioInputState {
    selection: string
}

class RadioInput extends React.Component<MultiInputQuestion, RadioInputState> implements BaseInput<MultiInputQuestion> {

    constructor(props: MultiInputQuestion) {
        super(props)
        this.state = this.getInitialState()
        this.renderOptions = this.renderOptions.bind(this)
        this.setValue = this.setValue.bind(this)
    }

    private getInitialState(): RadioInputState {
        return { selection: undefined }
    }

    componentDidMount() {
        if (this.props.defaultValue) {
            this.setState({ selection: this.props.defaultValue.toString() })
        }
    }

    render(): JSX.Element {
        return (
            <View>
                {this.props.pureOptions.map(this.renderOptions)}
            </View>
        )
    }

    private renderOptions(option: MultiInputQuestionOption): JSX.Element {
        const [title, value] = [option[this.props.titleKey], option[this.props.valueKey]]
        const checked = this.state.selection === value
        const key = this.props.tag + '_' + value
        return (
            <ListItem key={key} onPress={this.setValue.bind(this, value)}>
                <Radio ref={value} selected={checked} />
                <Text>{title}</Text>
            </ListItem>
        )
    }

    public getTitle(): string {
        return this.props.title
    }

    public getValue() {
        return this.state.selection
    }

    public setValue(selection: string) {
        this.setState({ selection })
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

export default MultiChoiceInputHOC(RadioInput)
