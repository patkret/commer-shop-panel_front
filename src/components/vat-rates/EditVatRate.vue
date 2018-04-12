<template>

        <form action="" @submit.prevent="updateVatRate">
            <div class="info" v-if="showInfoEdit == true">
                <p>Cecha została edytowana!</p>
            </div>
            <div class="form-row">
                <label class="form-label col-1">Nazwa</label>
                <div class="form-data col-2">
                    <input  v-model="vat_rate.name" v-validate="'required'" :class="{'input': true, 'is-danger input-border': errors.has('name') }" class="form-input " type="text" name="name">
                    <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
                </div>
            </div>

            <div class="form-row">
                <label class="form-label col-1">Stawka</label>
                <div class="form-data col-2">
                    <input  v-model="vat_rate.rate" v-validate="'required|numeric'" :class="{'input': true, 'is-danger input-border': errors.has('rate') }" class="form-input " type="text" name="rate">
                    <span v-show="errors.has('rate')" class="help is-danger">{{ errors.first('rate') }}</span>
                </div>
            </div>

            <div class="form-row">
                <label class="form-label col-1" for="">Opis</label>
                <div class="form-data col-2">
                    <textarea v-model="vat_rate.description" class="form-textarea" name="rateDescription" id=""></textarea>
                </div>
            </div>
            <div class="form-row col-2">
                <button type="submit" class="custom-button col-2">Zapisz</button>
            </div>
        </form>

</template>

<script>
  export default {
    name: "edit-vat-rate",
    props: ['rate'],
    data: () => {
      return {
        vat_rate: {
          name: '',
          rate: '',
          description: ''
        },
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
      updateVatRate() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            axios.put('vat-rates/' + this.rate.id , {
              vat_rate: this.vat_rate
            });
            // this.$emit('vat_rate', this.vat_rate)
            this.showInfoEdit = true
            setTimeout(() => {
              this.$parent.$data.type = 2
            }, 500)
          }
        })
      },

    },
    created: function () {
        this.vat_rate = this.rate
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
    .info {
        width: 100%;
        height: 50px;
        background-color: #94C01E;
        margin-bottom: 50px;
        color: #FFFFFF;
        text-align: center;
        display: flex;
        justify-content: center;
        aling-items: center;
        border-radius: 5px;
    }
</style>