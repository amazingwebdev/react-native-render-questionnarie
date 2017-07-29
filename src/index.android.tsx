import React from 'react'
import { Toast } from 'native-base'
import Survey from './components/survey/Survey'

export default class App extends React.Component<{}, {}> {

	public render() {
		return (
			<Survey
				form={require('../samples/form.json')}
				onSave={this.onSave.bind(this)}
				onFailure={this.onFailure.bind(this)} />
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
