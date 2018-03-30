<template>
    <div class="login-board">
        <div class="login-image-container">
            <div class="login-image"></div>
            <div class="login-image-bar"></div>
        </div>
        <div class="login-card">
            <div class="logo-space">
                <img :src="logo"/>
            </div>

            <form class="login-form" action="" @submit.prevent="login()">
                <div class="form-row">
                    <div class="col-1"></div>
                    <h3 class="login-heading col-2">Zaloguj się do ecommer</h3>
                </div>
                <div class="form-row">
                    <label class="form-label col-1">E-mail:</label>
                    <input type="text" v-model="user.email" class="form-input col-2" placeholder="E-mail">
                </div>
                <div class="form-row">
                    <label class="form-label col-1">Password:</label>
                    <input type="password" v-model="user.password" placeholder="Password" class="form-input col-2">
                </div>
                <div class="form-row">
                        <div class="col-1"></div>
                        <button type="submit" class="custom-button col-2">Login</button>
                </div>
                <div class="form-row">
                    <div class="col-1"></div>
                    <router-link to="/categories/">
                        <p class="login-link">Zapomniałeś hasła ?</p>
                    </router-link>
                </div>
            </form>
            <div class="login-links-container">
                <router-link to="/categories/">
                    <p class="login-link">Polityka prywatności</p>
                </router-link>
                <router-link to="/categories/">
                    <p class="login-link">Pomoc</p>
                </router-link>
                <router-link to="/categories/">
                    <p class="login-link">Kontakt</p>
                </router-link>
            </div>
            <p class="footer-p">Wszystkie prawa zastrzeżone. E-commer.pl 2018.</p>
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
        grid-template-columns: 50% 50%;
        grid-template-areas:   "login-image-container login-card" ;
    }
    .login-image-container {
        position: relative;
    }
    .login-image {
        background: url("./assets/img/login-background.jpg");
        height: 100vh;
    }
    .login-image-bar {
        background: linear-gradient(to right,#21c8cc, #2595ec);
        height: 20px;
        width: 100%;
        position: absolute;
        bottom: 0;
    }
    .login-card {
        flex-direction: column;
        grid-area: login-card;
        background-color: #f6f7fb;
        height: 100vh;
    }
    .logo-space {
        width: 300px;
        margin: 100px auto;
    }
    .login-heading {

        margin-bottom: 30px;
    }
    .login-form {

        background: url("./assets/img/login-wave.jpg") center bottom;
        padding-bottom: 100px;
    }
    .form-row {
        display: grid;
        grid-template-areas: "col-1 col2";
        grid-template-columns: 35% 65%;
    }
    .form-input {
        background-color: #ffffff;
        margin-left: 10px;
        border-radius: 10px;
        height: 35px;
        line-height: 35px;
        padding-left: 10px;
        border:none;
        font-size: 14px;
        font-weight: 700;
        width: 230px;
        margin-bottom: 10px;
    }
    .form-label {
        font-weight: 700;
        margin-top: 10px;
        font-size: 14px;
        text-align: right;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    }
    .custom-button{
        background: linear-gradient(#21c8cc, #2595ec);
        color: white;
        width: 240px;
        margin: 0 0 0 10px;
    }
    .login-link {
        color: #2595ec;
        font-size: 12px;
        font-weight: 700;
        margin-top: 20px;
        margin-left: 20px;
    }
    .login-link:hover {
        text-decoration: underline;
    }
    .login-links-container {
        display: flex;
        justify-content: center;
    }
    .footer-p {
        color: #000000;
        text-align: center;
        font-size: 12px;
        font-weight: 700;
    }
</style>