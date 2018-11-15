<template>
    <div class="root">
        <Card>
            <Table :loading="loading" ref="cardContentTable" :columns="columns" :data="tackTableData" no-data-text="无数据···" border>
                <template slot="action" slot-scope="props">
                <Button :disabled="props.params.status === '0'" type="primary" size="small">{{ props.params.status === '1' ? '有效' : '无效' }}</Button>
                <Divider type="vertical" />
                <Poptip confirm title="确认删除？" transfer @on-ok="poptipDeleteOK(props.params.id)">
                    <Button type="warning" size="small">删除</Button>
                </Poptip>
                <Poptip confirm title="确认修改？" transfer @on-ok="poptipUpdateOK(props.params)">
                    <Button type="warning" size="small">修改</Button>
                </Poptip>
                </template>
            </Table>
            <div class="page">
                <Page :total="total" show-elevator show-total/>
            </div>
        </Card>
  </div>
</template>

<script>
import qs from 'qs'

export default {
  props: {
    total: Number, // 数据总数
    totalPage: Number, // 数据总页
    current: Number, // 当前页码
    tackTableData: Array,
    loading: true
  },
  data () {
    return {
      columns: [
        {
          type: 'selection',
          align: 'center',
          width: 60
        },
        {
          title: '任务名称',
          key: 'name', // string
          align: 'center'
        },
        {
          title: '任务状态',
          key: 'taskStatus', // number
          align: 'center'
        },
        {
          title: '平台编码',
          key: 'type', // datetime
          align: 'center'
        },
        {
          title: '创建时间',
          key: 'createTime', // datetime
          align: 'center'
        },
        {
          title: '备注',
          key: 'remark', // string
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 200,
          render: (h, params) => {
            return h('div', this.$refs.cardContentTable.$scopedSlots.action({ params: params.row }))
          }
        }
      ]
    }
  },
  methods: {
    poptipDeleteOK (id) {
      console.log(id)
      this.$axios
        .get('/api/deleteNumTask?' + qs.stringify({id: id}))
        .then(response => {
          console.log(response)
          this.$Message.success('删除成功!')
          this.$emit('refresh')
        })
        .catch(error => {
          console.log(error.message)
          this.$Message.error('删除失败!')
        })
    },
    poptipUpdateOK (params) {
      this.$router.push({
        name: 'TaskTableUpdate',
        path: '/task-table-update',
        params: (function () {
          return {
            data: params
          }
        })()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    .root /deep/ {
      td.ivu-table-expanded-cell {
        padding: 20px 50px;
        background: #ffffff;
      }
      .ivu-table-fixed-body {
        background: #ffffff;
      }
    }
    .root {
        margin-top: .9375rem;
        .page {
          margin-top: .9375rem /* 15/16 */
        }
    }
</style>
