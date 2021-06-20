Component({
  mixins: [],
  data: {},
  props: {
    column:false, //true列排列
    type:'likeradio',//'likeradio', "liketab"
    dataSource:[
      {
        value: 'appale',
        label: 'Appale',
        disabled: false
      }, {
        value: 'pear',
        label: 'Pear',
        disabled: false
      }, {
        value: 'orange',
        label: 'Orange',
        disabled: false
      }
    ],
    value:null
  },
  didMount() {
    
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    onChange(e){
      try {
        let item = e.target.dataset;
        console.log(item)
        this.props.onChange(item)
      } catch (error) {
        console.warn("my-radio参数不正确",error);
      }
    }
  },
});