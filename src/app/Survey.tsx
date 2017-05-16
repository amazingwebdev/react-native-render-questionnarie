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

import { Content, Text, Button } from 'native-base'

import Style from './SurveyStyle'

import { HTTPOptionSource, StaticOptionSource } from '../components/MultiInputComponent'

interface SurveyProps {
    form: any
}

interface SurveyState {
    pageNumber: number
}


export class Survey extends React.Component<SurveyProps, SurveyState> {

    form
    constructor(props: SurveyProps) {
        super(props)
        this.state = {
            pageNumber: 0
        }
        this.form = props.form
        this.onPress = this.onPress.bind(this)
    }


    public render(): JSX.Element {
        let elements: JSX.Element[] = []

        let page = this.form.pages[this.state.pageNumber]

        page["questions"].map((question) => {
            let commonProps = {
                ref: question["tag"],
                key: question["tag"],
                required: question["required"]
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
                        keyName={question["keyName"]}
                        valueName={question["valueName"]}
                    />)
                    break;
                case "radio":
                    elements.push(<RadioButton
                        {...commonProps}
                        options={question["options"]}
                        keyName={question["keyName"]}
                        valueName={question["valueName"]}
                    />)
                    break;
                default:
                    break;
            }

        })


        elements.push(<DeckSwiperInput />)
        elements.push(<Button onPress={this.onPress} light><Text> Çiğdem </Text></Button>)

        return (
            <Content style={Style}>
                {elements}
            </Content>
        )
    }

    public getSurveyAnswers(): Array<Object> {
        let answers: any = []
        for (let q in this.refs) {
            if (this.refs.hasOwnProperty(q)) {
                let component = this.refs[q] as BaseComponent<BaseProps, BaseState>
                let value = component.getValue()
                if (value !== undefined) {
                    answers.push({ [q]: component.getValue() })
                }
            }
        }
        return answers
    }

    private onPress() {
        console.log(this.getSurveyAnswers())
        Alert.alert("Çiğdem", JSON.stringify(this.getSurveyAnswers(), (key, value) => {
            if (value === null) return undefined
            return value
        }))
    }

}