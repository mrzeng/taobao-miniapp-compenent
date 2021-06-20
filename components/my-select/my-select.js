Component({
  mixins: [],
  data: {
    isUnfold: false,
    list: null,
    key: '',
    sPlaceholder: '',
    sValue: '',
    sIndex: 0
  },
  props: {
    dataList: [], // 选择器数据，必须
    labelKey: 'label', // 选择器展示字段,默认为label
    placeholder: '请选择', // 选择器无值默认提示,默认为‘请选择’
    dataIndex: 0 // 选择器初始选中索引，默认为0
  },
  onInit() {
    if (this.props.dataList && this.props.dataList instanceof Array) {
      const dataIndex = this.props.dataIndex && this.props.dataIndex < this.props.dataList.lenght ? this.props.dataIndex : 0
      const key = this.props.labelKey
      this.setData({
        list: this.props.dataList,
        key: this.props.labelKey,
        sPlaceholder: this.props.placeholder,
        sIndex: dataIndex,
        sValue: this.props.dataList[dataIndex][key]
      })
    } else {
      console.error("The parameter 'dataList' of the component 'select' must be of type Array")
    }
    if (!this.props.onSelect) {
      console.error("Component 'select' parameter 'onSelect' cannot be found")
    } else if (typeof this.props.onSelect !== 'function') {
      console.error("The parameter 'onSelect' of the component 'select' must be 'Function'")
    }
  },
  didMount() { },
  didUpdate() { },
  didUnmount() { },
  methods: {
    closeSelect() {
      this.setData({
        isUnfold: !this.data.isUnfold
      })
    },
    ontap() {
      this.setData({
        isUnfold: !this.data.isUnfold
      })
    },
    selectTap(e) {
      const index = e.target.dataset.index
      if(this.data.list[index].disabled === true) return
      if (index === this.data.sIndex) {
        this.setData({
          isUnfold: false,
        })
      } else {
        this.setData({
          sIndex: index,
          isUnfold: false,
          sValue: this.data.list[index][this.data.key]
        })
        this.props.onSelect(index, this.data.list[index])
      }
    }
  },
});
