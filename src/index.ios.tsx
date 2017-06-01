import React, { Component } from 'react'

import { Survey } from './app/Survey'

export default class App extends Component<{}, {}> {

	public render() {
		return (
			<Survey form={require('../samples/form.json')} />
		)
	}

}
