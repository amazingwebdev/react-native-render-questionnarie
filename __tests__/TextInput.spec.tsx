import React from 'react'
import { mount } from 'enzyme'
import { TextInput } from '../src/components'

describe('<TextInput />', () => {

    const wrapper = mount(
        <TextInput tag="foo" value="bar" />,
    )
    const component = wrapper.find(TextInput)

    it('should receive props properly', () => {
        expect(component.props().tag).toBe('foo')
        expect(component.props().value).toBe('bar')
    })

})
