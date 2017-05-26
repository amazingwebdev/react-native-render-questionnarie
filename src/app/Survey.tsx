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
    DeckSwiperInput
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

    private answers: Array<Object>
    private isFormValid: boolean
    private validationMessages: string[]

    constructor(props: SurveyProps) {
        super(props)
        this.state = {
            pageNumber: 0
        }
        this.onPress = this.onPress.bind(this)
    }

    public render(): JSX.Element {
        let elements: JSX.Element[] = []

        let page = this.props.form.pages[this.state.pageNumber]

        page["questions"].map(question => {
            let tag = question["tag"]
            let commonProps = {
                tag: tag,
                ref: tag,
                key: tag,
                title: question["title"],
                required: question["required"],
                defaultValue: question["defaultValue"]
            }
            switch (question["type"]) {
                case "slider":
                    elements.push(<SliderInput
                        {...commonProps}
                        min={question["min"]}
                        max={question["max"]}
                        step={question["step"]}
                    />)
                    break;
                case "textinput":
                    elements.push(<TextField
                        {...commonProps}
                        validation={question["validation"]}
                    />)
                    break;
                case "dropdown":
                    elements.push(<Dropdown
                        {...commonProps}
                        options={question["options"]}
                        titleKey={question["titleKey"]}
                        valueKey={question["valueKey"]}
                    />)
                    break;
                case "radio":
                    elements.push(<RadioButton
                        {...commonProps}
                        options={question["options"]}
                        titleKey={question["titleKey"]}
                        valueKey={question["valueKey"]}
                    />)
                    break;
                case "checkbox":
                    elements.push(<Checkboxx
                        {...commonProps}
                        options={question["options"]}
                        titleKey={question["titleKey"]}
                        valueKey={question["valueKey"]}
                    />)
                    break;
                default:
                    break;
            }

        })

        return (
            <Content key="form" style={Style}>
                {elements}
                <View key="save"><Button onPress={this.onPress} block><Text> Çiğdem </Text></Button></View>
            </Content>
        )
    }

    public validateForm(): void {
        this.answers = []
        this.validationMessages = []
        for (let q in this.refs) {
            if (this.refs.hasOwnProperty(q)) {
                let component = this.refs[q] as BaseComponent<BaseProps, BaseState>
                if (component.isValid()) {
                    if (component.getValue() !== undefined) {
                        this.answers.push({ [q]: component.getValue() })
                    }
                } else {
                    this.validationMessages.push(component.props.tag)
                }
            }
        }
        this.isFormValid = !(this.validationMessages.length > 0)
    }

    private onPress() {
        this.validateForm()
        if (this.isFormValid) {
            Toast.show({ text: JSON.stringify(this.answers), buttonText: "Tamam", position: "bottom", duration: 10, type: "success" })
        } else {
            Toast.show({ text: this.validationMessages.join("\n"), buttonText: "Tamam", position: "bottom", duration: 2, type: "warning" })
        }
    }

}