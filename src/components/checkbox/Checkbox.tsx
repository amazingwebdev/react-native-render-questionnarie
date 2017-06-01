import React from 'react'
import { View, CheckBox, ListItem, Text } from 'native-base'

import { MultiInputComponent, MultiInputComponentProps, MultiInputComponentState } from '../MultiInputComponent'

interface CheckBoxProps extends MultiInputComponentProps {

}

interface CheckBoxState extends MultiInputComponentState {
    selection: Map<string, boolean>
}

export class Checkboxx extends MultiInputComponent<CheckBoxProps, CheckBoxState> {

    constructor(props: CheckBoxProps) {
        super(props)
        const selection: Map<string, boolean> = new Map<string, boolean>()
        this.state = {
            selection,
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
            console.debug(`CheckInput tag:${this.props.tag}", no default value`)
        }
    }

    public render(): JSX.Element {
        return super.render(this.options.map(this.renderOptions))
    }

    public setValue(value: any) {
        if (typeof value === 'string') {
            const selection = this.state.selection
            selection.set(value, !selection.get(value))
            this.setState({ selection })
        } else if (typeof value === 'object') {
            this.setValues(value)
        }
    }

    public getValue(): any | undefined {
        const selections: string[] = []
        for (const q in this.refs) {
            if (this.refs.hasOwnProperty(q)) {
                const component: CheckBox = this.refs[q] as Checkboxx
                if (component.props.checked) {
                    selections.push(q)
                }
            }
        }
        return selections.length > 0 ? selections : undefined
    }

    private setValues(selections: string[]) {
        const selection = this.state.selection
        selections.map((sel) => {
            selection.set(sel, true)
        })
        this.setState({ selection })
    }

    private renderOptions(option): JSX.Element {
        const [title, value] = [option[this.props.titleKey], option[this.props.valueKey]]
        const checked = this.state.selection.get(value)
        const key = this.props.tag + '_' + value
        return (
            <ListItem key={key} onPress={this.setValue.bind(this, value)}>
                <CheckBox ref={value} checked={checked} />
                <Text>{title}</Text>
            </ListItem>
        )
    }

}
