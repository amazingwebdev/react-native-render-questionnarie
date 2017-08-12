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

import { forEach, isEmpty, isUndefined, isNull } from 'lodash'

import AnswerStore, { Answer } from './AnswerStore'

interface PageProps {
    page: Page
}

export default class FormPage extends React.Component<PageProps> {

    public relatedQuestions: { [key: string]: string[] } = {}

    public constructor(props: PageProps) {
        super(props)
        this.relatedQuestions = {}
        this.createQuestionComponent = this.createQuestionComponent.bind(this)
        this.onCascadingAnswerChange = this.onCascadingAnswerChange.bind(this)
    }

    public shouldComponentUpdate(nextProps: PageProps) {
        return false
    }

    public componentDidMount() {
        this.deleteUnpairedMappings()
        this.subscribePairedMappings()
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

    private subscribePairedMappings(): void {
        forEach(this.props.page.questions, (question) => {
            forEach(this.relatedQuestions, (array, parent) => {
                if (question.tag === parent) {
                    AnswerStore.subscribe(parent, this.onCascadingAnswerChange)
                }
            })
        })
    }

    private deleteUnpairedMappings(): void {
        forEach(this.relatedQuestions, (value, key) => {
            if (isEmpty(this.relatedQuestions[key])) {
                delete this.relatedQuestions[key]
            }
        })
    }

    private pairCascadingQuestions(question: MultiInputQuestion): void {
        if (question.options.type === 'http') {
            this.relatedQuestions[question.tag] = []
            forEach(question.options.request.params, (paramValue, paramName) => {
                if (paramValue && paramValue.toString().startsWith('${')) {
                    const tag = paramValue.replace('${', '').replace('}', '')
                    forEach(this.relatedQuestions, (value, key) => {
                        if (key === tag) {
                            this.relatedQuestions[key].push(question.tag)
                        }
                    })
                }
            })
            forEach(this.relatedQuestions, (childs, parent) => {
                if (childs && childs.length > 0) {
                    forEach(this.relatedQuestions, (childs2, parent2) => {
                        if (childs.indexOf(parent2) !== -1) {
                            this.relatedQuestions[parent] = this.relatedQuestions[parent].concat(childs2)
                            delete this.relatedQuestions[parent2]
                        }
                    })
                }
            })
        }
    }

    private onCascadingAnswerChange(tag: string, value: string): void {
        this.relatedQuestions[tag].forEach((question) => {
            const inputWrapper = this.refs[question] as DisplayInput<Question>
            const input = inputWrapper.getWrappedComponent() as BaseInput<Question>
            if (!isUndefined(input) && !isNull(input)) {
                input.reset()
            }
        })
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
                this.pairCascadingQuestions(list) // FIXME: Bütün sorular için bunun yapılması gerekiyor.
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
