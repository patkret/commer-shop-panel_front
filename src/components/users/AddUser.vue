<template>

        <form action="" @submit.prevent="saveUser">
            <div class="form-row">
                <label class="form-label col-1">Imię</label>
                <div class="form-data col-2">
                    <input  v-model="first_name" v-validate="'required'" :class="{'input': true, 'is-danger input-border': errors.has('first_name') }" class="form-input " type="text" name="first_name">
                    <span v-show="errors.has('first_name')" class="help is-danger">{{ errors.first('name') }}</span>
                </div>
            </div>

            <div class="form-row">
                <label class="form-label col-1">Nazwisko</label>
                <div class="form-data col-2">
                    <input  v-model="last_name" v-validate="'required'" :class="{'input': true, 'is-danger input-border': errors.has('last_name') }" class="form-input " type="text" name="last_name">
                    <span v-show="errors.has('last_name')" class="help is-danger">{{ errors.first('last_name') }}</span>
                </div>
            </div>

            <div class="form-row">
                <label class="form-label col-1">Email</label>
                <div class="form-data col-2">
                    <input  v-model="email" v-validate="'required'" :class="{'input': true, 'is-danger input-border': errors.has('email') }" class="form-input " type="text" name="email">
                    <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                </div>
            </div>

            <div class="form-row">
                <label class="form-label col-1">Hasło</label>
                <div class="form-data col-2">
                    <input  v-model="password" v-validate="'required'" :class="{'input': true, 'is-danger input-border': errors.has('password') }" class="form-input " type="password" name="password">
                    <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
                </div>
            </div>

            <div class="form-row">
                <label class="form-label col-1">Powtórz hasło</label>
                <div class="form-data col-2">
                    <input  v-model="passwordConfirmation" v-validate="'required|confirmed:password'" :class="{'input': true, 'is-danger input-border': errors.has('passwordConfirmation') }" class="form-input " type="password" name="passwordConfirmation">
                    <span v-show="errors.has('passwordConfirmation')" class="help is-danger">{{ errors.first('passwordConfirmation') }}</span>
                </div>
            </div>

            <div class="form-row">
                <label class="form-label col-1">Nr tel.</label>
                <div class="form-data col-2">
                    <input  v-model="phone_no" v-validate="'required|numeric'" :class="{'input': true, 'is-danger input-border': errors.has('phone_no') }" class="form-input " type="text" name="phone_no">
                    <span v-show="errors.has('phone_no')" class="help is-danger">{{ errors.first('phone_no') }}</span>
                </div>
            </div>

            <div class="form-row col-2">
                <button type="submit" class="custom-button col-2">Dodaj</button>
            </div>
        </form>

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
              phone_no:  this.phone_no,
            }).then(() => {
              this.$parent.$data.type = 2
            })
          }
        });
      },
    }
  }
</script>

<style scoped>
    .users-container {
        width: 80%;
        background-color: #F6F7FB;
        margin-left: 20px;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 5px 5px 5px 2px #eff1f4;
    }
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
        border-radius: 10px;
        height: 35px;
        line-height: 35px;
        padding-left: 10px;
        border:none;
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
    .custom-button {
        margin: 40px;
        height: 40px;
        width: 130px;
        font-size: 14px;
        font-weight: bold;
        line-height: 1;
        position: relative;
        border: 1px solid transparent;
        border-radius: 5px;
        background: #ffffff;
        background-clip: padding-box;
        color: #000000;
        outline: none;
        cursor: pointer;
        text-decoration: none;
    }
    .custom-button::after {
        position: absolute;
        top: -2px;
        bottom: -2px;
        left: -2px;
        right: -2px;
        background: linear-gradient(to bottom, #2595ec, #21c8cc);
        content: '';
        z-index: -1;
        border-radius: 5px;
    }
    .custom-button:hover {
        color: #ffffff;
        background: linear-gradient(to right, #21c8cc, #2595ec);
        background-size: 104%;
        background-position: -2px;
    }
</style>