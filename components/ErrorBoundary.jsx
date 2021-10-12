import React from 'react'

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {error: false}
    }

    componentDidCatch(error, errorInfo) {
        this.setState({error: true})
    }

    render() {
        if (this.state.error) {
            if (this.props.fallback) {
                return this.props.fallback
            }

            return (<div>An unexpected error occurred</div>)
        }

        return this.props.children
    }
}