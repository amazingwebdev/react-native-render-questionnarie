import React, { Component } from "react";
import { Container } from 'native-base'

import { Survey } from './app/Survey';

export default class App extends Component<{}, {}> {

    render() {
        return (
            <Container>
                <Survey />
            </Container>
        )
    }

}