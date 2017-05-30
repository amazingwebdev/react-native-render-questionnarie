import React from 'react'

import { BaseComponent, BaseProps, BaseState } from './BaseComponent'

export interface MultiInputComponentProps extends BaseProps {
    options: any
    titleKey: string
    valueKey: string
}

export interface MultiInputComponentState extends BaseState {

}

export abstract class MultiInputComponent<P extends MultiInputComponentProps, S extends MultiInputComponentState> extends BaseComponent<P, S> {

    protected options: object[]

    constructor(props: P) {
        super(props)
        this.options = []
        if (props.options.type === 'static') {
            this.options = props.options.values
        }
    }

}
