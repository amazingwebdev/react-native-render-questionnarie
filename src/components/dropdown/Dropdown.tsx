import React from 'react'

import { Alert } from 'react-native'

import { Picker, View } from 'native-base'

import { MultiInputComponent, MultiInputComponentProps, MultiInputComponentState } from "../MultiInputComponent";
const Item = Picker.Item;


class Options {
    private type: string
    private values: Array<Map<string, string>>
    private request: Map<string, string>
}

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
        this.renderOption = this.renderOption.bind(this)
        this.setSelection = this.setSelection.bind(this)
    }

    componentDidMount() {
        if (this.props.defaultValue) {
            this.setSelection(this.props.defaultValue)
        }
    }

    private setSelection(selection: string) {
        this.setState({ selection: selection })
    }

    public render(): JSX.Element {
        let i = 0;
        let options: JSX.Element[] = []
        this.optionValues.map((option) => {
            let name = option[this.props.keyName]
            let value = option[this.props.valueName]
            if (!name || !value) {
                //Alert.alert("Hata", "beş dakikada değişir bütün işler")
            } else {
                options.push(<Item key={this.props.tag} label={name} value={value} />)
            }
            
        })
        return (
            <View>
                <Picker ref={this.props.tag + "_" +i} key={this.props.tag + "_" + i++} style={{ borderColor: "red", borderWidth: 2, width: "100%" }}
                selectedValue={this.state.selection}
                onValueChange={this.renderOption.bind(this)}>
                {options}
            </Picker>
            </View>
        )
    }

    public renderOption(value: string) {
        this.setState({
            selection: value
        });
    }


    public getValue() {
        return this.state.selection;
    }
}