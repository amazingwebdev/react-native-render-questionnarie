import React from 'react'
import { View, CheckBox, ListItem, Text } from 'native-base'

import { CheckInputQuestion, MultiInputQuestionOption } from '../../Form'
import { MultiChoiceInput, MultiChoiceInputState } from '../MultiChoiceInput'

interface Selection {
    [key: string]: boolean
}

interface CheckInputState extends MultiChoiceInputState {
    selection: Selection
}

export class CheckInput extends MultiChoiceInput<CheckInputQuestion, CheckInputState> {

    constructor(props: CheckInputQuestion) {
        super(props)
        this.state = {
            selection: {},
            display: true,
        }
        this.renderOptions = this.renderOptions.bind(this)
    }

    public componentDidMount() {
        if (this.props.defaultValue !== undefined) {
            if (this.props.defaultValue instanceof Array) {
                this.setValues(this.props.defaultValue)
            } else {
                console.error(`CheckInput tag:${this.props.tag}", default value is not array`)
            }
        } else {
            console.warn(`CheckInput tag:${this.props.tag}", no default value`)
        }
    }

    public render(): JSX.Element {
        return super.render(this.options.map(this.renderOptions))
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
                const component: CheckBox = this.refs[ref] as CheckInput
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

}
