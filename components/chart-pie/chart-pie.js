Component({
  mixins: [],
  data: {
    ctx: '',
    x: 0,
    y: 0,
    r: 242,
    introLineArr: [],
    colors: ['#fb6b67', '#47d0a8', '#4797ff', '#ff965d', '#cd6eff', '#fcb844'],
    tempbabySource : [
      {
        total_to_show: 234,
        title: '123'
      },
      {
        total_to_show: 0,
        title: '222'
      },
      {
        total_to_show: 78,
        title: '333'
      },
      {
        total_to_show: 150,
        title: '444'
      },
      {
        total_to_show: 0,
        title: '555'
      },
      {
        total_to_show: 40,
        title: '666'
      },
      {
        total_to_show: 70,
        title: '777'
      },
      {
        total_to_show: 20,
        title: '888'
      },
    ],
    handledDataSource: [],
  },
  props: {
    canvasId: '',
    showAttrs: [],
    babySource: []
  },
  didMount() {
    this.setData({
      introLineArr: []
    })

    let arr = []
    if (this.props.showAttrs.length == 0) {
      arr = []
    } else {
      this.data.ctx = my.createCanvasContext(this.props.canvasId)
      // 在至少有一个维度的时候处理数据

      let tempBabySource = []
      // 当this.props.babySource中的属性值为0时，归到其他类，当arr里面的数据长度大于等于5时其他数据归到其他类
      // this.props.babySource这个数据按照占比从大到小排序
     
      console.log(this.props.babySource, 'this.props.babySource11')
 
      tempBabySource = this.props.babySource
      console.log(tempBabySource, 'this.props.babySource22')
      tempBabySource.sort((a, b) => {
        return parseFloat(b[this.props.showAttrs[0]]) - parseFloat(a[this.props.showAttrs[0]])
      })

      // tempBabySource的长度
      let len1 = tempBabySource.length
      // tempBabySource中为0的长度
      let len2 = tempBabySource.filter(d => {
        return (d[this.props.showAttrs[0]] == 0 || d[this.props.showAttrs[0]] == '0.00')
      }).length

      // 如果所选数据都为0时，不执行绘图
      if (len1 == len2) return

      if (len1 - len2 > 5) {
        let temp = []
        let delIndex = []
        tempBabySource.forEach((d, i) => {
          if (i >= 5) {
            temp.push(d[this.props.showAttrs[0]])
            delIndex.push(i)
          }
        })
        delIndex.sort((a, b) => b - a)
        delIndex.forEach(d => {
          tempBabySource.splice(d, 1)
        })
        
        let sum = this.sum(temp)
        tempBabySource.push({
          title: '其他',
          qt: sum
        })
      } else {
        
        if (len2 > 0) {
          let temp = []
          let delIndex = []
          tempBabySource.forEach((d, i) => {
            if (d[this.props.showAttrs[0]] == 0 || d[this.props.showAttrs[0]] == '0.00') {
              temp.push(d[this.props.showAttrs[0]])
              delIndex.push(i)
            }
          })
          delIndex.sort((a, b) => b - a)
          delIndex.forEach(d => {
            tempBabySource.splice(d, 1)
          })
          tempBabySource.push({
            title: '其他',
            qt: 0
          })
        }
      }
      // let temp = tempBabySource.filter(d => {
      //   return (d[this.props.showAttrs[0]] == 0 || d[this.props.showAttrs[0]] == '0.00')
      // })
      console.log(len1, len2, 'len1-len2')

      console.log(tempBabySource, 'tempBabySource')

      
      tempBabySource.forEach((item, i) => {
        if (item.qt || item.qt == 0) {
          arr.push(item['qt'])
        } else {
          arr.push(item[this.props.showAttrs[0]])
        }
      })
      this.setData({
        handledDataSource: tempBabySource
      })
      // this.data.tempbabySource.forEach((item, i) => {
      //   arr.push(item[this.props.showAttrs[0]])
      // })
      // 移动坐标系到圆点位置
      this.data.ctx.translate(805, 319.5)
      
      console.log(arr, 'arrarr')
      // arr = [203, 100]
      let s = 0
      arr.forEach((d, i) => {
        s += d
        this.drawFan(this.data.ctx, arr, i, s)
      })
      this.data.ctx.save()

      this.introLine()

      this.data.ctx.draw()
    }
    
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    drawFan(ctx, arr, num, ss) {
      // ctx.arc(x, y, 100, startAngle, endAngle, true)
      console.log(ctx, arr, num, ss, 'ctx, arr, num, ss')
      ctx.beginPath()
      let s = this.sum(arr)
      let q = (arr[num] / s)
      let l = Math.PI / 180 * 1
      
      // 起始角度
      let sa = num == 0 ? (-0.5 * Math.PI) : (-0.5 * Math.PI + Math.PI * 2 * ((ss - arr[num]) / s))

      // 结束角度
      let ea = Math.PI * 2 * (ss) / s + (-0.5 * Math.PI)
      let introLineArr = this.data.introLineArr
      let tempIntroLine = sa + (ea -sa) * 0.3
      introLineArr.push(tempIntroLine)
      this.setData({
        introLineArr: introLineArr
      })
      console.log(sa, ea, arr[num], 'sa-ea')
      ctx.fillStyle = this.data.colors[num]
      // ctx.strokeStyle = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`
      ctx.arc(this.data.x, this.data.y, this.data.r, sa, ea, false)
      ctx.lineTo(this.data.x, this.data.y)
      ctx.closePath()
      ctx.fill()
    },
    sum (arr) {
      return arr.reduce((prev, cur) => prev + cur)
    },
    /**
     * 已知以中心为(a,b)半径为r的圆，可以得出圆的方程为：(x-a)的平方 + (x-b)的平方 = r的平方
     * Math.pow((x-a),2)+Math.pow((x-b),2)=Math.pow(r,2)
     * 
     * Math.sin(a) = y / r
     * Math.cos(a) = x / r
     * 
     * =>
     * 
     * x = r * Math.cos(a)
     * y = r * Math.sin(a)
     * 
     */
    // 画说明线条
    introLine() {
      for(let i = 0, len = this.data.introLineArr.length; i < len; i++) {
        
        // 除去值为0或者0.00的情况
        // if (parseFloat(this.props.babySource[i][this.props.showAttrs[0]]) == 0 || parseFloat(this.props.babySource[i][this.props.showAttrs[0]]) == '0.00') continue

        this.data.ctx.beginPath()
        this.data.ctx.strokeStyle = this.data.colors[i]
        this.data.ctx.moveTo(this.data.x, this.data.y)
        this.data.ctx.lineTo(this.data.r * Math.cos(this.data.introLineArr[i]) * 1.15, this.data.r * Math.sin(this.data.introLineArr[i]) * 1.15)
        console.log(this.data.handledDataSource, this.data.introLineArr, this.data.introLineArr[i], this.data.r * Math.cos(this.data.introLineArr[i]) * 1.15, this.data.r * Math.sin(this.data.introLineArr[i]) * 1.15, i, 'iiiii')
        this.data.ctx.font = '12px "微软雅黑"'
        this.data.ctx.fillStyle = this.data.colors[i]
        this.data.ctx.textBaseline = "bottom"
        
        if (this.data.r * Math.cos(this.data.introLineArr[i]) * 1.15 < 0) {
          this.data.ctx.textAlign = "right"
          this.data.ctx.fillText(this.data.handledDataSource[i].title.length <= 6 ? this.data.handledDataSource[i].title : this.data.handledDataSource[i].title.substr(0, 6) + '...', this.data.r * Math.cos(this.data.introLineArr[i]) * 1.15 - 20, this.data.r * Math.sin(this.data.introLineArr[i]) * 1.15 + 5 )          
        } else {
          this.data.ctx.textAlign = "left"
          this.data.ctx.fillText(this.data.handledDataSource[i].title.length <= 6 ? this.data.handledDataSource[i].title : this.data.handledDataSource[i].title.substr(0, 6) + '...', this.data.r * Math.cos(this.data.introLineArr[i]) * 1.15 + 20, this.data.r * Math.sin(this.data.introLineArr[i]) * 1.15 + 5 )
        }
        
        // this.data.ctx.fillText(this.props.babySource[i].title, this.data.r * Math.cos(this.data.introLineArr[i]) * 1.15 + 20, this.data.r * Math.sin(this.data.introLineArr[i]) * 1.15 + 5 )
        this.data.ctx.stroke()
        // console.log(this.props.babySource[i].title)
        this.data.ctx.restore()
        // this.data.ctx.closePath()
      }
    },

  },
});
