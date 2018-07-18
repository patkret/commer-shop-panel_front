<template>
  <div>
    <div class="l-wrapper f-center">
      <!-- tutaj trzeba zrobić kolumny -->
      <div style="width: 100%;" class="f-content">
        <form action="" class="c-form" @submit.prevent="updateUser()">
          <div class="first__column">
          <div class="c-form__fieldset">
            <div class="c-form__field-wrapper">
              <custom-input :label="'Imię'" rules="required"  v-model="user.first_name" />
            </div>
          </div>
           <div class="c-form__fieldset">
            <div class="c-form__field-wrapper">
              <custom-input :label="'Nazwisko'" rules="required" v-model="user.last_name" />
            </div>
          </div>
          <div class="c-form__fieldset">
            <div class="c-form__field-wrapper">
              <custom-input :label="'Email'" rules="required||email" v-model="user.email" />
            </div>
          </div>
          <div class="c-form__fieldset">
            <div class="c-form__field-wrapper">
              <custom-input :label="'Numer telefonu'" rules="required||numeric"  v-model="user.phone_no" />
            </div>
          </div>
          <div class="h-center">
            <router-link :to="`/users/${user.id}/change-password`" tag="button" class="c-button c-form__button"><span>Zmień hasło</span> </router-link>
          </div>
          <div class="c-form__fieldset" v-if="showMessage">
            <div class="err-info" >
              <span>{{errorMessage}}</span>
            </div>
          </div>
          </div>
          <div class="second__column">
            <ul class="permission__module--name" v-for="module in modules">{{module.name}}
              <li v-for="permission in permissions">
                <label class="permission__label">
                  <input type="checkbox" v-model="selectedPermissions" :value="module.id + '|' + permission.id">{{permission.name}}</label>
              </li>
            </ul>
          </div>

          <div class="h-center">
            <button type="submit" class="c-button c-form__button">
              <span>Zapisz</span>
            </button>
          </div>

        </form>

      </div>
    </div>

  </div>

</template>

<script>


  export default {
    name: "edit-user",
    data: () => {
      return {
        user: {
            first_name: '',
            last_name: '',
            email: '',
            phone_no: '',
        },
        showMessage: '',
        permissions: '',
        modules: '',
        temp: [],
        selectedPermissions: [
          // {module_id : '',
          //  permissions: []
          // }
        ],
      }
    },
    methods: {
         fetchUser () {
        axios.get('users/' + this.$route.params.item).then(result => {
          this.user = result.data
        })
      },
      updateUser() {
        delete this.user.password
        this.$validator.validateAll().then((result) => {
          if (result) {
            axios.put('users/' + this.user.id , {
              editedUser: this.user,
            }).then(() => {
             this.$router.push('/users/list')
            })
          }
        });
      },
    },
    created: function () {
        this.fetchUser();
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
   form {
    display: grid;
    grid-template-columns: 50% 50%;
  }
  .first-column, .second__column {
    margin: auto;
  }
  .permission__module--name {
    font-size: 18px;
    font-weight: 700;
    margin-top: 10px;
  }
  .permission__label {
    font-weight: 500;
    font-size:  14px;
    padding-left: 20px;
  }
</style>