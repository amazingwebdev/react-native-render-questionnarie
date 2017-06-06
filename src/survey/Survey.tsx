import React from 'react'
import { Alert } from 'react-native'

import {
  Container,
  Content,
  Text,
  Button,
  View,
  Toast,
  Icon,
  Header,
  Left,
  Right,
  Title,
  Body,
} from 'native-base'

import {
  BaseInput,
  BaseProps,
  BaseState,
  QuestionType,
  TextInput,
  SliderInput,
  CheckInput,
  RadioInput,
  ListInput,
} from '../components'

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
    const currentPageAnswers = this.answers[this.state.pageNumber]
    if (currentPageAnswers === undefined) {
      return
    }
    for (const ref in this.refs) {
      if (this.refs.hasOwnProperty(ref)) {
        if (currentPageAnswers[ref]) {
          const question = this.refs[ref] as BaseInput<BaseProps, BaseState>
          question.setValue(currentPageAnswers[ref])
        }
      }
    }
  }

  public render(): JSX.Element {
    const page = this.props.form.pages[this.state.pageNumber]
    const questions: JSX.Element[] = page.questions.map(question =>
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
                <Icon name="clipboard" />
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
        const question = this.refs[ref] as BaseInput<BaseProps, BaseState>
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
        const question = this.refs[q] as BaseInput<BaseProps, BaseState>
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
      Toast.show({
        text: validationMessages.join('\n'),
        buttonText: 'Tamam',
        position: 'bottom',
        type: 'danger',
      })
    }
  }

  private onSave() {
    const validationMessages = this.validatePage()
    if (validationMessages.length === 0) {
      Toast.show({
        text: JSON.stringify(this.answers),
        buttonText: 'Tamam',
        position: 'bottom',
        type: 'success',
      })
    } else {
      Toast.show({
        text: validationMessages.join('\n'),
        buttonText: 'Tamam',
        position: 'bottom',
        type: 'danger',
      })
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
        return (
          <SliderInput
            {...commonProps}
            min={question.min}
            max={question.max}
            step={question.step}
          />
        )
      case 'text':
        return (
          <TextInput
            {...commonProps}
            validation={question.validation}
            value={value}
          />
        )
      case 'list':
        return (
          <ListInput
            {...commonProps}
            options={question.options}
            titleKey={question.titleKey}
            valueKey={question.valueKey}
          />
        )
      case 'radio':
        return (
          <RadioInput
            {...commonProps}
            options={question.options}
            titleKey={question.titleKey}
            valueKey={question.valueKey}
          />
        )
      case 'checkbox':
        return (
          <CheckInput
            {...commonProps}
            options={question.options}
            titleKey={question.titleKey}
            valueKey={question.valueKey}
          />
        )
      default:
        throw new Error('no such question type')
    }
  }

  private countQuestions() {
    let questionCount = 0
    this.props.form.pages.map((page) => {
      questionCount += page.questions.length // grid içindeki soruları da saymak gerekir.
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
