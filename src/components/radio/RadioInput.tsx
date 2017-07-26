import React from 'react'
import { View, ListItem, Text, Radio } from 'native-base'

import { MultiInputQuestion, MultiInputQuestionOption } from '../../survey'
import { MultiChoiceInputState } from '../MultiChoiceInput'

interface RadioInputState extends MultiChoiceInputState {
    selection: string | undefined
}

export class RadioInput extends React.Component<MultiInputQuestion, RadioInputState> {

    constructor(props: MultiInputQuestion) {
        super(props)
        this.state = {
            selection: undefined,
            display: true,
        }
        this.renderOptions = this.renderOptions.bind(this)
    }

    public componentDidMount() {
        if (this.props.defaultValue !== undefined) {
            if (typeof this.props.defaultValue === 'string') {
                this.setValue(this.props.defaultValue)
            } else {
                console.error(`RadioInput tag:${this.props.tag}, default value is not string`)
            }
        } else {
            console.warn(`RadioInput tag:${this.props.tag}, no default value`)
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

}
