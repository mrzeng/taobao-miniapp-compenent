Component({
  mixins: [],
  data: {},
  props: {
    title: '提示',
    content: '确定删除这条数据？一旦删除，所有相关数据将无法恢复！',
    btnTxt1: '取消',
    btnTxt2: '确定',
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    btnFunFirst(event) {
      console.log(event)
      this.props.onTapCommonToastCancle()
    },
    btnFunSecond() {
      this.props.onTapCommonToastSure()
    },
  },
});
