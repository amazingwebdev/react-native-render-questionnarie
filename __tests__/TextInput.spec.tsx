import { View, Item, Input, Icon, Toast } from 'native-base'
import React from 'react'
import { shallow, mount, render  } from 'enzyme'

import { TextInput } from '../src/components'

import renderer from 'react-test-renderer'
 
it('should render a text input', () => {
    const wrapper = mount(
        <TextInput tag="foo" value="bar" />,
    )
    
    const component = wrapper.find(TextInput)

    expect(component.props().tag).toBe('foo')
    expect(component.props().value).toBe('bar')

})
