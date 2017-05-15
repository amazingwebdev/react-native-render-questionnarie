import React from 'react'
import { Container, ListItem, Text, CheckBox } from 'native-base';

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
            <Container style={{height: 100}}>
                    {
                        this.optionValues.map(this.renderOptions)
                    }
            </Container>
        )
    }

    private renderOptions(option: Map<string, string>): JSX.Element {
        let [key, value] = [option.get("key"), option.get("value")]
        if (key === undefined) {
            return (
                <Text> beş dakikada değişir bütün işler </Text>
            ) 
        }
        let checked = this.state.selection.get(key)
        return (
            <ListItem onPress={this.onPress.bind(this, key)}>
                <CheckBox ref={key} key={key} checked={checked} />
                <Text>{value}</Text>
            </ListItem>
        )
    }

    private onPress(key: string) {
        let selection = this.state.selection
        selection.set(key, !selection.get(key))
        this.setState({ selection })
    }

    public getValue(): any | undefined {
        let selections = []
        for (let q in this.refs) {
            if (this.refs.hasOwnProperty(q)) {
                let component = this.refs[q] as Checkboxx
                /*selections.push({ [q]: this.state.selection.get(q)})*/
            }
        }
        return selections
    }

}
