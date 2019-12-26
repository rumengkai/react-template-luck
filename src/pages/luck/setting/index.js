import React from 'react';
import './index.scss';
import {
	Form, Tooltip, Input, Button, message, Popconfirm, Table
} from 'antd';
import storage from '../../../utils/storage'
const { TextArea } = Input;

class App extends React.Component {
	constructor(props) {
		super(props);
		this.text = "点击之后将重新开启新一轮抽奖，确定继续？";
		this.phoneRemain = '' // 剩余手机数据
		this.nowWinData = {
			id: '',
			name: '',
			cityName: '分会',
			phoneData: '', // 原始数据
			phoneNum: '',
			list: [
				{
					"type": 1, "num": 1, "phones": [],
					"goods": {
						name: '', title: ''
					}
				},// 一等奖
				{
					"type": 2, "num": 3, "phones": [],
					"goods": {
						name: '', title: ''
					}
				},// 二等奖
				{
					"type": 3, "num": 5, "phones": [],
					"goods": {
						name: '', title: ''
					}
				}// 三等奖
			]
		} // 当期数据
		this.beforeWinData = [] // 往期中奖
	}
	componentDidMount () {
		let nowWinData = storage.get('nowWinData')
		if (nowWinData) {
			this.nowWinData = nowWinData
		}
		let beforeWinData = storage.get('beforeWinData')
		if (beforeWinData) {
			this.beforeWinData = beforeWinData
		}
		this.setState(this.nowWinData)
		this.setState(this.beforeWinData)
	}
	getPhoneData () {
		let value = this.props.form.getFieldValue('activity_id')
		if (!value) {
			this.props.form.setFields({
				activity_id: {
					value: value,
					errors: [new Error(`请填写抽奖活动ID`)],
				},
			});
			return false
		} else {
		}
	}
	toHome () {
		if (process.env.REACT_APP_SITE === 'pro_local') {
			window.open('./index.html#/')
		} else {
			window.open('./')
		}
		// this.props.history.push({ pathname: '/luck/home' })
	}
	clearData () {
		this.nowWinData = {
			id: '',
			name: '',
			phoneData: '', // 原始数据
			phoneNum: '',
			cityName: '分会',
			list: [
				{
					"type": 1, "num": 1, "phones": [],
					"goods": {
						name: '', title: ''
					}
				},// 一等奖
				{
					"type": 2, "num": 3, "phones": [],
					"goods": {
						name: '', title: ''
					}
				},// 二等奖
				{
					"type": 3, "num": 5, "phones": [],
					"goods": {
						name: '', title: ''
					}
				}// 三等奖
			]
		} // 当期数据
		this.setState(this.nowWinData)
		this.props.form.resetFields(['activity_id', 'name', 'phone_list'])
	}
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			console.log(err)
			if (!!err) {
				return false
			} else {
				// 数据校验通过
				if (this.validateToPhoneList() === true) {
					let value = this.props.form.getFieldsValue()
					this.nowWinData.name = value.name
					this.nowWinData.cityName = value.cityName
					this.nowWinData.id = value.activity_id
					this.nowWinData.phoneData = value.phone_list
					this.nowWinData.list[0].num = value.one_win
					this.nowWinData.list[0].goods.name = value.one_name
					this.nowWinData.list[0].goods.title = value.one_title
					this.nowWinData.list[1].num = value.two_win
					this.nowWinData.list[1].goods.name = value.two_name
					this.nowWinData.list[1].goods.title = value.two_title
					this.nowWinData.list[2].num = value.three_win
					this.nowWinData.list[2].goods.name = value.three_name
					this.nowWinData.list[2].goods.title = value.three_title
					this.phoneRemain = value.phone_list
					storage.set("phoneRemain", this.phoneRemain)
					let n = storage.get('nowWinData')
					if (!!n) {
						this.beforeWinData.unshift(n)
						storage.set("beforeWinData", this.beforeWinData)
					}
					this.nowWinData.list[0].phones = []
					this.nowWinData.list[1].phones = []
					this.nowWinData.list[2].phones = []
					storage.set("nowWinData", this.nowWinData)
					message.info('保存成功，开启新一轮抽奖');
				}
			}
		});
	};
	validateToPhoneList = () => {
		let values = this.props.form.getFieldsValue()
		let value = values.phone_list
		if (!values.phone_list) {
			return false
		} else {
			let list = value.split('\n');
			this.nowWinData.phoneNum = list.length
			let total = values.one_win * 1 + values.two_win * 1 + values.three_win * 1
			var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
			let res = []
			if (list.length < total) {
				this.props.form.setFields({
					phone_list: {
						value: value,
						errors: [new Error(`手机号数量不足，最少${total}个。`)],
					},
				});
				return false
			} else {

			}
			for (var i = 0; i < list.length; i++) {
				if (res.indexOf(list[i]) < 0) {
					if (!reg.test(list[i])) {
						this.props.form.setFields({
							phone_list: {
								value: value,
								errors: [new Error('存在非法手机号：' + list[i])],
							},
						});
						return false
					}
					res.push(list[i]);
				} else {
					this.props.form.setFields({
						phone_list: {
							value: value,
							errors: [new Error('存在重复手机号：' + list[i])],
						},
					});
					return false
				}
			}
		}
		return true
	};
	render () {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 6 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 14 },
			},
		};
		const tailFormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24,
					offset: 0,
				},
				sm: {
					span: 14,
					offset: 6,
				},
			},
		};
		const columns = [
			{
				title: '活动名',
				dataIndex: 'name',
				key: 'name',
				width: '130px'
			},
			{
				title: '一等奖',
				dataIndex: 'one_win',
				key: 'one_win',
			},
			{
				title: '二等奖',
				dataIndex: 'two_win',
				key: 'two_win',
			},
			{
				title: '三等奖',
				key: 'three_win',
				dataIndex: 'three_win'
			}
		];
		const data = this.beforeWinData.map((item, index) => {
			return {
				key: index,
				name: item.name,
				one_win: item.list[0].phones.join('  '), //? item.list[0].phones.replace('\n', ',') : '',
				two_win: item.list[1].phones.join('  '), //? item.list[1].phones.replace('\n', ',') : '',
				three_win: item.list[2].phones.join('  ') //? item.list[2].phones.replace('\n', ',') : ''
			}
		})
		return (
			<div id="luck-setting">
				<div className="header">
					控制台
				</div>
				<div className="content">
					<div className="set_data_box">
						<Form {...formItemLayout} onSubmit={this.handleSubmit}>
							<Form.Item {...tailFormItemLayout}>
								<Button type="primary" onClick={this.clearData.bind(this)}>
									清空表单数据
								</Button>
							</Form.Item>
							<Form.Item label="填写抽奖活动ID">
								{getFieldDecorator('activity_id', {
									initialValue: this.nowWinData.id,
									rules: [{ required: false, message: '填写抽奖活动ID!', whitespace: true }],
								})(<Input style={{ width: '100px', marginRight: '20px' }} />)}
							</Form.Item>
							<Form.Item label="活动名称">
								{getFieldDecorator('name', {
									initialValue: this.nowWinData.name,
									rules: [{ required: true, message: '请输入活动名称!', whitespace: true }],
								})(<Input />)}
							</Form.Item>
							<Form.Item label="分会名称">
								{getFieldDecorator('cityName', {
									initialValue: this.nowWinData.cityName,
									rules: [{ required: true, message: '请输入分会名称!', whitespace: true }],
								})(<Input />)}
							</Form.Item>
							<Form.Item label={
								`手机号：${this.nowWinData.phoneNum > 0 ? '共' + this.nowWinData.phoneNum + '个' : ''}`
							}>
								{getFieldDecorator('phone_list', {
									initialValue: this.nowWinData.phoneData,
									rules: [{ required: true, message: '请输入手机号列表!' },],
								})(
									<TextArea style={{ height: 200, }} onBlur={this.validateToPhoneList} placeholder="输入数据，每行一个手机号" />
								)}
							</Form.Item>
							<Form.Item label="一等奖数量">
								{getFieldDecorator('one_name', {
									initialValue: this.nowWinData.list[0].goods.name,
									rules: [{ required: true, message: '名称' }],
								})(<Input style={{ width: '38%' }} placeholder="名称" />)}
								{getFieldDecorator('one_title', {
									initialValue: this.nowWinData.list[0].goods.title,
									rules: [{ required: true, message: '介绍' }],
								})(<Input style={{ width: '38%', marginLeft: "1%" }} placeholder="介绍" />)}
								{getFieldDecorator('one_win', {
									initialValue: this.nowWinData.list[0].num,
									rules: [{ required: true, message: '数量' }],
								})(<Input style={{ width: '20%', marginLeft: "1%" }} placeholder="数量" />)}
							</Form.Item>
							<Form.Item label="二等奖数量">
								{getFieldDecorator('two_name', {
									initialValue: this.nowWinData.list[1].goods.name,
									rules: [{ required: true, message: '名称' }],
								})(<Input style={{ width: '38%' }} placeholder="名称" />)}
								{getFieldDecorator('two_title', {
									initialValue: this.nowWinData.list[1].goods.title,
									rules: [{ required: true, message: '介绍' }],
								})(<Input style={{ width: '38%', marginLeft: "1%" }} placeholder="介绍" />)}
								{getFieldDecorator('two_win', {
									initialValue: this.nowWinData.list[1].num,
									rules: [{ required: true, message: '数量' }],
								})(<Input style={{ width: '20%', marginLeft: "1%" }} placeholder="数量" />)}
							</Form.Item>
							<Form.Item label="三等奖数量">
								{getFieldDecorator('three_name', {
									initialValue: this.nowWinData.list[2].goods.name,
									rules: [{ required: true, message: '名称' }],
								})(<Input style={{ width: '38%' }} placeholder="名称" />)}
								{getFieldDecorator('three_title', {
									initialValue: this.nowWinData.list[2].goods.title,
									rules: [{ required: true, message: '介绍' }],
								})(<Input style={{ width: '38%', marginLeft: "1%" }} placeholder="介绍" />)}
								{getFieldDecorator('three_win', {
									initialValue: this.nowWinData.list[2].num,
									rules: [{ required: true, message: '数量' }],
								})(<Input style={{ width: '20%', marginLeft: "1%" }} placeholder="数量" />)}
							</Form.Item>
							<Form.Item {...tailFormItemLayout}>
								<Popconfirm placement="topLeft" title={this.text} onConfirm={this.handleSubmit} okText="是" cancelText="否">
									<Button type="primary" htmlType="submit">
										保存
									</Button>
								</Popconfirm>
								<Popconfirm placement="topLeft" title={this.text} onConfirm={this.handleSubmit} okText="是" cancelText="否">
									<Button style={{ marginLeft: '20px' }} type="primary" htmlType="submit">
										重新开始
									</Button>
								</Popconfirm>
								<Button style={{ marginLeft: '20px' }} type="primary" onClick={this.toHome.bind(this)}>去抽奖页</Button>
							</Form.Item>
						</Form>
					</div>
					<div className="tips">
						<p>操作注意事项：</p>
						<p>1、有网环境下，输入抽奖活动ID，从数据库获取手机号列表。</p>
						<p>2、没网络环境下，直接手动输入活动名称和手机号列表，手机号列表注意每行一个手机号，不能有重复手机号。</p>
						<p>3、在抽奖页面，按电脑【空格】按键，进行抽奖，再次按下，停止抽奖，出结果。</p>
						<p>4、在一等奖抽出后，有网情况下，会将结果上传数据库，无网情况下，拍照保存抽奖结果。为保险起见，建议每次抽奖结果都拍照留存。</p>
					</div>
					<div className="before_data_list">
						<p>抽奖活动以往记录：</p>
						<Table columns={columns} dataSource={data} />
					</div>
				</div>
			</div >
		);
	}
}
const A = Form.create({ name: 'register' })(App);
export default A;

