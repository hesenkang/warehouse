<template>
    <div class="card-header-content">
        <Card>
            <Row :gutter="16">
                <Col :xs="24" :sm="12" :md="8" :lg="6" class="card-col-padding">
                        <Input v-model="cardSearchInput">
                        <Select v-model="cardSelectInput" slot="prepend" style="width: 80px">
                            <Option v-for="itme in cardSelectTypesData" :value="itme.type" :key="itme.type">{{ itme.type }}</Option>
                        </Select>
                        <Button slot="append" icon="ios-search"></Button>
                    </Input>
                </Col>
                <Col :xs="24" :sm="12" :md="8" :lg="6" class="card-col-padding">
                    <Input v-model="cardInput1" placeholder="Enter something..." clearable/>
                </Col>
                <Col :xs="24" :sm="12" :md="8" :lg="6" class="card-col-padding">
                    <Input v-model="cardInput2" placeholder="Enter something..." clearable/>
                </Col>
            </Row>
        </Card>
    </div>
</template>

<script>

export default {
  data () {
    return {
      cardSearchInput: '',
      cardSelectInput: '',
      cardSelectTypesData: [
        {type: '微信'},
        {type: '微博'},
        {type: '抖音'},
        {type: '今日头条'}
      ],
      cardInput1: '',
      cardInput2: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.card-header-content {
    width: 100%;
    .card-col-padding {
        margin-top: .9375rem /* 15/16 */;
        margin-bottom: .9375rem /* 15/16 */;
    }

}
</style>
