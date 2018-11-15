<template>
    <Card>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" label-position="left">
            <FormItem label="手机号码" prop="number">
                <Input v-model="formValidate.number" placeholder="Enter your number"></Input>
            </FormItem>
            <FormItem label="运营商" prop="subscriberId">
                <Select v-model="formValidate.subscriberId" placeholder="Select your subscriberId">
                    <Option value="00">中国移动</Option>
                    <Option value="01">中国联通</Option>
                    <Option value="03">中国电信</Option>
                    <Option value="09">中国虚拟</Option>
                </Select>
            </FormItem>
            <FormItem label="区域" prop="areaList">
                <Cascader v-model="formValidate.areaList" :data="cardData" change-on-select @on-change="onChangeAMpa"></Cascader>
            </FormItem>
            <FormItem label="点击获取坐标">
                <div id="container" style="width: 100%; height: 500px;"></div>
            </FormItem>
            <FormItem label="经度" prop="longitude">
                <Input v-model="formValidate.longitude" placeholder="Enter your longitude"></Input>
            </FormItem>
            <FormItem label="纬度" prop="latitude">
                <Input v-model="formValidate.latitude" placeholder="Enter your latitude"></Input>
            </FormItem>
            <FormItem label="手机品牌" prop="phoneType">
                <Select v-model="formValidate.phoneType" placeholder="Select your phoneType">
                    <Option :value="item" v-for="item of phone" :key="item">{{ item }}</Option>
                </Select>
            </FormItem>
            <FormItem label="手机型号" prop="phoneTypeNo">
                <Select v-model="formValidate.phoneTypeNo" placeholder="Select your phoneTypeNo">
                    <Option :value="item.type" v-for="item of phoneType[formValidate.phoneType]" :key="item.id">{{ item.type }}</Option>
                </Select>
            </FormItem>
            <!-- <FormItem label="Andrroid-ID" prop="phoneAndroidId">
                <Input v-model="formValidate.phoneAndroidId" placeholder="Enter your phoneAndroidId"></Input>
            </FormItem> -->
            <FormItem label="SIM-1" prop="phoneSim1">
                <Input v-model="formValidate.phoneSim1" placeholder="Enter your phoneSim1"></Input>
            </FormItem>
            <FormItem label="IP地址" prop="ip">
                <Input v-model="formValidate.ip" placeholder="Enter your ip"></Input>
            </FormItem>
            <!-- <FormItem label="WIFI名称" prop="phoneWifi">
                <Input v-model="formValidate.phoneWifi" placeholder="Enter your phoneWifi"></Input>
            </FormItem> -->
            <FormItem label="MAC地址" prop="phoneMac">
                <Input v-model="formValidate.phoneMac" placeholder="Enter your phoneMac"></Input>
            </FormItem>
            <!-- <FormItem label="联网方式" prop="netwokingMode">
                <Input v-model="formValidate.netwokingMode" placeholder="Enter your netwokingMode"></Input>
            </FormItem> -->
            <!-- <FormItem label="经度" prop="longitude">
                <Input v-model="formValidate.longitude" placeholder="Enter your longitude"></Input>
            </FormItem>
            <FormItem label="纬度" prop="latitude">
                <Input v-model="formValidate.latitude" placeholder="Enter your latitude"></Input>
            </FormItem> -->
            <FormItem label="母号">
                <Input v-model="formValidate.agent" placeholder="Enter your agent"></Input>
            </FormItem>
            <FormItem label="备注信息">
                <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
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
import MapLoader from '@/assets/js/AMap.js'
import Phone from '@/assets/js/Phone.js'
import PhoneType from '@/assets/js/phoneType.js'

