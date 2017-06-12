import React from 'react'
import { mount } from 'enzyme'
import { SliderInput } from '../src/components'

describe('<SliderInput />', () => {

	const wrapper = mount(
		<SliderInput tag="foo" min={0} max={100} step={5} />,
	)
	const component = wrapper.find(SliderInput)

	it('should receive props properly', () => {
		expect(component.props().tag).toBe('foo')
		expect(component.props().min).toBe(0)
		expect(component.props().max).toBe(100)
		expect(component.props().step).toBe(5)
	})

})
