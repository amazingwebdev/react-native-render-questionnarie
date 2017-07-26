import React from 'react'
import { View, ListItem, Text, Radio } from 'native-base'

import { MultiInputQuestion, MultiInputQuestionOption } from '../../survey'
import { BaseInput } from '../BaseInput'
import MultiChoiceInputHOC from '../MultiChoiceInputHOC'

interface RadioInputState {
    selection: string | string[] // FIXME: 
}

class RadioInput extends React.Component<MultiInputQuestion, RadioInputState> implements BaseInput {

    constructor(props: MultiInputQuestion) {
        super(props)
        this.state = {
            selection: undefined,
        }
        this.renderOptions = this.renderOptions.bind(this)
        this.setValue = this.setValue.bind(this)
    }

    public componentDidMount() {
        if (this.props.defaultValue) {
            this.setState({ selection: this.props.defaultValue })
        }
    }

    public render(): JSX.Element {
        return (
            <View>
                {this.props.pureOptions.map(this.renderOptions)}
            </View>
        )
    }

    public setValue(selection: string) {
        this.setState({ selection })
    }

    public getValue() {
        return this.state.selection
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

    public isValid(): boolean {
        return true
    }

}

export default MultiChoiceInputHOC(RadioInput)
