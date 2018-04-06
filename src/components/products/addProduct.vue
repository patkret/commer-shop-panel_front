<template>
    <div class="product-form-container">
        <form class="product-form">
            <div class="form-row">
                <label class="form-label">
                    Nazwa produktu
                </label>
                <div class="input-container">
                    <div :class="{'custom-input': true,  'custom-input inpt-border': errors.has('name')}">
                        <input type="text" v-validate="'required'"
                               placeholder="Nazwa..." name="name" v-model="product.name">
                    </div>
                    <span v-show="errors.has('name')" class="validator-help">{{ errors.first('name') }}</span>
                </div>
            </div>
            <div class="form-row">
                <label class="form-label">
                    Cena
                </label>
                <div class="input-container" style="width: 30%">
                    <div :class="{'custom-input': true,  'custom-input inpt-border': errors.has('price')}">
                        <input type="text" v-validate="'required|numeric'"
                               placeholder="Cena..." name="price" v-model="product.price">
                    </div>
                    <p>zł</p>
                    <span v-show="errors.has('price')" class="validator-help">{{ errors.first('price') }}</span>
                </div>
            </div>
            <div class="form-row">
                <label class="form-label">
                    Stawka VAT
                </label>
                <div class="input-container" style="justify-self: start">
                    <multiselect
                    class="shop-select product-select"
                    v-model="selectedRate"
                    :options="vat_rates"
                    :allow-empty="false"
                    :searchable="false"
                    :selectedLabel="''"
                    track-by="name"
                    label="name"
                    id="ms-1"
                    :custom-label="nameWithRate"
                    :deselectLabel="''"
                    :selectLabel="''"
                    :hideSelected="true"
                    placeholder="Wybierz"></multiselect>
                </div>
            </div>
            <div class="form-row">
                <label class="form-label">
                    SKU
                </label>
                <div class="input-container" style="width: 30%">
                    <div :class="{'custom-input': true,  'custom-input inpt-border': errors.has('symbol')}">
                        <input type="text" v-validate="'required'"
                               placeholder="Kod..." name="symbol" v-model="product.symbol">
                    </div>
                    <span v-show="errors.has('symbol')" class="validator-help">{{ errors.first('symbol') }}</span>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
  export default {
    name: 'add-product',
    data: () => ({
      product: {
        name: '',
        price: '',
        vat_rate: '',
        symbol: ''
      },
      vat_rates: [],
      selectedRate: ''

    }),
    watch: {
      selectedRate: function (value) {
        this.product.vat_rate = value.id
      }
    },
    methods: {
      nameWithRate ({ name, rate }) {
        return `${name} — [${rate}%] `
      }
    },
    created: function () {
      axios('vat-rates').then(result => {
        this.vat_rates = result.data
      })
    }
  }
</script>

<style scoped>
    .product-form-container {
        display: grid;
        grid-template-columns: 45px 45% 55%;
        grid-template-areas: ". product-form .";
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

    .input-container {
        grid-area: input-container;
        display: flex;
        flex-direction: column;

    }

    .input-container p{
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

    .custom-input input{
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

</style>