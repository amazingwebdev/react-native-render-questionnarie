import React from 'react'

import { BaseInput, BaseProps, BaseState } from './BaseInput'

export interface MultiChoiceInputProps extends BaseProps {
    options: any
    titleKey: string
    valueKey: string
}

export interface MultiChoiceInputState extends BaseState {

}

export abstract class MultiChoiceInput<P extends MultiChoiceInputProps, S extends MultiChoiceInputState> extends BaseInput<P, S> {

    protected options: object[]

    constructor(props: P) {
        super(props)
        this.options = []
        if (props.options.type === 'static') {
            this.options = props.options.values.slice(0)
        }
    }

}
