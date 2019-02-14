<!-- pointFieldHome -->
<template>
  <div>
    <Tabs type="card" animated v-model="activeTab" @on-click="changeTab">
      <TabPane :label="pointType.pointTypeName" :name="pointType.pointType" v-for="(pointType,index) in pointTypeList" :key="index">
      </TabPane>
    </Tabs>
    <div>
      <Table :loading="tableLoad" :columns="ponitColColumns" :data="poniColData" :height="curInnerHeight - 138"></Table>
    </div>
    <div class="data-center-page-section">
      <Page :total="page.total" :current="page.pages" :page-size="page.pageSize" show-total @on-change="changePage"></Page>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'pointFieldHome',
    computed: {
      curInnerHeight() {
        return this.$store.state.curInnerHeight;
      }
    },
    data() {
      return {
        Height:500,
        tabs: [],
        activeTab: this.$route.params.pointType,
        tableLoad: false,
        ponitColColumns: [{
            title: this.$t('table.index'),
            key: 'index',
            width: 80,
            align: 'center',
            render: (h, params) => {
              return h('span', {}, (params.index + 1) + (this.page.pages - 1) * this.page.pageSize);
            }
          },
          {
            title: this.$t('dataTemp.point.field.tableId'),
            key: 'tableId',
            align: 'center'
          },
          {
            title: this.$t('dataTemp.point.field.colName'),
            key: 'colName',
            align: 'center',
            render: (h, params) => {
              return h('span', {
                class: 'myColor'
              }, params.row.colName);
            }
          },
          {
            title: this.$t('dataTemp.point.field.colId'),
            key: 'colId',
            align: 'center'
          },
          {
            title: this.$t('dataTemp.point.field.defaultValue'),
            key: 'defaultValue',
            align: 'center',
            render: (h, params) => {
              return h(
                'input', {
                  attrs: {
                    class: 'myInput',
                    value: params.row.defaultValue
                  },
                  on: {
                    blur: () => {
                      let tempValue = this.$validation.trimStr(event.target.value);
                      if (tempValue == '') {
                        return;
                      }
                      if (tempValue != params.row.defaultValue) {
                        let el = event.target;
                        this.updatePointCol(params.column.key, params.row, tempValue, params.row.defaultValue, el);
                      }
                    }
                  }
                },
                params.row.sortNum
              )
            }
          },
          {
            title: this.$t('dataTemp.point.field.display'),
            key: 'display',
            align: 'center',
            width: 150,
            render: (h, params) => {
              return h('i-switch', {
                props: {
                  value: (params.row.display == "1")
                },
                on: {
                  'on-change': (status) => {
                    let el = event.target;
                    this.updatePointCol(params.column.key, params.row, status ? 1 : 0, params.row.display == "1", el);
                  }
                }
              });
            }
          },
          {
            title: this.$t('dataTemp.point.field.sortNum'),
            key: 'sortNum',
            align: 'center',
            render: (h, params) => {
              return h(
                'input', {
                  attrs: {
                    class: 'myInput',
                    value: params.row.sortNum
                  },
                  on: {
                    blur: () => {
                      let tempValue = this.$validation.trimStr(event.target.value);
                      if (tempValue == '') {
                        return;
                      }
                      if (tempValue != params.row.sortNum) {
                        let el = event.target;
                        this.updatePointCol(params.column.key, params.row, tempValue, params.row.sortNum, el);
                      }
                    }
                  }
                },
                params.row.sortNum
              )
            }
          },
          {
            title: this.$t('dataTemp.point.field.windowFlag'),
            key: 'windowFlag',
            align: 'center',
            // minWidth: 100,
            className: 'mySelect',
            render: (h, params) => {
              return h(
                'i-select', {
                  attrs: {
                    value: params.row.windowFlag
                  },
                  on: {
                    'on-change': (val) => {
                      if (val !== params.row.windowFlag) {
                        this.updatePointCol(params.column.key, params.row, val, params.row.windowFlag);
                      }
                    }
                  }
                },
                [
                  h('i-option', {
                    attrs: {
                      value: 0,
                      key: 0,
                    },
                  }, '不可编辑'),
                  h('i-option', {
                    attrs: {
                      value: 1,
                      key: 1,
                    },
                  }, '编辑'),
                  h('i-option', {
                    attrs: {
                      value: 2,
                      key: 2,
                    },
                  }, '按钮'),
                  ]
              )
            }
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
                        let el = event.target;
                        this.updatePointCol(params.column.key, params.row, tempValue, params.row.remark, el);
                      }
                    }
                  }
                },
                params.row.remark
              )
            }
          }
        ],
        poniColData: [],
        pointTypeList: [],
        page: {
          total: 0,
          pages: 1,
          pageSize: this.$store.state.pageSize
        }
      };
    },

    props: [],

    components: {},

    created() {},

    mounted() {
      this.getPointTypeList();
    },

    methods: {
      /**
       * 查询测定类型列表
       */
      getPointTypeList() {
        this.$api.dataTemp.pointTypeList().then(res => {
          this.pointTypeList = res;
          if (res.length > 0) {
            let pointType = res[0].pointType;
            this.activeTab = this.activeTab == 'all' ? pointType : this.activeTab;
            this.getPointColList();
          }
        });

      },
      /**
       * 各类测点的字段数量表查询
       */
      getPointColList(pointType) {
        this.tableLoad = true;
        if (this.activeTab == 'all') {
          this.tableLoad = false;
          return;
        };
        let params = {
          pointType: this.activeTab,
          pages: this.page.pages,
          pageSize: this.page.pageSize
        }
        this.$api.dataTemp.pointColList(params).then(res => {
          this.tableLoad = false;
          this.page.total = res.total;
          this.page.pages = res.pages;
          this.poniColData = res.list;
        });

      },
      /**
       * 测点字段列修改
       */
      updatePointCol(type, params, val, oldVal, el) {
        let data = {
          pointType: params.pointType,
          tableId: params.tableId,
          colId: params.colId,
          updateDate: this.$utils.getCurrentUpdate()
        }
        if (type === '') {

        }
        switch (type) {
          case 'display':
          case 'sortNum':
            data[type] = this.$validation.toNumber(val);
            break;
          default:
            data[type] = val;
            break;
        }
        this.$api.dataTemp.pointColUpdate(data).then(res => {
              // params.row.remark = data.remark
              if (res) {
                this.$Message.success(this.$t('msg.success.update'));
              } else {
                this.$Message.error(this.$t('msg.fail.update'));
                this.updateFailHandle(type, oldVal, el)
              }
            },
            err => {
              this.updateFailHandle(type, oldVal, el)
            }
          )
          .catch(err => {
              this.updateFailHandle(type, oldVal, el)
          })

      },
      updateFailHandle (type, oldVal, el) {
        switch (type) {
          case 'display':
            this.setElmentDisplay(el, oldVal);
            break;
          case 'sortNum':
            el.value = oldVal;
            break;
          default:
            break;
        }
      },
      changeTab(name) {
        this.$router.push({ path: `/pointFieldHome/${name}` });
      },

      changePage(pages) {
        this.page.pages = pages;
        this.getPointColList();
      },
      /**
       * 改变Switch样式
       */
      setElmentDisplay(el, oldVal, time = 1000) {
        setTimeout(() => {
          let defaultClass = 'ivu-switch ivu-switch-default';
          let checkedClass = 'ivu-switch ivu-switch-checked ivu-switch-default';
          el.className = oldVal ? checkedClass : defaultClass;
        }, time);
      }
    },
    
    watch: {
      activeTab: function(Val, oldVal) {
        this.page.pages = 1;
        if (typeof oldVal != 'undefined' && oldVal != 'all') {
          this.getPointColList();
        }
      }
    }
  };

</script>
<style lang='less' scoped>
   
</style>
<style lang='less'>
</style>