export default {
  data () {
    return {
      phone: Phone,
      phoneType: PhoneType,
      cardData: [],
      isdata: null,
      submit: '',
      formValidate: {
        areaList: [],
        number: '',
        subscriberId: '',
        area: '',
        phoneType: '',
        phoneTypeNo: '',
        phoneAndroidId: '',
        phoneSim1: '',
        ip: '',
        // phoneWifi: '',
        phoneMac: '',
        // netwokingMode: '',
        longitude: '',
        latitude: '',
        agent: '',
        desc: ''
      },
      ruleValidate: {
        number: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' }
        ],
        subscriberId: [
          { required: true, message: '运营商不能为空', trigger: 'change' }
        ],
        areaList: [
          { required: true, type: 'array', message: '区域不能为空', trigger: 'change' }
        ],
        phoneType: [
          { required: true, message: '手机品牌不能为空', trigger: 'change' }
        ],
        phoneTypeNo: [
          { required: true, message: '手机型号不能为空', trigger: 'change' }
        ],
        phoneAndroidId: [
          { required: true, message: 'AndroidID不能为空', trigger: 'blur' }
        ],
        phoneSim1: [
          { required: true, message: 'SIM-1卡号不能为空', trigger: 'blur' }
        ],
        ip: [
          { required: true, message: 'IP不能为空', trigger: 'blur' }
        ],
        phoneWifi: [
          { required: true, message: 'WIFI名称不能为空', trigger: 'blur' }
        ],
        phoneMac: [
          { required: true, message: 'MAC地址不能为空', trigger: 'blur' }
        ],
        netwokingMode: [
          { required: true, message: '联网方式不能为空', trigger: 'blur' }
        ],
        longitude: [
          { required: true, message: '经度不能为空', trigger: 'blur' }
        ],
        latitude: [
          { required: true, message: '维度不能为空', trigger: 'blur' }
        ]
      },
      valueData: []
    }
  },
  methods: {
    onChangeAMpa (value, selecteData) {
      // console.log(this.formValidate.areaList)
      // console.log(selecteData)
      this.valueData = value
      if (this.polygons) {
        for (var i = 0, l = this.polygons.length; i < l; i++) {
          this.polygons[i].setMap(null)
        }
      }
      let that = this
      MapLoader()
        .then(AMap => {
          that.district = AMap.plugin('AMap.DistrictSearch', function () {
            // 创建行政区查询对象
            var district = new AMap.DistrictSearch({
              // 返回行政区边界坐标等具体信息
              extensions: 'all'
            })

            district.search(value[that.valueData.length - 1], function (status, result) {
              // 获取adcode边界信息
              var bounds = result.districtList[0].boundaries
              that.polygons = []
              if (bounds) {
                for (var i = 0, l = bounds.length; i < l; i++) {
                  // 生成行政区划polygon
                  var polygon = new AMap.Polygon({
                    map: that.map,
                    strokeWeight: 1,
                    path: bounds[i],
                    fillOpacity: 0.7,
                    fillColor: '#CCF3FF',
                    strokeColor: '#CC66CC'
                  })
                  that.polygons.push(polygon)
                }
                polygon.on('click', function (e) {
                  that.formValidate.longitude = String(e.lnglat.lng)
                  that.formValidate.latitude = String(e.lnglat.lat)
                })
                // 地图自适应
                that.map.setFitView()
              }
            })
          })
        })
        .catch(error => {
          console.log('DistrictSearch插件加载失败：', error.message)
        })
    },
    initMap () {
      let that = this
      MapLoader()
        .then(AMap => {
          that.map = new AMap.Map('container', {
            resizeEnable: true,
            center: [116.30946, 39.937629],
            zoom: 3
          })
        })
        .catch(error => {
          console.log('地图加载失败：', error.message)
        })
    },
    initLoadData () {
      this.data = {
        key: '1fff8b85ad4efa4884bb131b35d61b7b',
        keywords: '中国',
        subdistrict: 3
      }
      this.$axios
        .get('https://restapi.amap.com/v3/config/district?' + qs.stringify(this.data))
        .then(response => {
          for (var i = 0, leni = response.data.districts[0].districts.length; i < leni; i++) {
            this.cardData.push({
              value: response.data.districts[0].districts[i].name, // TODO adcode
              label: response.data.districts[0].districts[i].name,
              children: (() => {
                let data = []
                for (var j = 0, lenj = response.data.districts[0].districts[i].districts.length; j < lenj; j++) {
                  data.push({
                    value: response.data.districts[0].districts[i].districts[j].name, // TODO adcode
                    label: response.data.districts[0].districts[i].districts[j].name,
                    children: (() => {
                      let data = []
                      for (var x = 0, lenx = response.data.districts[0].districts[i].districts[j].districts.length; x < lenx; x++) {
                        data.push({
                          value: response.data.districts[0].districts[i].districts[j].districts[x].name, // TODO adcode
                          label: response.data.districts[0].districts[i].districts[j].districts[x].name
                        })
                      }
                      return data
                    })()
                  })
                }
                return data
              })()
            })
          }
        })
        .catch(error => {
          console.log('行政区域获取失败：', error)
        })
    },
    handleSubmit (name) {
      const data = {
        number: this.formValidate.number,
        subscriberId: this.formValidate.subscriberId,
        area: this.formValidate.areaList.toString(),
        phone_type: this.formValidate.phoneType,
        phone_type_no: this.formValidate.phoneTypeNo,
        // phone_android_id: this.formValidate.phoneAndroidId,
        phone_sim1: this.formValidate.phoneSim1,
        ip: this.formValidate.ip,
        // phone_wifi: this.formValidate.phoneWifi,
        phone_mac: this.formValidate.phoneMac,
        // netwoking_mode: this.formValidate.netwokingMode,
        longitude: this.formValidate.longitude,
        latitude: this.formValidate.latitude,
        agent: this.formValidate.agent
      }
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.isdata === null) {
            this.$axios
              .post('/api/addNum', qs.stringify(data))
              .then(response => {
                console.log(response)
                this.$Message.success('录入成功!')
                this.$router.push('/card')
              })
              .catch(error => {
                console.log(error.message)
                this.$Message.error('录入失败!')
              })
          } else {
            data.id = this.$route.params.data.id
            this.$axios
              .post('/api/updateNumById', qs.stringify(data))
              .then(response => {
                console.log(response)
                this.$Message.success('修改成功!')
                this.$router.push('/card')
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
        // for (const iterator in this.formValidate) {
        //   this.formValidate[iterator] = data[iterator]
        //   // TODO key名称不一样
        // }
        this.formValidate.number = data.number
        this.formValidate.subscriberId = data.subscriberId
        this.formValidate.areaList = data.area.split(',')
        this.formValidate.phoneType = data.phoneType
        this.formValidate.phoneTypeNo = data.phoneTypeNo
        // this.formValidate.phoneAndroidId = data.phoneAndroidId
        this.formValidate.phoneSim1 = data.phoneSim1
        this.formValidate.ip = data.ip
        // this.formValidate.phoneWifi = data.phone_wifi
        this.formValidate.phoneMac = data.phoneMac
        // this.formValidate.netwokingMode = data.netwoking_mode
        this.formValidate.longitude = data.longitude
        this.formValidate.latitude = data.latitude
        this.formValidate.agent = data.agent
      }
    }
  },
  async mounted () {
    this.isdata = Object.keys(this.$route.params).length !== 0 ? this.$route.params : null
    await this.routeUpdate(this.isdata, this.$route.params.data)
    await this.initMap()
    await this.initLoadData()
  }
}
</script>
