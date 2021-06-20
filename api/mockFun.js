/** 方案二
 * 使用js 方法封装，实现对应格式的随机数据
 */ 

// 快速生成 table mock数据方法 (待完善)
function mockTableList(totalNum,columns) {
    if(!columns){
        columns=[
            {
              key:'manoy',
              rule:'num',
              para:6
            },
            {
              kay:'title',
              rule:'str',
              para:10
            },
            {
              kay:'updataTime',
              rule:'time',
              para:''
            }
          ]
    }
    if(!totalNum) totalNum = 6;
    const result = [];
    const timer = new Date();
    for (var r = 0; r < totalNum; r+1) {
      // console.log('r', r,totalNum)

      //生成每一项
      const item = {
        id:r,
        _id:r,
        time:''//timer.getTime()
      };

      for (let y = 0; y < columns.length; y++) {
        const col = columns[y];
        switch (col.rule) {
          case 'num': //数字
            item[`${col.key}`] =randomNum(col.para)
            break;
          case 'str': //文字
            item[`${col.key}`] =randomString(col.para)
            break;
          case 'time': //时间戳
            item[`${col.key}`] =new Date().getTime();
            break;
          default:
            break;
        }
      }
      result.push(item)
    }
    return result
  }

//简单的mock table
function mockTable(total=6){
    const result = []
    for (let i = 0; i < total; i++) {
      result.push({
        title: {
          name: `Quotation for 1PCS Nano ${3 + i}.0 controller compatible`
        },
        id:  i,
        _id: i,
        time: 2000 + i
      })
  }
  return result
}

//生成随机字符串
function randomString(len) {
  　　len = len || 32;
  　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  　　var maxPos = $chars.length;
  　　var pwd = '';
  　　for (i = 0; i < len; i++) {
  　　 pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  　　}
 　　return pwd;
}

 //生成随机数字
 function randomNum(max=10000){
   Math.ceil(Math.random()*max)
 }
 
//生成随机时间
function randomDate(start,end,startHour,endHour) {
  var date = new Date(+start + Math.random() * (end - start));
  var hour = startHour + Math.random() * (endHour - startHour) | 0;
  date.setHours(hour);
  return date;
}

export {
  mockTableList,//常规实现
  mockTable,//简单的mocktable
} 