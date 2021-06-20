Component({
  mixins: [],
  data: {
    isShow: false,
    contentStyle: 'left: 100%;top:50%;'
  },
  props: {
    mode: 'right'
  },
  onInit() {
    const mode = this.props.mode
    let contentStyle = ''
    switch (mode) {
      case 'left':
        contentStyle = 'right: 100%;top:50%;transform: translateY(-50%);margin-right: 12px;'
        break
      case 'right':
        contentStyle = 'left: 100%;top:50%;transform: translateY(-50%);margin-left: 12px;'
        break
      case 'bottom':
        contentStyle = 'top: 100%;left: 50%;transform: translateX(-50%);margin-top: 12px;'
        break
      case 'top':
        contentStyle = 'bottom: 100%;left:50%;transform: translateX(-50%);margin-bottom: 12px;'
        break
    }
    this.setData({
      contentStyle
    })
  },
  didMount() { },
  didUpdate() { },
  didUnmount() { },
  methods: {
    tipShow() {
      this.setData({
        isShow: true
      })
    },
    catchTouchEnd() {
      this.setData({
        isShow: false
      })
    }
  },
});
