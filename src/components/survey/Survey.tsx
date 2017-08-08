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
import * as _ from 'lodash'

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
  FormPage,
} from '../'

import Style from './Style'

import { IndicatorViewPager, PagerDotIndicator, PagerTitleIndicator } from 'rn-viewpager'

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
  answers: Answers
  medias: Media
}

interface Answers {
  [key: string]: string | string[] | number
}

interface Media {
  form: string[]
  question: { [key: string]: string[] }
}

export default class Survey extends React.Component<SurveyProps, SurveyState> {

  private pageCount: number
  private prevAnswers: Answers

  public constructor(props: SurveyProps) {
    super(props)
    this.state = {
      pageNumber: 0,
      capturing: false,
      showGallery: false,
      capturedPhotos: [],
      answers: this.props.answers ? this.props.answers : {},
      medias: {
        form: [],
        question: {},
      },
    }
    this.pageCount = this.props.form.pages.length
    this.prevAnswers = {}
    this.onSave = this.onSave.bind(this)
    this.openCamera = this.openCamera.bind(this)
    this.openGallery = this.openGallery.bind(this)
    this.onCameraClose = this.onCameraClose.bind(this)
    this.onPhotoDelete = this.onPhotoDelete.bind(this)
    this.onGalleryClose = this.onGalleryClose.bind(this)
    this.questionValueHandler = this.questionValueHandler.bind(this)
  }

  public componentDidMount() {
    this.loadAnswers()
  }

  public shouldComponentUpdate(nextProps: SurveyProps, nextState: SurveyState) {
    if (this.state.capturing !== nextState.capturing) {
      return true
    }
    if (this.state.showGallery !== nextState.showGallery) {
      return true
    }
    return false

  }

  public questionValueHandler(tag: string, value: string | string[] | number) {
    const { answers } = this.state
    answers[tag] = value
    this.setState({ answers })
  }

  public render(): JSX.Element {
    const pages = this.props.form.pages.map((page: Page) => {
      return (<View>
        <FormPage data={page} questionValueHandler={this.questionValueHandler} />
      </View>)
    })

    return (
      // todo disabled button
      <Container style={Style.container} >
        <Header style={Style.header}>

          {this.state.pageNumber === 0 &&
            this.pageCount !== 1 &&
            <Left style={Style.headerLeft}>
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
          <Right>
            <Button onPress={this.onSave} transparent>
              <Text> Save </Text>
              <Icon name="done-all" />
            </Button>
          </Right>
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

          <IndicatorViewPager
            style={Style.indicator}
            indicator={this.renderDotIndicator()}>
            {pages}
          </IndicatorViewPager>

        </Content>
      </Container >
    )
  }

  private renderDotIndicator() {
    return <PagerDotIndicator pageCount={this.pageCount} />
  }

  private loadAnswers() {
    if (_.isEmpty(this.state.answers)) {
      return
    }
    _.forOwn(this.refs, (wrapper: DisplayInput<Question>, ref) => {
      if (_.has(this.state.answers, ref)) {
        if (wrapper.isAvailable()) {
          const question = wrapper.getWrappedComponent() as BaseInput<Question>
          question.setValue(this.state.answers[ref])
        }
      }
      if (_.has(this.state.medias.question, ref)) {
        wrapper.setPhotosURLs(this.state.medias.question[ref])
      }
    })
  }

  private validatePage(): string[] {
    const validationMessages: string[] = []
    _.forOwn(this.refs, (wrapper: DisplayInput<Question>, ref) => {
      if (wrapper.isAvailable()) {
        const question = wrapper.getWrappedComponent() as BaseInput<Question>
        if (!question.isValid() && question.getTitle()) {
          validationMessages.push(question.getTitle())
        }
      }
    })
    return validationMessages
  }

  private onSave() {
    const validationMessages = this.validatePage()
    if (_.isEmpty(validationMessages) && this.props.onSave) {
      if (this.state.capturedPhotos.length > 0) {
        this.state.medias.form = this.state.capturedPhotos
      }
      this.props.onSave(this.state.answers, this.state.medias)
    } else if (this.props.onFailure) {
      this.props.onFailure(validationMessages)
    }
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
    if (_.isEmpty(capturedPhotos)) {
      this.setState({ showGallery: false })
    } else {
      this.setState({ capturedPhotos })
    }
  }

}
