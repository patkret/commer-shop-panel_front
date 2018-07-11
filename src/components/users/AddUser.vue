<template>
  <div>
    <div class="l-wrapper f-center">
      <!-- tutaj trzeba zrobić kolumny -->
      <div style="width: 100%;" class="f-content">
        <form action="" class="c-form" @submit.prevent="saveUser()">
          <div class="c-form__fieldset">
            <div class="c-form__field-wrapper">
              <custom-input :label="'Imię'" rules="required"  v-model="first_name" />
            </div>
          </div>
           <div class="c-form__fieldset">
            <div class="c-form__field-wrapper">
              <custom-input :label="'Nazwisko'" rules="required" v-model="last_name" />
            </div>
          </div>
          <div class="c-form__fieldset">
            <div class="c-form__field-wrapper">
              <custom-input :label="'Email'" rules="required||email" v-model="email" />
            </div>
          </div>
          <div class="c-form__fieldset">
            <div class="c-form__field-wrapper">
              <custom-input :label="'Numer telefonu'" rules="required||numeric"  v-model="phone_no" />
            </div>
          </div>
          <div class="c-form__fieldset">
            <div class="c-form__field-wrapper">
              <custom-input  :label="'Hasło'" rules="required" :type="password" min-input-length="4" v-model="password" />
            </div>
          </div>
          <div class="c-form__fieldset">
            <div class="c-form__field-wrapper">
              <custom-input  :label="'Powtórz hasło'" rules="required||confirmed:pasword" type="password" min-input-length="4" v-model="passwordConfirmation" />
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
    name: "add-user",
    data: () => {
      return {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone_no: '',
        passwordConfirmation: '',
      }
    },
    methods: {
      saveUser () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            axios.post('/users', {
                first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            password: this.password,
            phone_no: this.phone_no,
            passwordConfirmation: '',
            }).then(() => {
             this.$router.push('./list')
            })
          }
        });
      },
    }
  }
</script>

<style scoped>

</style>