import fetch from 'utils/fetch'
import fetchno from 'utils/fetchno'
/* 获取抽奖手机数据 */
export function getPhonelist (params) {
	return fetch({
		url: '',
		method: 'get',
		params
	})
}
/* 保存抽奖手机数据 */
export function saveLuckResult (params) {
	return fetchno({
		url: '',
		method: 'post',
		params
	})
}