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

    protected optionValues: Array<Map<string, string>>

    constructor(props: P) {
        super(props)
        this.optionValues = new Array<Map<string, string>>()
        let options = props.options
        if (options["type"] === "static") {
            this.optionValues = options["values"]
        }

    }
    
}
