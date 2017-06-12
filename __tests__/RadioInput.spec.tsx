import React from 'react'
import { mount } from 'enzyme'
import { RadioInput } from '../src/components'

describe('<RadioInput />', () => {

  const options = {
    type: 'static',
    values: [
      {
        name: 'Yes',
        value: '1',
      },
      {
        name: 'No',
        value: '0',
      },
    ],
  }

  const wrapper = mount(
    <RadioInput tag="foo" options={options} titleKey="name" valueKey="value" />,
  )
  const component = wrapper.instance() as RadioInput

  it('should receive props properly', () => {
    expect(component.props.tag).toBe('foo')
    expect(component.props.titleKey).toBe('name')
    expect(component.props.valueKey).toBe('value')
    expect(component.props.options.values.length).toBe(2)
  })

})
