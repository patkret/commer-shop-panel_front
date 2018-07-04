<template>
   <div>
    <h3 class="login-header">Przypomnienie hasła</h3>
     <form class="c-form" action="" @submit.prevent="resetPassword()">
         <div class="c-form__fieldset">
            <div class="c-form__field-wrapper">
                <custom-input :label="'Podaj adres e-mail'" v-model="email" rules="required" min-input-length="4" />
            </div>
        </div>
        <button type="submit" class="c-button mt-20">
          <span>Zapisz</span>
        </button>    
    </form>   
    </div>
    
</template>

<script>
  import icon from './assets/icons.js'
  export default {
    name: 'login-password',
    data () {
      return {
          email: '',
        // user: {
        //   email: '',
        //   password: '',
        // },
        logo: icon.logo,
      }
    },
    methods: {
      resetPassword () {
        axios.post('user/reset-password', {
          email: this.email
        }).then(() => {
          console.log('...')
        })
      }
    }
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