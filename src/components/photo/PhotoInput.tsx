
import React from 'react'
import { View } from 'native-base'

import BaseInputHOC from '../base/BaseInputHOC'
import { BaseInput, Question } from '../'

class PhotoInput extends React.Component<Question> implements BaseInput<Question> {

    constructor(props: Question) {
        super(props)
    }

    public render(): JSX.Element {
        return <View />
    }

    public setValue() {
        // TODO:
    }

    public getValue(): string { return }

    public isValid(): boolean {
        return true
    }

    public getTitle(): string {
        return this.props.title
    }

    public triggerCascadedQuestions(value: number) {

    }

    public reset(): void {

    }

}

export default BaseInputHOC(PhotoInput)
