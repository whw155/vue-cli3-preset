<!-- ponitTypeHome -->
<template>
  <div>
    <Table :columns="ponitTypeColumns" :data="ponitTypeData"></Table>
  </div>
</template>

<script>
  export default {
    name: 'ponitTypeHome',
    data() {
      return {
        ponitTypeColumns: [{
            title: this.$t('table.index'),
            type: 'index',
            width: 80,
            align: 'center'
          },
          {
            title: this.$t('dataTemp.point.type.pointType'),
            key: 'pointType',
            align: 'center'
          },
          {
            title: this.$t('dataTemp.point.type.pointTypeName'),
            key: 'pointTypeName',
            align: 'center'
          },
          {
            title: this.$t('dataTemp.point.type.colNum'),
            key: 'colNum',
            align: 'center'
          },
          {
            title: this.$t('table.remark'),
            key: 'remark',
            align: 'center',
            render: (h, params) => {
              return h(
                'input', {
                  attrs: {
                    class: 'myInput',
                    value: params.row.remark
                  },
                  on: {
                    blur: () => {
                      let tempValue = this.$validation.trimStr(event.target.value);
                      if (tempValue == '') {
                        return;
                      }
                      if (tempValue != params.row.remark) {
                        let el = event.target
                        let data = {
                          pointType: params.row.pointType,
                          remark: tempValue,
                          updateDate: this.$utils.getCurrentUpdate()
                        }
                        this.updatePointType(el, data, params.row.remark)
                      }
                    }
                  }
                },
                params.row.remark
              )
            }
          }
        ],
        ponitTypeData: []
      }
    },

    props: [],

    components: {},

    created() {},

    mounted() {
      this.getPointCountList()
    },

    methods: {
      /**
       * 各类测点的字段数量表查询
       */
      getPointCountList() {
        this.$api.dataTemp.pointCountList().then(res => {
          this.ponitTypeData = res
        })
      },
      /**
       * 测点内容修改
       */
      updatePointType(el, data, old) {
        this.$api.dataTemp.pointTypeUpdate(data).then(res => {
              if (res) {
                this.$Message.success(this.$t('msg.success.update'))
              } else {
                el.value = oldVal
              }
            },
            err => {
              el.value = old
            }
          )
          .catch(err => {
            el.value = old
          })
      }
    },

    computed: {},

    watch: {}
  }

</script>
<style lang='less' scoped>

</style>
<style lang='less'>

</style>
