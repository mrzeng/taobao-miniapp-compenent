import { modes } from "../../common/configdata"
Page({
  data: {
    switchingTab:1,//[1,2]

    submitData:{ 
      dataOne:{ 
        index:'',
        item:null,
      }, 
      msg:'父组件数据' 
    }
  },
  onLoad(query) {
    // console.log('page onLoad', query)
  },
  onShow() {
  },

  //设置最终提交的数据
  setSubmitData(data){
    console.log('改变父组件的提交数据',data)
    this.setData({
      submitData:data
    })
  },
  //获取 最终提交的数据
  getSubmitData(){
    return this.data.submitData;
  },

  //获取 tab-two 组件实例
  saveRefTabTwo(ref){
    this.tabTwoRef = ref; 
  },

  //跳转下一步
  nextTab(){
    if(this.data.switchingTab>2){
       this.setData({switchingTab:2})
    }else if(this.data.switchingTab==2){

      if( this.tabTwoRef.peretUserFun() ){ //父组件使用子组件方法
        this.setData({switchingTab:2})
      }

    }else{ //1
      this.setData({switchingTab:this.data.switchingTab+1})
    }
  },

  //跳转上一步
  preTab(){
    let switchingTab = this.data.switchingTab;
    this.setData({ switchingTab : (switchingTab>1)? switchingTab-1 : 1 })
  }
 
  
  
 
})