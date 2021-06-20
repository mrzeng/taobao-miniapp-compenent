/**
  * 系统级 工具函数
  **/
export default {

  //时间格式化函数
  dateFormat: (fmtime, date) => {
    const d = date ? new Date(date) : new Date()
    const o = {
      'M+': d.getMonth() + 1, // 月
      'd+': d.getDate(), // 日
      'h+': d.getHours(), // 时
      'm+': d.getMinutes(), // 分
      's+': d.getSeconds(), // 秒
      'q+': Math.floor((d.getMonth() + 3) / 3), // 季度
      S: d.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmtime))
      fmtime = fmtime.replace(
        RegExp.$1,
        (d.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    for (const k in o)
      if (new RegExp('(' + k + ')').test(fmtime))
        fmtime = fmtime.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        )
    return fmtime
  },
  
  // 正则验证对象
  regExpObject: {
    // 邮箱验证
    emailReg(val) {
      const pre = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
      return pre.test(val)
    },
    // 手机号
    phoneReg(val) {
      const pre = /^[1]\d{10}$/g
      return pre.test(val)
    },
     // 银行卡
    bankCardReg(val) {
      const pre = /^[1-9]\d{9,29}$/
      return pre.test(val)
    },
    // 身份证
    idCardReg(val) {
      const pre = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      return pre.test(val)
    },
    // 社会信用代码
    creditCodeReg(val) {
      const pre = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      return pre.test(val)
    },
   
  },

  // 判断arr是否为一个数组，返回一个bool值
  isArray: (arr) => {
      return Object.prototype.toString.call(arr) === '[object Array]';  
  },

  

  // 深度克隆
  // deepClone: (obj) => {
  //     if(typeof obj !== "object" && typeof obj !== 'function') {
  //         return obj;        //原始类型直接返回
  //     }
  //     var o = (Object.prototype.toString.call(obj) === '[object Array]') ? [] : {}; 
  //     console.log(o,obj)
  //     for(i in obj) {
  //         if(obj.hasOwnProperty(i)){ 
  //             o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i]; 
  //         } 
  //     } 
  //     return o;
  // }
  
}
