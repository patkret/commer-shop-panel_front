<template>
    <div class="passwords-container">
        <div class="info" v-if="showInfo === true">
            <p>Hasło zostało zmienione!</p>
        </div>
        <div class="error" v-if="infoError === true">
            <p>Hasło niepoprawne!</p>
        </div>
        <form @submit.prevent="updatePassword()">
            <div class="form-row">
                <label class="form-label col-1">Stare Hasło</label>
                <div class="form-data col-2">
                    <input v-model="user.oldPassword" v-validate="'required'"
                           :class="{'input': true, 'is-danger input-border': errors.has('password') }"
                           class="form-input "
                           type="password" name="password">
                    <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
                </div>
            </div>

            <div class="form-row">
                <label class="form-label col-1">Hasło</label>
                <div class="form-data col-2">
                    <input v-model="user.newPassword" v-validate="'required'"
                           :class="{'input': true, 'is-danger input-border': errors.has('newPassword') }"
                           class="form-input " type="password" name="newPassword">
                    <span v-show="errors.has('newPassword')"
                          class="help is-danger">{{ errors.first('newPassword') }}</span>
                </div>
            </div>

            <div class="form-row">
                <label class="form-label col-1">Powtórz hasło</label>
                <div class="form-data col-2">
                    <input v-model="user.newPasswordConfirmation" v-validate="'required|confirmed:newPassword'"
                           :class="{'input': true, 'is-danger input-border': errors.has('newPasswordConfirmation') }"
                           class="form-input " type="password" name="newPasswordConfirmation">
                    <span v-show="errors.has('newPasswordConfirmation')" class="help is-danger">{{ errors.first('newPasswordConfirmation') }}</span>
                </div>
            </div>
            <div class="form-row">
                <label class="form-label"></label>
                <button type="submit" class="custom-button">Zapisz hasło</button>
            </div>
        </form>
    </div>
</template>

<script>
  export default {
    name: 'change-password',
    props: ['userId'],
    data: () => ({
      user: {
        oldPassword: '',
        newPassword: '',
        newPasswordConfirmation: '',
      },
      showInfo: false,
      infoError: false,

    }),

    methods: {
      updatePassword: function () {
        this.$validator.validateAll().then((result) => {

          if (result) {
            axios.put('/users/' + this.userId + '/change-password', {
              user: this.user,
            }).then(response => {
              if (response.status === 200) {
                this.showInfo = true
                setTimeout(() => {
                  this.showInfo = false
                  console.log(this.$router.path)
                  this.$parent.$data.type = 3
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
      axios('users').then(result => {
        this.items = result.data
      })
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
        width: 100%;
        height: 50px;
        background-color: red;
        margin-bottom: 50px;
        color: #FFFFFF;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
    }

    .showPass {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .button-row {
        justify-self: end;
    }

    .custom-button {
        justify-self: center;
    }
</style>