<template>
    <div class="l-wrapper">
        <div style="width: 50%;">
            <form action="" class="c-form">

                <div class="c-form__fieldset">
                    <custom-input label="Kod kreskowy" rules="" v-model="product.barcode"
                                  min-input-length="3"></custom-input>
                </div>
                <div class="c-form__fieldset">
                    <custom-input label="PKWiU" rules="" v-model="product.pkwiuCode"
                                  min-input-length="3"></custom-input>
                </div>
                <div class="c-form__fieldset">
                    <custom-input label="SKU" rules="" v-model="product.symbol"
                                  min-input-length="3"></custom-input>
                </div>
                <div class="c-form__fieldset weight__row">
                    <custom-input label="Waga" rules="" v-model="product.weight"
                                  min-input-length="1" class="weight__input"></custom-input>
                    <single-select v-model="product.weight_unit" :options="weightOptions"
                                   class="weight__select"></single-select>
                </div>
                <div class="c-form__fieldset sizes__row">
                    <custom-input label="Szerokość" rules="numeric" v-model="product.width"
                                  min-input-length="1"></custom-input>
                    <custom-input label="Wysokość" rules="numeric" v-model="product.height"
                                  min-input-length="1" ></custom-input>
                    <custom-input label="Głębokość" rules="numeric" v-model="product.depth"
                                  min-input-length="1"></custom-input>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'additional-info',
    computed: {
      product: function () {
        return this.$store.getters.getProduct
      },
    },
    data: () => ({
      weightOptions: [
        {id: '0', name: 'kg'},
        {id: '1', name: 'g'},
        {id: '2', name: 'ml'},
        {id: '3', name: 'l'},
      ],
    }),

    // beforeDestroy: function () {
    //   this.$validator.validateAll().then((result) => {
    //     if (result) {
    //       this.$store.commit('addProduct', this.product)
    //     }
    //   })
    // }
  }
</script>

<style scoped>
    .select__full-width {
        width: 100%;
    }

    .weight__row {
        display: grid;
        grid-template-columns: 8fr 15px 2fr;
        grid-template-areas: "input . select";
    }

    .weight__input {
        grid-area: input;
    }

    .weight__select {
        grid-area: select;
        margin-bottom: 12px;
    }

    .sizes__row{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 15px;
    }
</style>