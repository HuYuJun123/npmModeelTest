import React, { Component } from 'react';
import './RollingLoading.scss';
class RollingLoading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TipStyleRefreshHeight: 0,//下拉刷新的高度
            TipStyleLoadHeight: 0,//上拉加载的高度
            // startPosition: {
            //     X: 0,//鼠标按下的横坐标
            //     Y: 0,//鼠标按下的纵坐标
            // },
            // endPosition: {
            //     X: 0,//鼠标抬起的横坐标
            //     Y: 0,//鼠标抬起的纵坐标
            // },
            startPosition: null,
            endPosition: null,
            status: null,//鼠标或手指状态 分别为 start move end
            loading: false,//是否在获取数据

        };
    }
    render() {
        const TipStyleRefresh = this.getTipStyleRefresh()
        const TipStyleLoad = this.getTipStyleLoad()
        const TipStyleList = this.getTipStyleList()
        const { children, loading } = this.getProps()
        const { status } = this.state
        return (
            <div id="huRollingLoading">
                <div className="huRefresh" style={TipStyleRefresh}>
                    {status}{loading + ''}-
                </div>
                <div className="huList" style={TipStyleList}>
                    {children}
                </div>
                <div className="huLoad" style={TipStyleLoad}>
                    {status}{loading + ''}
                </div>
            </div>
        )
    }
    //获取组件的props 做处理
    getProps() {
        let { children, slidingDistance = 50, refres, load, loading } = this.props
        /**
         * children 展示内容
         * slidingDistance 滑动距离
         * refres 刷新事件
         * load 加载事件
         * loading 数据拉取中
         */
        return { children, slidingDistance, refres, load, loading }
    }
    //获取下拉刷新的样式
    getTipStyleRefresh() {
        const { TipStyleRefreshHeight, status } = this.state
        const { refres } = this.getProps()
        return {
            height: refres ? TipStyleRefreshHeight : 0 + 'px',
            transition: `${status === 'end' ? 'all 0.5s ease' : 'none'}`
        }
    }
    //获取上拉加载的样式
    getTipStyleLoad() {
        const { TipStyleLoadHeight, status } = this.state
        const { load } = this.getProps()
        return {
            height: load ? TipStyleLoadHeight : 0 + 'px',
            transition: `${status === 'end' ? 'all 0.5s ease' : 'none'}`
        }
    }
    //获取中间区域的样式
    getTipStyleList() {
        const { TipStyleLoadHeight, TipStyleRefreshHeight, status } = this.state
        const { refres, load } = this.getProps()
        //刷新和加载的dom元素高度  判断是否有这两个功能
        let refresHeight = refres ? TipStyleRefreshHeight : 0
        let loadHeight = load ? TipStyleLoadHeight : 0
        return {
            height: `calc(100% - ${refresHeight + loadHeight}px)`,
            transition: `${status === 'end' ? 'all 0.5s ease' : 'none'}`
        }
    }
    //滚动监听事件
    scroolWatch(e) {
        console.log(e, '滚动')
    }
    //鼠标或手指按下事件
    funDown(e) {
        console.log(e, '开始')
        let { X, Y } = this.getPoosition(e)
        this.setState({ startPosition: { X, Y }, status: 'start', TipStyleLoadHeight: 0, TipStyleRefreshHeight: 0 })
    }
    //鼠标或手指移动事件
    funMove(e) {
        // console.log(e, '移动')
        let { startPosition, status } = this.state
        if (!startPosition) return
        if (status !== 'move') this.setState({ status: 'move' })
        let { direction, distance } = this.getSlideInfo(this.getPoosition(e))
        switch (direction) {
            case "down":
                this.setState({ TipStyleRefreshHeight: distance });
                break;
            case "up":
                this.setState({ TipStyleLoadHeight: distance });
                break;
            default: console.log(direction, distance);
        }

    }
    //鼠标或手指结束事件
    funEnd(e) {
        console.log(e, '结束')
        let { X, Y } = this.getPoosition(e)
        let { direction, distance } = this.getSlideInfo({ X, Y })
        let { slidingDistance, refres, load } = this.getProps()
        let TipStyleLoadHeight = 0, TipStyleRefreshHeight = 0;
        if (slidingDistance <= distance) {
            if (direction === 'down' && refres) {
                refres()
                TipStyleRefreshHeight = slidingDistance
            }
            if (direction === 'up' && load) {
                load()
                TipStyleLoadHeight = slidingDistance
            }
        }
        this.setState({
            startPosition: null,
            endPosition: { X, Y },
            status: 'end',
            TipStyleLoadHeight,
            TipStyleRefreshHeight
        })
    }
    //获取坐标位置
    getPoosition(e) {
        let { type } = e
        let X, Y;
        if (type.includes('mouse')) {
            let { clientX, clientY } = e
            X = clientX
            Y = clientY
        } else {
            let { clientX, clientY } = e.changedTouches[0] || e.targetTouches[0]
            X = clientX
            Y = clientY
        }
        return { X, Y }
    }
    //获取滑动信息
    getSlideInfo(position) {
        let { X, Y } = position
        let { startPosition } = this.state
        if (!startPosition) return {}
        //偏移量
        let deviationX = X - startPosition.X,
            deviationY = Y - startPosition.Y;
        //滑动方向  滑动距离
        let direction, distance;
        if (Math.abs(deviationX) > Math.abs(deviationY)) {
            if (deviationX > 0) direction = 'right'
            else direction = "left"
            distance = Math.abs(deviationX)
        } else {
            if (deviationY > 0) direction = 'down'
            else direction = "up"
            distance = Math.abs(deviationY)
        }
        return { direction, distance }
    }
    //组件初始化 
    componentDidMount() {
        //添加组件所需的事件监听
        let box = document.getElementById('huRollingLoading')
        box.addEventListener('scroll', e => { this.scroolWatch(e) })
        box.addEventListener('mousedown', e => { this.funDown(e) })
        box.addEventListener('touchstart', e => { this.funDown(e) })
        box.addEventListener('mousemove', e => { this.funMove(e) })
        box.addEventListener('touchmove', e => { this.funMove(e) })
        box.addEventListener('mouseup', e => { this.funEnd(e) })
        box.addEventListener('touchend', e => { this.funEnd(e) })
    }
    //props 数据变更
    static getDerivedStateFromProps(props, current_state) {
        if (props.loading !== current_state.loading) {
            // 隐藏加载和刷新dom元素
            if (props.loading) return { loading: props.loading }
            else return {
                loading: props.loading,
                TipStyleLoadHeight: 0,
                TipStyleRefreshHeight: 0,
            }
        } else {
            return null
        }
    }
}
export default RollingLoading;