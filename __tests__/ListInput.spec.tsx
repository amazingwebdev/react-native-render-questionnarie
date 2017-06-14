import React from 'react'
import { mount } from 'enzyme'
import * as chai from 'chai'

import { ListInput } from '../src/components'

const should = chai.should()

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

	const getComponent = (props): JSX.Element => {
		return (
			<ListInput {...props} />
		)
	}

	let commonProps

	beforeEach(() => {
		commonProps = { options, tag: 'foo', titleKey: 'name', valueKey: 'value' }
	})

	it('should receive props properly', () => {
		const wrapper = mount(getComponent(commonProps))
		const component = wrapper.instance() as ListInput
		component.props.tag.should.equal('foo')
		component.props.titleKey.should.equal('name')
		component.props.valueKey.should.equal('value')
		component.props.options.should.deep.equal(options)
		component.cloneOptions().should.have.lengthOf(3)
	})

	it('componentDidMount() should set default value', () => {
		commonProps.defaultValue = '1'
		const wrapper = mount(getComponent(commonProps))
		const component = wrapper.instance() as ListInput
		const value = component.getValue()
		should.exist(value)
		value.should.deep.equal('1')
	})

	it('options first element..', () => {
		commonProps.optionsTitle = 'Seçiniz'
		const wrapper = mount(getComponent(commonProps))
		const component = wrapper.instance() as ListInput
		should.equal(component.cloneOptions()[0]['name'], 'Seçiniz')
	})

	it('getValue() should return nothing', () => {
		const wrapper = mount(getComponent(commonProps))
		const component = wrapper.instance() as ListInput
		should.not.exist(component.getValue())
	})

	it('setValue() should chnage state ', () => {
		const wrapper = mount(getComponent(commonProps))
		const component = wrapper.instance() as ListInput
		component.setValue('2')
		component.getValue().should.deep.equal('2')
	})

	it('isValid() should work properly', () => {
		let wrapper = mount(getComponent(commonProps))
		let component = wrapper.instance() as ListInput

		should.equal(component.isValid(), true)

		commonProps.required = true
		wrapper = mount(getComponent(commonProps))

		component = wrapper.instance() as ListInput
		should.equal(component.isValid(), false)

		component.setValue('2')
		should.equal(component.isValid(), true)
	})

	it('hide() should set display state to false', () => {
		const wrapper = mount(getComponent(commonProps))
		const component = wrapper.instance() as ListInput

		component.hide()
		component.state.display.should.equal(false)
	})

	it('show() should set display state to false', () => {
		const wrapper = mount(getComponent(commonProps))
		const component = wrapper.instance() as ListInput

		component.show()
		component.state.display.should.equal(true)
	})

})
