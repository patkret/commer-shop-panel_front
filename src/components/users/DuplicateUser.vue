<template>
    <form action="" @submit.prevent="duplicateUser">
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
    </form>
</template>

<script>

  export default {
    name: 'duplicate-user',
    props: ['user'],
    data: () => {
      return {
        duplicatingUser: {
          first_name: '',
          last_name: '',
          email: '',
          password: '',
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
      duplicateUser () {

        this.$validator.validateAll().then((result) => {
          if (result) {
            axios.post('/users/duplicate', {
              duplicatingUser: this.duplicatingUser,
            }).then(response => {
              if (response.status === 200) {
                this.$parent.$data.type = 2
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
      axios('users').then(result => {
        this.items = result.data
      })
      this.duplicatingUser.first_name = this.user.first_name
      this.duplicatingUser.last_name = this.user.last_name
      this.duplicatingUser.phone_no = this.user.phone_no
    },
  }
</script>

<style scoped>
    .form-row {
        display: grid;
        margin: 20px 0;
        grid-template-areas: 'col-1 col-2';
        grid-template-columns: 130px 520px;
    }

    .col-1 {
        grid-area: col-1;
    }

    .col-2 {
        grid-area: col-2;
    }

    .form-label {
        font-weight: 700;
        margin-top: 10px;
        margin-right: 15px;
        font-size: 12px;
        text-align: right;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    }

    .form-input {
        background-color: #ffffff;
        margin-left: 10px;
        margin-right: 10px;
        border-radius: 5px;
        height: 35px;
        line-height: 35px;
        padding-left: 10px;
        border: none;
        font-size: 12px;
        font-weight: 700;
        width: 100%;
    }

    .form-data {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    .input-border {
        border: 2px solid red;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    .form-data span {
        background-color: red;
        border-radius: 5px;
        color: #fff;
        padding: 10px 0 10px 14px;
        font-size: 12px;
        font-weight: 700;
        margin-left: 10px;
        border-top-right-radius: 0;
        border-top-left-radius: 0;
        width: 100%;
    }

    .button-row {
        display: flex;
        justify-content: flex-start;
        margin-left: 100px;
    }

    .info {
        width: 100%;
        height: 50px;
        background-color: #94C01E;
        margin-bottom: 50px;
        color: #FFFFFF;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
    }

    .error {
        background-color: #ff0e02;
    }
</style>