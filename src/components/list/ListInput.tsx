import React from 'react'
import { View, Picker } from 'native-base'

import { MultiInputQuestion, MultiInputQuestionOption } from '../../survey'
import { BaseInput } from '../BaseInput'
import MultiChoiceInputHOC from '../MultiChoiceInputHOC'
import BaseInputHOC from '../BaseInputHOC'

interface ListInputState {
    selection?: string | string[]
}

class ListInput extends React.Component<MultiInputQuestion, ListInputState> implements BaseInput {

    constructor(props: MultiInputQuestion) {
        super(props)
        this.state = {
            selection: undefined,
        }
        this.renderOptions = this.renderOptions.bind(this)
        this.setValue = this.setValue.bind(this)
    }

    componentWillMount() {
        this.props.pureOptions.splice(0, 0, this.createOptionTitle())
    }
    
    componentDidMount() {
        if (this.props.defaultValue) {
            this.setState({ selection: this.props.defaultValue })
        } else {
            this.setState({ selection: '-' })
        }
    }

    public render(): JSX.Element {
        return (
            // FIXME: default option ayrı render edilecek. 
            // https://github.com/facebook/react-native/issues/11682
            <Picker
                ref={this.props.tag}
                key={this.props.tag}
                selectedValue={this.state.selection}
                onValueChange={this.setValue}>
                {this.props.pureOptions.map(this.renderOptions)}
            </Picker>
        )
    }

    public setValue(selection: string) {
        this.setState({ selection })
    }

    public getValue() {
        if (this.state.selection === undefined || this.state.selection === '-1') {
            return undefined
        }
        return this.state.selection
    }

    private renderOptions(option: MultiInputQuestionOption) {
        const name = option[this.props.titleKey]
        const value = option[this.props.valueKey]
        const key = this.props.tag + '_' + value
        return (
            <Picker.Item key={key} label={name} value={value} />
        )
    }

    private createOptionTitle(): MultiInputQuestionOption {
        const defaultOptionsTitle: MultiInputQuestionOption = {}
        defaultOptionsTitle[this.props.titleKey] = this.props.optionsTitle ? this.props.optionsTitle : '-'
        defaultOptionsTitle[this.props.valueKey] = '-1'
        return defaultOptionsTitle
    }

    public isValid(): boolean {
        return true
    }

    public getTitle(): string {
        return this.props.title
    }

}

export default MultiChoiceInputHOC(BaseInputHOC(ListInput))
