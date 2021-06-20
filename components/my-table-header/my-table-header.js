Component({
  mixins: [],
  data: {
    isPlanSettingShow: false,
    fieldDrag: [
      {},
      {},
      {}
    ], // 数据拖拽
    showField: [
      {},
      {},
      {},
      {},
      {},
      {}
    ],
    // 计划列表表头拖拽排序
    isPlanTableDrag: false, // 计划表头是否开始拖拽
    currengPlanTranslateS: 0, // 当前计划纵向滑动开始位置
    currengPlanTranslateE: 0, // 当前计划纵向滑动结束位置
    currengPlanTranslateY: 0, // 当前计划纵向滑动距离
    currentPlanTableIndex: -1, // 当前拖拽的表头
    isChangeEvent: false, // 处理change事件触发了外层的onTap事件
    qnScreenH: 0,
  },
  props: {
    babyTableHeaderH: 0,
    type: '', // 判断是哪一个功能用的这个组件;chart:详情图表表头展示,baby详情baby列表
  },
  didMount() {
    let _this = this
    // 由于宝贝列表需要去除推广宝贝数，所以这这里重新赋值，而且也不会影响到本地存储
    let babyshowField = [
      {
        name: '展现量',
        intro: '截止当前时',
        isDefaultChecked: true,
        sort: 5,
        dataIndex: 'total_to_show',
        isSelect: true,
        isDetailHeaderShow: true
      },
      {},{},{},{},{},{},{},{}
      
    ]
   
    if (this.props.type == 'baby') {
      this.setData({
        showField: babyshowField
      })
    }

    my.getSystemInfo({
      success: (res) => {
        console.log(res, 'res111')
        _this.setData({
          qnScreenH: res.screenHeight
        })
      }
    })
    if (this.props.type == 'chart') {
      if (my.getStorageSync({ key: 'detail_chart' }) && my.getStorageSync({ key: 'detail_chart' }).data && my.getStorageSync({ key: 'detail_chart' }).data.field) {
        let fieldDrag = JSON.parse(my.getStorageSync({ key: 'detail_chart' }).data.field)
        this.setData({
          fieldDrag
        })
      }
      if (my.getStorageSync({ key: 'detail_chart_show' }) && my.getStorageSync({ key: 'detail_chart_show' }).data && my.getStorageSync({ key: 'detail_chart_show' }).data.field) {
        let showField = JSON.parse(my.getStorageSync({ key: 'detail_chart_show' }).data.field)
        this.setData({
          showField
        })
      }
      
      console.log(this.data.fieldDrag, this.data.showField, this.props.type, 'field=type', this.props.type == 'chart', this.props.type == 'baby')
    } else if (this.props.type == 'baby') {
      if (my.getStorageSync({ key: 'detail_baby' }) && my.getStorageSync({ key: 'detail_baby' }).data && my.getStorageSync({ key: 'detail_baby' }).data.field) {
        let fieldDrag = JSON.parse(my.getStorageSync({ key: 'detail_baby' }).data.field)
        fieldDrag = fieldDrag.filter(d => d.name != '推广宝贝数')
        this.setData({
          fieldDrag
        })
      }
      if (my.getStorageSync({ key: 'detail_baby_show' }) && my.getStorageSync({ key: 'detail_baby_show' }).data && my.getStorageSync({ key: 'detail_baby_show' }).data.field) {
        let showField = JSON.parse(my.getStorageSync({ key: 'detail_baby_show' }).data.field)
        showField = showField.filter(d => d.name != '推广宝贝数')
        this.setData({
          showField
        })
      }
      console.log(this.data.fieldDrag, this.data.showField, this.props.type, 'field=type', this.props.type == 'chart', this.props.type == 'baby')
    }


  },
  didUpdate() {},
  didUnmount() {
    // this.onHandlePlanHeadReset()
  },
  methods: {
    /**
     * 计划列表表头拖拽排序
     * @param {*} event 
     */
    planDragStart(event) {
      let index = event.target.dataset.index
      this.setData({
        isPlanTableDrag: true,
        currentPlanTableIndex: index,
        currengPlanTranslateS: event.detail.y
      })
      console.log(event, 'start')
    },
    planDragMove(event) {
      if (!this.data.isPlanTableDrag) return
      this.setData({
        currengPlanTranslateY: event.detail.y - this.data.currengPlanTranslateS,
      })
      // console.log(event, 'move')
    },
    planDragEnd(event) {
      this.setData({
        isPlanTableDrag: false,
        currengPlanTranslateE: event.detail.y,
        currentPlanTableIndex: -1
      })
      // 列表距离顶部距离：this.props.babyTableHeaderH
      // 列表中的每个单元：36，间距（margin）：4
      // 由于是从0开始，所以直接取当前项商的值
      let sIndex = (this.data.currengPlanTranslateS - this.props.babyTableHeaderH) / 40
      let eIndex = (event.detail.y - this.props.babyTableHeaderH) / 40
      let tabelHead = this.data.fieldDrag
      console.log(tabelHead, 'tabelHead')
      console.log(this.data.currengPlanTranslateS, this.props.babyTableHeaderH, event.detail.y, sIndex, eIndex)
      let delItem = tabelHead.splice(sIndex, 1)
      tabelHead.splice(eIndex, 0, ...delItem)
      this.setData({
        fieldDrag: tabelHead
      })

      if (this.props.type == 'chart') {
        my.setStorageSync({
          key: 'detail_chart',
          data: {
            field: JSON.stringify(this.data.fieldDrag),
          }
        })
      } else if (this.props.type == 'baby') {
        my.setStorageSync({
          key: 'detail_baby',
          data: {
            field: JSON.stringify(this.data.fieldDrag),
          }
        })
      }

      console.log(this.data.fieldDrag, 'fieldDrag')
      this.props.onHandleCommonTableHeader(this.data.fieldDrag)
    },

    // 计划table表头重置
    onHandlePlanHeadReset() {
      let showField = this.data.showField
      let defaultFieldDrag = [
        {
          name: '展现量',
          intro: '截止当前时参考。',
          isDefaultChecked: true,
          sort: 5,
          dataIndex: 'total_to_show',
          isSelect: true,
          isDetailHeaderShow: true
        },{},{},{},{},{},{}
      ]

      showField.forEach((el, i) => {
        el.isSelect = i < 8 ? true : false
        el.isDefaultChecked = i < 8 ? true : false
      })
      this.setData({
        fieldDrag: [],
        showField,
      })

      this.setData({
        fieldDrag: defaultFieldDrag
      })

      if (this.props.type == 'chart') {
        my.setStorageSync({
          key: 'detail_chart',
          data: {
            field: JSON.stringify(this.data.fieldDrag),
          }
        })
        my.setStorageSync({
          key: 'detail_chart_show',
          data: {
            field: JSON.stringify(this.data.showField),
          }
        })
      } else if (this.props.type == 'baby') {
        my.setStorageSync({
          key: 'detail_baby',
          data: {
            field: JSON.stringify(this.data.fieldDrag),
          }
        })
        my.setStorageSync({
          key: 'detail_baby_show',
          data: {
            field: JSON.stringify(this.data.showField),
          }
        })
      }

      this.props.onHandleCommonTableHeader(this.data.fieldDrag)
    },
    // 计划列表设置中情况选中的表头清空
    onHandlePlanHeadClear() {
      let showField = this.data.showField
      showField.forEach(el => {
        el.isSelect = false
        el.isDefaultChecked = false
      })
      this.setData({
        fieldDrag: [],
        showField
      })
      if (this.props.type == 'chart') {
        my.setStorageSync({
          key: 'detail_chart',
          data: {
            field: JSON.stringify(this.data.fieldDrag),
          }
        })
        my.setStorageSync({
          key: 'detail_chart_show',
          data: {
            field: JSON.stringify(this.data.showField),
          }
        })
      } else if (this.props.type == 'baby') {
        my.setStorageSync({
          key: 'detail_baby',
          data: {
            field: JSON.stringify(this.data.fieldDrag),
          }
        })
        my.setStorageSync({
          key: 'detail_baby_show',
          data: {
            field: JSON.stringify(this.data.showField),
          }
        })
      }
      this.props.onHandleCommonTableHeader(this.data.fieldDrag)
    },
    // 设置计划列表头部显示的弹窗
    // 在详情页图表显示头部时，如果有被详情选中的就直接去除详情选中，如果被清空，则去全部选中被消除
    // ，但是在关闭前保留的2个中选第一个为选中项
    setFieldShow(event) {
      console.log(event, 'setFieldShow')
      let temp = this.data.showField
      let item = event.target.dataset.item
      
      temp.forEach(el => {
        if(el.name == item) {
          if (el.isDetailHeaderShow) {
            el.isDetailHeaderShow = !el.isDetailHeaderShow
          }
          el.isSelect = !el.isSelect
          return
        }
      })
      let tempFieldDrag = temp.filter(el => el.isSelect)
      this.setData({
        showField: temp,
        fieldDrag: tempFieldDrag,
        isChangeEvent: event.target.dataset.event == 'change' ? true : false
      })
      if (this.props.type == 'chart') {
        my.setStorageSync({
          key: 'detail_chart',
          data: {
            field: JSON.stringify(this.data.fieldDrag),
          }
        })
        my.setStorageSync({
          key: 'detail_chart_show',
          data: {
            field: JSON.stringify(this.data.showField),
          }
        })
      } else if (this.props.type == 'baby') {
        my.setStorageSync({
          key: 'detail_baby',
          data: {
            field: JSON.stringify(this.data.fieldDrag),
          }
        })
        my.setStorageSync({
          key: 'detail_baby_show',
          data: {
            field: JSON.stringify(this.data.showField),
          }
        })
      }
      this.props.onHandleCommonTableHeader(this.data.fieldDrag)
      console.log(temp, this.data.showField, event, tempFieldDrag, this.data.fieldDrag)
      console.log(my.getStorageSync({key: 'detail_baby'}), 'detail_baby', my.getStorageSync({key: 'detail_baby_show'}))
      
    },
    openThis(type) {
      if (this.data.isChangeEvent) {
        this.setData({
          isChangeEvent: false
        })
      }

      // 必须至少2个选项才可以关闭
      if (this.data.isPlanSettingShow && this.data.fieldDrag.length < 2) {
        my.alert({
          content: '请选择至少2个数据项！'
        })
        return
      }
      if (this.data.fieldDrag.filter(el => el.isDetailHeaderShow).length == 0) {
        let temp = this.data.fieldDrag
        let fieldDrag = temp[0].isDetailHeaderShow = true
        this.props.onHandleCommonTableHeader(this.data.fieldDrag)
        console.log(this.data.fieldDrag, '关闭钱的fieldDrag')
      }
      
      this.setData({
        isPlanSettingShow: type == 'close' ? false : !this.data.isPlanSettingShow
      })
    },
    
  },
});
