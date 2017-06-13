import React from 'react'
import { mount } from 'enzyme'
import * as chai from 'chai'

import { CheckInput } from '../src/components'

const should = chai.should()

describe('<TextInput />', () => {

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

    const getComponent = (props): JSX.Element => {
        return (
            <CheckInput {...props} />
        )
    }

    let commonProps

    beforeEach(() => {
        commonProps = { options, tag: 'foo', titleKey: 'name', valueKey: 'value' }
    })

    it('should receive props properly', () => {
		const wrapper = mount(getComponent(commonProps))
        const component = wrapper.instance() as CheckInput
        component.props.tag.should.eq('foo')
        component.props.titleKey.should.eq('name')
        component.props.valueKey.should.eq('value')
        component.cloneOptions().should.have.lengthOf(3)
    })

    it('componentDidMount() should set default value', () => {
        commonProps.defaultValue = ['1', '2']
        const wrapper = mount(getComponent(commonProps))
        const component = wrapper.instance() as CheckInput
		const value = component.getValue()
		should.exist(value)
        value.should.deep.equal(['1', '2'])
    })

    it('getValue() should return nothing', () => {
        const wrapper = mount(getComponent(commonProps))
        const component = wrapper.instance() as CheckInput
        should.not.exist(component.getValue())
    })

    it('setValue() should should change state', () => {
        const wrapper = mount(getComponent(commonProps))
        const component = wrapper.instance() as CheckInput
        component.setValue('3')
        component.getValue().should.deep.equal(['3'])

        component.setValue(['1', '2'])
        component.getValue().should.deep.equal(['1', '2', '3'])
    })

    it('isValid() should work properly', () => {
        let wrapper = mount(getComponent(commonProps))
        let component = wrapper.instance() as CheckInput

        should.equal(component.isValid(), true)

        commonProps.required = true
        wrapper = mount(getComponent(commonProps))
        component = wrapper.instance() as CheckInput

        should.equal(component.isValid(), false)
        component.setValue('3')
        should.equal(component.isValid(), true)
    })

    it('hide() should set display state to false', () => {
        const wrapper = mount(getComponent(commonProps))
        const component = wrapper.instance() as CheckInput

        component.hide()
        component.state.display.should.equal(false)
    })

    it('show() should set display state to true', () => {
        const wrapper = mount(getComponent(commonProps))
        const component = wrapper.instance() as CheckInput

        component.show()
        component.state.display.should.equal(true)
    })
})
