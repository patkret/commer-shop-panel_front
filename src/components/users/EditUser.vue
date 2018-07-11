<template>
  <div>
    <div class="l-wrapper f-center">
      <!-- tutaj trzeba zrobić kolumny -->
      <div style="width: 100%;" class="f-content">
        <form action="" class="c-form" @submit.prevent="updateUser()">
          <div class="c-form__fieldset">
            <div class="c-form__field-wrapper">
              <custom-input :label="'Imię'" rules="required"  v-model="user.first_name" />
            </div>
          </div>
           <div class="c-form__fieldset">
            <div class="c-form__field-wrapper">
              <custom-input :label="'Nazwisko'" rules="required" v-model="user.last_name" />
            </div>
          </div>
          <div class="c-form__fieldset">
            <div class="c-form__field-wrapper">
              <custom-input :label="'Email'" rules="required||email" v-model="user.email" />
            </div>
          </div>
          <div class="c-form__fieldset">
            <div class="c-form__field-wrapper">
              <custom-input :label="'Numer telefonu'" rules="required||numeric"  v-model="user.phone_no" />
            </div>
          </div>
          <div class="c-form__fieldset">
            <div class="c-form__field-wrapper">
              <custom-input  :label="'Hasło'" rules="required"  min-input-length="4" v-model="user.password" />
            </div>
          </div>
          <div class="c-form__fieldset">
            <div class="c-form__field-wrapper">
              <custom-input  :label="'Powtórz hasło'" rules="required||confirmed:pasword" type="password" min-input-length="4" v-model="user.passwordConfirmation" />
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
    name: "edit-user",
    data: () => {
      return {
        user: {
            first_name: '',
            last_name: '',
            email: '',
            phone_no: '',
            // password: '',
            // confirmPassword: '',
        },
        showMessage: '',
        // showInfoEdit: false,
        // showChangePassword: false
      }
    },
    // watch: {
    //   showInfoEdit: function () {
    //     setTimeout(() => {
    //       this.showInfoEdit = false
    //       this.$parent.$data.type = 2
    //     }, 3000)
    //   },
    // },
    methods: {
         fetchUser () {
        axios.get('users/' + this.$route.params.item).then(result => {
          this.user = result.data
        })
      },
      updateUser() {
        delete this.user.password
        this.$validator.validateAll().then((result) => {
          if (result) {
            axios.put('users/' + this.user.id , {
              editedUser: this.user,
            }).then(() => {
             this.$router.push('./list')
            })
          }
        });
      },

    //   changePassword(){
    //     this.$parent.$data.type = 5
    //     this.$emit('currUserId', this.editingUser.id)
    //   }
    },
    created: function () {
        this.fetchUser();
    }
  }
</script>

<style scoped>
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
    .showPass {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>