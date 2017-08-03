import React from 'react'
import { View } from 'native-base'

import Wrapper from './Wrapper'
import { BaseState, Question } from '../'

// tslint:disable-next-line:function-name
export default function BaseInputHOC<Props extends Question>(Component: React.ComponentClass<Props>) {

    return class BaseInputHOC extends Wrapper<Props, BaseState> {

        private wrappedComponent: React.Component<Props>

        constructor(props: Props) {
            super(props)
            this.state = {
                ...super.getInitialState(),
            }
        }

        render(): JSX.Element {
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

        public onCascadedAnswerChanged(tag: string, value: string) {
            // TODO:
        }

        public reset() {

        }

    }

}
