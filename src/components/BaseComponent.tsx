import React from 'react'
import { Header, Text } from 'native-base'

export enum QuestionType {
    Textfield, Slider, Checkbox, RadioButton, Dropdown
}

export interface BaseProps {
    tag: string
    required?: boolean
    title?: string
    trackType?: string
    smartCode?: string
    startDate?: number
    endDate?: number
    oneTime?: boolean
    newLine?: boolean
    visible?: boolean
    visibleIf?: string
    defaultValue?: string | Array<string>
}

export interface BaseState {

}

export abstract class BaseComponent<P extends BaseProps, S extends BaseState> extends React.Component<P, S>  {

    public abstract getValue(): any | undefined

    public abstract setValue(value: any)

    constructor(props: P) {
        super(props)
        this.setValue = this.setValue.bind(this)
    }

    public componentWillMount() {
        if (this.props.tag === undefined || this.props.tag === '') {
            console.error(`${this.constructor.name} no proper tag`)
        }
    }

    protected getTitle(): JSX.Element | undefined {
        return (this.props.title === undefined ? undefined :
            <Header style={{ height: 'auto' }}>
                <Text>{this.props.title}</Text>
            </Header>
        )
    }

}