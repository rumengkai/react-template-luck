import axios from 'axios'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import Qs from 'qs'
import {
	notification
} from 'antd';
// 创建axios实例
const service = axios.create({
	baseURL: process.env.REACT_APP_DOMAIN, // api的base_url
	timeout: 600000, // 请求超时时间
	transformRequest: [data => {
		data = Qs.stringify(data)
		return data
	}],
	headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
})

// request拦截器
service.interceptors.request.use(config => {
	NProgress.start()
	return config
}, error => {
	// Do something with request error
	console.log(error) // for debug
	Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
	response => {
		/**
		* status为非0是抛错 可结合自己业务进行修改
		*/
		NProgress.done()
		const res = response.data
		const { status } = response;
		if (res.status !== 0) {
			notification.error({
				message: `请求错误 ${status}: ${res.status}`,
				description: res.error,
			});
			// return Promise.reject('error')
			return res
		} else {
			return res
		}
	},
	error => {
		console.log('err' + error)// for debug
		notification.error({
			description: '您的网络发生异常，无法连接服务器',
			message: '网络异常',
		});
		return Promise.reject(error)
	}
)

const feachData = r => {
	switch (r.method) {
		case "post":
			return service.post(r.url, r.params)
		case "get":
			return service.get(r.url, { params: r.params })
		default:
			return service.get(r.url, { params: r.params })
	}
}

export default feachData
