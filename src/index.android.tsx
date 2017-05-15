import React, { Component } from "react";
import { Container } from 'native-base'

import { View, Text, StyleSheet, ViewStyle, TextStyle, Button, Alert } from "react-native";

import { Survey } from './app/Survey';

export default class App extends Component<{}, {}> {

    render() {
        let form = JSON.parse('{ "type": "nstar", "pages": [ { "name": "sayfa1", "tag": "sayfa1", "questions": [ { "type": "slider", "min": 0, "max": 100, "step": 5 }, { "title": "Tabela adı", "type": "text", "tag": "q1", "required": true, "photoRequired": true, "defaultValue": "${{signName}}" }, { "title": "Segmentasyon", "type": "radio", "tag": "segmentation", "required": true, "photoRequired": true, "defaultValue": "${{segmentation}}", "options": { "type": "static", "values": [ { "name": "kod", "value": "val" } ] }, "keyName": "name", "valueName": "value" } ] } ] }')
        return (
            <Container>
                <Survey form={form} />
            </Container>
        )
    }

}
