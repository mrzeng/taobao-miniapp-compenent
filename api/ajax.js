import { Cloud } from '@tbmp/mp-cloud-sdk';
//云开发：https://miniapp.open.taobao.com/doc.htm?docId=117200&docType=1

const getCloud = (serverEnv) =>{
  let h = new Cloud()
  // 当取值为字符串时, 可选值为test | pre | online, 对应 测试 预发 线上三套环境
  console.log(`cloud init ${ serverEnv || 'test' } !!!`)
  h.init({
    env: serverEnv || 'test'
  })
  return h;
}





// 请求使用方法 demo
// cloudHttp({
//   url:'/userCenter/getOpenIds',  // '/userCenter/getAccount', //'/userCenter/getOpenId',
//   data:{
//     name:'zhooooo',
//     age:13
//   },
//   // log:true, //打印接口结果
// }).then(res=>{
//   // console.log('res:',res) //res todo
// }).catch(err=>{
//   //err todo
// })

const getMyApp = () => getApp();


//动态获取用户信息
const getAppUserInfo = (app)=>{
  // console.log('getAppUserInfo方法：',app.userInfo, app.userInfo.nick,app.userInfo.open_id);
  return {
    nick: app.userInfo ? app.userInfo.nick || '' : '',
    openid: app.userInfo ? app.userInfo.open_id || '' : ''
  }
}

const cloudHttp = ({
  url='',
  data={},
  cacheTime=300,//缓存失效时间，cacheType不为空的情况下生效，不填默认300，单位为秒，最大不超过3600
  cacheType=null, // 服务缓存类型，不填默认不使用缓存; 0 ：标准缓存，命中条件为相同小程序+相同用户+相同请求    1：用户无关缓存，命中条件为相同小程序+相同请求   2：小程序无关缓存，命中条件为相同用户+相同请求    3：全局缓存，命中条件为相同的请求
  noHandleRes=false, //true不需要判断code,
  log=false, //true 打印调试接口内容
  alertErr=true,  //弹出错误信息
  loading=false   //默认没有加载动画
})=>{

  //url 校验
  if(!url || Object.prototype.toString.call(url)!=="[object String]" ) return console.warn(`云函数url: [ ${url} ] 不正确,请检查`);
  const [, constroller,handler ] = url.split("/");
  if(!constroller ) return console.warn(`云函数url: [ ${url} ] 不正确,请仔细检查`);
  
  //data 数据处理
  const app = getMyApp();
  // console.log('接口中获取的app:',app)
  const userInfo = getAppUserInfo(app);
  // console.log('接口中获取的userInfo:',userInfo)
  const opt = {
      ...data,
      nick:  userInfo.nick, //app.userInfo ? app.userInfo.nick || '' : '',  //, 
      openid: userInfo.openid //app.userInfo ? app.userInfo.open_id || '' : ''  //
  }
  // return opt;
  
  return new Promise(async (resolve, reject)=>{
    if(loading){ my.showLoading({  content:'请求数据中...',  mask:true })  }
    //请求
    try {
      let res;

      //是否使用缓存
      if( cacheType || cacheType!==null ){
        let cacheer =  { // exts扩展信息字段
            "cacheType": cacheType ,   // 缓存类型
            "cacheTime": cacheTime // 缓存时间
        }
        res = await app.cloud.function.invoke(constroller, { post_data: opt }, handler,cacheer)
      }else{
        res = await app.cloud.function.invoke(constroller, { post_data: opt }, handler)
      }
        
      if(loading) my.hideLoading({  page: this, }); //关闭loading动画 防止执行时已经切换到其它页面，page指向不准确    
      if (res && res!=undefined) {
        let { code, data, err } = res
        if (noHandleRes) {          //不判断code，直接返回res
          if(log) console.log(`${url} :[成功,不检查code]`,res);
          resolve(res)
          return
        }
        if (res.code == 1) {
          if(log) console.log(`${url} :[成功] res.data: `,res.data,'[请求参数]: ',opt);
          resolve(data || true)     //调用成功返回：data或true
        } else {
          // console.log('-----res.code-----',res.code, res.code==1, JSON.parse(res).code, res, err )
          if(log) console.log(`${url} :[请求失败code!=1]  err: `,err,'[ res ]:',res,'[请求参数]: ',opt);
          let errText = res.data.sub_msg || res.data.msg || res.data;
          httpErrorer(errText,alertErr)
          reject(res)        //调用失败返回：undefined
        }
      } else {
        httpErrorer('请求失败',alertErr)
        if(log) console.log(`${url} :[请求失败]  err: `,err,'[ res ] :',res,'[请求参数]: ',opt);
        reject(res)
      }

    } catch (e) {
      console.log()
      if(loading) my.hideLoading({  page: this, }); //关闭loading动画 防止执行时已经切换到其它页面，page指向不准确 
      httpErrorer(e,alertErr);
      if(log){
        console.log(`${url} :[请求连接异常]  err: `,e)
      }else{
        console.log('err :',e)
      };
      reject(e)
    }
  })

}
//错误提示
const httpErrorer = (content = '网络异常',isShow=true) => {
  if(!isShow) return;
  my.showToast({
    content
  });
}

export default { cloudHttp, getCloud };