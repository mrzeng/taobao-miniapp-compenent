import { ajax } from "../../../../api/ajax";

Component({
  mixins: [],
  data: {
    switchAdd:false,
    list:[
      {
        _id:0,
        campaign_id:12,
        title:'titlesss',
        online_status:'online_status',
        settle_status:'settle_status',
        checked:false,
      },
      {
        _id:1,
        campaign_id:13,
        title:'titlesss13',
        online_status:'online_status',
        settle_status:'settle_status',
        checked:false,
      }
    ],
    checkedItem:null, //选中计划
    checkedItemIndex:null,
  },
  props: {
    dataOne:{index:null,item:null},
    submitData:{}
  },
  didMount() {
    
    this.setData({ checkedItemIndex: this.props.dataOne.index })

    this.getList();
  },
  didUpdate() {},
  didUnmount() {},
  methods: {

    //取消创建计划
    onCancelCreatePlan(){
      this.setData({switchAdd})
    },

    /**
     * 获取计划列表
     */
     getList(){
      let list = this.data.list || [];
      let len = this.list.length || 0;
      list.push(
        {
          _id:len+1,
          title:'title'+(len+1),
          checked:false,
        }
      )

      // ajax({
      //   url:'/testController/lists',
      //   data:{ step:1 },
      //   log:true,
      //   loading:true
      // }).then(res=>{
      //   let checkedItemIndex = this.data.checkedItemIndex;
      //   let data = res ? res : [];
      //   data.forEach((item,index) => {
      //     item.id = item._id;
      //     if(checkedItemIndex == index){
      //       item.checked = true
      //     }else{
      //       item.checked = false
      //     }
      //   });
      //   this.setData({ itemList:data })
      // })
    },

    //点击一项
    onCheckedItem(e){
      let index = e.target.dataset ? e.target.dataset.index : null;
      if(index!==null){
        let list = this.data.itemList;

        list.forEach( item => { item.checked = false } );
        list[index]['checked'] = true;
        let submitData = this.props.submitData;
        submitData.dataOne =  { item: list[index], index: index  }
        this.props.onSetSubmitData(submitData)
        this.setData({ 
          itemList:list,
          checkedItem:list[index]
        })
      }
    },

    //显示添加计划
    showAdd(){
      this.setData({
        switchAdd:this.data.switchAdd?false:true
      })
    },
    //隐藏添加计划
    hideAdd(){
      this.setData({
        switchAdd:false
      })
    },

  },
});