import { Answer } from './AnswerStore'

export interface Form {
	name: string
	type: string
	pages: Page[]
}

export interface Page {
	name?: string
	tag?: string
	questions?: Question[]
}

export interface Question {
	title: string
	type?: string
	tag: string
	required: boolean
	photoRequired: boolean
	trackType?: string
	smartCode?: string
	startDate?: number
	endDate?: number
	oneTime?: boolean
	newLine?: boolean
	visible?: boolean
	visibleIf?: string
	onChange?: string[]
	defaultValue?: Answer
	answer?: Answer
}

export interface TextInputQuestion extends Question {
	placeholder?: string
	validation?: string
	value?: Answer
}

export interface SliderInputQuestion extends Question {
	min: number
	max: number
	step: number
	value?: Answer
}

export interface MultiInputQuestion extends Question {
	optionsTitle?: string
	options: { type: string, values: MultiInputQuestionOption[], request: { url: string, params: { [key: string]: string }, expiration: number } }
	pureOptions?: MultiInputQuestionOption[]
	titleKey: string
	valueKey: string
	value?: Answer
}

export interface MultiInputQuestionOption {
	[key: string]: string
}
