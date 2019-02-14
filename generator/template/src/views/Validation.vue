<template>
  <div class="validation">
    <h1> validation</h1>
    <div>
        isNullStr：
        <Input v-model="isNullStr" placeholder="Enter name" style="width: auto" @on-change="changeInput('isNullStr')"/>
        isNullStr：
        <span>{{repNullStr}}</span>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        isNullStr:'',
        repNullStr:''
      }
    },
    mounted() {

    },
    methods: {
      changeInput(mothod){
        switch(mothod){
          case 'isNullStr':
           this.repNullStr = this.$validation.trimStr(this.isNullStr);
           break;
        }
      }
    }
  }

</script>
