<template>
  <div class="project">
    <h1> 项目 </h1>
    <div>{{project}}</div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        project: ''
      }
    },
    mounted() {
      this.getProject();
    },
    methods: {
      getProject() {
        this.$api.project.category({
          a:12,
          b:13
        }).then(res => {
          this.project = res;
        })
      }
    }
  }

</script>
