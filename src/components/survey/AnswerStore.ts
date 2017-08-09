export type Answer = string | string[] | number

export interface Answers {
	[key: string]: Answer
}

class AnswerStore {

	private store: Answers

	constructor() {
		this.store = {}
	}

	public putAll(answers: Answers): void {
		this.store = answers
	}

	public put(questionTag: string, answer: Answer): void {
		this.store[questionTag] = answer
	}

	public get(questionTag: string): Answer {
		return this.store[questionTag]
	}

	public getOrDefault(questionTag: string, defaultAnswer: Answer): Answer {
		const answerInStore = this.store[questionTag]
		return answerInStore ? answerInStore : defaultAnswer
	}

	public getAll(): Answers {
		return this.store
	}

}

export default new AnswerStore()
