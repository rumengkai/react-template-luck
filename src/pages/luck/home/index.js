import React from 'react';
import './index.scss'
import storage from 'utils/storage'
import {
	message
} from 'antd';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.nowWinData = null
	}
	componentDidMount () {
		let nd = storage.get('nowWinData')
		if (!!nd) {
			this.nowWinData = nd
			this.setState(this.nowWinData)
		}
	}
	nextClick () {
		if (!storage.get('nowWinData')) {
			message.error('还没有进行奖项设置，请前往设置页面进行设置。')
			return false
		}
		if (!storage.get('phoneRemain')) {
			message.error('抽奖池没有数据，请重新设置')
			return false
		}
		this.props.history.push({ pathname: '/luck/three' })
	}
	render () {
		if (this.nowWinData == null) {
			return (
				<div id="luck-home">
					<img src="https://static1.kofuf.com/1573641603819.png" className="app-title" alt="title" />
					<div className="detail">
						<li>
							<img src="https://static1.kofuf.com/1573717435600.png" alt="" className="name" />
						</li>
						<li>
							<img src="https://static2.kofuf.com/1573717448236.png" alt="" className="name" />
						</li>
						<li>
							<img src="https://static2.kofuf.com/1573717459686.png" alt="" className="name" />
						</li>
					</div>
					<img onClick={this.nextClick.bind(this)} src="https://static2.kofuf.com/1573641987886.png" alt="next" className="next" />
				</div>
			)
		} else {
			return (
				<div id="luck-home">
					<img src="https://static1.kofuf.com/1573641603819.png" className="app-title" alt="title" />
					<div className="detail">
						<li>
							<img src="https://static1.kofuf.com/1573717435600.png" alt="" className="name" />
							<p className="num_text">{this.nowWinData.list[0].num}名</p>
							<p className="gift_good">{this.nowWinData.list[0].goods.name}</p>
							<p className="gift_desc">{this.nowWinData.list[0].goods.title}</p>
						</li>
						<li>
							<img src="https://static2.kofuf.com/1573717448236.png" alt="" className="name" />
							<p className="num_text">{this.nowWinData.list[1].num}名</p>
							<p className="gift_good">{this.nowWinData.list[1].goods.name}</p>
							<p className="gift_desc">{this.nowWinData.list[1].goods.title}</p>
						</li>
						<li>
							<img src="https://static2.kofuf.com/1573717459686.png" alt="" className="name" />
							<p className="num_text">{this.nowWinData.list[2].num}名</p>
							<p className="gift_good">{this.nowWinData.list[2].goods.name}</p>
							<p className="gift_desc">{this.nowWinData.list[2].goods.title}</p>
						</li>
					</div>
					<img onClick={this.nextClick.bind(this)} src="https://static2.kofuf.com/1573641987886.png" alt="next" className="next" />
				</div>
			);
		}
	}
}

export default App;

