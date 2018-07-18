 <!-- <form action="" @submit.prevent="duplicateUser">
        <div class="info" v-if="showInfoEdit == true">
            <p>Użytkownik został zduplikowany!</p>
        </div>
        <div class="info error" v-if="errorInfo === true">
            <p>Użytkownik o takim adresie e-mail już istnieje!</p>
        </div>
        <div class="form-row">
            <label class="form-label col-1">Imię</label>
            <div class="form-data col-2">
                <input v-model="duplicatingUser.first_name" v-validate="'required'"
                       :class="{'input': true, 'is-danger input-border': errors.has('first_name') }" class="form-input "
                       type="text" name="first_name">
                <span v-show="errors.has('first_name')" class="help is-danger">{{ errors.first('first_name') }}</span>
            </div>
        </div>

        <div class="form-row">
            <label class="form-label col-1">Nazwisko</label>
            <div class="form-data col-2">
                <input v-model="duplicatingUser.last_name" v-validate="'required'"
                       :class="{'input': true, 'is-danger input-border': errors.has('last_name') }" class="form-input "
                       type="text" name="last_name">
                <span v-show="errors.has('last_name')" class="help is-danger">{{ errors.first('last_name') }}</span>
            </div>
        </div>

        <div class="form-row">
            <label class="form-label col-1">Email</label>
            <div class="form-data col-2">
                <input v-model="duplicatingUser.email" v-validate="'required'"
                       :class="{'input': true, 'is-danger input-border': errors.has('email') || errorInfo === true }"
                       class="form-input "
                       type="text" name="email">
                <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
            </div>
        </div>
        <div class="form-row">
            <label class="form-label col-1">Nr tel.</label>
            <div class="form-data col-2">
                <input v-model="duplicatingUser.phone_no" v-validate="'required|numeric'"
                       :class="{'input': true, 'is-danger input-border': errors.has('phone_no') }" class="form-input "
                       type="text" name="phone_no">
                <span v-show="errors.has('phone_no')" class="help is-danger">{{ errors.first('phone_no') }}</span>
            </div>
        </div>
        <div class="form-row">
            <label class="form-label col-1">Hasło</label>
            <div class="form-data col-2">
                <input v-model="duplicatingUser.password" v-validate="'required|confirmed:password'"
                       :class="{'input': true, 'is-danger input-border': errors.has('password') }" class="form-input "
                       type="password" name="password">
                <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
            </div>
        </div>

        <div class="form-row">
            <label class="form-label col-1">Potwierdź Hasło</label>
            <div class="form-data col-2">
                <input v-model="duplicatingUser.passwordConfirmation" v-validate="'required'"
                       :class="{'input': true, 'is-danger input-border': errors.has('newPassword') }"
                       class="form-input " type="password" name="newPassword">
                <span v-show="errors.has('newPassword')" class="help is-danger">{{ errors.first('newPassword') }}</span>
            </div>
        </div>
        <div class="form-row  col-2 button-row ">
            <button type="submit" class="custom-button">Duplikuj</button>
        </div>
    </form> -->
<template>
  <div>
    <div class="l-wrapper f-center">
      <!-- tutaj trzeba zrobić kolumny -->
      <div style="width: 100%;" class="f-content">
        <form action="" class="c-form" @submit.prevent="duplicateUser()">
          <div class="c-form__fieldset">
            <div class="c-form__field-wrapper">
              <custom-input :label="'Imię'" rules="required"  v-model="duplicatingUser.first_name" />
            </div>
          </div>
           <div class="c-form__fieldset">
            <div class="c-form__field-wrapper">
              <custom-input :label="'Nazwisko'" rules="required" v-model="duplicatingUser.last_name" />
            </div>
          </div>
          <div class="c-form__fieldset">
            <div class="c-form__field-wrapper">
              <custom-input :label="'Email'" rules="required||email" v-model="duplicatingUser.email" />
            </div>
          </div>
          <div class="c-form__fieldset">
            <div class="c-form__field-wrapper">
              <custom-input :label="'Numer telefonu'" rules="required||numeric"  v-model="duplicatingUser.phone_no" />
            </div>
          </div>
          <div class="c-form__fieldset">
            <div class="c-form__field-wrapper">
              <password-input label="Nowe haslo" rules="required" min-inpt-length="4" v-model="duplicatingUser.password"></password-input>
            </div>
          </div>
          <div class="c-form__fieldset">
            <div class="c-form__field-wrapper">
              <password-input label="Powtórz haslo" rules="required" min-inpt-length="4" v-model="duplicatingUser.passwordConfirmation"></password-input>
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
    name: 'duplicate-user',
    data: () => {
      return {
        duplicatingUser: {
          // first_name: '',
          // last_name: '',
          // email: '',
          // password: '',
        },
        showInfoEdit: false,
        errorInfo: false,
      }
    },
    watch: {
      showInfoEdit: function () {
        setTimeout(() => {
          this.showInfoEdit = false
          this.$parent.$data.type = 2
        }, 3000)
      },
    },
    methods: {

        fetchUser () {
        axios.get('users/' + this.$route.params.item).then(result => {
          this.duplicatingUser = result.data
        })
        },

      duplicateUser () {

        this.$validator.validateAll().then((result) => {
          if (result) {
            axios.post('/users/duplicate', {
              duplicatingUser: this.duplicatingUser,
            }).then(response => {
              if (response.status === 200) {
                this.$router.push('/users/list')
              }
              else {
                this.errorInfo = true

                setTimeout(() => {
                  this.errorInfo = false
                  this.duplicatingUser.email = ''
                }, 3000)
              }
            })
          }
        })
      },
    },

    created: function () {
        this.fetchUser();
    },
      // this.duplicatingUser.first_name = this.user.first_name
      // this.duplicatingUser.last_name = this.user.last_name
      // this.duplicatingUser.phone_no = this.user.phone_no
  }
</script>

<style scoped>

</style>