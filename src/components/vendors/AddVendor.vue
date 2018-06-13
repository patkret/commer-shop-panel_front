<template>
<div>
        <div class="l-wrapper f-center">

            <!-- tutaj trzeba zrobić kolumny -->
            <div style="width: 100%;" class="f-content">
                <form action="" class="c-form" @submit.prevent="saveVendor">

                    <div class="c-form__fieldset">
                        <div class="c-form__field-wrapper">
                            <input type="text"
                                   :class="{'c-form__field' :true, 'c-form__field is-valid': vendor.name.length >= 3 && errors.items.length === 0, 'c-form__field is-invalid' : errors.first('name')} " required
                                   v-model="vendor.name" v-validate="'required'"
                            name="name">
                            <label class="c-form__placeholder">Nazwa</label>
                            <span class="form__errors">{{errors.first('name')}}</span>
                        </div>
                    </div>
                    <!-- <div class="c-form__fieldset">
                        <div class="c-form__field-wrapper flex-row">
                            <p class="c-form__field--text">Aktywność</p>
                            <label class="switch">
                                <input type="checkbox">
                                <span class="slider round"></span>
                            </label>
                        </div>
                    </div> -->
                      
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
    name: "add-vendor",
    data () {
      return {
          vendor: {
            name: '',
          }
    
      }
    },
    methods: {
    //   removeRequiredAttribute(){
    //     document.getElementById("name").required = false;
    //     // document.getElementById("name").required = false;
    //   },
      saveVendor () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            axios.post('/vendors', {
              vendor: this.vendor
            }).then(() => {
              this.$router.push('/vendors/list')
            })
          }
        });
      },
    },
    // beforeUpdate: function () {

    //     this.removeRequiredAttribute()

    // }

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
        border:none;
        font-size: 12px;
        font-weight: 700;
        width: 100%;
    }
    .form-textarea {
        resize: none;
        height: 250px;
        width: available;
        margin-left: 10px;
        padding: 10px 0 0 10px;
        border: none;
        border-radius: 5px;
        font-size: 12px;
        font-weight: 700;
        width: 100%;
        margin-right: 10px;
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

    /* CHECKBOX */
     /*SWITCh*/

    .switch {
        position: relative;
        display: inline-block;
        width: 40px;
        height: 20px;
    }
    .switch input {display:none;}

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 15px;
        width: 15px;
        left: 4px;
        bottom: 3px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
    }

    input:checked + .slider {
        background-color: #00DE01;
    }

    input:focus + .slider {
        box-shadow: 0 0 1px #00DE01;
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(18px);
        -ms-transform: translateX(18px);
        transform: translateX(18px);
    }

    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
        border-radius: 50%;
    }
    .flex-row {
        display: flex;
    }
    .c-form__field--text {
        margin: 5px 20px 0 0;
    }
</style>