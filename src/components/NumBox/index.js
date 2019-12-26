
import React from 'react';
import './index.scss';
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = 0
		this.running = false;
		this.numState = [
			200,
			200,
			200,
			200,
			200,
			200,
			200,
			200,
			200,
			200,
			200,
		];
		this.n = 1;
		this.u = 100;
		this.timer = {};
	}

	run () {
		this.running = true
		this.n++
		this.numState = [
			this.u * this.n * 1,
			this.u * this.n * 2,
			this.u * this.n * 3,
			this.u * this.n * 4,
			this.u * this.n * 5,
			this.u * this.n * 6,
			this.u * this.n * 7,
			this.u * this.n * 8,
			this.u * this.n * 9,
			this.u * this.n * 3,
			this.u * this.n * 11
		]
		this.setState({ state: 1 })
		this.timer = window.setTimeout(() => {
			this.run()
		}, 100);
	}
	stop (num) {
		var num_arr = (num + "").split("");
		clearTimeout(this.timer)
		this.running = false
		this.numState = [
			this.u * (60 - num_arr[0]),
			this.u * (60 - num_arr[1]),
			this.u * (60 - num_arr[2]),
			this.u * (60 - num_arr[3]),
			this.u * (60 - num_arr[4]),
			this.u * (60 - num_arr[5]),
			this.u * (60 - num_arr[6]),
			this.u * (60 - num_arr[7]),
			this.u * (60 - num_arr[8]),
			this.u * (60 - num_arr[9]),
			this.u * (60 - num_arr[10]),
		]
		this.setState({ num0: 0 })
	}
	componentDidMount () {
		//通过pros接收父组件传来的方法
		this.props.onRef(this)
	}
	render () {
		return (
			<div className="num_box_one">
				<img onClick={this.nextClick} src="https://static1.kofuf.com/1573808499113.png" alt="num_box" />
				<div className="nums">
					<div className="num" style={{ 'backgroundPositionY': this.numState[0] + 'px' }}></div>
					<div className="num" style={{ 'backgroundPositionY': this.numState[1] + 'px' }}></div>
					<div className="num" style={{ 'backgroundPositionY': this.numState[2] + 'px' }}></div>
					<div className="num" style={{ 'backgroundPositionY': this.numState[3] + 'px' }}></div>
					<div className="num" style={{ 'backgroundPositionY': this.numState[4] + 'px' }}></div>
					<div className="num" style={{ 'backgroundPositionY': this.numState[5] + 'px' }}></div>
					<div className="num" style={{ 'backgroundPositionY': this.numState[6] + 'px' }}></div>
					<div className="num" style={{ 'backgroundPositionY': this.numState[7] + 'px' }}></div>
					<div className="num" style={{ 'backgroundPositionY': this.numState[8] + 'px' }}></div>
					<div className="num" style={{ 'backgroundPositionY': this.numState[9] + 'px' }}></div>
					<div className="num" style={{ 'backgroundPositionY': this.numState[10] + 'px' }}></div>
				</div>
			</div >
		);
	}
}

export default App;

