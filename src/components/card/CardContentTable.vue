<template>
    <div class="root">
      <Card>
        <Table :loading="loading" ref="cardContentTable" :columns="columns" :data="data" no-data-text="无数据" border>
          <template slot="action" slot-scope="props">
            <Button :disabled="props.params.use === 1" type="primary" size="small">{{ props.params.use === 1 ? '已使用' : '未使用' }}</Button>
            <Divider type="vertical" />
            <Poptip confirm title="确认删除？" transfer @on-ok="poptipDeleteOK(props.params.id)">
              <Button type="warning" size="small">删除</Button>
            </Poptip>
            <Poptip confirm title="确认修改？" transfer @on-ok="poptipUpdateOK(props.params)">
              <Button type="warning" size="small">修改</Button>
            </Poptip>
          </template>
        </Table>
      </Card>
  </div>
</template>

<script>
import qs from 'qs'
import expandRow from './CardContentTableExpand.vue'

export default {
  components: { expandRow },
  data () {
    return {
      columns: [
        {
          type: 'selection',
          align: 'center',
          fixed: 'left',
          width: 60
        },
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row
              }
            })
          }
        },
        {
          title: '手机号码',
          key: 'number',
          align: 'center',
          width: 150
        },
        {
          title: '运营商',
          key: 'subscriberId',
          align: 'center',
          width: 150
        },
        {
          title: '区域',
          key: 'area',
          align: 'center',
          width: 200
        },
        {
          title: '手机品牌',
          key: 'phoneType',
          align: 'center',
          width: 150
        },
        {
          title: '手机型号',
          key: 'phoneTypeNo',
          align: 'center',
          width: 150
        },
        {
          title: 'IMEI',
          key: 'phoneImei',
          align: 'center',
          width: 200
        },
        {
          title: 'Android-ID',
          key: 'phoneAndroidId',
          align: 'center',
          width: 200
        },
        {
          title: '序列号',
          key: 'phoneNo',
          align: 'center',
          width: 200
        },
        {
          title: 'SIM-1',
          key: 'phoneSim1',
          align: 'center',
          width: 200
        },
        {
          title: 'IP地址',
          key: 'ip',
          align: 'center',
          width: 200
        },
        {
          title: 'WIFI名称',
          key: 'phoneWifi',
          align: 'center',
          width: 200
        },
        {
          title: 'MAC地址',
          key: 'phoneMac',
          align: 'center',
          width: 200
        },
        {
          title: '联网方式',
          key: 'netwokingMode',
          align: 'center',
          width: 100
        },
        {
          title: '经度',
          key: 'longitude',
          align: 'center',
          width: 200
        },
        {
          title: '纬度',
          key: 'latitude',
          align: 'center',
          width: 200
        },
        // {
        //   title: '账号状态',
        //   key: 'use',
        //   align: 'center',
        //   width: 100
        // },
        {
          title: '母号',
          key: 'agent',
          align: 'center',
          width: 200
        },
        {
          title: '创建时间',
          key: 'createTime',
          align: 'center',
          width: 200
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          fixed: 'right',
          width: 200,
          render: (h, params) => {
            return h('div', this.$refs.cardContentTable.$scopedSlots.action({ params: params.row }))
          }
        }
      ],
      data: [],
      loading: true
    }
  },
  methods: {
    poptipDeleteOK (id) {
      console.log(id)
      this.$axios
        .post('/api/deleteNum', qs.stringify({id: id}))
        .then(response => {
          console.log(response)
          this.$Message.success('删除成功!')
          this.tableInit()
        })
        .catch(error => {
          console.log(error.message)
          this.$Message.error('删除失败!')
        })
    },
    poptipUpdateOK (params) {
      this.$router.push({
        name: 'CardLogin',
        path: '/cardlogin',
        params: (function () {
          return {
            data: params
          }
        })()
      })
    },
    tableInit () {
      this.$axios
        .get('/api/findAll')
        .then(response => {
          console.log(response)
          this.data = response.data.data
          this.loading = false
        })
        .catch(error => {
          console.log(error.message)
        })
    }
  },
  mounted () {
    this.tableInit()
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
</style>
