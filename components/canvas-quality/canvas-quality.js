Component({
  mixins: [],
  data: {
    ctx: '',
    cw: 81,
    ch: 43,
    stepW: 0,
    clearTimer: '',
  },
  props: {
    canvasId: '', // 每个canvas的id
    canvasData: [], // canvas需要渲染的数据
    type: 'small', // 当前显示大图或者小图
  },
  didMount() {
    this.createCanvas()
    this.canvasY(this.data.ctx)
    this.canvasX(this.data.ctx)
    this.data.ctx.draw()
  },
  didUpdate() {},
  didUnmount() {
    clearInterval(this.data.clearTimer)
  },
  methods: {
    createCanvas() {
      this.setData({
        cw: this.props.type == 'small' ? 81 : 350,
        ch: this.props.type == 'small' ? 43 : 200,
        ctx: my.createCanvasContext(this.props.canvasId)
      })
      // 坐标轴下移
      this.data.ctx.translate(0, this.props.type == 'small' ? 43 : 200)
      // 坐标轴Y轴翻转
      this.data.ctx.scale(1,-1)
    },
    // y轴
    canvasY(ctx) {
      // 画横坐标的线,纵坐标刻度35为间隙
      ctx.setFillStyle('#85878b')
      if (this.props.type == 'small') {
        ctx.fillRect(10, 5, 1, 30)
      } else {
        ctx.fillRect(20, 30, 1, 160)
        for (let i = 0; i < 11; i++) {
          if (i == 0 || i % 2 == 1) continue
          ctx.save()
          ctx.scale(1,-1)
          ctx.translate(0, -200)
          ctx.fillRect(20, (200 - (14 * i + 30)), 5, 1)
          ctx.setStrokeStyle('#85878b')
          ctx.setTextAlign('right')
          ctx.setFontSize(12)
          ctx.fillText(i, 15, (200 - (14 * i + 30 - 12 / 2)))
          ctx.restore()
        }
      }
    },
    // x轴
    canvasX(ctx) {
      let len = this.props.canvasData.length
      ctx.setFillStyle('#85878b')
      let eachH = 0 // 单个单元的高度
      let initLen = 0 // 初始横坐标移动长度
      let distance = 0 // 间隔距离
      if (this.props.type == 'small') {
        ctx.fillRect(10, 5, 60, 1)
        eachH = 30 / 10 // 每个单元的高度：h = 30 / 10
        distance = 15
        this.setData({
          stepW: (this.data.cw - (this.data.cw / (len + 1))) / len
        })
        initLen = 5

      } else {
        initLen = 0
        distance = 80
        ctx.fillRect(20, 30, 300, 1)
        eachH = 14 // 每个单元的高度
      }
      // 横向数据
      ctx.setFillStyle('#3aa1ff')
      for (let i = 0; i < len; i++) {
        ctx.fillRect(distance * (i + 1) + initLen, this.props.type == 'small' ? 5 : 30, this.props.type == 'small' ? 8 : 30, eachH * this.props.canvasData[i].score)
        // this.run(distance * (i + 1) + initLen, eachH * this.props.canvasData[i].score)
        if (this.props.type != 'small') {
          ctx.save()
          ctx.setFillStyle('#85878b')
          ctx.setStrokeStyle('#85878b')
          ctx.setTextAlign('center')
          ctx.scale(1,-1)
          ctx.translate(0, -200)
          ctx.fillRect(95 + 80 * i, 170, 1, 5)
          ctx.setFontSize(12)
          ctx.fillText(this.props.canvasData[i].date, 95 + 80 * i, 185)
          ctx.fillText(this.props.canvasData[i].score, 95 + 80 * i, 160 - eachH * this.props.canvasData[i].score)
          ctx.restore()
        }
      }

    },

    // 执行动画
    run(x, score) {
      // if (this.data.type == 'small') {
      //   this.data.ctx.clearRect(15, 5, 65, 30)
      // } else {
      //   this.data.ctx.clearRect(40, 30, 300, 170)
      // }
      
      let i = 0
      console.log(x, score, 'x-score')
      let clearTimer = setInterval(() => {
        i++
        if (i > score) {
          console.log(7)
          clearInterval(clearTimer)
          return
        }
        console.log(i)
        this.data.ctx.setFillStyle('#3aa1ff')
        this.data.ctx.fillRect(x, this.props.type == 'small' ? 5 : 30, this.props.type == 'small' ? 8 : 30, i)
        this.data.ctx.draw()
      }, 16)

      this.setData({
        clearTimer
      })
    },

  },
});
