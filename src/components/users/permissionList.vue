<template>
    <div>
        <ul v-for="module in modules">{{module.name}}
            <li v-for="permission in permissions">
               <label><input type="checkbox" v-model="temp" :value="module.id + '[' + permission.id + ']'">{{permission.name}}</label>
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: 'permission-list',
    data: () => ({
      permissions: '',
      modules: '',
      temp: [],
      selectedPermissions: [
        // {module_id : '',
        //  permissions: []
        // }
      ],


    }),


    watch: {
      temp(val){
      console.log(val)
      }
    },
    // methods: {
    //
    // },

    created: function () {
      axios('modules').then(result => {
        this.modules = result.data
      })
      axios('access-rights').then(result => {
        this.permissions = result.data
      })
    }
  }
</script>

<style scoped>

</style>