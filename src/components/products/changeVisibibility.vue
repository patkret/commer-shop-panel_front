<template>
    <modal name="visibility">
        hello, world!

    <!--<form action="" @submit.prevent="saveStock">-->
        <!--<div class="form-row">-->
            <!--<label class="form-label col-1">Nazwa</label>-->
            <!--<div class="form-data col-2">-->
                <!--<input v-model="stock.name" v-validate="'required'"-->
                       <!--:class="{'input': true, 'is-danger input-border': errors.has('name') }" class="form-input "-->
                       <!--type="text" name="name" placeholder="...">-->
                <!--<span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>-->
            <!--</div>-->
        <!--</div>-->
        <!--<div class="form-row col-2">-->
            <!--<button type="submit" class="custom-button col-2">ZAPISZ</button>-->
        <!--</div>-->
    <!--</form>-->
    </modal>
</template>

<script>
  export default {
    name: 'stock-form',
    props: ['editStock'],
    data () {
      return {
        stock: {
          name: '',
        },
      }
    },
    methods: {
      // saveStock () {
      //   this.$validator.validateAll().then((result) => {
      //     if (result) {
      //       if (this.editStock) {
      //         axios.put('/warehouses/' + this.editStock.id, {
      //           stock: this.stock,
      //         }).then(() => {
      //           this.$parent.$data.type = 2
      //           this.$parent.$data.stock = ''
      //         })
      //       }
      //
      //       else {
      //         axios.post('/warehouses', {
      //           stock: this.stock,
      //         }).then(() => {
      //           this.$parent.$data.type = 2
      //           this.$parent.$data.vendor = ''
      //         })
      //       }
      //     }
      //   })
      // },

    },

    created: function () {
      this.$modal.show('visibility')
      // if (this.editStock) {
      //   this.stock = this.editStock
      // }
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
        /*margin: 40px;*/
        margin: 35px 0 0 190px;
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