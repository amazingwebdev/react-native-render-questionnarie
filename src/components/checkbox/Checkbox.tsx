import React from 'react'
import { View, CheckBox, ListItem, Text } from 'native-base';

import { MultiInputComponent, MultiInputComponentProps, MultiInputComponentState } from '../MultiInputComponent'

interface CheckBoxProps extends MultiInputComponentProps {

}

interface CheckBoxState extends MultiInputComponentState {
    selection: Map<string, boolean>
}

export class Checkboxx extends MultiInputComponent<CheckBoxProps, CheckBoxState> {

    constructor(props: CheckBoxProps, Optionsource) {
        super(props)
        let selection: Map<string, boolean> = new Map<string, boolean>()
        this.state = {
            selection
        }
        this.renderOptions = this.renderOptions.bind(this)
    }

    public render(): JSX.Element {
        return (
            <View>
                {this.getTitle()}
                {this.optionValues.map(this.renderOptions)}
            </View>
        )
    }

    private renderOptions(option): JSX.Element {
        let [title, value] = [option[this.props.titleKey], option[this.props.valueKey]]
        let checked = this.state.selection.get(title)
        let key= this.props.tag + "_" + value
        return (
            <ListItem key={key}  onPress={this.onPress.bind(this, title)}>
                <CheckBox ref={value} checked={checked} />
                <Text>{title}</Text>
            </ListItem>
        )
    }

    private onPress(key: string) {
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

}
