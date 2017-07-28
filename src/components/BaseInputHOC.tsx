import React from 'react'
import { Header, Text, View, Button, Icon, Left, Right, Body } from 'native-base'

import FCamera from './camera/Camera'
import Gallery from './gallery/Gallery'

import Wrapper, { BaseState } from './Wrapper'

import { Question } from '../survey/Form'

import Style from './Style'

// tslint:disable-next-line:function-name
export default function BaseInputHOC<Props extends Question>(Component: React.ComponentClass<Props>) {

    return class BaseInputHOC extends Wrapper<Props, BaseState>  {

        private wrappedComponent: React.Component<Props>

        constructor(props: Props) {
            super(props)
            this.state = {
                ...super.getInitialState(),
            }
        }

        render() {
            if (this.state.display) {
                return (
                    <View>
                        {super.renderTitle()}
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
