import React, { Component } from "react";
import { Container } from 'native-base'

import { Survey } from './app/Survey';

export default class App extends Component<{}, {}> {

    render() {
        let form = JSON.parse('{ "type": "nstar", "pages": [ { "name": "sayfa1", "tag": "sayfa1", "questions": [ { "title": "ÇiğdemÇiğdemÇiğdemÇiğdemÇiğdemÇiğdemÇiğdemÇiğdemÇiğdemÇiğdemÇiğdemÇiğdemÇiğdemÇiğdemÇiğdemÇiğdemÇiğdemÇiğdemÇiğdemÇiğdemÇiğdemÇiğdemÇiğdemÇiğdemÇiğdemÇiğdemÇiğdemÇiğdemÇiğdemÇiğdemÇiğdemÇiğdemÇiğdemÇiğdem", "type": "checkbox", "tag": "checkbox", "required": true, "options": { "type": "static", "values": [ { "name": "Mavi", "value": "blue" }, { "name": "Yeşil", "value": "green" }, { "name": "Turuncu", "value": "orange" } ] }, "titleKey": "name", "valueKey": "value" }, { "title": "ülke", "type": "dropdown", "tag": "country", "defaultValue": "Türkiye", "options": { "type": "static", "values": [ { "oid": "1", "name": "Türkiye" }, { "oid": "2", "name": "Amsterdam" }, { "oid": "3", "name": "londra" }, { "oid": "4", "name": "la" }, { "oid": "5", "name": "angara" } ] }, "titleKey": "name", "valueKey": "oid" }, { "type": "slider", "tag": "q2", "title": "Slider sorusu","min": 0, "max": 100, "step": 5 }, { "title": "Tabela adı", "type": "textinput", "tag": "q1", "required": true, "photoRequired": true, "defaultValue": "${{signName}}" }, { "title": "Segmentasyon", "type": "radio", "tag": "segmentation", "required": true, "photoRequired": true, "defaultValue": "${{segmentation}}", "options": { "type": "static", "values": [ { "name": "kod", "value": "val" }, { "name": "kod2", "value": "val2" } ] }, "titleKey": "name", "valueKey": "value" } ] } ] }')
        return (
            <Container>
                <Survey form={form} />
            </Container>
        )
    }

}