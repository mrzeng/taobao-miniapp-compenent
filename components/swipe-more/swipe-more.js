Component({
  mixins: [],
  data: {
    lunbo:[
      {
        content: '第一个'
      },
      {
        content: '第二个'
      },
      {
        content: '第三个'
      },
    ],

    animation1: '',
    siwpe2Index: -1,
    isCanClick: true,
    timer1: '',
    siwpe2IndexAbs: 1
  },
  props: {},
  didMount() {
    this.animation1 = my.createAnimation()
    this.interval1()
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    over1() {
      clearInterval(this.data.timer1)
    },
    leave2() {
      this.interval1()
    },
    change1(event) {
      if (!this.data.isCanClick) return
      let direction = event.target.dataset.direction
      console.log(direction, this.data.siwpe2Index)
      this.setData({
        siwpe2Index: direction === 'left' ? (this.data.siwpe2Index - 1) : (this.data.siwpe2Index + 1),
        isCanClick: false,
        siwpe2IndexAbs: Math.abs(direction === 'left' ? (this.data.siwpe2Index - 1) : (this.data.siwpe2Index + 1))
      })
      console.log(this.data.siwpe2Index, 'siwpe2Indexsiwpe2Index111111')
      console.log(this.data.siwpe2Index, this.data.siwpe2Index * 500)
      this.animation1.translate(this.data.siwpe2Index * 500, 0).step()
      this.setData({ animation1: this.animation1.export()})
      if (direction != 'left' && this.data.siwpe2Index == 0) {
        this.setData({
          siwpe2Index: -this.data.lunbo.length,
          siwpe2IndexAbs: this.data.lunbo.length
        })
        setTimeout(() => {
          this.animation1
          .translate(this.data.siwpe2Index * 500, 0)
          .step({ duration: 0 })
          this.setData({ animation1: this.animation1.export(), isCanClick: true })
        }, 1000)
        console.log(121212)
      } else if (direction === 'left' && this.data.siwpe2Index == -4) {
        console.log(343434)
        this.setData({
          siwpe2Index: -1
        })
        setTimeout(() => {
          this.animation1
          .translate(this.data.siwpe2Index * 500, 0)
          .step({ duration: 0 })
          this.setData({ animation1: this.animation1.export(), isCanClick: true })
        }, 1000)
      } else {
        setTimeout(() => {
          this.setData({
            isCanClick: true
          })
        }, 1000)
      }
    },
    interval1() {
      let timer1 = setInterval(() => {
        this.setData({
          siwpe2Index: this.data.siwpe2Index - 1,
          siwpe2IndexAbs: Math.abs(this.data.siwpe2Index - 1)
        })
        console.log(this.data.siwpe2Index, 'siwpe2Indexsiwpe2Index')
        this.animation1.translate(this.data.siwpe2Index * 500, 0).step()
        this.setData({ animation1: this.animation1.export()})
        
        if (this.data.siwpe2Index == -4) {
          this.setData({
            siwpe2Index: -1
          })
          setTimeout(() => {
            this.animation1
            .translate(this.data.siwpe2Index * 500, 0)
            .step({ duration: 0 })
            this.setData({ animation1: this.animation1.export() })
          }, 1000)  
        }
        

      }, 3000)
      this.setData({
        timer1
      })
    },
    changeTurn(event) {
      let index = event.target.dataset.index
      this.setData({
        siwpe2Index: -(index + 1),
        siwpe2IndexAbs: index + 1
      })
      this.animation1.translate(this.data.siwpe2Index * 500, 0).step()
      this.setData({ animation1: this.animation1.export()})

    },
  },
});
