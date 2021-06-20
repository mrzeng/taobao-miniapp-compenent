Component({
  mixins: [],
  data: {
    canvasW: 0,
    canvasH: 0,
    ctx: '',
    gridCanvasId: 'gridId',
    stepW: 0,
    stepH: 0,
    lineColors: [
      {
        color: '#fb6b67',
        class: 'red'
      }, {
        color: '#47d0a8',
        class: 'green'
      }, {
        color: '#4797ff',
        class: 'blue'
      }, {
        color: '#cd6eff',
        class: 'violet',
      }, {
        color: '#fcb844',
        class: 'yellow'
      }
    ],
    dataToword: {
      total_to_show: 'row1',
      total_click: 'row2',
      click_rate: 'row3',
      click_conversion_rate: 'row4',
      click_spend: 'row5',
      thousand_to_show_spend: 'row6',
      total_spend: 'row7',
      produce_ratio: 'row8',
      total_deal_money: 'row9',
      total_deal_number: 'row10',
      total_collection_number: 'row11',
      total_shopping_cart: 'row12',
      directtransaction: 'row13',
      directtransactionshipping: 'row14',
      indirecttransaction: 'row14',
      indirecttransactionshipping: 'row15',
      favitemtotal: 'row16',
      favshoptotal: 'row17',
      indirectcarttotal: 'row18',
      directcarttotal: 'row19'
    },
    dataToUnit: {
      total_to_show: '',
      total_click: '',
      click_rate: '%',
      click_conversion_rate: '%',
      click_spend: '元',
      thousand_to_show_spend: '元',
      total_spend: '元',
      produce_ratio: '%',
      total_deal_money: '元',
      total_deal_number: '',
      total_collection_number: '',
      total_shopping_cart: '',
      directtransaction: '元',
      directtransactionshipping: '',
      indirecttransaction: '元',
      indirecttransactionshipping: '',
      favitemtotal: '',
      favshoptotal: '',
      indirectcarttotal: '',
      directcarttotal: ''
    },
    currentHoverShowData: {
      date: '',
      data: {}
    },

    clearId: '',
    hoverMaskPosition: {
      x: 0,
      y: 0
    },
    randerColor: {},
    points: [], // 当前所有的点
    beginPoint: {}, // 画图的第一个点
    historys: [],
  },
  props: {
    canvasId: '',
    historyData: [],
    showAttrs: []
  },
  onInit() {
    console.log("改变了！")
  },
  didMount() {
    let a = 1;
    let b = a;
    b = 2;
    console.log(a, b, 'a--b')

    let _this = this
    console.log(this.props.historyData, 'this.props.historyData')
    this.setData({
      stepH: Math.floor((580 - 100) / 5),
      historys: this.props.historyData,
    })
    let clearId = setInterval(() => {
      if (this.props.historyData.length > 0) {
        my.createSelectorQuery()
          // 子元素id
          .select('#history_echarts').boundingClientRect()
          // // 你的scroll-view的id
          // .select('#scroll-view-area').scrollOffset()
          .exec(rect => {
            console.log(rect, 'plan_baby_rect')
            _this.setData({
              canvasW: rect[0].width,
              canvasH: rect[0].height
            })

            _this.canvasOnReady()
          })
        _this.setData({
          clearId
        })
        clearInterval(clearId)
      }
    }, 100)
  },
  didUpdate() {},
  didUnmount() {
    clearInterval(this.data.clearId)
    this.setData({
      historys: [],
      currentHoverShowData: []
    })
  },
  methods: {
    // 初始化
    canvasOnReady() {
      this.data.ctx = my.createCanvasContext(this.props.canvasId)
      this.data.gridCanvasCtx = my.createCanvasContext(this.data.gridCanvasId)
      const opt = this.props.historyData
      let data = {}
      console.log(opt, 'opt')
      this.props.showAttrs.forEach((s,index) => {
        data[s] = []
        data['date'] = []
        opt.forEach(o => {
          data[s].push(o.data[s])
          data['date'].push(o.key)
        })
      })

      
      // 绘制头部
      this.header(this.data.gridCanvasCtx, data)
      
      this.canvasX(this.data.gridCanvasCtx, data)
      // 绘制数据
      let randerColor = {}
      this.props.showAttrs.forEach((s, i) => {
        randerColor[this.props.showAttrs[i]] = this.data.lineColors[i].class
        this.canvasData(this.data.ctx, data, this.props.showAttrs[i], this.data.lineColors[i].color)
      })
      this.setData({
        randerColor
      })

      // 绘制Y轴
      this.canvasY(this.data.gridCanvasCtx, data)
      this.data.ctx.draw()
      this.data.gridCanvasCtx.draw()
    },
    canvasX(ctx, data) {

      // 详情历史图表x处理
      let step = 0;
      step = data.date.length
      console.log(this.data.canvasW, 'canvasW')
      const stepW = Math.floor((this.data.canvasW - 100) / (step))
      console.log(data, step, stepW, 'data')
      this.setData({
        stepW
      })

      // 开始绘图
      ctx.beginPath()
      ctx.setFillStyle('#85878B');
      ctx.setTextAlign('center');
      // 绘制底部、刻度及底部日期
      ctx.fillRect(30, 580, this.data.canvasW - 60, 1)
      for(let i = 0, len = data.date.length; i < len; i++) {
        console.log(data.date[i], 'data.date[i]')
        ctx.fillRect(30 + i * stepW + stepW / 2, 580, 1, 5)

        ctx.fillText(data.date[i], 30 + i * stepW + stepW / 2, 600)
      }

    },
    canvasY(ctx, data) {
      
      for(let i = 0; i < 5; i++) {
        ctx.fillRect(30, 100 + i * this.data.stepH, this.data.canvasW - 60, 1)
      }
      
      ctx.draw()
     
    },
    header(ctx, opt) {
      // // const canvasW = this.data.canvasW
      // ctx.setFillStyle('#85878B')
      // ctx.setTextAlign('left')
      // if (opt.data[0].name == '历史') {
      //   ctx.setFillStyle(opt.data[0].color)
      //   ctx.fillRect(10, 10, 24, 10)
      //   ctx.fillText(opt.data[0].name, 40, 18)
      // } else {
      //   ctx.setFillStyle(opt.data[0].color)
      //   ctx.fillRect(10, 10, 24, 10)
      //   ctx.setFillStyle(opt.data[1].color)
      //   ctx.fillRect(80, 10, 24, 10)
      //   ctx.fillText(opt.data[0].name, 40, 18)
      //   ctx.fillText(opt.data[1].name, 110, 18)
      // }
      // this.data.hoverUnit = opt.unit

      // this.setData({
      //   hoverUnit: opt.unit
      // })
      // // ctx.setTextAlign('right')
      // // ctx.fillText(`单位：${opt.unit || '-'}`, canvasW - 10, 18)
    },
    canvasData(ctx, data, attr, color) {
      let maxNum = 0;
      let stepW = this.data.stepW
      const stepMix = data[attr].length
      console.log(data, 'data00')
      maxNum = Math.max(...data[attr]);
      const YMAX = maxNum <= 1 ? 1 : maxNum <= 10 ? 10 : maxNum <= 100 ? 100 : Math.ceil(maxNum / 1000) * 1000;
      ctx.beginPath()
      ctx.setLineJoin('miter');
      ctx.lineJoin = "round";
      ctx.setMiterLimit(2);
      ctx.setLineWidth(3);
      ctx.setFillStyle(color);
      ctx.setStrokeStyle(color);
      
      let points = []
      for (let i = 0; i < stepMix; i++) {
        points.push({x: 30 + stepW / 2 + i * stepW, y: 580 - Math.round((data[attr][i] / YMAX) * 482)})
        // if (i == 0) {
        //   ctx.moveTo(30 + stepW / 2 + i * stepW, 580 - Math.round((data[attr][i] / YMAX) * 482));
        // } else {
        //   ctx.lineTo(30 + stepW / 2 + i * stepW, 580 - Math.round((data[attr][i] / YMAX) * 482));
        // }
      }
      console.log(points, '111')
      console.log(stepW, stepMix, stepMix.length, YMAX, data[attr], '789789')
      points.push({x: 30 + stepMix * stepW - (stepW / 2), y: 580 - (Math.round((data[attr][stepMix-1] / YMAX) * 482) + data[attr][stepMix-1] / YMAX)})
      console.log(points, '122')
      this.setData({
        points
      })
      if (points.length < 4)  {
        this.drawLineChart(points)
      } else {
        this.setData({
          beginPoint: points[0]
        })
        points.forEach((d, i) => {
          if (i == points.length - 1) return

          this.prepareData(i)
        })
      }
      
    },

    // 小于4次的画折线图
    drawLineChart(points) {
      this.data.ctx.beginPath()
      for (let i = 0; i < points.length; i++) {
        this.data.ctx.lineTo(points[i].x, points[i].y)
        // if (i == 0) {
        //   this.data.ctx.moveTo(points[i].x, points[i].y);
        // } else {
        //   this.data.ctx.lineTo(points[i].x, points[i].y);
        // }
      }
      this.data.ctx.stroke()
      this.data.ctx.closePath()
    },

    // 判断画二次贝尔曲线的参数
    prepareData(i) {
      const controlPoint = this.data.points[i];
      const endPoint = {
        x: (this.data.points[i].x + this.data.points[i + 1].x) / 2,
        y: (this.data.points[i].y + this.data.points[i + 1].y) / 2,
      }
      this.drawLine(this.data.beginPoint, controlPoint, endPoint);
      
    },

    // 画二次贝尔曲线
    drawLine(beginPoint, controlPoint, endPoint) {
      
      this.setData({
        beginPoint: endPoint
      })
      this.data.ctx.beginPath();
      this.data.ctx.moveTo(beginPoint.x, beginPoint.y);
      this.data.ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, endPoint.x, endPoint.y);
      this.data.ctx.stroke();
      this.data.ctx.closePath();
    },

    showDetailEchart(event) {
      console.log(event, 'p-e-chart')
      try {
        let currentHoverShowData = {
          date: event.target.dataset.x.key,
          data: event.target.dataset.x.data
        }
        this.setData({
          currentHoverShowData
        })
      } catch (error) {
        console.log('渲染hover数据报错：', error)
      }
    },
    hoverCanvasUp(event) {
      let _this = this
      my.createSelectorQuery()
      // 子元素id
      .select('#history_echarts').boundingClientRect()
      // // 你的scroll-view的id
      // .select('#scroll-view-area').scrollOffset()
      .exec(rect => {
        let hoverMaskPosition = {}
        if (event.detail.x < 805) {
          hoverMaskPosition = {
            x: event.detail.x - rect[0].left + 5,
            y: event.detail.y - rect[0].top + 5
          }
        } else {
          hoverMaskPosition = {
            x: event.detail.x - rect[0].left - 5 - 230,
            y: event.detail.y - rect[0].top + 5
          }
        }
        _this.setData({
          hoverMaskPosition
        })
      });
    },
    leaveDetailEchart() {
      this.setData({
        hoverMaskPosition: {
          x: 0,
          y: 0
        }
      })
    }
  },
});
