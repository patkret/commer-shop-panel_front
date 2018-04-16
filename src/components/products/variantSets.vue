<template>
    <div class="variant-sets-container">
        <div class="header">
            <h3>Wybierz zestaw wariantów dla produktu</h3>
            <multiselect
                    class="shop-select variant-select"
                    v-model="selectedVariantSet"
                    :options="variantSets"
                    :allow-empty="false"
                    :searchable="false"
                    :selectedLabel="''"
                    track-by="name"
                    label="name"
                    :deselectLabel="''"
                    :selectLabel="''"
                    :hideSelected="true"
                    placeholder="Wybierz"/>
        </div>
        <div class="variants-container" v-if="selectedVariantSet !== 0">
            <div class="single-variant" v-for="variant in selectedVariantSet.variants">
                <label class="check-container variant-check-cont" v-if="variant.required === false">
                    <input type="checkbox" v-model="selectedVariants" :value="variant" class="variant-checkbox">
                    <span class="checkmark"></span>
                </label>
                <div class="variant-header">
                    <p v-if="variant.required !== 1"> {{variant.name}} </p>
                    <p v-if="variant.required === 1"> {{variant.name}} * </p>
                </div>
                <div class="variant-content">
                    <div v-if="variant.type.type !== 2 "
                         class="price-options">
                        <p style="margin-right: 25px " v-if="variant.type.type === 0" class="label">Gdy wpisano:</p>
                        <p style="margin-right: 25px " v-if="variant.type.type === 1" class="label">Gdy zaznaczono:</p>
                        <p style="margin-right: 25px " v-if="variant.type.type === 3" class="label">Gdy dodano plik:</p>
                        <multiselect
                                class="shop-select price-select"
                                v-model="variant.priceOption"
                                :options="priceOptions"
                                :allow-empty="false"
                                :searchable="false"
                                :selectedLabel="''"
                                track-by="name"
                                label="name"
                                :deselectLabel="''"
                                :selectLabel="''"
                                :hideSelected="true"
                                placeholder="Wybierz"

                        />

                        <input type="text" v-model="variant.priceValue"
                               v-if="variant.priceOption.type !== 0" placeholder="..." class="price-inpt"/>

                        <multiselect v-if="variant.priceOption.type !== 0"
                                     class="shop-select curr-select"
                                     v-model="variant.curr"
                                     :options="currOptions"
                                     :allow-empty="false"
                                     :searchable="false"
                                     :selectedLabel="''"
                                     track-by="name"
                                     label="name"
                                     :deselectLabel="''"
                                     :selectLabel="''"
                                     :hideSelected="true"
                                     placeholder="Wybierz"
                        />

                    </div>
                    <div v-if="variant.type.type === 2">
                        <ul>
                            <li v-for="option in variant.selectOptions" class="select-options">
                                <label class="check-container">
                                    <p class="label">
                                        {{option.name}}
                                    </p>
                                    <input type="checkbox" v-model="selectedVariantOptions" :value="option">
                                    <span class="checkmark"></span>
                                </label>
                                <div class="price-options-container"
                                     v-if="selectedVariantOptions.find(el => el === option)">
                                    <multiselect
                                            class="shop-select price-select"
                                            v-model="option.priceOption"
                                            :options="priceOptions"
                                            :allow-empty="false"
                                            :searchable="false"
                                            :selectedLabel="''"
                                            track-by="name"
                                            label="name"
                                            :deselectLabel="''"
                                            :selectLabel="''"
                                            :hideSelected="true"
                                            placeholder="Wybierz"
                                            style="width: 25%"/>

                                    <input type="text" v-model="option.priceValue"
                                           v-if="option.priceOption.type !== 0" placeholder="..."/>

                                    <multiselect v-if="option.priceOption.type !== 0"
                                                 class="shop-select curr-select"
                                                 v-model="option.curr"
                                                 :options="currOptions"
                                                 :allow-empty="false"
                                                 :searchable="false"
                                                 :selectedLabel="''"
                                                 track-by="name"
                                                 label="name"
                                                 :deselectLabel="''"
                                                 :selectLabel="''"
                                                 :hideSelected="true"
                                                 placeholder="Wybierz"
                                    />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <br>
        <br>
        <br>
        <br>
    </div>
