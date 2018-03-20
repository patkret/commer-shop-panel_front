<template>
    <div>
        <div class="wrapper wrapper-full-page">
            <div class="full-page login-page section-image" filter-color="black">
                <div class="content">
                    <div class="container">
                        <div class="col-md-4 ml-auto mr-auto">
                            <form class="form" @submit.prevent="login()">
                                <div class="card card-login card-plain">
                                    <div class="card-header ">
                                        <div class="logo-container">

                                        </div>
                                    </div>
                                    <div class="card-body ">
                                        <div class="input-group no-border form-control-lg">
                                        <span class="input-group-addon">
                                            <i class="now-ui-icons users_circle-08"></i>
                                        </span>
                                            <input type="text" v-model="user.email" class="form-control" placeholder="E-mail">
                                        </div>
                                        <div class="input-group no-border form-control-lg">
                                        <span class="input-group-addon">
                                            <i class="now-ui-icons text_caps-small"></i>
                                        </span>
                                            <input type="password" v-model="user.password" placeholder="Password" class="form-control">
                                        </div>
                                    </div>
                                    <div class="card-footer ">
                                        <button  class="btn btn-primary btn-round btn-lg btn-block">Login</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <!--<div class="full-page-background" :style="'background-image: url('+bg+')'"></div>-->
            </div>
        </div>
    </div>
</template>

<script>
  // import bg from './assets/img/bg14.jpg'
  export default {
    name: 'login',
    data () {
      return {
        // bg: bg,
        user: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      login () {
        axios.post('login', this.user)
        .then(result => {
          localStorage.setItem('token', result.data.access_token)
          this.$router.replace('/dashboard')
        })
        .catch(error => alert('Bad credentials!'))
      }
    }
  }
</script>