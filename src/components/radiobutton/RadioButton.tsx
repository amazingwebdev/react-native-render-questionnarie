/**
 * Created by alperen on 9.05.2017.
 */
import React from 'react'
import { View, ListItem, Text, Radio } from 'native-base'

import { MultiInputComponent, MultiInputComponentProps, MultiInputComponentState } from '../MultiInputComponent'

interface RadioButtonProps extends MultiInputComponentProps {

}

interface RadioButtonState extends MultiInputComponentState {
    selection: string | undefined
}

export class RadioButton extends MultiInputComponent<RadioButtonProps, RadioButtonState> {

    constructor(props: RadioButtonProps) {
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
            console.debug(`RadioInput tag:${this.props.tag}, no default value`)
        }
    }

    public render(): JSX.Element {
        return super.render(this.options.map(this.renderOptions))
    }

    public setValue(selection: string) {
        this.setState({ selection })
    }

    public getValue() {
        return this.state.selection
    }

    private renderOptions(option): JSX.Element {
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
