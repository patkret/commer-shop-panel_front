<template>
    <div class="login-column-container">
        <div class="login-image-col"></div>
        <div class="login-form-col">
            <div class="login-form-container">
                <div class="logo-space">
                    <img :src="logo"/>
                </div>
                <div class="component-container">
                <router-view></router-view>   

                </div>
            <div class="login-footer">    
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
        </div>
    </div>
</template>

<script>
  import icon from './assets/icons.js'
  import LoginForm from './loginForm'
  import LoginPassword from './loginPassword'
  export default {
      components: {
          LoginForm,
          LoginPassword,
      },
    name: 'login',
    data: () => ({
     
        user: {
          email: '',
          password: '',
        },
        logo: icon.logo,
        type: 1,
      
    }),
  }
</script>
<style scoped>
    .login-column-container {
        display: grid;
        grid-template-columns: 50% 50%;
    }
    .login-image-col {
        background: url("./assets/img/login-background.jpg");
        height: 100vh;
        background-repeat: no-repeat;
    }
    .login-form-col {
        display: grid;
        grid-template-rows: 25% 70% 5%;
    }
    .login-form-container {
        grid-row-start: 2;
        grid-row-end: 3;
        margin: 0 auto;
    }
     .logo-space {
        width: 300px;
    }
    .login-links-container {
        display: flex;
        justify-content: space-around;
    }
    .footer-p {
        text-align: center;
        display: block;
        color: #ABABAB;
        margin-top: 20px;
    }
    .login-link {
        font-size: 12px;
    }
    .login-link:hover {
        text-decoration: underline;
    }
    .login-footer {
       padding-top: 130px;
    }
</style>