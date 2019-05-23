<style scoped lang="less">
  @import '../../static/index.less';
</style>

<template>
  <div>
    <h1>{{title}}</h1>
    <Row>
      <i-col span="12">
        <!--父子组件传值问题-->
       <element-table></element-table>
      </i-col>
      <i-col span="12">
        <!--element 表格问题-->
        <parent-child></parent-child>
      </i-col>
    </Row>
    <Row>
      <i-col span="12">
        <!--路由问题-->
       <router-problem></router-problem>
      </i-col>
      <i-col span="12">
        <!--计算属性问题-->
        <computed-problem></computed-problem>
      </i-col>
    </Row>
    <Row>
      <i-col span="12">
        <!--生命周期问题-->
        <live-problem></live-problem>
      </i-col>
    </Row>
  </div>
</template>

<script>
  import ParentChild from './parentChild'
  import RouterProblem from './routerProblem'
  import ComputedProblem from './computedProblem'
  import LiveProblem from './liveProblem'
  import ElementTable from './elementTable'
  export default {
    name: 'HelloWorld',
    components: {ElementTable, LiveProblem, ComputedProblem, RouterProblem, ParentChild },
    data () {
      return {
        title: 'Vue 基础知识小实例',
      }
    },
    methods: {},
    created () {},
    mounted () {},
    activated () {},
    watch: {},
    computed: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
