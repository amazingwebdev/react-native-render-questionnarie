import React from 'react'

import { BaseComponent, BaseProps, BaseState } from './BaseComponent'


export interface OptionSource {
    keyName: string
    valueName: string
    getOptions(): Array<Map<string, string>>
}

export class HTTPOptionSource implements OptionSource {
    public keyName: string
    public valueName: string

    private url: string
    private params: Map<string, string>

    public getOptions(): Array<Map<string, string>> {
        return new Array<Map<string, string>>()
    }
}

export class StaticOptionSource implements OptionSource {
    public keyName: string
    public valueName: string

    private values: Array<Map<string, string>>

    constructor(keyName: string, valueName: string, values: Array<Map<string, string>>) {
        this.keyName = keyName
        this.valueName = valueName
        this.values = values
    }

    public getOptions(): Array<Map<string, string>> {
        let values = new Array<Map<string, string>>()
        this.values.forEach((value) => {
            let key = value.get(this.keyName)
            let valu = value.get(this.valueName)
            if (key === undefined || valu === undefined) {
                return
            }
            let val = new Map<string, string>()
            val.set("key", key)
            val.set("value", valu)
            values.push(val)
        })
        return values
    }
}

export interface MultiInputComponentProps extends BaseProps {
    options: OptionSource
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
