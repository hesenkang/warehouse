<template>
    <div class="card-content-table-expand">
        <div v-for="item in cardTableListData" :key="item.id" class="card-list-box">
            <div class="card-list-content">
                <div class="card-list-header">
                    <img :src="Images[item.type]" :alt="item.type">
                    <p class="into-account">
                        <span class="title">{{ cardTableListDataJson[item.type] }}</span>
                        <span class="account">{{ item.username }}</span>
                    </p>
                </div>
                <div class="card-list-footer">
                    <span>状态：</span>
                    <span class="login-type">正常</span>
                    <span class="refresh"></span>
                </div>
            </div>
            <div class="card-list-content card-list-content-img">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALnSURBVGhD7Zm5bhRBEIZXXAEZVwQ8BcKCyBmymDHdI+2KK+cVsEg28xJjS8bwBMaaHowNKc+AgQfgSrBNDCTw17qMxLpqXb1zgKX5pF9aeaur/j52uqfdaWlpKU/vWe/obJ5dSQr3IC1cngT/Pg3+Gz7/HAqf8bd3w+8QQ7H9fv8IN/93uMJdhLmHMPclLfyvKAX/mdrO5NkFTtcc6Yv0LEbzCUbzh2guQpQDWqKcnL5eYPwOtCOZKSPM4hbl5jLVg3V+AkWeSsWrFGo8vrR87ziXrQZM70lM8yupYC0K/iXV5PLlGI58k+b3FPxaJTPRxLLRRMuJbUxGkmd3pcTNyt1kO3HMrHTPYelsy0mbEz2dfPBn2JYdmj4poUUaUqxFGMhFtmWDdlg0mniT0pBiLSIvyXpynu0dDG3xUiKrNKRYq9CJAdsbDx2yhucUIYlVGlKsVVjSH00HQJi/KiWIkYYUGyN0Yopt6mCqcCSWE1ilIcVGKfg5tqmDoCA2jpCGFBul4FfZpg6mCS8eQuMRVY1UY7/cW7apg17iTUpq/LeqRqoxKizvbbapY33+V41UY1TkjW3qHPoOHPolRD8UqfGoqkaqsU/Bb7JNHXQgFxtHSEOKjZLpMfofb2TXC3efberQpZPUOEYaUmyU8uwy29QZHuYK90lMYJSGFGuV+TBHYBkNpCRWaUixdrl5tncwdN1n3Q8kaUixJgX/PeqFhkAHlsRkBmlIsTa5BbZlh16kaeOQEzYp9/XaSvc024pjNvjbctLmlISsx3YmIw1uWUrciIJ/xDYmh64WkWhNLFCnUJP+ccI2ykEXrViLG2KhGoTf3npll7t70EVrmcsuu9zC9OvpY1y2epI8u4WObMnFJxflTJ7f6HKZeuFH7GKZze6PsEnRqCcbySlO3xy8Yw8weh9Ec2O028bNR++wdUCHLBiawmjOQavQJszt0AztzhI+B/+GvqMjMZ0qzQezlpaWMXQ6vwHAb+z/6ZfZAgAAAABJRU5ErkJggg==">
            </div>
        </div>
    </div>
</template>

<script>
import cardTableListDataJson from '@/assets/js/cardTableListDataJson'
import Images from '@/assets/js/images.js'

export default {
  props: {
    row: Object
  },
  data () {
    return {
      Images: Images,
      cardTableListData: [],
      cardTableListDataJson: cardTableListDataJson
    }
  },
  methods: {
    getCardList (id) {
      this.$axios
        .get('/api/findAllOPByParam?id=' + id)
        .then(response => {
          this.cardTableListData = response.data
        })
        .catch(error => {
          console.log(error.message)
        })
    }
  },
  mounted () {
    this.getCardList(this.row.id)
  }
}
</script>

