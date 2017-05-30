import React from 'react'
import { View, Item, Input, Icon, Toast } from 'native-base'

import { BaseProps, BaseState, BaseComponent } from '../'

interface TextFieldProps extends BaseProps {
    value?: string
    validation?: string
    placeholder?: string
}

interface TextFieldState extends BaseState {
    value?: string
}

export class TextField extends BaseComponent<TextFieldProps, TextFieldState> {

    regExp : RegExp

    constructor(props: TextFieldProps) {
        super(props)
        this.state = {
            value: props.value,
            display: true
        }

        if(this.props.validation !== undefined) {
            this.regExp = new RegExp(this.props.validation)
        }
    }

    public componentWillMount() {
        if (this.props.defaultValue !== undefined) {
            if (typeof this.props.defaultValue === 'string') {
                this.setValue(this.props.defaultValue)
            } else {
                console.error(`TextInput tag:${this.props.tag}", default value is not string`)
            }
        } else {
            console.debug(`TextInput tag:${this.props.tag}", no default value`)
        }
    }

    public render(): JSX.Element {
        return super.render(
            <Item rounded>
                <Input
                    onBlur={this.onBlur.bind(this)}
                    onChangeText={this.setValue}
                    placeholder={this.props.placeholder}
                    value={this.state.value} />
            </Item>
        )
    }

    public setValue(value: string) {
        this.setState({ value })
    }

    public getValue() {
        return this.state.value ? this.state.value : undefined;
    }

    public isValid():boolean {
        if(this.regExp === undefined){
            return super.isValid()
        }
        if(this.state.value !== undefined){
            return this.regExp.test(this.state.value)
        }
        return super.isValid()
    }

    private onBlur() {
        if(!this.isValid()) {
            Toast.show({text:"Girdiğiniz karakterleri kontrol ediniz.", buttonText:"TAMAM", position:"bottom", type:"warning"})
        }
    }

}