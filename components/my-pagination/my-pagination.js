Component({
  mixins: [],
  data: {},
  props: {
    size:'small',// 组件大小 'small', 'medium', 'large'
    type:'simple', //类型 'normal', 'simple', 'mini'
    shape:'arrow-prev-only',//前进后退按钮样式 可选值: 'normal', 'arrow-only', 'arrow-prev-only', 'no-border'
    current:'1', //当前页码
    defaultCurrent:"1", //初始页码
    total:"6",//总记录数
    pageShowCount:'10',
    pageSize:'5',//一页中的记录数
    
    pageSizeSelector:false,//每页显示选择器类型 可选值: false, 'filter', 'dropdown'
    pageSizeList:[5,10,20,50],//每页显示选择器可选值
    pageSizePosition:'start',//位置 可选值: 'start', 'end'
    align:'center', //位置左 left    中 center   右 right
    useFloatLayout:false,//是否使用浮动布局

    hideOnlyOnePage:true,//只有1页时，是否隐藏
    showJump:false, //在页码数超过5页后，会显示跳转输入框与按钮

  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    onChange(){
      if(this.props.onChange){
        this.props.onChange()
      }else{ console.log("[缺少方法]：my-pagination没有传入 onChange 方法") }
    },

    onPageSizeChange(){
      if(this.props.onPageSizeChange){
        this.props.onPageSizeChange()
      }else{ console.log("[缺少方法]：my-pagination没有传入 onPageSizeChange 方法") }
    }

  },
});