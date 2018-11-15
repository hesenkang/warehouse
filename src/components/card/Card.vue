<template>
    <div class="card-content">
        <div class="card-content-header">
            <card-header></card-header>
        </div>
        <div class="card-content-table">
            <card-content-table></card-content-table>
        </div>
    </div>
</template>

<script>
import CardHeader from '@/components/card/CardHeader'
import CardContentTable from '@/components/card/CardContentTable'

export default {
  components: {
    CardHeader,
    CardContentTable
  }
}
</script>

<style lang='scss' scoped>
.card-content {
    .card-content-table {
        margin-top: .9375rem /* 15/16 */;
    }
}
</style>
