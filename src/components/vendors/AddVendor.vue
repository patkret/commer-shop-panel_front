<template>
<div>
        <div class="l-wrapper f-center">

            <!-- tutaj trzeba zrobić kolumny -->
            <div style="width: 100%;" class="f-content">
                <form action="" class="c-form" @submit.prevent="saveVendor">

                    <div class="c-form__fieldset">
                        <div class="c-form__field-wrapper">
                            <custom-input :label="'Nazwa'" rules="required" min-input-length="4" v-model="vendor.name"/>
                        </div>
                    </div>
                    <div class="c-form__fieldset">
                        <div class="c-form__field-wrapper flex-row">
                            <p class="c-form__field--text">Aktywność</p>
                            <label class="switch">
                                <input v-model="vendor.is_visible" type="checkbox">
                                <span  class="slider round"></span>
                            </label>
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
    name: "add-vendor",
    data () {
      return {
          vendor: {
            name: '',
            is_visible: '',
          }
    
      }
    },
    methods: {
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
  }
</script>

<style scoped>
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