import React from 'react'
import { View, Picker } from 'native-base'

import { MultiInputComponent, MultiInputComponentProps, MultiInputComponentState } from "../MultiInputComponent";

interface DropdownProps extends MultiInputComponentProps {

}

interface DropdownState extends MultiInputComponentState {
    selection: string | undefined
}

export class Dropdown extends MultiInputComponent<DropdownProps, DropdownState>{

    constructor(props: DropdownProps) {
        super(props)
        this.state = {
            selection: undefined,
        }
        this.renderOptions = this.renderOptions.bind(this)
        this.setValue = this.setValue.bind(this)
    }

    public componentDidMount() {
        if (this.props.defaultValue !== undefined) {
            if (typeof this.props.defaultValue === 'string') {
                this.setValue(this.props.defaultValue)
            } else {
                console.error(`ListInput tag:${this.props.tag}", default value is not string`)
            }
        } else {
            console.debug(`ListInput tag:${this.props.tag}", no default value`)
        }
    }

    public render(): JSX.Element {
        return (
            <View>
                {this.getTitle()}
                <Picker
                    ref={this.props.tag}
                    key={this.props.tag}
                    selectedValue={this.state.selection}
                    onValueChange={this.setValue}>
                    {this.options.map(this.renderOptions)}
                </Picker>
            </View>
        )
    }

    public setValue(selection: string) {
        this.setState({ selection })
    }

    public getValue() {
        return this.state.selection;
    }

    private renderOptions(option) {
        let name = option[this.props.titleKey]
        let value = option[this.props.valueKey]
        return (
            <Picker.Item key={this.props.tag} label={name} value={value} />
        )
    }

}