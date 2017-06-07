import React from 'react'
import { View, Picker } from 'native-base'

import { MultiChoiceInput, MultiChoiceInputProps, MultiChoiceInputState } from '../MultiChoiceInput'

interface ListInputProps extends MultiChoiceInputProps {
    optionsTitle?: string
}

interface ListInputState extends MultiChoiceInputState {
    selection?: string | number
}

export class ListInput extends MultiChoiceInput<ListInputProps, ListInputState> {

    constructor(props: ListInputProps) {
        super(props)
        this.state = {
            display: true,
        }
        this.renderOptions = this.renderOptions.bind(this)
    }

    public componentWillMount() {
        const defaultOptionsTitle = {}
        defaultOptionsTitle[this.props.titleKey] = this.props.optionsTitle ? this.props.optionsTitle : '-'
        defaultOptionsTitle[this.props.valueKey] = -1
        this.options.splice(0, 0, defaultOptionsTitle)
    }

    public componentDidMount() {
        if (this.props.defaultValue !== undefined) {
            if (typeof this.props.defaultValue === 'string') {
                this.setValue(this.props.defaultValue)
            } else {
                console.error(`ListInput tag:${this.props.tag}, default value is not string`)
            }
        } else {
            console.debug(`ListInput tag:${this.props.tag}, no default value`)
        }
    }

    public render(): JSX.Element {
        return super.render(
            <Picker
                ref={this.props.tag}
                key={this.props.tag}
                selectedValue={this.state.selection}
                onValueChange={this.setValue}>
                {this.options.map(this.renderOptions)}
            </Picker>,
        )
    }

    public setValue(selection: string) {
        this.setState({ selection })
    }

    public getValue() {
        if (this.state.selection === undefined || this.state.selection === -1) {
            return undefined
        }
        return this.state.selection
    }

    private renderOptions(option) {
        const name = option[this.props.titleKey]
        const value = option[this.props.valueKey]
        const key = this.props.tag + '_' + value
        return (
            <Picker.Item key={key} label={name} value={value} />
        )
    }

}
