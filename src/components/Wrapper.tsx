import React from 'react'

export interface BaseState {
	display?: boolean
}

export interface DisplayInput<P> extends React.Component<P> {
	show: () => void
	hide: () => void
	isAvailable: () => void
	getWrappedComponent: () => React.Component<P>
}

export interface BaseInput<P> extends React.Component<P> {
	getTitle: () => string
	getValue: () => string | string[] | number
	setValue: (value: string | string[] | number) => void
	isValid: () => boolean
}

export default abstract class Wrapper<P, S extends BaseState> extends React.Component<P, S> implements DisplayInput<P> {

	protected getInitialState(): BaseState {
		return { display: true }
	}

	abstract getWrappedComponent(): React.Component<P>

	public show(): void {
		this.setState({ display: true })
	}

	public hide(): void {
		this.setState({ display: false })
	}

	public isAvailable(): boolean {
		return this.state.display
	}

}
