/**
 * Created by alperen on 9.05.2017.
 */
import React from 'react'
import { View, ListItem, Text, Radio } from 'native-base'

import { MultiInputComponent, MultiInputComponentProps, MultiInputComponentState } from "../MultiInputComponent";

interface RadioButtonProps extends MultiInputComponentProps {
    options: any
}

interface RadioButtonState extends MultiInputComponentState {
    selection: string | undefined
}

export class RadioButton extends MultiInputComponent<RadioButtonProps, RadioButtonState>
{
    constructor(props: RadioButtonProps) {
        super(props)
        this.state = {
            selection: undefined
        }
        this.onPress = this.onPress.bind(this)
    }

    public render(): JSX.Element {
        let options: JSX.Element[] = []
        this.optionValues.map((option) => {
            let name = option[this.props.titleKey]
            let value = option[this.props.valueKey]
            let checked = this.state.selection === value
            options.push(
                <ListItem key={this.props.tag + "_" + value} onPress={this.onPress.bind(this, value)}>
                    <Radio selected={checked} />
                    <Text>{name}</Text>
                </ListItem>)

        })
        return (
            <View>
                {this.getTitle()}
                {options}
            </View>
        )
    }

    private onPress(selection: string) {
        this.setState({ selection })
    }

    public getValue() {
        return this.state.selection
    }

}