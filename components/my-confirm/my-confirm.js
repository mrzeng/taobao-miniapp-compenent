Component({
  mixins: [],
  data: {},
  props: {
    title: '弹框标题',
    textCancel: '取消',
    textSure: '确定',
    width:'360rpx'
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    closeBouncing(event) {
      console.log(event)
      this.props.onTapBoundingCancel()
    },
    onTapBouncingSure() {
      this.props.onTapBouncingSure()
    },
  },
});
