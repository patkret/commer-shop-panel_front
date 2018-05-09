<template>

    <form class="form-container" @submit.prevent="saveAccount">
        <div class="col-1">
            <div class="col-1">

                <div class="form-row">
                    <label class="form-label col-left">Imię</label>
                    <div class="form-data col-right">
                        <input v-model="first_name" v-validate="'required'"
                               :class="{'input': true, 'is-danger input-border': errors.has('first_name') }"
                               class="form-input " type="text" name="first_name">
                        <span v-show="errors.has('first_name')" class="help is-danger">{{ errors.first('name') }}</span>
                    </div>
                </div>

                <div class="form-row">
                    <label class="form-label col-left">Nazwisko</label>
                    <div class="form-data col-right">
                        <input v-model="last_name" v-validate="'required'"
                               :class="{'input': true, 'is-danger input-border': errors.has('last_name') }"
                               class="form-input " type="text" name="last_name">
                        <span v-show="errors.has('last_name')"
                              class="help is-danger">{{ errors.first('last_name') }}</span>
                    </div>
                </div>

                <div class="form-row">
                    <label class="form-label col-left">Login</label>
                    <div class="form-data col-right">
                        <input v-model="login" v-validate="'required'"
                               :class="{'input': true, 'is-danger input-border': errors.has('login') }"
                               class="form-input " type="text" name="login">
                        <span v-show="errors.has('login')" class="help is-danger">{{ errors.first('login') }}</span>
                    </div>
                </div>

                <div class="form-row">
                    <label class="form-label" for="">Nie wylogowuj</label>
                    <div class="checkbox-square form-group">
                        <input v-model="visibility" class="visibility-hidden" type="checkbox" id="checkbox">
                        <label for="checkbox" class="square"></label>
                    </div>
                </div>

                <div class="form-row">
                    <label class="form-label col-left">Miasto</label>
                    <div class="form-data col-right">
                        <input v-model="city" v-validate="'required'"
                               :class="{'input': true, 'is-danger input-border': errors.has('city') }"
                               class="form-input " type="text" name="city">
                        <span v-show="errors.has('city')" class="help is-danger">{{ errors.first('city') }}</span>
                    </div>
                </div>

                <div class="form-row">
                    <label class="form-label col-left">Adres</label>
                    <div class="form-data col-right">
                        <input v-model="address" v-validate="'required'"
                               :class="{'input': true, 'is-danger input-border': errors.has('address') }"
                               class="form-input " type="text" name="address">
                        <span v-show="errors.has('address')" class="help is-danger">{{ errors.first('address') }}</span>
                    </div>
                </div>

                <div class="form-row">
                    <label class="form-label col-left">Kod pocztowy</label>
                    <div class="form-data col-right">
                        <input v-model="postcode" v-validate="'required'"
                               :class="{'input': true, 'is-danger input-border': errors.has('postcode') }"
                               class="form-input postcode-input " type="text" name="postcode">
                        <span v-show="errors.has('postcode')"
                              class="help is-danger">{{ errors.first('postcode') }}</span>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-left"></div>
                    <div class="col-right">
                        <button class="custom-button submit-button">Zapisz ustawienia</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
  export default {
    name: "account-billing-data",
    data () {
      return {
        first_name: '',
        last_name: '',
        login: '',
        visibility: '',
        city: '',
        address: '',
        postcode: '',
      }
    }
  }
</script>

<style scoped>
    .form-container {
        display: grid;
        margin-left: 40px;
        grid-template-areas: ' col-1 col-2' ;
        grid-template-columns:  40%  40%;
    }
    .form-row {
        display: grid;
        grid-template-areas: 'col-left col-right';
        grid-template-columns: 30% 70%;
        margin: 10px 0;
    }
    .form-input {
        background-color: #ffffff;
        margin-left: 10px;
        border-radius: 10px;
        height: 35px;
        line-height: 35px;
        padding-left: 10px;
        border: none;
        font-size: 12px;
        font-weight: 700;
        width: 60%;
    }
    .postcode-input {
        width: auto;
    }
    .form-label {
        font-weight: 700;
        margin-top: 10px;
        margin-right: 15px;
        font-size: 12px;
        text-align: right;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    }
    .submit-button {
        white-space: nowrap;
        width: 60%;
        margin-left: 10px;
    }
</style>