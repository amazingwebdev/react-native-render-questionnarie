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

    private uri: string
    private params: Object

    constructor(uri: string, params: Object, keyName: string, valueName: string) {
        this.uri = uri
        this.params = params
        this.keyName = keyName
        this.valueName = valueName
    }

    public getOptions(): Array<Map<string, string>> {
        return new Array<Map<string, string>>()
    }

}

export class StaticOptionSource implements OptionSource {

    public keyName: string
    public valueName: string

    private options: Array<Map<string, string>>

    constructor(keyName: string, valueName: string, options: Array<Map<string, string>>) {
        this.keyName = keyName
        this.valueName = valueName
        this.options = options
    }

    public getOptions(): Array<Map<string, string>> {
        let opt: Array<Map<string, string>> = new Array<Map<string, string>>()
        this.options.map((option) => {
            opt.push(option)
        })
        return opt
    }

}

export interface BaseOptionalComponentProps extends BaseProps {
    options: OptionSource
    keyName: string
    valueName: string
}

export interface BaseOptionalComponentState extends BaseState {

}

export abstract class BaseOptionalComponent<P extends BaseOptionalComponentProps, S extends BaseOptionalComponentState> extends BaseComponent<P, S> {

    protected optionValues: Array<Map<string, string>>

    constructor(props: P) {
        super(props)
        this.initOptions = this.initOptions.bind(this)
        this.initOptions()
    }

    private initOptions() {
        if (typeof this.props.options === typeof StaticOptionSource.prototype) {
            this.optionValues = this.props.options.getOptions()
        } else if (typeof this.props.options === typeof HTTPOptionSource) {
            this.optionValues = new Array<Map<string, string>>()
        } else {
            console.error('no such option type')
        }
        console.log('options are', this.optionValues)
    }

}
