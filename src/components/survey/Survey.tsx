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
	Picker,
} from 'native-base'
import { forOwn, isEmpty } from 'lodash'

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
import AnswerStore, { Answer, Answers } from './AnswerStore'

import Style from './Style'

import { IndicatorViewPager, PagerDotIndicator, PagerTitleIndicator } from 'rn-viewpager'

interface SurveyProps {
	form: Form
	onSave: (answers: Answers, media: Media) => void
	onFailure: (errors: string[]) => void
	answers?: Answers
}

interface SurveyState {
	pageNumber: number
	showGallery: boolean,
	capturedPhotos: string[],
	capturing: boolean
	medias: Media
	currentPage: number
}

interface Media {
	form: string[]
	question: { [key: string]: string[] }
}

interface CurrentPage {
	position: number
}

export default class Survey extends React.Component<SurveyProps, SurveyState> {

	private pager: IndicatorViewPager

	public constructor(props: SurveyProps) {
		super(props)
		this.state = {
			pageNumber: 0,
			capturing: false,
			showGallery: false,
			capturedPhotos: [],
			medias: {
				form: [],
				question: {},
			},
			currentPage: 0,
		}
		if (this.props.answers) {
			AnswerStore.putAll(this.props.answers)
		}
		this.onSave = this.onSave.bind(this)
		this.openCamera = this.openCamera.bind(this)
		this.openGallery = this.openGallery.bind(this)
		this.onCameraClose = this.onCameraClose.bind(this)
		this.onPhotoDelete = this.onPhotoDelete.bind(this)
		this.onGalleryClose = this.onGalleryClose.bind(this)
		this.onPageChanged = this.onPageChanged.bind(this)
		this.onPageSelected = this.onPageSelected.bind(this)
		this.getAnswer = this.getAnswer.bind(this)
	}

	public shouldComponentUpdate(nextProps: SurveyProps, nextState: SurveyState) {
		if (this.state.capturing !== nextState.capturing) {
			return true
		}
		if (this.state.showGallery !== nextState.showGallery) {
			return true
		}
		if (this.state.currentPage !== nextState.currentPage) {
			return true
		}
		return false
	}

	private getAnswer(tag: string) {
		return AnswerStore.get(tag)
	}

	public render(): JSX.Element {
		const pages = this.props.form.pages.map((page: Page) => {
			return <FormPage page={page} />
		})
		return (
			<Container style={Style.container} >
				<Header style={Style.header}>
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
					</Left>
					<Body>
						<Picker
							style={Style.headerPicker} // TODO: style vermeyince gözükmüyor.
							key="pager"
							selectedValue={this.state.currentPage}
							onValueChange={this.onPageChanged}>
							{
								this.props.form.pages.map((page, i) => {
									return <Picker.Item key={page.name} label={page.name} value={i} />
								})
							}
						</Picker>
					</Body>
					<Right style={Style.headerRight}>
						<Button style={Style.button} onPress={this.onSave} transparent>
							<Text> Save </Text>
							<Icon name="done-all" />
						</Button>
					</Right>
				</Header>

				<Content key="form" style={Style.content}>
					<IndicatorViewPager
						ref={(ref: IndicatorViewPager) => { this.pager = ref }}
						style={Style.indicator}
						onPageSelected={this.onPageSelected}
						indicator={this.renderDotIndicator()}>
						{pages}
					</IndicatorViewPager>
				</Content>

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
			</Container>
		)
	}

	private onPageChanged(currentPage: number) {
		this.pager.setPage(currentPage)
		this.onPageSelected({ position: currentPage })
	}

	private onPageSelected(currentPage: CurrentPage) {
		this.setState({ currentPage: currentPage.position })
	}

	private renderDotIndicator() {
		return <PagerDotIndicator pageCount={this.props.form.pages.length} />
	}

	private validatePage(): string[] {
		const validationMessages: string[] = []
		forOwn(this.refs, (wrapper: DisplayInput<Question>, ref) => {
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
		if (isEmpty(validationMessages) && this.props.onSave) {
			if (this.state.capturedPhotos.length > 0) {
				this.state.medias.form = this.state.capturedPhotos
			}
			this.props.onSave(AnswerStore.getAll(), this.state.medias)
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
		if (isEmpty(capturedPhotos)) {
			this.setState({ showGallery: false })
		} else {
			this.setState({ capturedPhotos })
		}
	}

}
