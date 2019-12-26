import React from 'react';
import './index.scss'
import NumBox from '../../../components/NumBox2/index'
import storage from 'utils/storage'
import {
	message, Popconfirm
} from 'antd';
import { isPhone } from "utils/index"
class App extends React.Component {
	constructor(props) {
		super(props);
		this.running = false;
		this.childs = [];
		this.nowWinData = {}
		this.phoneRemain = []
		this.over = false
		this.keydown = this.onKeyPressed.bind(this)
	}
	componentDidMount () {
		document.addEventListener("keydown", this.keydown);
		this.nowWinData = storage.get('nowWinData')
		let phoneRemain = storage.get('phoneRemain')
		if (!!phoneRemain) {
			this.phoneRemain = phoneRemain.split('\n')
		} else {
			this.props.history.push({ pathname: '/luck/home' })
			return
		}
		if (this.nowWinData.list[1].phones.length < this.nowWinData.list[1].num) {
			this.over = false
		} else {
			this.over = true
		}
		this.setState(this.nowWinData)
	}
	onKeyPressed (e) {
		if (e.keyCode === 32) {
			if (!!this.over) {
				message.info('二等奖已抽出！')
			} else if (!this.running) {
				this.running = !this.running
				this.childs.map((item) => {
					item.run()
					return 0
				})
			} else {
				this.running = !this.running
				this.over = true
				this.childs.map((item, index) => {
					let i = Math.floor(Math.random() * this.phoneRemain.length)
					let phone = this.phoneRemain[i]
					if (this.phoneRemain.length < 1) {
						this.over = false
						message.error('抽奖池没有数据了')
						item.stop("88888888888")
						return false
					} else {
						if (isPhone(phone)) {
							item.stop(phone)
						} else {
							item.stop("88888888888")
						}
					}
					this.nowWinData.list[1].phones.push(phone)
					this.phoneRemain.splice(i, 1)
					return 0
				})
				storage.set("nowWinData", this.nowWinData)
				storage.set("phoneRemain", this.phoneRemain.join('\n'))
			}
		}
	}
	onRef (ref) {
		if (!!this.over) {
			ref.stop(this.nowWinData.list[1].phones[this.childs.length] + '')
		}
		this.childs.push(ref)
	}
	nextClick () {
		if (!this.over) {
			message.error('请先抽取二等奖')
			return false
		}
		this.props.history.push({ pathname: '/luck/one' })
	}
	returnClick () {
		this.nowWinData.list[1].phones = []
		this.over = false
		this.childs.map((item) => {
			item.stop("88888888888")
			return null
		})
	}
	render () {
		if (this.nowWinData.list == null) {
			return (
				<div></div>
			)
		} else {
			var items = [];
			for (var i = 0; i < this.nowWinData.list[1].num; i++) {
				items.push(<NumBox onRef={this.onRef.bind(this)} key={i}></NumBox>);
			}
			return (
				<div id="luck-two">
					<img className="win_title" src="https://static2.kofuf.com/1573717448236.png" alt="" />
					<div className="num_box_warp">
						{items}
					</div>
					<Popconfirm placement="topLeft" title='确定重新抽奖？' onConfirm={this.returnClick.bind(this)} okText="是" cancelText="否">
						<img src="https://static2.kofuf.com/1574749646503.png" alt="next" className="return" />
					</Popconfirm>
					<img onClick={this.nextClick.bind(this)} src="https://static2.kofuf.com/1573641987886.png" alt="next" className="next" />
				</div>
			);
		}
	}
	componentWillUnmount () {
		document.removeEventListener("keydown", this.keydown);
	}
}

export default App;

