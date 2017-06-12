import React from 'react'
import { mount } from 'enzyme'
import { CheckInput } from '../src/components'

const options = {
	type: 'static',
	values: [
		{
			name: 'One',
			value: '1',
		},
		{
			name: 'Two',
			value: '2',
		},
		{
			name: 'Three',
			value: '3',
		},
	],
}

const wrapper = mount(
	<CheckInput  tag="foo" options={options} titleKey="name"  valueKey="value"/>,
)
const component = wrapper.instance() as CheckInput

it('should receive props properly', () => {
	expect(component.props.tag).toBe('foo')
	expect(component.props.titleKey).toBe('name')
	expect(component.props.valueKey).toBe('value')
	expect(component.props.options.values.length).toBe(3)
})
