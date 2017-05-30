import React, { Component } from 'react'
import { Container } from 'native-base'

import { Survey } from './app/Survey'

export default class App extends Component<{}, {}> {

	public render() {
		return (
            <Container>
                <Survey form={require('../samples/form.json')} />
            </Container>
		)
	}

}
