Component({
  mixins: [],
  data: {
    peretIsUser:false
  },
  props: {
    submitData:{},
  },
  didMount() {
    console.log('父组件数据', this.props.submitData)
    
  },
  didUpdate() {},
  didUnmount() {},
  methods: {

    //父组件调用子组件的方法
    peretUserFun(){
      return this.data.peretIsUser ? false :true;
    },

  }
});