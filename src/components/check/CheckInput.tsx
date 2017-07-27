import React from 'react'
import { View, CheckBox, ListItem, Text } from 'native-base'

import { MultiInputQuestion, MultiInputQuestionOption } from '../../survey'
import { BaseInput } from '../'
import MultiChoiceInputHOC from '../MultiChoiceInputHOC'

interface Selection {
    [key: string]: boolean
}

interface CheckInputState {
    selection: Selection
}

class CheckInput extends React.Component<MultiInputQuestion, CheckInputState> implements BaseInput<MultiInputQuestion> {

    constructor(props: MultiInputQuestion) {
        super(props)
        this.state = {
            selection: {},
        }
        this.renderOptions = this.renderOptions.bind(this)
    }

    public componentDidMount() {
        if (this.props.defaultValue) {
            this.setValue(this.props.defaultValue)
        }
    }

    public render(): JSX.Element {
        return (
            <View>
                {this.props.pureOptions.map(this.renderOptions)}
            </View>
        )
    }

    public setValue(value: string | string[]) {
        if (typeof value === 'string') {
            const { selection } = this.state
            selection[value] = !selection[value]
            this.setState({ selection })
        } else if (typeof value === 'object') {
            this.setValues(value)
        }
    }

    public getValue(): any | undefined {
        const selections: string[] = []
        for (const ref in this.refs) {
            if (this.refs.hasOwnProperty(ref)) {
                const component: CheckBox = this.refs[ref] as CheckBox
                if (component.props.checked) {
                    selections.push(ref)
                }
            }
        }
        return selections.length > 0 ? selections : undefined
    }

    private setValues(values: string[]) {
        const { selection } = this.state
        values.map((value) => {
            selection[value] = true
        })
        this.setState({ selection })
    }

    private renderOptions(option: MultiInputQuestionOption): JSX.Element {
        const [title, value] = [option[this.props.titleKey], option[this.props.valueKey]]
        const checked = this.state.selection[value]
        const key = this.props.tag + '_' + value
        return (
            <ListItem key={key} onPress={this.setValue.bind(this, value)}>
                <CheckBox ref={value} checked={checked} />
                <Text>{title}</Text>
            </ListItem>
        )
    }

    public isValid(): boolean {
        return true
    }

    public getTitle(): string {
        return this.props.title
    }

}

export default MultiChoiceInputHOC(CheckInput)
