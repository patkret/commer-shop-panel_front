<template>
    <div>
        <div class="form-row">
            <label class="form-label col-1" for="">Meta description</label>
            <div class="form-data col-2">
                <input v-model="product.metaDescription" class="form-input " type="text" name="metaDescription">
            </div>

        </div>
        <div class="form-row">
            <label class="form-label col-1" for="">Meta Keywords</label>
            <div class="form-data col-2">
                <input v-model="product.metaKeywords" class="form-input" type="text" name="metaKeywords">
            </div>
        </div>
        <div class="form-row">
            <label class="form-label col-1" for="">Url</label>
            <div class="form-data col-2">
                <input v-model="product.addressUrl" class="form-input " type="text" name="addressUrl">

            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "products-seo",
    computed: {
      product: function () {
        return this.$store.getters.getProduct;
      },
    },
      beforeDestroy: function () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.$store.commit('addProduct', this.product)
          }
        })
      },
    data () {
      return {
        metaDescription: '',
        metaKeywords: '',
        addressUrl: '',
      }
  },
  }
</script>

<style scoped>
    .form-row {
        display: grid;
        margin: 20px 0;
        grid-template-areas: 'col-1 col-2 col-3';
        grid-template-columns: 150px 520px 1fr;
    }
    .col-1 {
        grid-area: col-1;
    }
    .col-2 {
        grid-area: col-2;
    }
    .form-label {
        margin-top: 10px;
        margin-right: 15px;
        text-align: right;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
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
    }
</style>