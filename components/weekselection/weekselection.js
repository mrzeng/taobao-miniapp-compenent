/** 
 * 星期几 下拉选择
*/
Component({
  mixins: [],
  data: {
    datasoure:[
      { val:'1', lable:'星期一' },
      { val:'2', lable:'星期二'  },
      { val:'3', lable:'星期三'  },
      { val:'4', lable:'星期四'  },
      { val:'5', lable:'星期五'  },
      { val:'6', lable:'星期六'  },
      { val:'7', lable:'星期日'  }
    ],
    defaultValueSelf:null,
    
  },
  props: {
    hasAll:true, // 保函全部选项
    defaultValue: null,//默认值
  },
  didMount() {
    if(this.props.hasAll){
      let list = this.data.datasoure;
      list.unshift( {val:'0',lable:'全部时间'} )
    }
    this.setData({"defaultValueSelf": this.props.hasAll ? '全部时间' : '星期一'})
    

  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    onBlur(){},

    onChange(e){
      // console.log(e.detail.value)
      if(this.props.onChange){
        this.props.onChange(e.detail.value)
      }else{ console.log('[ 星期选择组件 weekselection ]没有传入onChange方法') }

    }

  },
});