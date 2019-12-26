import React from 'react';
import './index.scss';
import storage from 'utils/storage'

class App extends React.Component {
	constructor(props) {
		super(props);
		this.running = false;
		this.childs = [];
		this.nowWinData = {}
		this.phoneRemain = []
		this.over = false
	}
	componentDidMount () {
		this.nowWinData = storage.get('nowWinData')
		this.setState(this.nowWinData)
	}
	nextClick () {
		this.props.history.push({ pathname: '/luck/two' })
	}
	render () {
		if (this.nowWinData.list == null) {
			return (
				<div></div>
			)
		} else {
			return (
				<div id="luck-result">
					<div className="detail">
						<li>
							<img src="https://static1.kofuf.com/1573717435600.png" alt="" className="name" />
							{this.nowWinData.list[0].phones.map((item, index) => (
								<p className="font_num_heiti" key={index}>{item}</p>
							))}
						</li>
						<li>
							<img src="https://static2.kofuf.com/1573717448236.png" alt="" className="name" />
							{this.nowWinData.list[1].phones.map((item, index) => (
								<p className="font_num_heiti" key={index}>{item}</p>
							))}
						</li>
						<li>
							<img src="https://static2.kofuf.com/1573717459686.png" alt="" className="name" />
							{this.nowWinData.list[2].phones.map((item, index) => (
								<p className="font_num_heiti" key={index}>{item}</p>
							))}
						</li>
					</div>
				</div>
			);
		}
	}
}

export default App;

