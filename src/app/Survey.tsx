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

import { Content, Text, Button, View } from 'native-base'

import Style from './SurveyStyle'

interface SurveyProps {
    form: any
}

interface SurveyState {
    pageNumber: number
}


export class Survey extends React.Component<SurveyProps, SurveyState> {

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

        page["questions"].map((question) => {
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

        elements.push(<View key="k2"><Button onPress={this.onPress} block><Text> Çiğdem </Text></Button></View>)

        return (
            <Content key="content" style={Style}>
                {elements}
            </Content>
        )
    }

    public getSurveyAnswers(): Array<Object> {
        let answers: Array<Object> = []
        for (let q in this.refs) {
            if (this.refs.hasOwnProperty(q)) {
                let component = this.refs[q] as BaseComponent<BaseProps, BaseState>
                let value = component.getValue()
                if(q === 'q1') {
                    component.focus()
                }
                if (value !== undefined) {
                    answers.push({ [q]: value })
                }
            }
        }
        return answers
    }

    private onPress() {
        this.getSurveyAnswers()
        //Alert.alert("Çiğdem", JSON.stringify(this.getSurveyAnswers()))
    }

}