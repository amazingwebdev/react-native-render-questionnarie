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
	trackType?: string
	smartCode?: string
	startDate?: number
	endDate?: number
	oneTime?: boolean
	newLine?: boolean
	visible?: boolean
	visibleIf?: string
}

export interface PhotoInputQuestion extends Question{
	
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
	options: { type: string, values: MultiInputQuestionOption[] }
	titleKey: string
	valueKey: string
}

export interface MultiInputQuestionOption {
	[key: string]: string
}

export interface ListInputQuestion extends MultiInputQuestion {
	optionsTitle?: string
	value?: string
	defaultValue?: string
}

export interface CheckInputQuestion extends MultiInputQuestion {
	value?: string
	defaultValue?: string[]
}

export interface RadioInputQuestion extends MultiInputQuestion {
	value?: string
	defaultValue?: string
}
