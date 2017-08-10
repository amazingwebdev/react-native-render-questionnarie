export type Answer = string | string[] | number

export interface Answers {
	[key: string]: Answer
}

export type Subscription = (tag: string, value: Answer) => void

export type Subscriptions = { [key: string]: Subscription[] }

class AnswerStore {

	private store: Answers
	private subscriptions: Subscriptions

	constructor() {
		this.store = {}
		this.subscriptions = {}
	}

	public subscribe(questionTag: string, subscription: Subscription) {
		let subscriptions = this.subscriptions[questionTag]
		if (!subscriptions) {
			subscriptions = []
		}
		subscriptions.push(subscription)
		this.subscriptions[questionTag] = subscriptions
	}

	public putAll(answers: Answers): void {
		this.store = answers
	}

	public put(questionTag: string, answer: Answer): void {
		this.store[questionTag] = answer
		this.broadcastSubscribers(questionTag, answer)
	}

	public get(questionTag: string): Answer {
		return this.store[questionTag]
	}

	public getOrDefault(questionTag: string, defaultAnswer: Answer): Answer {
		const answer = this.store[questionTag]
		return answer ? answer : defaultAnswer
	}

	public getAll(): Answers {
		return this.store
	}

	private broadcastSubscribers(questionTag: string, answer: Answer) {
		if (this.subscriptions[questionTag]) {
			this.subscriptions[questionTag].forEach((subscription) => {
				subscription(questionTag, answer)
			})
		}
	}

}

export default new AnswerStore()
