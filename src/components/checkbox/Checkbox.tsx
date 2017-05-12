import React from 'react'
import { Container, Content, ListItem, Text, CheckBox } from 'native-base';

import { BaseComponent, BaseProps, BaseState } from '../BaseComponent'

interface CheckBoxProps extends BaseProps {
    options: { type: string, values: Array<Object> }
    keyName?: string
    valueName?: string
    defaultValue?: string
}

interface CheckBoxState extends BaseState {
    selection: Map<string, boolean>
}

export class Checkboxx extends BaseComponent<CheckBoxProps, CheckBoxState> {

    private optionValues: Array<Object>

    constructor(props: CheckBoxProps) {
        super(props)
        let selection: Map<string, boolean> = new Map<string, boolean>()
        this.optionValues = new Array<Map<string, string>>()
        this.state = {
            selection
        }

        this.bindMethods()
        this.initOptions()
    }

    private bindMethods() {
        this.renderOptions = this.renderOptions.bind(this)
        this.initOptions = this.initOptions.bind(this)
    }

    private initOptions() {
        if (this.props.options.type === 'static') {
            for (let option of this.props.options.values) {
                this.optionValues.push(option)
            }
        } else if (this.props.options.type === 'http') {

        } else {
            console.error('no such option type')
        }
        console.log('options are', this.optionValues)
    }

    public render(): JSX.Element {
        return (
            <Container style={{height: 100}}>
                <Content>
                    {
                        this.optionValues.map(this.renderOptions)
                    }
                </Content>
            </Container>
        )
    }

    private renderOptions(option: any): JSX.Element {
        let [key, value] = [option['key'], option['value']]
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
                selections.push({ [q]: this.state.selection.get(q)})
            }
        }
        return selections
    }

}
