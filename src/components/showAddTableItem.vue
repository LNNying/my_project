<template>
  <Modal
    :value="show"
    :title="title"
    @on-ok="onOk"
    @on-cancel="onCancel"
    :width="400">
    <Row>
      <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80">

        <FormItem label="编号" prop="no">
          <Input size="small" v-model="formItem.no" placeholder="编号" readonly style="width: 200px;" />
          <Button size="small" @click="getNo" type="primary" :disabled="modalTitle === '修改'">获取</Button>
        </FormItem>

        <FormItem label="姓名" prop="name">
          <Input size="small" v-model="formItem.name" placeholder="姓名" style="width: 200px;" clearable/>
        </FormItem>

        <FormItem label="年龄" prop="age">
          <InputNumber size="small" :max="100" :min="0" v-model="formItem.age"  style="width: 200px;" placeholder="年龄"/>
        </FormItem>

        <FormItem label="出生年月" prop="birth">
          <DatePicker type="date" placement="bottom-end" placeholder="选择时间" size="small" v-model="formItem.birth" style="width: 200px;" clearable></DatePicker>
        </FormItem>
      </Form>
    </Row>
    <div slot="footer">
      <Button type="waring" @click="onCancel" size="small">取消</Button>
      <Button type="primary" @click="onOk" size="small">提交</Button>
    </div>
  </Modal>
</template>

<script>
  export default {
    name: 'showAddTableItem',
    props: {
      show: {
        type: Boolean,
        default: false
      },
      modalTitle: {
        type: Boolean,
        default: true
      },
      dataList: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        title: '',
        formItem: {
          no: '',
          name: '',
          age: null,
          birth: '',
          createBy: '管理员'
        },
        // 表单验证 rules 必须与formItem中的prop一起用
        ruleValidate: {
          no: [
            { required: true, message: '编号必填', trigger: 'blur'}
          ],
          name: [
            { required: true, message: '姓名必填', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      getNo () {
        let code = '';
        let no = [0,1,2,3,4,5,6,7,8,9];
        for (let i = 0; i < 6; i++) {
          let idx = Math.round(Math.random()*9)
          code += no[idx];
        }
        this.formItem.no = 'EN' + code;
      },
      onOk () {
        this.$refs.formItem.validate((valid) => {
          if (valid) {
            this.submitData();
          } else {
            this.$Message.error('填写错误');
          }
        });
      },
      onCancel() {
        this.$emit('update:show', false);
        this.$emit('update:modalTitle', '添加');
      },
      submitData() {
        this.$emit('add-data', this.formItem);
        this.$emit('update:show', false);
        this.$emit('update:modalTitle', '添加');
        this.$Message.success('操作成功');
      }
    },
    created() {
      if (this.modalTitle) {
        this.title = '添加';
      } else {
        this.title = '修改';
      }
    },
    watch: {
      show(val) {
        if (!this.modalTitle) {
          this.title = '修改';
          this.formItem = this.dataList;
        } else {
          this.title = '添加';
          this.formItem = {
              no: '',
              name: '',
              age: null,
              birth: '',
              createBy: '管理员'
          }
        }
      }

    }
  }
</script>

<style scoped>

</style>
