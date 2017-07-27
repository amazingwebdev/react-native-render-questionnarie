import React from 'react'
import { Alert } from 'react-native'

import {
  Container,
  Content,
  Text,
  Button,
  View,
  Icon,
  Header,
  Left,
  Right,
  Title,
  Body,
} from 'native-base'

import {
  BaseInput,
  DisplayInput,
  BaseState,
  TextInput,
  SliderInput,
  CheckInput,
  RadioInput,
  ListInput,
  PhotoInput,
} from '../components'

import {
  Form,
  Question,
  TextInputQuestion,
  SliderInputQuestion,
  ListInputQuestion,
  RadioInputQuestion,
  CheckInputQuestion,
  PhotoInputQuestion,
} from '../survey'

import Style from './SurveyStyle'

interface SurveyProps {
  form: Form
  onSave: (answers: {}) => void
  onFailure: (errors: string[]) => void
}

interface SurveyState {
  pageNumber: number
}

interface Answers {
  [key: string]: {}
}

export default class Survey extends React.Component<SurveyProps, SurveyState> {

  private answers: Answers
  private pageCount: number
  private questionCount: number
  private brief: string

  public constructor(props: SurveyProps) {
    super(props)
    this.state = {
      pageNumber: 0,
    }
    this.answers = {}
    this.pageCount = props.form.pages.length

    this.prevPage = this.prevPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.onSave = this.onSave.bind(this)

    this.countQuestions()
    this.prepareBriefMessage()
  }

  public componentDidUpdate() {
    const currentPageAnswers: { [key: string]: string } = this.answers[this.state.pageNumber]
    if (currentPageAnswers === undefined) {
      return
    }
    for (const ref in this.refs) {
      if (this.refs.hasOwnProperty(ref)) {
        if (currentPageAnswers[ref]) {
          const wrapper = this.refs[ref] as DisplayInput<Question> // FIXME:
          if (wrapper.isAvailable()) {
            const question = wrapper.getWrappedComponent() as BaseInput<Question>
            question.setValue(currentPageAnswers[ref])
          }
        }
      }
    }
  }

  public render(): JSX.Element {
    const page = this.props.form.pages[this.state.pageNumber]
    const questions: JSX.Element[] = page.questions.map((question: Question) =>
      this.createQuestionComponent(question),
    )

    return (
      // todo disabled button
      <Container>
        <Header style={Style.header}>
          {!(this.state.pageNumber === 0 && this.pageCount !== 1) &&
            <Left>
              <Button onPress={this.prevPage} transparent>
                <Icon name="arrow-back" />
                <Text> Previous </Text>
              </Button>
            </Left>}
          {this.state.pageNumber === 0 &&
            this.pageCount !== 1 &&
            <Left>
              <Button transparent onPress={() => Alert.alert(this.props.form.name, this.brief)}>
                <Icon name="camera" />
              </Button>
            </Left>}
          <Body>
            <Title>{this.props.form.pages[this.state.pageNumber].name}</Title>
          </Body>
          {!(this.state.pageNumber === this.pageCount - 1) &&
            <Right>
              <Button onPress={this.nextPage} transparent>
                <Text> Next </Text>
                <Icon name="arrow-forward" />
              </Button>
            </Right>}
          {this.state.pageNumber === this.pageCount - 1 &&
            <Right>
              <Button onPress={this.onSave} transparent>
                <Text> Save </Text>
                <Icon name="done-all" />
              </Button>
            </Right>}
        </Header>
        <Content key="form" style={Style.content}>
          {questions}
        </Content>
      </Container>
    )
  }

  private validatePage(): string[] {
    const validationMessages: string[] = []
    for (const ref in this.refs) {
      if (this.refs.hasOwnProperty(ref)) {
        const wrapper = this.refs[ref] as DisplayInput<Question> // FIXME:
        if (wrapper.isAvailable()) {
          const question = wrapper.getWrappedComponent() as BaseInput<Question>
          if (!question.isValid() && question.getTitle()) {
            validationMessages.push(question.getTitle())
          }
        }
      }
    }
    return validationMessages
  }

