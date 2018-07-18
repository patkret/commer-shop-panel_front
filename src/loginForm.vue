<template>
<div>
<h3 class="login-header">Logowanie do panelu admina</h3>
  <form class="login-form" action="" @submit.prevent="login()">
                <div class="login-form-row">
                    <password-input label="E-mail" rules="required" min-inpt-length="4" v-model="user.email"></password-input>
                </div>
                <div class="login-form-row">
                    <password-input label="Haslo" rules="required" min-inpt-length="4" v-model="user.password"></password-input>
                </div>
                <div class="login-form-row">
                    <router-link :to="{name: 'LoginPassword'}">
                        <p class="login-link">Zapomniałeś hasła ?</p>
                    </router-link>
                </div>
                <div class="h-center">
                <button class="c-button mt-20"  type="submit">
                  <span>Zaloguj się</span>
                  </button>
                </div>
            </form>
 </div>
</template>

<script>
  import icon from './assets/icons.js'
  export default {

    name: 'login-form',
    data () {
      return {
        user: {
          email: '',
          password: '',
        },
        logo: icon.logo,

      }
    },
    methods: {
      login () {
        axios.post('login', this.user).then(result => {
          localStorage.setItem('token', result.data.access_token)
          this.$router.replace('/dashboard')
        }).catch(error => alert('Bad credentials!'))
      },
    },
  }
</script>
<style scoped>
  .login-header {
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    margin: 50px 0;
  }
  .mt-20 {
    margin-top: 20px;
  }
</style>