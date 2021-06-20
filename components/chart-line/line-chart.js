const app = getApp()
Component({
  mixins: [],
  data: {
    lCanvasId: 'canvas',
    maskCanvasId: 'maskcanvas',
    gridCanvasId: 'gridecanvas',
    ctx: null,
    maskCtx: null,
    grideCtx: null,
    point: [],
    canvasW: 800,
    canvasH: 1100,
    speed: 10, // 画线速度
    clearTimer: '',
    hoverData: {},
    stepW: 0,
    hoverUnit: '',
    typeName: '',
    points: [], // 动画存储点
    isShowMask: false,
  },
  props: {
    options: null,
    canvasId: null,
    moldIndex: 0
  },
  onInit() {
    let _this = this;
    my.getSystemInfo({
      success(res) {
        _this.setData({
          canvasW: 1720 - 510,
          canvasH: res.windowHeight,
        })
        _this.canvasOnReady()
      },
      fail(err) {
        console.log(err)
      }
    })
    if (this.props.canvasId) {
      this.setData({
        lCanvasId: this.props.canvasId
      })
    }

  },
  didMount() { },
  didUpdate() { },
  didUnmount() { },
  methods: {
    // 初始化
    canvasOnReady() {
      this.data.ctx = my.createCanvasContext(this.data.lCanvasId)
      // this.data.maskCtx = my.createCanvasContext(this.data.maskCanvasId)
      this.data.gridCanvasCtx = my.createCanvasContext(this.data.gridCanvasId)
      // this.data.ctx.clearRect(0,0,this.data.canvasW,350);
      let opt = this.props.options
      // this.data.ctx.addEventListener('catchTap', this.onTouchMove, false)
      let typeName = this.props.moldIndex == 0 ? '总花费' :
        this.props.moldIndex == 1 ? '时间' :
          this.props.moldIndex == 2 ? '点击量' :
            this.props.moldIndex == 3 ? '地点' :
              this.props.moldIndex == 4 ? '点击率' :
                this.props.moldIndex == 5 ? '点击转换率' :
                  this.props.moldIndex == 6 ? '总成交额' :
                    this.props.moldIndex == 7 ? '总购物车数' :
                      this.props.moldIndex == 8 ? '总成交数' :
                        this.props.moldIndex == 9 ? '总收藏数' :
                          this.props.moldIndex == 10 ? '投入产出比' :
                            this.props.moldIndex == 11 ? '千次展现花费' : '' // 绘制内容
      this.setData({
        typeName
      })
      if (opt.data[1].data.length == 0) {
        opt.data[1].data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      }
      // 绘制头部
      this.header(this.data.gridCanvasCtx, opt)
      if (opt.data[0].name === '历史') {
        // 绘制蒙层
        // this.drawAnimateMask(this.data.maskCtx)
        this.canvasX(this.data.gridCanvasCtx, opt, 'history')
        this.canvasData(this.data.ctx, opt, opt.data[1])
      } else {
        // 绘制蒙层
        // this.drawAnimateMask(this.data.maskCtx)
        // 绘制X轴
        this.canvasX(this.data.gridCanvasCtx, opt)
        // 绘制昨日曲线
        this.canvasData(this.data.ctx, opt, opt.data[1])
        // 绘制今日曲线
        this.canvasData(this.data.ctx, opt, opt.data[0])
      }
      // 绘制Y轴
      this.canvasY(this.data.gridCanvasCtx, opt)
      this.data.ctx.draw()
      this.data.gridCanvasCtx.draw()
    },
    canvasX(ctx, opt, type) {
      const canvasW = this.data.canvasW
      let step = 0;
      let dataLIst = {
        type: 1, // 1为历史,2为今日实时
        data1: []
      }
      /**
       * {
       *  today: 今日和日期,
       *  yesterday: 昨日和历史
       * }
       */
      if (type == 'history') {
        step = opt.data[1].data.length
        dataLIst.type = 1
      } else {
        step = opt.data[0].data.length > opt.data[1].data.length ? opt.data[0].data.length : opt.data[1].data.length
        dataLIst.type = 2
      }
      opt.data[1].data.forEach((item, i) => {
        dataLIst.data1.push({
          today: opt.data[0].data[i] ? opt.data[0].data[i] : opt.data[0].data[i] === 0 ? 0 : '',
          yesterday: item
        })
      });
      // const step = opt.data[0].data.length > opt.data[1].data.length ? opt.data[0].data.length : opt.data[1].data.length
      const stepW = Math.floor((canvasW - 100) / (step));
      this.setData({
        stepW: stepW,
        hoverData: dataLIst
      })
      console.log('this.data.hoverData：', this.data.hoverData)
      // 绘制基础横线
      ctx.setFillStyle('#85878B');
      ctx.setTextAlign('center');
      ctx.fillRect(0, 350, canvasW, 1);

      for (let i = 0; i < step; i++) {
        ctx.fillRect(i * stepW + stepW / 2, 351, 1, 5);
        if (type == 'history') {
          ctx.fillText(opt.data[0].data[i], i * stepW + stepW / 2, 370);
        } else {
          ctx.fillText(i, i * stepW + stepW / 2, 370);
        }
      }
    },
    canvasY(ctx, opt) {
      const canvasW = this.data.canvasW
      let maxNum = '';
      if (opt.data[0].name === '历史') {
        maxNum = Math.max(...opt.data[1].data);
      } else {
        maxNum = Math.max(...opt.data[0].data, ...opt.data[1].data);
      }
      // const maxNum = Math.max(...opt.data[0].data, ...opt.data[1].data);
      const YMAX = maxNum <= 1 ? 1 : maxNum <= 10 ? 10 : maxNum <= 100 ? 100 : Math.ceil(maxNum / 1000) * 1000;
      const stepH = 280 / 5;
      // 绘制横线
      ctx.setFillStyle('#BABBC1');
      for (let i = 1; i <= 5; i++) {
        ctx.fillRect(10, 350 - i * stepH, canvasW - 20, 1);
      }
      // 绘制Y轴刻度
      ctx.setFillStyle('#85878B');
      ctx.setTextAlign('right');
      for (let i = 1; i <= 5; i++) {
        ctx.fillText(((opt.unit == '元' || opt.type == '4' || opt.type == '5' || opt.type == '10') ? (YMAX / 5 * i).toFixed(2) : ((YMAX / 5 * i) >= 1) ? YMAX / 5 * i : (YMAX / 5 * i).toFixed(1)) + `${opt.unit || ''}`, canvasW - 50, 340 - i * stepH);
      }
    },
    header(ctx, opt) {
      // const canvasW = this.data.canvasW
      ctx.setFillStyle('#85878B')
      ctx.setTextAlign('left')
      if (opt.data[0].name == '历史') {
        ctx.setFillStyle(opt.data[0].color)
        ctx.fillRect(10, 10, 24, 10)
        ctx.fillText(opt.data[0].name, 40, 18)
      } else {
        ctx.setFillStyle(opt.data[0].color)
        ctx.fillRect(10, 10, 24, 10)
        ctx.setFillStyle(opt.data[1].color)
        ctx.fillRect(80, 10, 24, 10)
        ctx.fillText(opt.data[0].name, 40, 18)
        ctx.fillText(opt.data[1].name, 110, 18)
      }
      this.data.hoverUnit = opt.unit

      this.setData({
        hoverUnit: opt.unit
      })
      // ctx.setTextAlign('right')
      // ctx.fillText(`单位：${opt.unit || '-'}`, canvasW - 10, 18)
    },
    canvasData(ctx, opt, data) {
      const canvasW = this.data.canvasW
      const stepMix = data.data.length
      let _this = this
      let step = 0;
      let maxNum = 0;
      if (data.name === '历史') {
        step = opt.data[1].data.length
        maxNum = Math.max(...opt.data[1].data);
      } else {
        step = opt.data[0].data.length > opt.data[1].data.length ? opt.data[0].data.length : opt.data[1].data.length
        maxNum = Math.max(...opt.data[0].data, ...opt.data[1].data);
      }
      // const step = opt.data[0].data.length > opt.data[1].data.length ? opt.data[0].data.length : opt.data[1].data.length
      const stepW = Math.floor((canvasW - 100) / (step));
      const YMAX = maxNum <= 1 ? 1 : maxNum <= 10 ? 10 : maxNum <= 100 ? 100 : Math.ceil(maxNum / 1000) * 1000;
      ctx.setLineJoin('miter');
      ctx.lineJoin = "round";
      ctx.setMiterLimit(1);
      ctx.setLineWidth(2);
      ctx.setFillStyle(data.color);
      ctx.setStrokeStyle(data.color);
      let pointsArr = []
      
      ctx.save()
      ctx.beginPath();
      for (let i = 0; i < stepMix; i++) {
        ctx.lineTo(stepW / 2 + i * stepW, 350 - Math.round((data.data[i] / YMAX) * 280));
        pointsArr.push([stepW / 2, 350 - Math.round((data.data[i] / YMAX) * 280) - 30])
        
      }
      ctx.stroke()
      ctx.restore()
      if (data.name != '历史') {
        ctx.save()
        console.log('进入渐变区域')
        ctx.lineTo(stepW / 2 + (stepMix - 1) * stepW, 350)
        ctx.lineTo(stepW / 2, 350)
        console.log(stepW / 2 + (stepMix - 1) * stepW, stepW, stepMix.length, '查看其它的的的的')
        ctx.globalAlpha = 0.3
        let gradient = ctx.createLinearGradient(0, 0, 0, 350)
        gradient.addColorStop(0, data.name == '今日' ? '#f05e5e' : data.name == '昨日' ? '#ebae56' : '')
        gradient.addColorStop(1, '#fff')
        ctx.setFillStyle(gradient)
        ctx.fill()
        ctx.restore()
      }
      ctx.save()
      ctx.beginPath();
      console.log(data.color, 'opt.data[0]')
      ctx.setFillStyle(data.color)
      for (let i = 0; i < stepMix; i++) {
        ctx.save()
        ctx.moveTo(stepW / 2 + i * stepW + 1, 350 - Math.round((data.data[i] / YMAX) * 280))
        ctx.arc(stepW / 2 + i * stepW + 1, 350 - Math.round((data.data[i] / YMAX) * 280), 1.5, 0, 2 * Math.PI)
        ctx.stroke()
        ctx.restore()
      }
      
      this.setData({
        points: pointsArr
      })
      ctx.restore()
      // 在加载完数据后加上效果蒙版
      this.setData({
        isShowMask: true
      })
      setTimeout(() => {
        this.setData({
          isShowMask: false
        })
      }, 1500)
    },
    // 画二次贝尔曲线
    drawCurve() {},
    // 画动画蒙版
    drawAnimateMask(ctx) {
      // this.data.ctx.save();
      // 每一帧蒙版移动的距离 
      let moveW = this.data.canvasW / (2 * 1000) * 16
      let x = 0
      // ctx.fillRect(0, 0, this.data.canvasW, this.data.canvasH);
      ctx.setFillStyle('red')
      let timer = setInterval(() => {
        if (x >= this.data.canvasW * 1.5) {
          // ctx.fillRect(0, 0, 0, 0);
          clearInterval(timer)
        }
        console.log(x, 'x')
        ctx.transform(1, 1, 0, 0, x, 0)
        x += parseFloat(moveW)
      }, 16)
        ctx.draw()
    },
  }
});
