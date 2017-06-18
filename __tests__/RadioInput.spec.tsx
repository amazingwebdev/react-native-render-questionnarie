import * as React from 'react'
import { mount } from 'enzyme'
import * as chai from 'chai'

import { RadioInput } from '../src/components'

const should = chai.should()

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

	const getComponent = (props): JSX.Element => {
		return (
			<RadioInput {...props} />
		)
	}

	let commonProps

	beforeEach(() => {
		commonProps = { options, tag: 'foo', titleKey: 'name', valueKey: 'value' }
	})

	it('should receive props properly', () => {
		const wrapper = mount(getComponent(commonProps))
		const component = wrapper.instance() as RadioInput
		component.props.tag.should.equal('foo')
		component.props.titleKey.should.equal('name')
		component.props.valueKey.should.equal('value')
		component.props.options.should.deep.equal(options)
		component.cloneOptions().should.deep.equal(options.values)
	})

	it('componentDidMount() should set default value', () => {
		commonProps.defaultValue = '0'
		const wrapper = mount(getComponent(commonProps))
		const component = wrapper.instance() as RadioInput
		should.equal(component.getValue(), '0')
	})

	it('componentWillMount() should throw error', () => {
		(function () {
			delete commonProps.tag
			mount(getComponent(commonProps))
		}).should.throw(Error, 'RadioInput has no proper tag.')
	})

	it('getValue() should return nothing', () => {
		const wrapper = mount(getComponent(commonProps))
		const component = wrapper.instance() as RadioInput
		should.not.exist(component.getValue())
	})

	it('setValue() should change state', () => {
		const wrapper = mount(getComponent(commonProps))
		const component = wrapper.instance() as RadioInput
		component.setValue('1')
		should.equal(component.getValue(), '1')
	})

	it('isValid() should work properly', () => {
		let wrapper = mount(getComponent(commonProps))
		let component = wrapper.instance() as RadioInput

		should.equal(component.isValid(), true)

		commonProps.required = true
		wrapper = mount(getComponent(commonProps))
		component = wrapper.instance() as RadioInput

		should.equal(component.isValid(), false)
		component.setValue('1')
		should.equal(component.isValid(), true)
	})

	it('hide() should set display state to false', () => {
		const wrapper = mount(getComponent(commonProps))
		const component = wrapper.instance() as RadioInput

		component.hide()
		component.state.display.should.equal(false)
	})

	it('show() should set display state to true', () => {
		const wrapper = mount(getComponent(commonProps))
		const component = wrapper.instance() as RadioInput

		component.show()
		component.state.display.should.equal(true)
	})

})
