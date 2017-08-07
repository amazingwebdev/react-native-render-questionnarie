import React from 'react'
import {
    Body,
    Button,
    Container,
    Content,
    Header,
    Icon,
    Left,
    Right,
    Text,
    Title,
    View,
} from 'native-base'

import {
    Form,
    Page,
    Question,
    MultiInputQuestion,
    TextInputQuestion,
    SliderInputQuestion,
    BaseInput,
    DisplayInput,
    BaseState,
    TextInput,
    SliderInput,
    CheckInput,
    RadioInput,
    ListInput,
    PhotoInput,
    Gallery,
    Camera,
} from '../'

import { ScrollView } from 'react-native'

import * as _ from 'lodash'

interface PageProps {
    questionValueHandler: (tag: string, value: string | string[] | number) => void
    data: Page
}

export default class FormPage extends React.Component<PageProps> {

    public constructor(props: PageProps) {
        super(props)

        this.createQuestionComponent = this.createQuestionComponent.bind(this)

    }

    public render() {

        const questions = this.props.data.questions.map(this.createQuestionComponent)
        return (
            <ScrollView>
                <View style={{ height: 'auto' }}>
                    {questions}
                </View>
            </ScrollView>

        )
    }

    private createQuestionComponent(question: Question): JSX.Element {
        switch (question.type) {
            case 'slider':
                const slider: SliderInputQuestion = question as SliderInputQuestion
                return (
                    <SliderInput
                        ref={slider.tag}
                        key={slider.tag}
                        tag={slider.tag}
                        type={slider.type}
                        title={slider.title}
                        required={slider.required}
                        photoRequired={slider.photoRequired}
                        min={slider.min}
                        max={slider.max}
                        step={slider.step}
                        defaultValue={slider.defaultValue}
                        onValueChanged={this.props.questionValueHandler}
                    />
                )
            case 'text':
                const text: TextInputQuestion = question as TextInputQuestion
                return (
                    <TextInput
                        ref={text.tag}
                        key={text.tag}
                        tag={text.tag}
                        type={text.type}
                        title={text.title}
                        required={text.required}
                        photoRequired={text.photoRequired}
                        defaultValue={text.defaultValue}
                        validation={text.validation}
                        onValueChanged={this.props.questionValueHandler}
                    />
                )
            case 'list':
                const list: MultiInputQuestion = question as MultiInputQuestion
                return (
                    <ListInput
                        ref={list.tag}
                        key={list.tag}
                        tag={list.tag}
                        type={list.type}
                        title={list.title}
                        required={list.required}
                        photoRequired={list.photoRequired}
                        defaultValue={list.defaultValue}
                        options={list.options}
                        titleKey={list.titleKey}
                        valueKey={list.valueKey}
                        optionsTitle={list.optionsTitle}
                        onValueChanged={this.props.questionValueHandler}
                    />
                )
            case 'radio':
                const radio: MultiInputQuestion = question as MultiInputQuestion
                return (
                    <RadioInput
                        ref={radio.tag}
                        key={radio.tag}
                        tag={radio.tag}
                        type={radio.type}
                        title={radio.title}
                        required={radio.required}
                        photoRequired={radio.photoRequired}
                        defaultValue={radio.defaultValue}
                        options={radio.options}
                        titleKey={radio.titleKey}
                        valueKey={radio.valueKey}
                        onValueChanged={this.props.questionValueHandler}
                    />
                )
            case 'check':
                const checkbox: MultiInputQuestion = question as MultiInputQuestion
                return (
                    <CheckInput
                        ref={checkbox.tag}
                        key={checkbox.tag}
                        tag={checkbox.tag}
                        type={checkbox.type}
                        title={checkbox.title}
                        required={checkbox.required}
                        photoRequired={checkbox.photoRequired}
                        defaultValue={checkbox.defaultValue}
                        options={checkbox.options}
                        titleKey={checkbox.titleKey}
                        valueKey={checkbox.valueKey}
                        onValueChanged={this.props.questionValueHandler}
                    />
                )
            case 'photo':
                const photo: Question = question as Question
                return (
                    <PhotoInput
                        ref={photo.tag}
                        key={photo.tag}
                        tag={photo.tag}
                        type={photo.type}
                        title={photo.title}
                        required={photo.required}
                        photoRequired={photo.required}
                        onValueChanged={this.props.questionValueHandler}
                    />
                )
            default:
                throw new Error('no such question type')
        }

    }

}
