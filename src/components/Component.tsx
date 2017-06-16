import * as React from 'react'
import Compare from './Compare'

/**
 * Base component which wraps render function in a try catch structure
 * Any child components who extends from this component will get protection when
 * Exception thrown, so protect component life cycle.
 */

abstract class Component <P, S> extends React.Component <P, S> {
    /**
     *
     */
    refs: {
        [key: string]: any,
    }
    /**
     * Creates an instance of BaseComponent.
     * @param {Object} props
     */
    public constructor(props: any) {
        super(props)
    }

    public render(): any {
        return this.props.children
    }
    /**
     * Decides ant update is necessary for re-rendering.
     * Compares old props and state objects with the newer ones without going deep.
     * @param {Object} nextProps
     * @param {Object} nextState
     * @returns {boolean} 'true' component shoud update ,'false' otherwise.
     */
    public shouldComponentUpdate(nextProps: any, nextState: any): boolean {
        return Compare(this, nextProps, nextState)
    }
}

export default Component
