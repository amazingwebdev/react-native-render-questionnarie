import React from 'react'
import { mount } from 'enzyme'
import { Slider } from 'react-native'
import * as chai from 'chai'

import { SliderInput } from '../src/components'

const should = chai.should()

describe('<SliderInput />', () => {

	const getComponent = (props): JSX.Element => {
		return (
			<SliderInput {...props} />
		)
	}

	let commonProps

	beforeEach(() => {
		commonProps = { tag: 'foo', min: 0, max: 100, step: 5 }
	})

	it('should receive props properly', () => {
		const wrapper = mount(getComponent(commonProps))
		const component = wrapper.instance() as SliderInput
		component.props.tag.should.equal('foo')
		component.props.min.should.equal(0)
		component.props.max.should.equal(100)
		component.props.step.should.equal(5)
	})

	it('componentDidMount() should set default value', () => {
		commonProps.defaultValue = 30
		const wrapper = mount(getComponent(commonProps))
		const component = wrapper.instance() as SliderInput
		should.equal(component.getValue(), 30)
	})

	it('getValue() should not return undefined', () => {
		const wrapper = mount(getComponent(commonProps))
		const component = wrapper.instance() as SliderInput
		should.exist(component.getValue())
	})

	it('setValue() should change state', () => {
		const wrapper = mount(getComponent(commonProps))
		const component = wrapper.instance() as SliderInput
		component.setValue(25)
		should.equal(component.getValue(), 25)
	})

	it('hide() should set display state to false', () => {
		const wrapper = mount(getComponent(commonProps))
		const component = wrapper.instance() as SliderInput

		component.hide()
		component.state.display.should.equal(false)
	})

	it('show() should set display state to true', () => {
		const wrapper = mount(getComponent(commonProps))
		const component = wrapper.instance() as SliderInput

		component.show()
		component.state.display.should.equal(true)
	})

	it('isValid() should work properly', () => {
		let wrapper = mount(getComponent(commonProps))
		let component = wrapper.instance() as SliderInput

		should.equal(component.isValid(), true)
		commonProps.required = true
		wrapper = mount(getComponent(commonProps))
		component = wrapper.instance() as SliderInput

		should.exist(component.getValue())
	})

})
