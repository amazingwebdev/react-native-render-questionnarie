import React from 'react'
import { mount } from 'enzyme'
import { ListInput } from '../src/components'

describe('ListInput />', () => {

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
		],
	}

	const wrapper = mount(
		<ListInput tag="listinput" options={options} titleKey="name" valueKey="value" />,
	)

	const component = wrapper.instance() as ListInput

	it('should receive props properly', () => {
		expect(component.props.tag).toBe('listinput')
		expect(component.props.titleKey).toBe('name')
		expect(component.props.valueKey).toBe('value')
		expect(component.options.length).toBe(3) // options.length + list caption
	})

})
