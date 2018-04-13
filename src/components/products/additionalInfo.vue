<template>
    <div class="product-form-container">
        <form class="product-form">
            <div class="form-row">
                <label class=" form-label textarea-label">
                    Opis krótki
                </label>
                <div class="input-container">
                    <textarea name="description" class="desc-area" rows="4" v-model="product.shortDescription" maxlength="255" placeholder="Maksymalnie 255 znaków"></textarea>
                </div>
            </div>
            <div class="form-row">
                <label class=" form-label textarea-label">
                    Opis długi
                </label>
                <div class="input-container">
                    <textarea name="description" class="desc-area" rows="8" v-model="product.longDescription"  placeholder="..."></textarea>
                </div>
            </div>
            <div class="form-row">
                <label class="form-label">
                    Waga
                </label>
                <div class="input-container" style="width: 40%">
                    <div :class="{'custom-input': true,  'custom-input inpt-border': errors.has('weight')}">
                        <input type="text" placeholder="..." name="weight" v-model="product.weight" v-validate="'numeric'">
                    </div>
                    <span v-show="errors.has('weight')" class="validator-help">{{ errors.first('weight') }}</span>
                </div>
            </div>
            <div class="form-row">
                <label class="form-label">
                    Wysokość
                </label>
                <div class="input-container" style="width: 40%">
                    <div :class="{'custom-input': true,  'custom-input inpt-border': errors.has('height')}">
                        <input type="text" placeholder="..." name="height" v-model="product.height" v-validate="'numeric'">
                    </div>
                    <span v-show="errors.has('height')" class="validator-help">{{ errors.first('height') }}</span>
                </div>
            </div>
            <div class="form-row">
                <label class="form-label">
                    Szerokość
                </label>
                <div class="input-container" style="width: 40%">
                    <div :class="{'custom-input': true,  'custom-input inpt-border': errors.has('width')}">
                        <input type="text" placeholder="..." name="width" v-model="product.width" v-validate="'numeric'">
                    </div>
                    <span v-show="errors.has('width')" class="validator-help">{{ errors.first('width') }}</span>
                </div>
            </div>
            <div class="form-row">
                <label class="form-label">
                   Głębokość
                </label>
                <div class="input-container" style="width: 40%">
                    <div :class="{'custom-input': true,  'custom-input inpt-border': errors.has('depth')}">
                        <input type="text" placeholder="..." name="depth" v-model="product.depth" v-validate="'numeric'">
                    </div>
                    <span v-show="errors.has('depth')" class="validator-help">{{ errors.first('depth') }}</span>
                </div>
            </div>
        </form>
    </div>

</template>

<script>
  export default {
    name: 'additional-info',
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
    }
  }
</script>

<style scoped>
    .product-form-container {
        display: grid;
        grid-template-columns: 50% 50%;
        grid-template-areas: "product-form .";
    }

    .product-form {
        grid-area: product-form;

    }

    .form-row {
        display: grid;
        grid-template-columns: 20% 40px 80%;
        grid-template-areas: "form-label . input-container";
        margin-bottom: 20px;
    }

    .form-label {
        grid-area: form-label;
        justify-self: start;
        align-self: center;
    }
    .textarea-label{
        align-self: start;

    }

    .input-container {
        grid-area: input-container;
        display: flex;
        flex-direction: column;

    }

    .input-container p {
        position: absolute;
        margin-left: 205px;

    }

    .custom-input {
        width: 100%;
        height: 40px;
        padding-left: 15px;
        border: none;
        border-radius: 5px;
        background-color: #FFFFFF;
    }

    .custom-input input {
        width: 96%;
        margin-top: 9px;
        border: none;
        font-size: 110%;
    }

    .inpt-border {
        border: 1px solid red;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    .validator-help {
        background-color: red;
        border-radius: 5px;
        color: #fff;
        padding: 12px 0 10px 10px;
        font-size: 12px;
        font-weight: 700;
        border-top-right-radius: 0;
        border-top-left-radius: 0;
        margin-right: -17px;
    }

    .desc-area{
        border-radius: 5px;
        resize: none;
        border: none;
        padding: 15px;
    }
</style>