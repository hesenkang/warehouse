<template>
  <div>
    <task-from></task-from>
    <task-table @refresh="tackTableInfo" :loading="loading" :tackTableData="tackTableData" :total="total" :totalPage="totalPage" :current="current"></task-table>
  </div>
</template>

<script>
import qs from 'qs'
import TaskFrom from './From'
import TaskTable from './Table'

export default {
  name: 'Task',
  components: {
    TaskFrom,
    TaskTable
  },
  data () {
    return {
      total: 0, // 数据总数
      totalPage: 0, // 数据总页
      current: 0, // 当前页码
      tackTableData: [],
      loading: true
    }
  },
  methods: {
    tackTableInfo () {
      const params = {
        pageNum: 10,
        currentPage: this.current
      }
      this.$axios
        .get('/api/getAllNumTaskByParam?' + qs.stringify(params))
        .then(this.tackTableInit)
        .catch(error => {
          console.log('任务列表获取失败：', error.message)
        })
    },
    tackTableInit (res) {
      res = res.data
      if (res.data) {
        const data = res.data
        this.total = res.total
        this.totalPage = res.totalPage
        this.tackTableData = data
        this.loading = false
      }
    }
  },
  mounted () {
    this.tackTableInfo()
  }
}
</script>

<style lang="scss" scoped>

</style>
