import React from 'react'
import { mount } from 'enzyme'
import * as chai from 'chai'

import { TextInput } from '../src/components'

const should = chai.should()

describe('<TextInput />', () => {

    const getComponent = (props): JSX.Element => {
        return (
            <TextInput {...props} />
        )
    }

    it('componentDidMount() should set default value', () => {
        const wrapper = mount(getComponent({ tag: 'foo', defaultValue: 'bar' }))
        const component = wrapper.instance() as TextInput
        should.equal(component.getValue(), 'bar')
    })

    it('componentWillMount() should throw error', () => {
        (function () {
            mount(getComponent({}))
        }).should.throw(Error, 'TextInput has no proper tag.')
    })

    it('should receive props properly', () => {
        const wrapper = mount(getComponent({ tag: 'foo', value: 'bar', validation: '^[A-z]+$', placeholder: 'zar' }))
        const component = wrapper.instance() as TextInput
        component.props.tag.should.equal('foo')
        component.props.value.should.equal('bar')
        component.props.validation.should.equal('^[A-z]+$')
        component.props.placeholder.should.equal('zar')
    })

    it('getValue() should return nothing', () => {
        const wrapper = mount(getComponent({ tag: 'foo' }))
        const component = wrapper.instance() as TextInput
        should.not.exist(component.getValue())
    })

    it('setValue() should change state', () => {
        const wrapper = mount(getComponent({ tag: 'foo' }))
        const component = wrapper.instance() as TextInput
        component.setValue('bar')
        should.equal(component.getValue(), 'bar')
        should.equal(component.state.value, 'bar')
    })

    it('isValid() should work properly', () => {
        let wrapper = mount(getComponent({ tag: 'foo' }))
        let component = wrapper.instance() as TextInput

        should.equal(component.isValid(), true)

        wrapper = mount(getComponent({ tag: 'foo', required: true }))
        component = wrapper.instance() as TextInput

        should.equal(component.isValid(), false)
        component.setValue('bar')
        should.equal(component.isValid(), true)
    })

    it('should execute regex properly', () => {
        const wrapper = mount(getComponent({ tag: 'foo', validation: '^[A-z]+$' }))
        const component = wrapper.instance() as TextInput

        component.setValue('59')
        should.equal(component.isValid(), false)

        component.setValue('bar')
        should.equal(component.isValid(), true)
    })

    it('hide() should set display state to false', () => {
        const wrapper = mount(getComponent({ tag: 'foo' }))
        const component = wrapper.instance() as TextInput

        component.hide()
        component.state.display.should.equal(false)
    })

    it('show() should set display state to true', () => {
        const wrapper = mount(getComponent({ tag: 'foo' }))
        const component = wrapper.instance() as TextInput

        component.show()
        component.state.display.should.equal(true)
    })

})