</template>

<script>
  export default {
    name: 'variant-sets',
    computed: {
      variantSets: function () {
        return this.$store.getters.variantSets
      },
    },

    data: () => ({
      selectedVariantSet: '',
      priceOptions: [
        {type: 0, name: 'nie zmieniaj'},
        {type: 1, name: 'Zwiększ o'},
        {type: 2, name: 'Zmniejsz o'},
      ],
      currOptions: [
        {type: 0, name: 'zł'},
        {type: 1, name: '%'},
      ],
      selectedVariantOptions: [],
      selectedVariants: [],
    }),

    created: function () {
      this.selectedVariantSet = this.$store.getters.selectedVariantSet
      this.$store.dispatch('getVariantSets')
    },

    beforeDestroy: function () {
      this.$store.commit('selectedVariantSet', this.selectedVariantSet)
    },
  }
</script>

<style scoped>
    .header {
        margin-bottom: 35px;
    }

    .variant-header {
        background-color: white;
        border-radius: 5px;
        color: black;
        height: 45px;
        margin-bottom: 10px;
        margin-left: 40px;
        width: 80%;
        font-size: 120%;
        box-shadow: 0 0 4px #62637A;
    }

    .variant-header p {
        padding: 10px 0 0 15px;
    }

    .check-container {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 12px;
        margin-top: 5px;
        cursor: pointer;
        font-size: 18px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        margin-right: 25px;
        grid-area: checkmark;
        align-items: center;

    }

    .check-container p {
        padding-top: 3px;
    }

    .check-container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        margin-top: -35px;
        margin-left: -25px;
    }

    .checkmark {
        position: absolute;
        top: 18px;
        left: 0;
        height: 23px;
        width: 23px;
        background-color: #FFFFFF;
        border: 1px solid #DAD8DA;
        border-radius: 5px;
    }

    .check-container:hover input ~ .checkmark {
        background-color: #ccc;
    }

    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    .check-container input:checked ~ .checkmark:after {
        display: block;
    }

    .check-container .checkmark:after {
        left: 8px;
        top: 3px;
        width: 5px;
        height: 10px;
        border: solid black;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    .select-options {
        display: grid;
        grid-template-columns: 25% 20px 75%;
        grid-template-areas: "checkmark . price-options-container";
        align-items: center;
        /*display: flex;*/
        /*flex-direction: row;*/
        /*flex-wrap: nowrap;*/
    }

    .price-options-container {
        grid-area: price-options-container;
        display: inline-flex;
    }

    .price-options-container input {
        border: none;
        border-radius: 5px;
        margin-left: 25px;
        margin-right: 25px;
        padding-left: 15px;
        width: 80px;
    }

    /*.variant-check{*/
    /*margin-left: 0;*/
    /*padding-top: 2px;*/
    /*}*/

    /*.check-container .variant-check input {*/
    /*position: absolute;*/
    /*opacity: 0;*/
    /*cursor: pointer;*/
    /*top: 35px;*/
    /*margin-left: -25px;*/
    /*}*/

    .single-variant:nth-child(1) input {
        top: 35px;
    }

    .price-options {
        width: 80%;
        display: inline-flex;
        /*display: grid;*/
        /*grid-template-columns: 32% 23% 10% 40%;*/
        margin: 15px 0 15px 45px;
    }

    .price-inpt {
        border: none;
        border-radius: 5px;
        margin-left: 25px;
        padding: 0 0 0 15px;

    }

    .variant-checkbox {
        top: 57px;

    }

    .variant-check-cont {
        top: -10px;
    }


</style>