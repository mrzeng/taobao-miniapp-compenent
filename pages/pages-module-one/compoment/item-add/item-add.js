import { ajax } from "../../../../api/ajax" 
Component({
  mixins: [],
  data: {
    planTitle:null
  },
  props: {},
  didMount() {
   


  },
  didUpdate() {},
  didUnmount() {},
  methods: {

    //input 事件句柄
    bindKeyInput(e) {
      this.setData({
        planTitle: e.detail.value,
      });
    },


    //确定创建item 
    onSureCreatePlan(){
      // add item
    },
    
    //取消
    onCancel(){
      if(this.props.onCancel){
        this.props.onCancel()
      }else{
        console.log("创建item onCancel 方法没有传入")
      }
    }
  },
});