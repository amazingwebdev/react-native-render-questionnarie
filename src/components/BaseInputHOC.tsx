import React from 'react'
import { Header, Text, View } from 'native-base'

import Wrapper, { BaseState } from './Wrapper'

import { Question } from '../survey/Form'

import Style from './BaseInputStyle'

// tslint:disable-next-line:function-name
export default function BaseInputHOC<Props extends Question>(Component: React.ComponentClass<Props>) {

    return class BaseInputHOC extends Wrapper<Props, BaseState>  {

        private wrappedComponent: React.Component<Props>

        constructor(props: Props) {
            super(props)
            this.state = super.getInitialState()
        }

        render() {
            if (this.state.display) {
                return (
                    <View>
                        <Header style={Style.header}>
                            <Text style={Style.title}>{this.props.title}</Text>
                        </Header>
                        <Component ref={(ref) => { this.wrappedComponent = ref }} {...this.props} />
                    </View>
                )
            }
            return <View />
        }

        public getWrappedComponent(): React.Component<Props> {
            return this.wrappedComponent
        }

    }
}
