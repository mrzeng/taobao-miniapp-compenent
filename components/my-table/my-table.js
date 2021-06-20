
Component({
  mixins: [],
  data: {
      imgpp:"/assets/images/close.png",
      datasource: (() => {
        const result = []
        for (let i = 0; i < 5; i++) {
          result.push(
            {
              id: 100306660940 + i,
              name:'tableitemName'+i,
              title: `Quotation for 1PCS Nano ${3 + i}.0 controller compatible`,
              time: 2000 + i

            }
          )
        }
        return result
      })(), // 用来排序的datasource
  },
  props: {
    type:2, // 2简单表格  3操作列 排序 图片展示
    tablesource: [{
          colName: 'Id',
          colData: 'id',
          width:false,
          slot:true, //table 上写onSort方法
          sortable:true,
        }, {
          colName: '标题',
          colData: 'title',
        }, {
          colName: 'Time',
          colData: 'time',
          sortable:true,
        }, {
          colName: '车上',
          colData: 'id',
        }
     ],
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {

    //排序
     onSort({ detail: { values } }) {
       if(this.props.onSort){
         this.props.onSort();
       }
      // console.log(values)
      // const [dataIndex, order] = values
      // this.setData({
      //   datasource2: this.data.tablesource.sort(function (a, b) {
      //     const result = a[dataIndex] - b[dataIndex];
      //     console.log(result)
      //     return (order === 'asc') ? (result > 0 ? 1 : -1) : (result > 0 ? -1 : 1);
      //   })
      // })
      // this.props.onSort();
      // const datasorce = this.data.datasorce.sort(function(a, b) {
      //   const result = a[dataIndex] - b[dataIndex]
      //   return order === 'asc' ? (result > 0 ? 1 : -1) : result > 0 ? -1 : 1
      // })
      // this.setData({
      //   datasorce,
      //   sort: { id: order }
      // })
    },
  },
});