<style lang="scss" scoped>
.card-content-table-expand {
    margin: 0px 50px;
    color: #333;
    font-size: 14px;
    font-family: PingFang SC,Source Sans Pro,Hiragino Sans GB,Helvetica Neue,Helvetica,Microsoft Yahei,arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    .card-list-box-inline {
        display: inline;
    }
    .card-list-box {
        margin-left: -15px;
        display: inline-block;
        padding-bottom: 20px;
        box-sizing: border-box;
        overflow: auto;
        padding-right: 5px;
        min-width: 100%;
        .card-list-content-img {
            text-align: center;
            line-height: 5rem /* 80/16 */;
            img {
                vertical-align: middle;
            }
        }
        .card-list-content {
            width: 255px;
            height: 80px;
            padding: 10px;
            border: 1px solid #eee;
            margin: 15px 0 0 15px;
            float: left;
            position: relative;
            transition: all .3s ease;
            cursor: pointer;
            box-sizing: content-box;
            &.card-list-content:hover {
                transform:translateY(-5px);
                box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.3);
            }
            .card-list-header {
                width: 100%;
                position: relative;
                // &.card-list-header::before {
                //     background: url(data:image/png;base64,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);
                //     background-size: contain;
                //     content: "";
                //     display: inline-block;
                //     width: 15px;
                //     height: 15px;
                //     position: absolute;
                //     top: 26px;
                //     left: 24px;
                // }
                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 20px;
                    border: 0px;
                }
                .into-account {
                    vertical-align: middle;
                    width: 195px;
                    display: inline-block;
                    margin-left: 15px;
                    margin-top: -30px;
                    font-weight: 400;
                    span {color: #8590a7;}
                    .title {
                        display: inline-block;
                        width: 200px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        color: #8590a7;
                    }
                    .account {
                        font-size: 12px;
                    }
                }
            }
            .card-list-footer {
                margin-top: 18px;
                font-size: 12px;
                line-height: 22px;
                height: 22px;
                color: #666;

                .login-type {
                    color: #09cc39;
                }
                .refresh {
                    display: inline-block;
                    height: 14px;
                    width: 14px;
                    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAAAAXNSR0IArs4c6QAAA3FJREFUSA3FVX9ozGEYf573e2ZHsVIYyh8TW5JISdgJ+UOypLZb+ENIzL5TzNmWv3BnKHOW4h9C3C1SlF9/bApNIfnRQhsTbbsxYzNkd9/H571znNsds1Pe+vZ93+f9fD7P87w/npcoxba7yr+n8nDNpGQynGyiP/ZK77lxIfn6XITbBylybDOdTfG83zoQMPce8s8MES8kkRyQM/FZJPSWFD8WCWWS8MaIKL9SgyW3bENhc2T83Ro7iO27D/oXE4kbTqZ+t7cy8VMhyoB9FJPKEHhC3/6Dx/wi3SaOLUWFr6K2Phns9fqyekWOgzuHmR6yIreiITdcxXktUZL+ew76KiyRXbE23UcQjYZhd0TxvzhwV/smSpBqmYURW2m56TzDGMSLHDtWl976oe0lJkbGz0XG/JTI7qjYnBdQUYD70NlsCcp1RB3iQWlzK0oKTycS1/i27vZlwvQZ88/wPYLpLiK/hWhrkcNlYmlg9WWdxoYzqKmpSWtsDT1ARHaVRvPiN0oDB9psmtjUapWKULZhU47tGwqaByqWiMd6PVu62gJI8WJ5iXNlIlAqNtXS1b4UJ2aYwVSdilAyro1J8rAVzS7TeTsZKBU79kBycCLupyKSiOup8m2ymFYonJwsXPfGRKBUbBbLGCx9tsI5DaUilIzLrD7hjg7VF60HToYlAw7YLoJbzh1wwA0oDNMGLJScmIMleqKI+Qb2YLrXe+mfZRHWEpqNwOuVUsZ51B+j2+oO147kAfV/pke68lHK7czGqXAt2l3lu4QNmTLcZuQUFeV/7L9UX+S+E1eH9nZ2NmDmJSpDbriaKlY7YBj1IWh5+1L+ztL77p0bjLE4nsWaGXZQVpJ/D8u0A6/Xao/XV/p3kj/Rbq9vM+6ViefVs910PtAz4SXSHYgrj9d/FP81OMP7R6Rnla9fP6NXz/2p1dXV2eofBnYC58J3vMwsgEbkoQpnoAVgsLBma5FUpYi1teNL4z39LsPhjyA0LrbpOXeVbwnEdR3T4gcmZKp1UXGNTUjeU+3PtYLWYaQ7GZ6bUBCvwPEdlPQAK7i3aDRSngX+ApyWCRDEy0bFZabzmhaNbQkdaEAk7fZFWLxVEJsPZ7+8vxAMCPFNg+ikyyy4EBt1vxzEgnT/yJGLQ94He8ZbIVs6bucbl7n8dTzmv4y/AShzSfhySZ2CAAAAAElFTkSuQmCC) no-repeat;
                    background-size: contain;
                    margin-left: 5px;
                    vertical-align: middle;
                    cursor: pointer;
                    position: relative;
                    top: -1px;
                    transition: all .3s ease;
                }
            }
        }
    }
}
</style>
