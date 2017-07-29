import React from 'react'
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
  Form,
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

import Style from './Style'

interface SurveyProps {
  form: Form
  onSave: (answers: Answers, media: Media) => void
  onFailure: (errors: string[]) => void
  answers?: { [key: string]: string | string[] | number }
}

interface SurveyState {
  pageNumber: number
  showGallery: boolean,
  capturedPhotos: string[],
  capturing: boolean
}

interface Answers {
  [key: string]: {}
}

interface Media {
  form: string[]
  question: { [key: string]: string[] }
}

export default class Survey extends React.Component<SurveyProps, SurveyState> {

  private answers: Answers
  private pageCount: number
  private questionCount: number
  private brief: string
  private prevAnswers: Answers
  private media: Media

  public constructor(props: SurveyProps) {
    super(props)
    this.state = {
      pageNumber: 0,
      capturing: false,
      showGallery: false,
      capturedPhotos: [],
    }
    this.answers = {}
    this.prevAnswers = {}
    this.pageCount = props.form.pages.length
    this.media = {
      form: [],
      question: {},
    }
    this.prevPage = this.prevPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.onSave = this.onSave.bind(this)
    this.openCamera = this.openCamera.bind(this)
    this.openGallery = this.openGallery.bind(this)
    this.onCameraClose = this.onCameraClose.bind(this)
    this.onPhotoDelete = this.onPhotoDelete.bind(this)
    this.onGalleryClose = this.onGalleryClose.bind(this)

    this.countQuestions()
    this.prepareBriefMessage()
  }

  public componentDidMount() {
    if (this.props.answers) {
      for (const ref in this.refs) {
        if (this.refs.hasOwnProperty(ref)) {
          if (this.props.answers[ref]) {
            const wrapper = this.refs[ref] as DisplayInput<Question>
            if (wrapper.isAvailable()) {
              const question = wrapper.getWrappedComponent() as BaseInput<Question>
              question.setValue(this.props.answers[ref])
            }
          }
        }
      }
    }
  }

  public componentDidUpdate() {
    const currentPageAnswers: { [key: string]: string } = this.answers[this.state.pageNumber]
    if (currentPageAnswers === undefined) {
      if (this.props.answers) {
        for (const ref in this.refs) {
          if (this.refs.hasOwnProperty(ref)) {
            if (this.props.answers[ref]) {
              const wrapper = this.refs[ref] as DisplayInput<Question>
              if (wrapper.isAvailable()) {
                const question = wrapper.getWrappedComponent() as BaseInput<Question>
                question.setValue(this.props.answers[ref])
                if (this.media.question[ref] && this.media.question[ref].length > 0) {
                  wrapper.setPhotosURLs(this.media.question[ref])
                }
              }
            }
          }
        }
      }

      return
    }
    for (const ref in this.refs) {
      if (this.refs.hasOwnProperty(ref)) {
        if (currentPageAnswers[ref]) {
          const wrapper = this.refs[ref] as DisplayInput<Question>
          if (wrapper.isAvailable()) {
            const question = wrapper.getWrappedComponent() as BaseInput<Question>
            question.setValue(currentPageAnswers[ref])
            if (this.media.question[ref] && this.media.question[ref].length > 0) {
              wrapper.setPhotosURLs(this.media.question[ref])
            }
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
              </Button>
            </Left>}
          {this.state.pageNumber === 0 &&
            this.pageCount !== 1 &&
            <Left>
              {
                <Button transparent style={Style.button} onPress={this.openCamera}>
                  <Icon name="camera" />
                </Button>
              }
              {
                this.state.capturedPhotos.length === 1 &&
                <Button transparent style={Style.button} onPress={this.openGallery}>
                  <Icon name="image" />
                </Button>
              }
              {
                this.state.capturedPhotos.length > 1 &&
                <Button transparent style={Style.button} onPress={this.openGallery}>
                  <Icon name="images" />
                </Button>
              }
            </Left>}
          <Body>
            <Title>{this.props.form.pages[this.state.pageNumber].name}</Title>
          </Body>
          {!(this.state.pageNumber === this.pageCount - 1) &&
            <Right>
              <Button onPress={this.nextPage} transparent>
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
        <Camera
          visible={this.state.capturing}
          onClose={this.onCameraClose}
        />
        <Gallery
          visible={this.state.showGallery}
          photos={this.state.capturedPhotos}
          onPhotoDelete={this.onPhotoDelete}
          onGalleryClose={this.onGalleryClose}
        />
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
        const wrapper = this.refs[ref] as DisplayInput<Question>
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
        const wrapper = this.refs[ref] as DisplayInput<Question>
        if (wrapper.isAvailable()) {
          const question = wrapper.getWrappedComponent() as BaseInput<Question>
          if (question.getValue() !== undefined) {
            currentPageAnswers[ref] = question.getValue()
            if (wrapper.getPhotosURLs().length > 0) {
              this.media.question[ref] = wrapper.getPhotosURLs()
            }
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
      this.storeCurrentPageAnswers()
      if (this.state.capturedPhotos.length > 0) {
        this.media.form = this.state.capturedPhotos
      }
      this.props.onSave(this.answers, this.media)
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

  private openCamera() {
    this.setState({ capturing: true })
  }

  private openGallery() {
    this.setState({ showGallery: true })
  }

  private onCameraClose(capturedPhotos: string[]) {
    this.setState({ capturedPhotos, capturing: false })
  }

  private onGalleryClose() {
    this.setState({ showGallery: false })
  }

  private onPhotoDelete(deletedPhoto: string) {
    const { capturedPhotos } = this.state
    capturedPhotos.splice(this.state.capturedPhotos.indexOf(deletedPhoto, 1))
    if (capturedPhotos.length === 0) {
      this.setState({ showGallery: false })
    } else {
      this.setState({ capturedPhotos })
    }
  }
}
