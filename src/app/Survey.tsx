import React from 'react'
import { View, Button, Alert } from 'react-native'
import {
    BaseComponent,
    BaseProps,
    BaseState,
    TextField,
    SliderInput,
    QuestionType,
    Checkboxx,
    RadioButton,
    Dropdown
} from '../components'

import { Container, Button as Piton } from 'native-base'

import Style from './SurveyStyle'

interface SurveyProps {

}

interface SurveyState {

}

export class Survey extends React.Component<SurveyProps, SurveyState> {

    constructor(props: SurveyProps) {
        super(props)

        this.onPress = this.onPress.bind(this)
    }

    public render(): JSX.Element {
        let defaultValue = "foo"
        let options = {
            "type": "static",
            "values": [
                {
                    "key": "foo",
                    "value": "bar"
                },
                {
                    "key": "foo2",
                    "value": "bar2",
                }
            ]
        }
        return (
            <Container style={Style}>
                <TextField ref="q1" tag="q1" key="q1" type={QuestionType.Textfield} value="foo" />
                <SliderInput ref="q2" tag="q2" key="q2" type={QuestionType.Slider} min={0} max={200} step={20} />
                <Dropdown ref="q2.1" tag="2.1" key="q78" type={QuestionType.Dropdown} />
                <Checkboxx ref="q3" tag="q3" key="q3" options={options} keyName="key" valueName="value" type={QuestionType.Checkbox} />
                <Button title="çiğdem" key="çiğdem" onPress={this.onPress} />
                {/*<Piton  />*/}
            </Container>
        )
    }

    public getSurveyAnswers(): Array<Object> {
        let answers = []
        for (let q in this.refs) {
            if (this.refs.hasOwnProperty(q)) {
                let component = this.refs[q] as BaseComponent<BaseProps, BaseState>
                answers.push({ [component.props.tag]: component.getValue() })
            }
        }
        return answers
    }

    private onPress() {
        console.log(this.getSurveyAnswers())
        Alert.alert("Çiğdem", JSON.stringify(this.getSurveyAnswers()))
    }

}