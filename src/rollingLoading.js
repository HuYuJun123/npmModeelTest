import React, { Component } from 'react';
import './RollingLoading.scss';
class RollingLoading extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { children, title, loading, desc } = this.getProps()
        return (
            <div className="huRollingLoading">
                {loading ? <div>loading</div> : null}
                <h1>{title}</h1>
                <p>{desc}</p>
                {children}
            </div>
        )
    }
    getProps() {
        let { children, title, loading, desc } = this.props
        return { children, title, loading, desc }
    }
}
export default RollingLoading;