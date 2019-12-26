export function isPhone (phone) {
	let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
	if (!reg.test(phone)) {
		return false
	} else {
		return true
	}
}
