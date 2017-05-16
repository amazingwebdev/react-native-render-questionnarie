/**
 * Created by alperen on 9.05.2017.
 */
import React from 'react'

import { StyleSheet } from 'react-native'

import { Content, Header, Button, Icon, Title, ListItem, Text, Radio } from 'native-base'

import { MultiInputComponent, MultiInputComponentProps, MultiInputComponentState } from "../MultiInputComponent";

interface RadioButtonProps extends MultiInputComponentProps {
    options: any
}

interface RadioButtonState extends MultiInputComponentState {
    selection: string
}

export class RadioButton extends MultiInputComponent<RadioButtonProps, RadioButtonState>
{
    constructor(props: RadioButtonProps) {
        super(props)
        this.state = {
            selection: ''
        }
        this.renderOption = this.renderOption.bind(this)
        this.onPress = this.onPress.bind(this)
        this.getTitle = this.getTitle.bind(this);
    }

    public render(): JSX.Element {
        let options: JSX.Element[] = []

        this.optionValues.map((option) => {
            let name = option[this.props.keyName]
            let value = option[this.props.valueName]
            if (!name || !value) {
                //Alert.alert("Hata", "beş dakikada değişir bütün işler")
            } else {
                let checked = this.state.selection === name
                options.push(
                    <ListItem style={{ width: '100%' }} onPress={this.onPress.bind(this, name)}>
                        <Radio selected={checked} />
                        <Text>{name}</Text>

                    </ListItem>)
            }

        })
        return (
            <Content>
                {this.getTitle()}
                {options}
            </Content>
        )
    }

    private onPress(selection: string) {
        this.setState({ selection })
    }

    private renderOption(option: any) {

    }

    public getValue() {
        return this.state.selection
    }
}