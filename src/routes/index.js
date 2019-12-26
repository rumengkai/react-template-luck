
import asyncComponent from "components/AsyncComponent/AsyncComponent"

const _import = file => asyncComponent(() => import('pages/' + file));


const routes = [
	{
		path: '/luck',
		component: _import('luck/index'),
		routes: [
			{ path: '/luck/home', component: _import('luck/home/index') },
			{ path: '/luck/one', component: _import('luck/one/index') },
			{ path: '/luck/two', component: _import('luck/two/index') },
			{ path: '/luck/three', component: _import('luck/three/index') },
			{ path: '/luck/result', component: _import('luck/result/index') },
		]
	},
	{
		path: '/setting',
		component: _import('luck/setting/index')
	}
]
export { routes as default };