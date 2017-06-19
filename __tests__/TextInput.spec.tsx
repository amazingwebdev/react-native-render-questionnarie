import * as React from 'react'
import { mount } from 'enzyme'
import * as chai from 'chai'
import { Input, Toast } from 'native-base'

import { TextInput } from '../src/components'

const should = chai.should()

describe('<TextInput />', () => {

    const getComponent = (props): JSX.Element => {
        return (
            <TextInput {...props} />
        )
    }

    let commonProps

    beforeEach(() => {
        commonProps = { tag: 'foo' }
    })

    it('componentDidMount() should set default value', () => {
        commonProps.defaultValue = 'bar'
        const wrapper = mount(getComponent(commonProps))
        const component = wrapper.instance() as TextInput
        should.equal(component.getValue(), 'bar')
    })

    it('componentWillMount() should throw error', () => {
        (function () {
            mount(getComponent({}))
        }).should.throw(Error, 'TextInput has no proper tag.')
    })

    it('should receive props properly', () => {
        commonProps.value = 'bar'
        commonProps.validation = '^[A-z]+$'
        commonProps.placeholder = 'zar'
        const wrapper = mount(getComponent(commonProps))
        const component = wrapper.instance() as TextInput
        component.props.tag.should.equal('foo')
        component.props.value.should.equal('bar')
        component.props.validation.should.equal('^[A-z]+$')
        component.props.placeholder.should.equal('zar')
    })

    it('getValue() should return nothing', () => {
        const wrapper = mount(getComponent(commonProps))
        const component = wrapper.instance() as TextInput
        should.not.exist(component.getValue())
    })

    it('setValue() should change state', () => {
        const wrapper = mount(getComponent(commonProps))
        const component = wrapper.instance() as TextInput
        component.setValue('bar')
        should.equal(component.getValue(), 'bar')
        should.equal(component.state.value, 'bar')
    })

    it('isValid() should work properly', () => {
        let wrapper = mount(getComponent(commonProps))
        let component = wrapper.instance() as TextInput

        should.equal(component.isValid(), true)

        commonProps.required = true
        wrapper = mount(getComponent(commonProps))
        component = wrapper.instance() as TextInput

        should.equal(component.isValid(), false)
        component.setValue('bar')
        should.equal(component.isValid(), true)
    })

    it('should execute regex properly', () => {
        commonProps.validation = '^[A-z]+$'
        const wrapper = mount(getComponent(commonProps))
        const component = wrapper.instance() as TextInput

        component.setValue('59')
        should.equal(component.isValid(), false)

        component.setValue('bar')
        should.equal(component.isValid(), true)
    })

    it('hide() should set display state to false', () => {
        const wrapper = mount(getComponent(commonProps))
        const component = wrapper.instance() as TextInput

        component.hide()
        component.state.display.should.equal(false)
    })

    it('show() should set display state to true', () => {
        const wrapper = mount(getComponent(commonProps))
        const component = wrapper.instance() as TextInput

        component.show()
        component.state.display.should.equal(true)
    })

    it('onChange()', () => {
        const wrapper = mount(getComponent(commonProps))
        const component = wrapper.instance() as TextInput

        wrapper.find(Input).simulate('change', { target: { value: 'bar' } })
        should.equal(component.getValue(), 'bar')
    })

})