  private storeCurrentPageAnswers(): void {
    const currentPageAnswers: { [key: string]: string | string[] | number } = {}
    for (const ref in this.refs) {
      if (this.refs.hasOwnProperty(ref)) {
        const wrapper = this.refs[ref] as DisplayInput<Question> // FIXME:
        if (wrapper.isAvailable()) {
          const question = wrapper.getWrappedComponent() as BaseInput<Question>
          if (question.isValid() && question.getValue() !== undefined) {
            currentPageAnswers[ref] = question.getValue()
          }
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
    } else if (this.props.onFailure) {
      this.props.onFailure(validationMessages)
    }
  }

  private onSave() {
    const validationMessages = this.validatePage()
    if (validationMessages.length === 0 && this.props.onSave) {
      this.props.onSave(this.answers)
    } else if (this.props.onFailure) {
      this.props.onFailure(validationMessages)
    }
  }

  private createQuestionComponent(question: Question): JSX.Element {
    switch (question.type) {
      case 'slider':
        const slider: SliderInputQuestion = question as SliderInputQuestion
        return (
          <SliderInput
            ref={slider.tag}
            tag={slider.tag}
            type={slider.type}
            title={slider.title}
            required={slider.required}
            min={slider.min}
            max={slider.max}
            step={slider.step}
            defaultValue={slider.defaultValue}
          />
        )
      case 'text':
        const text: TextInputQuestion = question as TextInputQuestion
        return (
          <TextInput
            ref={text.tag}
            tag={text.tag}
            type={text.type}
            title={text.title}
            required={text.required}
            defaultValue={text.defaultValue}
            validation={text.validation}
          />
        )
      case 'list':
        const list: ListInputQuestion = question as ListInputQuestion
        return (
          <ListInput
            ref={list.tag}
            tag={list.tag}
            type={list.type}
            title={list.title}
            required={list.required}
            defaultValue={list.defaultValue}
            options={list.options}
            titleKey={list.titleKey}
            valueKey={list.valueKey}
            optionsTitle={list.optionsTitle}
          />
        )
      case 'radio':
        const radio: RadioInputQuestion = question as RadioInputQuestion
        return (
          <RadioInput
            ref={radio.tag}
            tag={radio.tag}
            type={radio.type}
            title={radio.title}
            required={radio.required}
            defaultValue={radio.defaultValue}
            options={radio.options}
            titleKey={radio.titleKey}
            valueKey={radio.valueKey}
          />
        )
      case 'check':
        const checkbox: CheckInputQuestion = question as CheckInputQuestion
        return (
          <CheckInput
            ref={checkbox.tag}
            tag={checkbox.tag}
            type={checkbox.type}
            title={checkbox.title}
            required={checkbox.required}
            defaultValue={checkbox.defaultValue}
            options={checkbox.options}
            titleKey={checkbox.titleKey}
            valueKey={checkbox.valueKey}
          />
        )
      /* case 'photo':
        const photo: PhotoInputQuestion = question as PhotoInputQuestion
        return (
          <PhotoInput
            ref={photo.tag}
            tag={photo.tag}
            type={photo.type}
            title={photo.title}
            required={photo.required}
          />
        ) */
      default:
      /*  throw new Error('no such question type') */
    }
  }

  private countQuestions() {
    let questionCount = 0
    this.props.form.pages.map((page) => {
      questionCount += page.questions.length
    })
    this.questionCount = questionCount
  }

  private prepareBriefMessage(): void {
    const brief: string[] = []
    brief.push(`Bu soru formu ${this.pageCount} sayfadan`)
    brief.push(`${this.questionCount} sorudan oluşmaktadır.`)
    this.brief = brief.join('\n')
  }

}
