<template>
  <div>
    <div class="l-wrapper f-center">
      <!-- tutaj trzeba zrobić kolumny -->
      <div style="width: 100%;" class="f-content">
        <form action="" class="c-form" @submit.prevent="updatePassword()">
          <div class="c-form__fieldset">
            <div class="c-form__field-wrapper">
               <password-input label="Stare hasło" rules="required" min-inpt-length="4" v-model="user.oldPassword"></password-input>
            </div>
          </div>
           <div class="c-form__fieldset">
            <div class="c-form__field-wrapper">
               <password-input label="Nowe hasło" rules="required" min-inpt-length="4" v-model="user.newPassword"></password-input>
            </div>
          </div>
             <div class="c-form__fieldset">
            <div class="c-form__field-wrapper">
               <password-input label="Powtórz hasło" rules="required" min-inpt-length="4" v-model="user.newPasswordConfirmation"></password-input>
            </div>
          </div>
        
          <div class="c-form__fieldset" v-if="showMessage">
            <div class="err-info" >
              <span>{{errorMessage}}</span>
            </div>
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
    name: 'change-password',
    // props: ['userId'],
    data: () => ({
      user: {
        oldPassword: '',
        newPassword: '',
        newPasswordConfirmation: '',
      },
      showMessage: '',
      showInfo: false,
      infoError: false,

    }),

    methods: {
      
      updatePassword: function () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            axios.put('/users/' + this.user.id + '/change-password', {
              user: this.user,
            }).then(response => {
              if (response.status === 200) {
                this.showInfo = true
                setTimeout(() => {
                  this.showInfo = false
                  console.log(this.$router.path)
                  this.$router.push('/users/list')
                }, 3000)
              }
              else {
                this.infoError = true
              }
            })
          }
        })
      },
    },
    created: function () {
      axios('users/'+ this.$route.params.id).then(result => {
        this.user = result.data
      })
    },

  }
</script>

<style scoped>

</style>