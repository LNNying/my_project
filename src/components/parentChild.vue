<template>
  <div>
    <h1>element 表格基本操作</h1>
    <Card>
      <el-table
        :data="tableRealLists"
        border
        height="335"
        style="width: 100%;"
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
          type="index"
          align="center"
          width="36">
        </el-table-column>
        <el-table-column
          v-for="(item,key) in tableColumn" :key="key"
          :prop="item.key"
          :label="item.title"
          :width="item.width"
          :sortable="item.sortable"
        >
        </el-table-column>
      </el-table>
    </Card>
  </div>
</template>

<script>
  export default {
    name: 'parentChild',
    data () {
      return {
        tableRealLists: [
          {
            name: '夜华',
            sex: '0',
            contact: 15153557020,
            createBy: '管理员'
          },
          {
            name: '布兰',
            sex: '0',
            contact: 15153557030,
            createBy: '管理员'
          },
          {
            name: '雪诺',
            sex: '0',
            contact: 15153557320,
            createBy: '管理员'
          },
          {
            name: '龙妈',
            sex: '1',
            contact: 15153537020,
            createBy: '管理员'
          }
        ],
        tableColumn: [
          {
            title: '姓名',
            key: 'name',
            width: 200,
            sortable: true, // 排序
            visible: true // 是否可见
          },
          {
            title: '性别',
            key: 'sex',
            width: 200,
            sortable: true,
            visible: true,
            type: 'format',
            format: {
              '0': '男',
              '1': '女'
            }
          },
          {
            title: '联系方式',
            key: 'contact',
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
        ],
        selectRow: [],
        tableLoading: false
      }
    },
    methods: {
      selectChange(selection) {
        this.selectRow = selection;
      }
    },
    watch: {},
    computed: {}
  }
</script>

<style scoped>

</style>
