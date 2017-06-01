import React from 'react'
import { Alert } from 'react-native'
import {
    BaseComponent,
    BaseProps,
    BaseState,
    TextField,
    SliderInput,
    QuestionType,
    Checkboxx,
    RadioButton,
    Dropdown,
} from '../components'

import { Content, Text, Button, View, Toast } from 'native-base'

import Style from './SurveyStyle'

interface SurveyProps {
    form: any
}

interface SurveyState {
    pageNumber: number
}

export class Survey extends React.Component<SurveyProps, SurveyState> {

    private answers: {}
    private pageCount: number

    constructor(props: SurveyProps) {
        super(props)
        this.state = {
            pageNumber: 0,
        }
        this.answers = {}
        this.pageCount = props.form.pages.length

        this.prevPage = this.prevPage.bind(this)
        this.nextPage = this.nextPage.bind(this)
        this.onSave = this.onSave.bind(this)
    }

    public componentDidUpdate() {
        const currentPageAnswers = this.answers[this.state.pageNumber]
        if (currentPageAnswers === undefined) {
            return
        }
        for (const ref in this.refs) {
            if (this.refs.hasOwnProperty(ref)) {
                if (currentPageAnswers[ref]) {
                    const question = this.refs[ref] as BaseComponent<BaseProps, BaseState>
                    question.setValue(currentPageAnswers[ref])
                }
            }
        }
    }

    public render(): JSX.Element {
        const controlButtons: JSX.Element[] = []

        if (this.state.pageNumber === 0 && this.pageCount !== 1) {
            controlButtons.push(<View key="next"><Button style={{ margin: 5, alignContent: 'center' }} onPress={this.nextPage} block><Text> Next </Text></Button></View>)
        } else if (this.state.pageNumber === this.pageCount - 1) {
            controlButtons.push(<View key="prev"><Button style={{ margin: 5, alignContent: 'center' }} onPress={this.prevPage} block><Text> Previous </Text></Button></View>)
            controlButtons.push(<View key="save"><Button style={{ margin: 5, alignContent: 'center' }} onPress={this.onSave} block><Text> Save </Text></Button></View>)
        } else {
            controlButtons.push(<View key="prev"><Button style={{ margin: 5, alignContent: 'center' }} onPress={this.prevPage} block><Text> Previous </Text></Button></View>)
            controlButtons.push(<View key="next"><Button style={{ margin: 5, alignContent: 'center' }} onPress={this.nextPage} block><Text> Next </Text></Button></View>)
        }

        const page = this.props.form.pages[this.state.pageNumber]

        return (
            <Content key="form" style={Style}>
                {
                    page.questions.map((question) => {
                        return this.createQuestionComponent(question)
                    })
                }
                {controlButtons}
            </Content>
        )
    }

    private validatePage(): string[] {
        const validationMessages: string[] = []
        for (const ref in this.refs) {
            if (this.refs.hasOwnProperty(ref)) {
                const question = this.refs[ref] as BaseComponent<BaseProps, BaseState>
                if (!question.isValid() && question.props.title) {
                    validationMessages.push(question.props.title)
                }
            }
        }
        return validationMessages
    }

    private storeCurrentPageAnswers(): void {
        const currentPageAnswers = {}
        for (const q in this.refs) {
            if (this.refs.hasOwnProperty(q)) {
                const question = this.refs[q] as BaseComponent<BaseProps, BaseState>
                if (question.isValid() && question.getValue() !== undefined) {
                    currentPageAnswers[q] = question.getValue()
                }
            }
        }
        this.answers[this.state.pageNumber] = currentPageAnswers
    }

    private prevPage() {
        this.storeCurrentPageAnswers()
        const pageNumber = this.state.pageNumber - 1
        this.setState({ pageNumber })
    }

    private nextPage() {
        const validationMessages = this.validatePage()
        if (validationMessages.length === 0) {
            this.storeCurrentPageAnswers()
            this.setState({ pageNumber: this.state.pageNumber + 1 })
        } else {
            Toast.show({ text: validationMessages.join('\n'), buttonText: 'Tamam', position: 'bottom', type: 'danger' })
        }
    }

    private onSave() {
        const validationMessages = this.validatePage()
        if (validationMessages.length === 0) {
            Toast.show({ text: JSON.stringify(this.answers), buttonText: 'Tamam', position: 'bottom', type: 'success' })
        } else {
            Toast.show({ text: validationMessages.join('\n'), buttonText: 'Tamam', position: 'bottom', type: 'danger' })
        }
    }

    private createQuestionComponent(question): JSX.Element {
        const tag = question.tag
        const value = this.answers[tag] ? this.answers[tag].toString() : undefined
        const commonProps = {
            tag,
            ref: tag,
            key: tag,
            title: question.title,
            required: question.required,
            defaultValue: question.defaultValue,
        }
        switch (question.type) {
            case 'slider':
                return <SliderInput
                    {...commonProps}
                    min={question.min}
                    max={question.max}
                    step={question.step}
                />
            case 'textinput':
                return <TextField
                    {...commonProps}
                    validation={question.validation}
                    value={value}
                />
            case 'dropdown':
                return <Dropdown
                    {...commonProps}
                    options={question.options}
                    titleKey={question.titleKey}
                    valueKey={question.valueKey}
                />
            case 'radio':
                return <RadioButton
                    {...commonProps}
                    options={question.options}
                    titleKey={question.titleKey}
                    valueKey={question.valueKey}
                />
            case 'checkbox':
                return <Checkboxx
                    {...commonProps}
                    options={question.options}
                    titleKey={question.titleKey}
                    valueKey={question.valueKey}
                />
            default:
                throw new Error('no such question type')
        }
    }

}
