import React from 'react'

import { MultiInputQuestion } from '../survey'
import { BaseInput, BaseState } from './BaseInput'

export interface MultiChoiceInputState extends BaseState {

}/* 

export abstract class MultiChoiceInput<P extends MultiInputQuestion, S extends MultiChoiceInputState> extends BaseInput<P, S> {

    protected options: object[]

    constructor(props: P) {
        super(props)
        this.options = []
        if (props.options.type === 'static') {
            this.options = props.options.values.slice(0)
        }
    }

    public cloneOptions(): object[] {
        return this.options.slice(0)
    }

}
 */
