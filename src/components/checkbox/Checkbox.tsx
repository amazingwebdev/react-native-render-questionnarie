import React from 'react'
import { View, CheckBox, ListItem, Text } from 'native-base';

import { MultiInputComponent, MultiInputComponentProps, MultiInputComponentState } from '../MultiInputComponent'

interface CheckBoxProps extends MultiInputComponentProps {

}

interface CheckBoxState extends MultiInputComponentState {
    selection: Map<string, boolean>
}

export class Checkboxx extends MultiInputComponent<CheckBoxProps, CheckBoxState> {

    constructor(props: CheckBoxProps) {
        super(props)
        let selection: Map<string, boolean> = new Map<string, boolean>()
        this.state = {
            selection,
            display: true
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

    public setValue(key: string) {
        let selection = this.state.selection
        selection.set(key, !selection.get(key))
        this.setState({ selection })
    }

    public getValue(): any | undefined {
        let selections: string[] = []
        for (let q in this.refs) {
            if (this.refs.hasOwnProperty(q)) {
                let component = this.refs[q] as Checkboxx
                if (this.refs[q]["props"]["checked"]) {
                    selections.push(q)
                }
            }
        }
        return selections.length > 0 ? selections : undefined
    }

    public setValues(selections: Array<string>) {
        let selection = this.state.selection
        selections.map(sel => {
            selection.set(sel, true)
        })
        this.setState({ selection })
    }

    private renderOptions(option): JSX.Element {
        let [title, value] = [option[this.props.titleKey], option[this.props.valueKey]]
        let checked = this.state.selection.get(value)
        let key = this.props.tag + "_" + value
        return (
            <ListItem key={key} onPress={this.setValue.bind(this, value)}>
                <CheckBox ref={value} checked={checked} />
                <Text>{title}</Text>
            </ListItem>
        )
    }

}
