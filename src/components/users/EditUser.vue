<template>
        <form action="" @submit.prevent="updateUser">
            <div class="info" v-if="showInfoEdit == true">
                <p>Użytkownik został zedytowany!</p>
            </div>
            <div class="form-row">
                <label class="form-label col-1">Imię</label>
                <div class="form-data col-2">
                    <input  v-model="editingUser.first_name" v-validate="'required'" :class="{'input': true, 'is-danger input-border': errors.has('first_name') }" class="form-input " type="text" name="first_name">
                    <span v-show="errors.has('first_name')" class="help is-danger">{{ errors.first('name') }}</span>
                </div>
            </div>

            <div class="form-row">
                <label class="form-label col-1">Nazwisko</label>
                <div class="form-data col-2">
                    <input  v-model="editingUser.last_name" v-validate="'required'" :class="{'input': true, 'is-danger input-border': errors.has('last_name') }" class="form-input " type="text" name="last_name">
                    <span v-show="errors.has('last_name')" class="help is-danger">{{ errors.first('last_name') }}</span>
                </div>
            </div>

            <div class="form-row">
                <label class="form-label col-1">Email</label>
                <div class="form-data col-2">
                    <input  v-model="editingUser.email" v-validate="'required'" :class="{'input': true, 'is-danger input-border': errors.has('email') }" class="form-input " type="text" name="email">
                    <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                </div>
            </div>
            <div class="form-row">
                <label class="form-label col-1">Nr tel.</label>
                <div class="form-data col-2">
                    <input  v-model="editingUser.phone_no" v-validate="'required|numeric'" :class="{'input': true, 'is-danger input-border': errors.has('phone_no') }" class="form-input " type="text" name="phone_no">
                    <span v-show="errors.has('phone_no')" class="help is-danger">{{ errors.first('phone_no') }}</span>
                </div>
            </div>
            div.

            <div class="form-row  col-2 button-row ">
                <button type="submit" class="custom-button">Dodaj</button>
                <button class="custom-button">Zmień hasło</button>
            </div>
        </form>
</template>

<script>

  export default {
    name: "edit-user",
    props: ['user'],
    data: () => {
      return {
        editingUser: {
          first_name: '',
          last_name: '',
          email: '',
          phone_no: '',
        },
        items: [],
        showInfoEdit: false,
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
      updateUser() {
        this.$validator.validateAll().then((result) => {
          if (result) {

            axios.put('users/' + this.editingUser.id , {
              editedUser: this.editingUser

            });
            this.showInfoEdit = true
            setTimeout(() => {
              this.$parent.$data.type = 2
            }, 1500)
          }
        })
      },
    },
    created: function () {
      axios('users')
        .then(result => {
          this.items = result.data
        });
      this.editingUser = this.user;
    }
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
</style>