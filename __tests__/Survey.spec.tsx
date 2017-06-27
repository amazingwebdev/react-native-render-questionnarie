import React from 'react'
import { mount, ComponentClass } from 'enzyme'
import { TouchableOpacity } from 'react-native'
import { Button, Text, Container } from 'native-base'
import * as chai from 'chai'

import {
    BaseInput,
    BaseState,
    TextInput,
    SliderInput,
    CheckInput,
    RadioInput,
    ListInput,
} from '../src/components'

import { Survey, Form, Page, Question, SliderInputQuestion, TextInputQuestion, ListInputQuestion, CheckInputQuestion, RadioInputQuestion } from '../src/survey'

const should = chai.should()

const form: Form = require('../samples/form.json')

describe('<Survey />', () => {

    const onSave = (answers: {}): void => { }

    const onFailure = (errors: string[]): void => { }

    const wrapper = mount(<Survey form={form} onSave={onSave} onFailure={onFailure} />)
    const survey = wrapper.instance() as Survey

    it('should render the survey', () => {
        survey.props.form.should.deep.equal(form)

        should.exist(survey)
        survey.state.pageNumber.should.equal(0)

        while (survey.state.pageNumber < form.pages.length - 1) {
            const currentPage: Page = form.pages[survey.state.pageNumber]
            checkCurrentPage(currentPage)
            wrapper.setState({ pageNumber: survey.state.pageNumber + 1 })
        }

    })

    const checkCurrentPage = (currentPage: Page) => {
        currentPage.questions.map((question: Question) => {
            const ref = wrapper.ref(question.tag)
            const componentClass = ref.type() as ComponentClass<Question>
            const component = new componentClass(ref.props()) as BaseInput<Question, BaseState>

            should.equal(question.tag, component.props.tag, currentPage.name)
            should.equal(question.title, component.props.title, question.tag)
            should.equal(question.required, component.props.required, question.tag)

            should.equal(question.type, component.props.type, question.tag)
            should.equal(question.trackType, component.props.trackType, question.tag)
            should.equal(question.smartCode, component.props.smartCode, question.tag)
            should.equal(question.oneTime, component.props.oneTime, question.tag)
            should.equal(question.startDate, component.props.startDate, question.tag)
            should.equal(question.endDate, component.props.endDate, question.tag)
            should.equal(question.newLine, component.props.newLine, question.tag)
            should.equal(question.visible, component.props.visible, question.tag)
            should.equal(question.visibleIf, component.props.visibleIf, question.tag)

            switch (component.props.type) {
                case 'slider':
                    const sliderProps: SliderInputQuestion = question as SliderInputQuestion
                    const sliderInput: SliderInput = component as SliderInput
                    should.equal(sliderProps.min, sliderInput.props.min, question.tag)
                    should.equal(sliderProps.max, sliderInput.props.max, question.tag)
                    should.equal(sliderProps.step, sliderInput.props.step, question.tag)
                    break
                case 'text':
                    const textProps: TextInputQuestion = question as TextInputQuestion
                    const textInput: TextInput = component as TextInput
                    should.equal(textProps.placeholder, textInput.props.placeholder, question.tag)
                    should.equal(textProps.validation, textInput.props.validation, question.tag)
                    break
                case 'list':
                    const listProps: ListInputQuestion = question as ListInputQuestion
                    const listInput: ListInput = component as ListInput
                    listProps.options.should.deep.equal(listInput.props.options, question.tag)
                    should.equal(listInput.props.titleKey, listProps.titleKey, question.tag)
                    should.equal(listInput.props.valueKey, listProps.valueKey, question.tag)
                    should.equal(listInput.props.optionsTitle, listProps.optionsTitle, question.tag)
                    break
                case 'radio':
                    const radioProps: RadioInputQuestion = question as RadioInputQuestion
                    const radioInput: RadioInput = component as RadioInput
                    radioProps.options.should.deep.equal(radioInput.props.options, question.tag)
                    should.equal(radioInput.props.titleKey, radioProps.titleKey)
                    should.equal(radioInput.props.valueKey, radioProps.valueKey)
                    break
                case 'check':
                    const checkProps: CheckInputQuestion = question as CheckInputQuestion
                    const checkInput: CheckInput = component as CheckInput
                    checkInput.props.options.should.deep.equal(checkProps.options, question.tag)
                    should.equal(checkInput.props.titleKey, checkProps.titleKey)
                    should.equal(checkInput.props.valueKey, checkProps.valueKey)
                    break
                default:
                    throw Error('invalid question type')
            }
        })
    }

})
