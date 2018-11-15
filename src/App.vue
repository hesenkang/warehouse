<template>
    <div class="layout">
        <Layout style="height: 100%;">
            <Sider breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses" @on-select="go">
                    <MenuItem name="/">
                        <Icon type="ios-navigate"></Icon>
                        <span>主页</span>
                    </MenuItem>
                    <MenuItem name="/task">
                        <Icon type="ios-search"></Icon>
                        <span>任务管理</span>
                    </MenuItem>
                    <MenuItem name="/card">
                        <Icon type="ios-search"></Icon>
                        <span>卡片管理</span>
                    </MenuItem>
                    <MenuItem name="/setting">
                        <Icon type="ios-settings"></Icon>
                        <span>设置</span>
                    </MenuItem>
                </Menu>
                <div slot="trigger"></div>
            </Sider>
            <Layout>
                <Header class="layout-header-bar"></Header>
                <Content id="app" :style="{margin: '20px'}">
                    <router-view/>
                </Content>
                <div class="app-setting" style="width: 96px; height: 96px; text-align: center; line-height: 96px; position: fixed; top: 88vh; right: 20px;">
                    <img @click="isDrawerShow" style="max-width:75%; max-height: 75%; vertical-align: middle; cursor:pointer;" src="data:image/png;base64,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">
                </div>
                <transition name="drawer" enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutRight">
                    <div class="drawer" v-show="isDrawer">
                        <div @click="settingClickNumber">
                            <Card>
                                <h3>号码录入</h3>
                            </Card>
                        </div>
                        <div @click="settingClickTask">
                            <Card>
                                <h3>任务注册</h3>
                            </Card>
                        </div>
                    </div>
                </transition>
            </Layout>
        </Layout>
    </div>
</template>

<script>
import MapLoader from '@/assets/js/AMap.js'

export default {
  name: 'App',
  data () {
    return {
      isDrawer: false,
      isCollapsed: false
    }
  },
  methods: {
    isDrawerShow () {
      this.isDrawer = !this.isDrawer
    },
    go (name) {
      this.$router.push(name)
    },
    settingClickNumber () {
      this.isDrawer = false
      this.$router.push('/cardLogin')
    },
    settingClickTask () {
      this.isDrawer = false
      this.$router.push('/task-table-update')
    }
  },
  computed: {
    menuitemClasses: function () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  mounted () {
    MapLoader()
  }
}
</script>

<style lang="scss" scoped>
    .drawer-enter-active, .drawer-leave-active {
        transition: opacity 0.3s;
    }
    .drawer-enter, .drawer-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    .drawer-enter-to, .drawer-leave {
        opacity: 1;
    }
    .drawer {
        position: fixed;
        top: 75vh;
        right: .9375rem /* 15/16 */;
        box-sizing: border-box;
        div {
            cursor:pointer;
            border-radius: .625rem /* 10/16 */;
            &:nth-child(2) {
                margin-top: .625rem /* 10/16 */;
            }
        }
    }
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        // overflow: hidden;
        width: 100%;
        height: 100%;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>
