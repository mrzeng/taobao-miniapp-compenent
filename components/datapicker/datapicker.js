Component({
  mixins: [],
  data: {
    isShowFastBtn: false,
    isSelect: 0,
    fastPiker: [
      {
        value: 'today',
        label: '今天'
      },
      {
        value: 'yesterday',
        label: '昨天'
      },
      {
        value: 'past_3day',
        label: '过去3天'
      },
      {
        value: 'past_7day',
        label: '过去7天'
      },
      {
        value: 'past_15day',
        label: '过去15天'
      },
      {
        value: 'past_month',
        label: '过去一个月'
      }
    ],
    sTime: new Date().getFullYear() + "-" +
          ((new Date().getMonth() + 1)> 9 ? (new Date().getMonth() + 1) : "0" + (new Date().getMonth() + 1)) + "-" +
          (new Date().getDate()> 9 ? (new Date().getDate()) : "0" + (new Date().getDate())),
    eTime: new Date().getFullYear() + "-" +
          ((new Date().getMonth() + 1)> 9 ? (new Date().getMonth() + 1) : "0" + (new Date().getMonth() + 1)) + "-" +
          (new Date().getDate()> 9 ? (new Date().getDate()) : "0" + (new Date().getDate()))
  },
  props: {
    source: ''
  },
  didMount() {
    // source存时fastPiker重新赋值
    this.setData({
      fastPiker: 
        this.props.source === 'plan' ? [
          {
            value: 'today',
            label: '今天'
          },
          {
            value: 'yesterday',
            label: '昨天'
          },
          {
            value: 'past_3day',
            label: '过去3天'
          },
          {
            value: 'past_7day',
            label: '过去7天'
          },
          {
            value: 'past_15day',
            label: '过去15天'
          },
          {
            value: 'past_month',
            label: '过去一个月'
          }
        ] : [
          {
            value: 'past_3day',
            label: '过去3天'
          },
          {
            value: 'past_7day',
            label: '过去7天'
          },
          {
            value: 'past_15day',
            label: '过去15天'
          },
          {
            value: 'past_month',
            label: '过去一个月'
          }
        ],
      isSelect: this.props.source === 'detail' ? 1 : 0
    })

    let today = new Date().getFullYear() + "-" +
          ((new Date().getMonth() + 1)> 9 ? (new Date().getMonth() + 1) : "0" + (new Date().getMonth() + 1)) + "-" +
          (new Date().getDate()> 9 ? (new Date().getDate()) : "0" + (new Date().getDate()))
    let now = new Date().getTime() - 24 * 60 * 60 * 1000;
    let nowDate = new Date(now).getFullYear() + "-" +
        ((new Date(now).getMonth() + 1)> 9 ? (new Date(now).getMonth() + 1) : "0" + (new Date(now).getMonth() + 1)) + "-" +
        (new Date(now).getDate()> 9 ? (new Date(now).getDate()) : "0" + (new Date(now).getDate())); //字符串拼接转格式：例如2018-08-19
    
    // 过去3天
    let time = new Date().getTime() - 24 * 60 * 60 * 1000 * 3;
    let past_3day = new Date(time); // 获取的是前一天日期
    past_3day = past_3day.getFullYear() + "-" +
    ((past_3day.getMonth() + 1)> 9 ? (past_3day.getMonth() + 1) : "0" + (past_3day.getMonth() + 1)) + "-" +
    (past_3day.getDate()> 9 ? (past_3day.getDate()) : "0" + (past_3day.getDate())); //字符串拼接转格式：例如2018-08-19

    // 过去7天
    let time7 = new Date().getTime() - 24 * 60 * 60 * 1000 * 7;
    let past_7day = new Date(time7); // 获取的是前一天日期
    past_7day = past_7day.getFullYear() + "-" +
    ((past_7day.getMonth() + 1)> 9 ? (past_7day.getMonth() + 1) : "0" + (past_7day.getMonth() + 1)) + "-" +
    (past_7day.getDate()> 9 ? (past_7day.getDate()) : "0" + (past_7day.getDate())); //字符串拼接转格式：例如2018-08-19
    
    this.setData({
      sTime: this.props.source === 'plan' ? today : this.props.source === 'detail' ? past_7day : past_3day,
      eTime: this.props.source === 'plan' ? today : nowDate
    })
    this.props.onChangeChild(this.data.sTime, this.data.eTime);
    this.startanimation()
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    onVisibleChange(value) {
      this.setData({
        isShowFastBtn: value.detail.value ? true : false
      })
    },
    changeDate(visible, reason) {
      let sTime = new Date(visible.detail.value[0]).getTime()
      let eTime = new Date(visible.detail.value[1]).getTime()
      let range = (eTime - sTime) > 30 * 24 * 60 * 60 * 1000
      console.log(range, eTime - sTime, 30 * 24 * 60 * 60 * 1000, 'range_date')
      if (range) {
        my.alert({
          content: '选择时间不能超过30天！'
        })
        return
      }
      let nowTime = new Date().getTime()
      // 前一天
      let yTime = new Date().getTime() - 24 * 60 * 60 * 1000;
      let yDate = new Date(yTime).getFullYear() + "-" +
          ((new Date(yTime).getMonth() + 1)> 9 ? (new Date(yTime).getMonth() + 1) : "0" + (new Date(yTime).getMonth() + 1)) + "-" +
          (new Date(yTime).getDate()> 9 ? (new Date(yTime).getDate()) : "0" + (new Date(yTime).getDate())); //字符串拼接转格式：例如2018-08-19
      let time = new Date().getTime() - 24 * 60 * 60 * 1000 * 3;
      let past_3day = new Date(time); // 获取的是前一天日期
        past_3day = past_3day.getFullYear() + "-" +
        ((past_3day.getMonth() + 1)> 9 ? (past_3day.getMonth() + 1) : "0" + (past_3day.getMonth() + 1)) + "-" +
        (past_3day.getDate()> 9 ? (past_3day.getDate()) : "0" + (past_3day.getDate())); //字符串拼接转格式：例如2018-08-19
        
      if (this.props.source === 'detail' && Math.abs(eTime - sTime) < 24 * 60 * 60 *1000 * 3) {
        my.alert({
          content: '选择日期间隔不能低于3天！'
        })
        return
      }
      if (nowTime < eTime || nowTime < sTime) {
        my.alert({
          content: '选择日期不能包含或超出今日'
        })
        this.setData({
          sTime: past_3day,
          eTime: yDate
        })
      } else if (Math.abs(eTime - sTime) < 24 * 60 * 60 *1000) {
        my.alert({
          content: '选择日期间隔至少大于1天'
        })
        
        this.setData({
          sTime: past_3day,
          eTime: yDate
        })
      } else {
        this.setData({
          sTime: eTime - sTime ? visible.detail.value[0] : visible.detail.value[1],
          eTime: eTime - sTime ? visible.detail.value[1] : visible.detail.value[0]
        })
      }
      this.props.onChangeChild(this.data.sTime, this.data.eTime);
    },
    selectRangeDate(e) {
      this.setData({
        isSelect: e.target.dataset
      })
      // 前一天
      let now = new Date().getTime() - 24 * 60 * 60 * 1000;
      let nowDate = new Date(now).getFullYear() + "-" +
          ((new Date(now).getMonth() + 1)> 9 ? (new Date(now).getMonth() + 1) : "0" + (new Date(now).getMonth() + 1)) + "-" +
          (new Date(now).getDate()> 9 ? (new Date(now).getDate()) : "0" + (new Date(now).getDate())); //字符串拼接转格式：例如2018-08-19
      switch(e.target.dataset.rangedate) {
        case 'today':
          var time = new Date().getTime();
          var today = new Date(time); // 获取的是前一天日期
          today = today.getFullYear() + "-" +
          ((today.getMonth() + 1)> 9 ? (today.getMonth() + 1) : "0" + (today.getMonth() + 1)) + "-" +
          (today.getDate()> 9 ? (today.getDate()) : "0" + (today.getDate())); //字符串拼接转格式：例如2018-08-19
          this.setData({
            sTime: today,
            eTime: today
          })
          break
        case 'yesterday':
          var time = new Date().getTime() - 24 * 60 * 60 * 1000;
          var yesday = new Date(time); // 获取的是前一天日期
          yesday = yesday.getFullYear() + "-" +
          ((yesday.getMonth() + 1)> 9 ? (yesday.getMonth() + 1) : "0" + (yesday.getMonth() + 1)) + "-" +
          (yesday.getDate()> 9 ? (yesday.getDate()) : "0" + (yesday.getDate())); //字符串拼接转格式：例如2018-08-19
          this.setData({
            sTime: yesday,
            eTime: nowDate
          })
          break
        case 'past_3day':
          var time = new Date().getTime() - 24 * 60 * 60 * 1000 * 3;
          var past_3day = new Date(time); // 获取的是前一天日期
          past_3day = past_3day.getFullYear() + "-" +
          ((past_3day.getMonth() + 1)> 9 ? (past_3day.getMonth() + 1) : "0" + (past_3day.getMonth() + 1)) + "-" +
          (past_3day.getDate()> 9 ? (past_3day.getDate()) : "0" + (past_3day.getDate())); //字符串拼接转格式：例如2018-08-19
          this.setData({
            sTime: past_3day,
            eTime: nowDate
          })
          break
        case 'past_7day':
          var time = new Date().getTime() - 24 * 60 * 60 * 1000 * 7;
          var past_7day = new Date(time); // 获取的是前一天日期
          past_7day = past_7day.getFullYear() + "-" +
          ((past_7day.getMonth() + 1)> 9 ? (past_7day.getMonth() + 1) : "0" + (past_7day.getMonth() + 1)) + "-" +
          (past_7day.getDate()> 9 ? (past_7day.getDate()) : "0" + (past_7day.getDate())); //字符串拼接转格式：例如2018-08-19
          this.setData({
            sTime: past_7day,
            eTime: nowDate
          })
          break
        case 'past_15day':
          var time = new Date().getTime() - 24 * 60 * 60 * 1000 * 15;
          var past_15day = new Date(time); // 获取的是前一天日期
          past_15day = past_15day.getFullYear() + "-" +
          ((past_15day.getMonth() + 1)> 9 ? (past_15day.getMonth() + 1) : "0" + (past_15day.getMonth() + 1)) + "-" +
          (past_15day.getDate()> 9 ? (past_15day.getDate()) : "0" + (past_15day.getDate())); //字符串拼接转格式：例如2018-08-19
          this.setData({
            sTime: past_15day,
            eTime: nowDate
          })
          break
        case 'past_month':
          var time = new Date().getTime() - 24 * 60 * 60 * 1000 * 30;
          var past_month = new Date(time); // 获取的是前一天日期
          past_month = past_month.getFullYear() + "-" +
          ((past_month.getMonth() + 1)> 9 ? (past_month.getMonth() + 1) : "0" + (past_month.getMonth() + 1)) + "-" +
          (past_month.getDate()> 9 ? (past_month.getDate()) : "0" + (past_month.getDate())); //字符串拼接转格式：例如2018-08-19
          this.setData({
            sTime: past_month,
            eTime: nowDate
          })
          break
        default:
          break
      }
      
      this.props.onChangeChild(this.data.sTime, this.data.eTime);
    },
    
    startanimation () {
      var animation = my.createAnimation({
        transformOrigin: "top right",
        duration: 3000,
        timeFunction: "ease-in-out",
        delay: 100,
      })
      animation.scale(3,3).rotate(60).step();
      this.setData({
        myAnimation: animation.export()
      });
    }

  }
});
