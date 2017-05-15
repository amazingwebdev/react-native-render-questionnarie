import * as React from 'react'

import { View } from 'react-native'

export enum QuestionType {
    Textfield, Slider, Checkbox, RadioButton, Dropdown
}

export interface BaseProps {
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
    defaultValue?: string

}

export interface BaseState {

}

export abstract class BaseComponent<P, S> extends React.Component<P, S>  {

    public abstract getValue(): any | undefined

}