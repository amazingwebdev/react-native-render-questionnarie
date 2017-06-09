import 'react-native'
import React from 'react'
import { shallow  } from 'enzyme'

import { TextInput } from '../src/components'

it('should render a text input', () => {
    const wrapper = shallow(
        <TextInput tag="foo" value="bar" />,
    )
    expect(wrapper.getNodes()[0].props.children[1][0].props.children.props.value).toBe('bar')
})
