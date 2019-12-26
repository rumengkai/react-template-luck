import React from 'react';
import ReactDOM from 'react-dom';
import RouteWithSubRoutes from './components/RouteWithSubRoutes'
import './index.scss';
import routes from './routes';
import * as serviceWorker from './serviceWorker';

import {
	Router, // hash
	BrowserRouter, // browser
	Switch,
	Redirect
} from "react-router-dom";

// hashRouter 开启下面，修改package.json中:homepage:"."
var hashRooter = false
if (process.env.REACT_APP_SITE === 'pro_local') {
	hashRooter = true
}

if (hashRooter) {
	var createHashHistory = require("history").createHashHistory
	const history = createHashHistory()
	ReactDOM.render(
		<Router history={history}>
			<div>
				<Switch>
					<Redirect from="/" exact to="/luck/home" />
					{routes.map((route, i) => (
						<RouteWithSubRoutes key={i} {...route} />
					))}
				</Switch>
			</div>
		</Router>
		, document.getElementById('root'));
} else {
	ReactDOM.render(
		<BrowserRouter basename="/ake">
			<div>
				<Switch>
					<Redirect from="/" exact to="/luck/home" />
					{routes.map((route, i) => (
						<RouteWithSubRoutes key={i} {...route} />
					))}
				</Switch>
			</div>
		</BrowserRouter>
		, document.getElementById('root'));
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
