/**
 * Created by alperen on 9.05.2017.
 */
import React from 'react'
import { Container, Content, ListItem, Text, Radio } from 'native-base'

import { BaseComponent, BaseProps, BaseState } from "../BaseComponent";

interface RadioButtonProps extends BaseProps {
    options: any
}

interface RadioButtonState extends BaseState {
    selection: string
}

export class RadioButton extends BaseComponent<RadioButtonProps, RadioButtonState>
{
    constructor(props: RadioButtonProps) {
        super(props)
        this.state = {
            selection: "foo"
        }
        this.renderOption = this.renderOption.bind(this)
    }

    public render(): JSX.Element {
        return (
            <Radio selected={true} />
        )
    }

    private renderOption(option: any) {
       
    }

    public getValue() {
        return this.state.selection
    }
}