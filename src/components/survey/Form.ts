export interface Form {
	name: string
	type: string
	pages: Page[]
}

export interface Page {
	name: string
	tag: string
	questions: Question[]
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
}

export interface TextInputQuestion extends Question {
	placeholder?: string
	validation?: string
	value?: string
	defaultValue?: string
}

export interface SliderInputQuestion extends Question {
	min: number
	max: number
	step: number
	value?: number
	defaultValue?: number
}

export interface MultiInputQuestion extends Question {
	optionsTitle?: string
	options: { type: string, values: MultiInputQuestionOption[], request: { url: string, params: {} } }
	pureOptions?: MultiInputQuestionOption[]
	titleKey: string
	valueKey: string
	defaultValue?: string | string[]
	value?: string | string[]
	trigger?: (tag: string, value: string, cascadedTags: string[]) => void
}

export interface MultiInputQuestionOption {
	[key: string]: string
}
