<style scoped lang="less">
</style>

<template>
    <div>
      <h1>父子组件之间传值问题</h1>
      <Card>
        <Row style="margin-bottom: 10px;" type="flex" justify="start">
          <i-col span="12">
            <Button size="small" type="primary" @click="addList">添加</Button>
            <Button size="small" type="primary" @click="editList">编辑</Button>
            <!--跟随输入信息来调用方法search  伴随状态-->
            <!--<Input v-model="keySearch" placeholder="按姓名检索" @keyup.enter="search" style="width: 120px;" size="small"-->
            <!--@on-change="search" clearable/>-->
            <Input v-model="keySearch" placeholder="按姓名检索" style="width: 120px;" size="small" clearable/>
            <Button @click="search" type="primary" size="small">检索</Button>
            <Button @click="deleteItem" type="primary" size="small" :disabled="selectList.length == 0 ? true : false">
              删除
            </Button>
          </i-col>
        </Row>
        <el-table
          :data="tableRealList"
          border
          height="300"
          style="width: 100%"
          size="mini"
          highlight-current-row
          ref="multipleTable"
          v-loading="tableLoading"
          @selection-change="selectChange"
        >
          <el-table-column
            type="selection"
            width="36">
          </el-table-column>
          <el-table-column
            v-for="(item,key) in tableColumns" :key="key"
            :prop="item.key"
            :label="item.title"
            :width="item.width"
            :sortable="item.sortable"
          >
          </el-table-column>
        </el-table>
      </Card>
      <show-add-table-item :show.sync="showAddList" @add-data="addData" :modal-title="addShow" :data-list="dataList"></show-add-table-item>
    </div>
</template>

<script>
  import ShowAddTableItem from './showAddTableItem'
  export default {
    name: 'elementTable',
    components: {ShowAddTableItem},
    data () {
      return {
        keySearch: '',
        tableLoading: false,
        deleteDisabled: true,
        selectList: [],
        dataList: {}, // 勾选数据修改
        addShow: true,
        showAddList: false,
        timer: null,
        modelTitle: '添加',
        tableRealList: [],
        tableList: [
          {
            no: 'EN0001',
            name: '李华',
            age: 23,
            birth: '2019-02-03',
            createBy: '管理员'
          },
          {
            no: 'EN0002',
            name: '刘培强',
            age: 34,
            birth: '2019-02-13',
            createBy: '管理员'
          },
          {
            no: 'EN0003',
            name: '刘东强',
            age: 22,
            birth: '2019-02-04',
            createBy: '管理员'
          },
          {
            no: 'EN0004',
            name: '刘翔和',
            age: 21,
            birth: '2019-04-03',
            createBy: '管理员'
          }
        ],
        tableColumns: [
          {
            title: '编号',
            key: 'no',
            width: 200,
            sortable: true,
            visible: true
          },
          {
            title: '姓名',
            key: 'name',
            width: 200,
            sortable: true,
            visible: true
          },
          {
            title: '年龄',
            key: 'age',
            width: 200,
            sortable: true,
            visible: true
          },
          {
            title: '出生日期',
            key: 'birth',
            width: 200,
            sortable: true,
            visible: true
          },
          {
            title: '创建人',
            key: 'createBy',
            width: 200,
            sortable: true,
            visible: true
          }
        ]
      }
    },
    methods: {
      // 模拟数据加载过程
      loading() {
        this.tableLoading = true;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.tableLoading = false;
        }, 2000);
      },
      // 模拟加载数据
      onLoad() {
        this.loading();
        this.tableRealList = this.tableList;
      },
      // 表格勾选出发时间
      selectChange (selection) {
        this.selectList = selection
      },
      // 表格检索
      search () {
        if (this.keySearch === '') {
          this.tableRealList = this.tableList
        } else {
          this.tableRealList = this.tableList.filter(item => {
            if (item.name === this.keySearch) {
              return item
            }
          })
        }
        this.loading();
      },
      // 表格删除项
      deleteItem () {
        if (this.selectList.length <= 0 || this.selectList.length > 1) {
          this.$Message.warning('请选择一条信息')
          return
        }
        this.tableList.forEach((item, index) => {
          if (item.no === this.selectList[0].no) {
            this.tableList.splice(index, 1)
          }

        })
        this.tableRealList = this.tableList;
        this.loading();
      },
      // 表格添加项
      addList () {
        this.addShow = true;
        this.showAddList = true;
      },
      // 从父类获取数据
      addData (data) {
        data.birth = this.datePickerToDate(data.birth);
        if (this.addShow) {
          this.tableList.push(data);
        } else {
          this.tableList.forEach((item,index) => {
            if (item.no === data.no) {
              item.name = data.name;
              item.age = data.age;
              item.birth = data.birth;
            }
          })
        }
        let dataList = this.tableList;
        this.tableRealList = dataList;
        this.loading();
      },
      // 编辑数据
      editList() {
        if (this.selectList.length > 1 || this.selectList.length <= 0) {
          this.$Message.warning('请选择一条进行编辑');
          return;
        }
        // 防止父子组件在修改过程中值之间的影响
        this.dataList = {
          no: this.selectList[0].no,
          name: this.selectList[0].name,
          age: this.selectList[0].age,
          birth: this.selectList[0].birth,
          createBy: this.selectList[0].createBy
        };
        this.addShow = false;
        this.showAddList = true;
      },
      // 格式化时间
      datePickerToDate (date) {
        if (date === null) {
          return null;
        }
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        let d = date.getDate();
        d = d < 10 ? '0' + d : d;
        return y + '-' + m + '-' + d;
      }
    },
    created () {
      this.onLoad();
    },
    mounted () {
      this.onLoad();
    },
    activated () {
      this.onLoad();
    },
    watch: {},
    computed: {}
  }
</script>

<style scoped>

</style>
