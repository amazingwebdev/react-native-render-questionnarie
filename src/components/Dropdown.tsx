import React from 'react'
import {Picker} from 'native-base'

import { BaseComponent, BaseProps, BaseState } from "./BaseComponent";

interface DropdownProps extends BaseProps {

}

interface DropdownState extends BaseState {

}
export class Dropdown extends BaseComponent<DropdownProps,DropdownState>{

    public render():JSX.Element{
        return (
            <Picker>
                <Picker.Item label="foo" value="bar3"/>
            </Picker>    
        )
    }


    public getValue(){

    }
}