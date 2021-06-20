import common from './common/common';
import  { getCloud } from './api/ajax';
const cloud = getCloud('test'); //云开发后台环境切换
App({
  cloud,
  common,
  userInfo:null,
  isLogin:false,
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    console.info('App onLaunch');
    this.getSystemInfo()
    this.getToken()
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },


  
  //淘宝认证
  getToken() {
    const that = this
    return new Promise((resove, reject) => {
      my.authorize({
        scopes: '*',
        success(res) {
          console.log('授权信息：', res)
          that.getUserInfo()
        },
        fail(err) {
          console.log(err)
        },
        complete:(er) => {
          console.log('error:', er)
        }
      })
    })
  },

  //后端接口 获取user open_Id 
  getUserInfo() {
    const that = this
    return new Promise((resove, reject) => {
      this.getOpenId().then(res => {
        that.userInfo = res.data
        that.isLogin = true
        resove()
      }).catch(err => {
        console.log('app getUserInfo err:')
        console.log(err)
      })
    })
  },
  async getOpenId() {
    return new Promise(async (resolve, reject) => {
      try {
        //云开发 调用方法
        const res = await cloud.function.invoke('userController', {}, 'getOpenId')
        if (res.code == 2) {
          my.alert({
            content: res.data
          })
        }
        resolve(res)
      } catch (e) {
        if (/网络/.test(e)) {
          my.alert({
            content: '您当前网络信号差，请刷新页面试试看！'
          })
        }
        reject({ code: 0, err: e })
      }
    })
  },

  //系统信息
  getSystemInfo() {
    const that = this
    return new Promise((resove, reject) => {
      my.getSystemInfo({
        success(res) {
          that.systemInfo = res
          resove()
        },
        fail(err) {
          console.log('app getSystemInfo err:')
          console.log(err)
          reject()
        }
      })
    })
  }


});
