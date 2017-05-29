import React, { Component } from "react";
import { Container } from 'native-base'

import { View, Text, StyleSheet, ViewStyle, TextStyle, Button, Alert } from "react-native";

import { Survey } from './app/Survey';

export default class App extends Component<{}, {}> {

    render() {
        let form = {
            "type": "nstar",
            "pages": [
                {
                    "name": "sayfa1",
                    "tag": "sayfa1",
                    "questions": [
                        {
                            "title": "Tabela adı",
                            "type": "textinput",
                            "validation": "^[A-z]+$",
                            "tag": "tabela_adi",
                            "required": true,
                        },
                        {
                            "title": "Metrekare bilgisi",
                            "type": "dropdown",
                            "tag": "metrekare",
                            "required": true,
                            "defaultValue": "0-50",
                            "options": {
                                "type": "static",
                                "values": [
                                    {
                                        "name": "0-50",
                                        "value": "0-50"
                                    },
                                    {
                                        "name": "51-100",
                                        "value": "51-100"
                                    },
                                    {
                                        "name": "101-150",
                                        "value": "101-150"
                                    },
                                    {
                                        "name": "151-200",
                                        "value": "151-200"
                                    },
                                    {
                                        "name": "201+",
                                        "value": "201+"
                                    }
                                ]
                            },
                            "titleKey": "name",
                            "valueKey": "value"
                        },
                        {
                            "title": "Mağazada teşhir bulunuyor mu?",
                            "type": "radio",
                            "tag": "teshir",
                            "required": true,
                            "options": {
                                "type": "static",
                                "values": [
                                    {
                                        "name": "Evet",
                                        "value": "1"
                                    },
                                    {
                                        "name": "Hayır",
                                        "value": "0"
                                    }
                                ]
                            },
                            "titleKey": "name",
                            "valueKey": "value"
                        },
                        {
                            "title": "Alkollü içecekler için diğer alan var mı ?",
                            "type": "radio",
                            "tag": "alkollu_icecek",
                            "required": true,
                            "options": {
                                "type": "static",
                                "values": [
                                    {
                                        "name": "Evet",
                                        "value": "1"
                                    },
                                    {
                                        "name": "Hayır",
                                        "value": "0"
                                    }
                                ]
                            },
                            "titleKey": "name",
                            "valueKey": "value"
                        }
                    ]
                }
            ]
        }
        return (
            <Container>
                <Survey form={form} />
            </Container>
        )
    }

}
