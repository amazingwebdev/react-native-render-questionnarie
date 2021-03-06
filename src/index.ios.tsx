import React from 'react'
import { Toast } from 'native-base'
import Survey from './components/survey/Survey'

const PrevAnswer = require('../samples/answers.json')
const Form = require('../samples/form.json')

export default class App extends React.Component<{}, {}> {

	public render() {
		return (
			<Survey
				form={Form}
				onSave={this.onSave.bind(this)}
				onFailure={this.onFailure.bind(this)}
				answers={PrevAnswer} />
		)
	}

	private onSave(answers: Object, medias: Object) {
		console.warn(JSON.stringify(answers))
		console.warn(JSON.stringify(medias))
	}

	private onFailure(errors: string[]) {
		console.warn({ errors })
	}

}
