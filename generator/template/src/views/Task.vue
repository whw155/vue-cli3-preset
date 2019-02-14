<template>
  <div class="about">
    <h1> Task</h1>
    <div>{{log}}</div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        log: ''
      }
    },
    mounted() {
      this.getProject();
    },
    methods: {
      getProject() {
        this.$api.log.index({ pageNum: 1, pageSize: 100, conditionMap: { logType: 2, operateId: 112673, parentId: 57 } }).then(res => {
          this.log = res;
        })
      }
    }
  }

</script>
