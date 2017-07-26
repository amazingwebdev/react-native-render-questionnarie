import React from 'react'
import { Header, Text, View } from 'native-base'

import { BaseState } from './BaseInput'
import { Question } from '../survey/Form'

import Style from './BaseInputStyle'

export interface HOCInput extends React.Component {
    show: () => void
    hide: () => void
}

// tslint:disable-next-line:function-name
export default function BaseInputHOC<Props extends Question>(Component: React.ComponentClass<Props>) {

    return class HOCBase extends React.Component<Props, BaseState> implements HOCInput {

        constructor(props: Props) {
            super(props)
            this.state = {
                display: true,
            }
        }

        render() {
            if (this.state.display) {
                return (
                    <View>
                        <Header style={Style.header}>
                            <Text style={Style.title}>{this.props.title}</Text>
                        </Header>
                        <Component {...this.props} />
                    </View>
                )
            }
            return <View />
        }

        public show(): void {
            this.setState({ display: true })
        }

        public hide(): void {
            this.setState({ display: false })
        }

    }
}
