<template>
    <div>
        <div id="main-content-with-side-menu">
            <h1 class="card-name">Użytkownicy</h1>
            <div class="side-menu-container">
                <div id="side-menu">
                    <div class="side-button" :class="{'side-menu-item': true, 'side-menu-item active': type == 1}"
                         @click.prevent="changeComponent(1)">
                        <p>Dodaj użytkownika</p>
                    </div>
                    <div class="side-button" :class="{'side-menu-item' : true, 'side-menu-item active': type == 2}"
                         @click.prevent="changeComponent(2)">
                        <p>Wszyscy użytkownicy</p>

                    </div>
                </div>
            </div>
            <div class="component-container">
                <add-user v-if="type == 1"></add-user>
                <users-list v-if="type == 2"></users-list>
                <edit-user v-if="type == 3"></edit-user>
            </div>
        </div>
    </div>
</template>

<script>
  import AddUser from './AddUser'
  import EditUser from './EditUser'
  import UsersList from './UsersList'

  export default {
    name: "users",
    components: {
      AddUser,
      EditUser,
      UsersList,
    },
    data: () => {
      return {
        type: 2,
        users: '',
      }
    },
    methods: {
      changeComponent (type) {
        this.type = type
      },
    }
  }
</script>

<style scoped>

</style>