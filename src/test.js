import React, { Component } from 'react';
import RollingLoading from "./rollingLoading"
import "./test.scss"
class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slidingDistance: 50,
            list: [1, 2, 3],
            loading: false
        };
    }
    render() {
        const { slidingDistance, list, loading } = this.state
        return (
            <div className="test">
                <h1>test-npm-model</h1>
                <div className="list">
                    <RollingLoading
                        refres={() => { this.refres() }}
                        load={() => { this.load() }}
                        slidingDistance={slidingDistance}
                        loading={loading}
                    >
                        <ul className="box">
                            {list.map(item => {
                                return <li key={item}>{item}</li>
                            })}
                        </ul>
                    </RollingLoading>
                </div>
            </div>
        )
    }
    // 获取随机数
    getRadom() {
        return Math.random()
    }
    //刷新
    refres() {
        this.setState({ loading: true })
        setTimeout(() => {
            let list = []
            for (let i = 0; i <= 10; i++) {
                list.push(this.getRadom())
            }
            this.setState({
                list,
                loading: false
            })
        }, 2000)
    }
    //加载
    load() {
        this.setState({ loading: true })
        setTimeout(() => {
            let list = this.state.list
            for (let i = 0; i <= 5; i++) {
                list.push(this.getRadom())
            }
            this.setState({ list, loading: false })
        }, 2000)
    }
}
export default Test;