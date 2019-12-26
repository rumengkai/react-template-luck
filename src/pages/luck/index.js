import React from 'react';
import './index.scss';
import RouteWithSubRoutes from '../../components/RouteWithSubRoutes'
import storage from 'utils/storage'
import {
	Switch, Redirect
} from "react-router-dom";
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
	render () {
		const {
			routes
		} = this.props;
		return (
			<div id="luck-draw">
				<div className="content">
					<img src="https://static1.kofuf.com/1573640468925.png" alt="bg" className="content_bg" />
					<header className="luck-draw-header">
						<div className="app-logo">
							<div className="logo-tip">{this.nowWinData ? this.nowWinData.cityName : '北京分会'}</div>
						</div>
					</header>
					<Switch>
						<Redirect from="/luck" exact to="/luck/home" />
						{routes.map((route, i) => (
							< RouteWithSubRoutes key={i} {...route} />
						))}
					</Switch>
				</div>
			</div>
		);
	}
}

export default App;

