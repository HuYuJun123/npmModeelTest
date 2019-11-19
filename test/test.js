import React, { Component } from 'react';
import './test.scss';
import RollingLoading from "hu-rolling-loading"
class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'test-title',
            desc: 'test-desc',
            loading: true
        };
    }
    render() {
        const { title, loading, desc } = this.state
        return (
            <div className="test">
                <h1>test-npm-model</h1>
                <RollingLoading
                    title={title}
                    desc={desc}
                    loading={loading}
                >children-test</RollingLoading>
            </div>
        )
    }
}
export default Test;