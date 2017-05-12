import React from 'react'
import {Picker} from 'native-base'

import { BaseComponent, BaseProps, BaseState } from "../BaseComponent";
const Item = Picker.Item;​
interface DropdownProps extends BaseProps {

}

interface DropdownState extends BaseState {
    selection: string
    results:any
    selectedItem:string

}
export class Dropdown extends BaseComponent<DropdownProps,DropdownState>{

    constructor(props: DropdownProps) {
        super(props)
        this.state = {
            selectedItem:"undefined",
            selection: "foo",
            results:{
                items:[]
            }
        }
        this.renderOption = this.renderOption.bind(this)
    }

    


    public render():JSX.Element{
        return (
            <Picker
            selectedValue={this.state.selection}
            onValueChange={this.renderOption.bind(this)}>
                <Item label="foo" value="bar3"/>
                <Item label="foo55" value="bar553"/>
            </Picker>    
        )
    }

    public renderOption(value: string) {
      this.setState({
            selection : value
        });
    }


    public getValue(){
             return this.state.selection;
    }
}