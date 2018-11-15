<template>
    <Card>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" label-position="left">
            <FormItem label="任务名称" prop="name">
                <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
            </FormItem>
            <FormItem label="任务状态" prop="taskStatus" v-if="isdata">
                <Input v-model="formValidate.taskStatus" placeholder="Enter your taskStatus"></Input>
            </FormItem>
            <FormItem label="排序" prop="sort">
                <Input v-model="formValidate.sort" placeholder="Enter your sort"></Input>
            </FormItem>
            <FormItem label="平台编码" prop="type">
                <Input v-model="formValidate.type" placeholder="Enter your type"></Input>
            </FormItem>
            <FormItem label="备注信息">
                <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">{{ submit }}</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
    </Card>
</template>
<script>
import qs from 'qs'

export default {
  data () {
    return {
      isdata: Boolean,
      submit: '',
      formValidate: {
        name: '',
        taskStatus: '',
        sort: '',
        tyep: '',
        remark: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '任务名称不能为空', trigger: 'blur' }
        ],
        task_status: [
          { required: true, message: '任务状态不能为空', trigger: 'change' }
        ],
        sort: [
          { required: true, message: '排序不能为空', trigger: 'change' }
        ],
        type: [
          { required: true, message: '平台编码不能为空', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (ValidateName) {
      const data = {
        name: this.formValidate.name,
        sort: this.formValidate.sort,
        type: this.formValidate.type,
        remark: this.formValidate.remark
      }
      this.$refs[ValidateName].validate((valid) => {
        if (valid) {
          if (this.isdata === null) {
            this.$axios
              .get('/api/addNumTask?' + qs.stringify(data))
              .then(response => {
                console.log(response)
                this.$Message.success('录入成功!')
                this.$router.push('/task')
              })
              .catch(error => {
                console.log(error.message)
                this.$Message.error('录入失败!')
              })
          } else {
            data.id = this.$route.params.data.id
            data.task_status = this.formValidate.taskStatus
            this.$axios
              .post('/api/updateNumTaskById', qs.stringify(data))
              .then(response => {
                console.log(response)
                this.$Message.success('修改成功!')
                this.$router.push('/task')
              })
              .catch(error => {
                console.log(error.message)
                this.$Message.error('修改失败!')
              })
          }
        } else {
          this.$Message.error('校验失败!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    routeUpdate (isdata, data) {
      if (isdata === null) {
        this.submit = '录入'
      } else {
        this.submit = '修改'
        this.formValidate.name = data.name
        this.formValidate.taskStatus = data.taskStatus
        this.formValidate.sort = data.sort
        this.formValidate.type = data.type
        this.formValidate.remark = data.remark
      }
    }
  },
  mounted () {
    this.isdata = Object.keys(this.$route.params).length !== 0 ? this.$route.params : null
    this.routeUpdate(this.isdata, this.$route.params.data)
  }
}
</script>
