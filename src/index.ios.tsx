import React from 'react'
import { Toast } from 'native-base'
import Survey from './components/survey/Survey'

const PrevAnswer = require('../samples/answers.json')
const form = require('../samples/form.json')

export default class App extends React.Component<{}, {}> {

	public render() {
		return (
			<Survey
				form={form}
				onSave={this.onSave.bind(this)}
				onFailure={this.onFailure.bind(this)}
				answers={PrevAnswer} />
		)
	}

	private onSave(answers: Object) {
		Toast.show({
			text: JSON.stringify(answers),
			buttonText: 'Tamam',
			position: 'bottom',
			type: 'success',
		})
	}

	private onFailure(erros: string[]) {
		Toast.show({
			text: erros.join('\n'),
			buttonText: 'Tamam',
			position: 'bottom',
			type: 'danger',
		})
	}

}
