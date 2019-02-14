<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div>{{$t('welcomeHome')}}</div>
    <HelloWorld :msg="$t('welcomeHome')" />
  </div>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from "@/components/HelloWorld.vue";

  export default {
    name: "home",
    components: {
      HelloWorld
    }
  };

</script>
