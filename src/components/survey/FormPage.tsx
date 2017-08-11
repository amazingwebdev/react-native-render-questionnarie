import React from 'react'
import {
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

import AnswerStore, { Answer } from './AnswerStore'

interface PageProps {
    page: Page
}

export default class FormPage extends React.Component<PageProps> {

    public relatedQuestions: { [key: string]: string[] } = {}
    public parent: string

    public cascadedQuestions: string[] = []

    public constructor(props: PageProps) {
        super(props)
        this.relatedQuestions = {}
        this.createQuestionComponent = this.createQuestionComponent.bind(this)
    }

    public shouldComponentUpdate(nextProps: PageProps) {
        return false
    }

    componentDidMount() {
        _.forEach(this.props.page.questions, (question) => {
            _.forEach(this.relatedQuestions, (array, parent) => {
                if (question.tag === parent) {
                    AnswerStore.subscribe(parent, () => {
                        this.relatedQuestions[parent].forEach((tag) => {
                            const inputWrapper = this.refs[tag] as DisplayInput<Question>
                            const input = inputWrapper.getWrappedComponent() as BaseInput<Question>
                            input.reset()
                        })
                    })
                }

            })

        })
    }

    public render() {
        const questions = this.props.page.questions.map(this.createQuestionComponent)
        return (
            <ScrollView>
                <View style={{ height: 'auto' }}>
                    {questions}
                </View>
            </ScrollView>
        )
    }

    private getCascadedQuestionFromRequestParams(question: MultiInputQuestion) {
        if (question.options.type === 'http') {
            if (!question.options.request.params && question.onChange) {
                this.relatedQuestions[question.tag] = []
                this.parent = question.tag
            } else {
                _.forEach(question.options.request.params, (paramValue, paramName) => {
                    if (paramValue && paramValue.toString().startsWith('${')) {
                        const tag = paramValue.replace('${', '').replace('}', '')
                        this.relatedQuestions[this.parent].push(question.tag)
                    }
                })
            }
            return this.relatedQuestions

        }

    }

    private createQuestionComponent(question: Question): JSX.Element {
        const answer = AnswerStore.getOrDefault(question.tag, question.defaultValue)
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
                        answer={answer}
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
                        answer={answer}
                    />
                )
            case 'list':
                const list: MultiInputQuestion = question as MultiInputQuestion
                this.getCascadedQuestionFromRequestParams(list) // FIXME: Bütün sorular için bunun yapılması gerekiyor.
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
                        onChange={list.onChange}
                        answer={answer}
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
                        answer={answer}
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
                        answer={answer}
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
                    />
                )
            default:
                throw new Error('no such question type')
        }

    }

}
