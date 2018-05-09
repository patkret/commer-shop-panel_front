<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    created: function () {

      if(this.$route.path == '/') {
        this.$router.push({path:'dashboard'})
      }
    },
  }
</script>
