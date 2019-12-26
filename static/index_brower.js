import React from 'react';
import ReactDOM from 'react-dom';
import RouteWithSubRoutes from '../src/components/RouteWithSubRoutes'
import {
	BrowserRouter as Router,
	Switch,
	Redirect
} from "react-router-dom";
import './index.scss';
import routes from '../src/routes';
import * as serviceWorker from '../src/serviceWorker';

ReactDOM.render(
	<Router basename="/ake">
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
