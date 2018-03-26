<template>
    <div class="login-board">
        <div class="login-card">
            <div class="logo-space">
                <img :src="logo"/>
            </div>
            <form class="login-form" action="" @submit.prevent="login()">
                <div class="cred-row">
                    <label class="login-label">E-mail:</label>
                    <input type="text" v-model="user.email" class="form-control" placeholder="E-mail">
                </div>
                <div class="cred-row">
                    <label class="login-label">Password:</label>
                    <input type="password" v-model="user.password" placeholder="Password" class="form-control">
                </div>
            <button type="submit" class="custom-button">Login</button>
            </form>
        </div>

    </div>
</template>

<script>
  import icon from './assets/icons.js'

  export default {
    name: 'login',
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
    .login-board {
        display: grid;
        height: 100vh;
        grid-template-rows: 30% 40% 30%;
        grid-template-columns: 30% 40% 30%;
        grid-template-areas: " . . . " ". login-card ." ". . . ";
    }
    .login-card {
        display: flex;
        flex-direction: column;
        grid-area: login-card;
        background-color: #FFFFFF;
        border-radius: 5px;
        box-shadow: 0 0 5px #2D2E2F;
        justify-content: space-around;
        align-items: center;
        height: 450px;
    }
    .logo-space {
        width: 350px;
        margin-top: 80px;
    }
    .login-form {
        text-align: center;
    }
    .login-label {
        font-weight: 700;
    }
    .cred-row {
        width: 400px;
        display: grid;
        margin-bottom: 10px;
        grid-template-columns: 30% 40px 50%;
        grid-template-areas: " label . input ";

    }

    .cred-row label {
        grid-area: label;
        justify-self: end;
        align-self: center;
    }

    .cred-row input {
        grid-area: input;
        border: none;
        height: 30px;
        border-radius: 5px;
        box-shadow: 0 0 1px grey;
        padding-left: 10px;
    }
    .custom-button{
        background: linear-gradient(#21c8cc, #2595ec);
        color: white;
    }
</style>