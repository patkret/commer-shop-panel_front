<template>
    <div>
        <ul v-for="module in modules">{{module.name}}
            <li v-for="permission in permissions">
               <label><input type="checkbox" v-model="selectedPermissions" :value="module.id + '|' + permission.id">{{permission.name}}</label>
            </li>
        </ul>
        <button class="custom-button" @click="savePermissions()">Zapisz</button>
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

      }
    },
    methods: {
    savePermissions(){
      axios.post('/user-access', {
        user_id: 2,
        permissions: this.selectedPermissions
      }).then(() => {
        console.log('dodano')
      })
    }
    },

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