<template>
    <!--<div class="variant-sets-container">-->
    <!--<div class="header">-->
    <!--<h3>Wybierz zestaw wariantów dla produktu</h3>-->
    <!--<multiselect-->
    <!--class="shop-select variant-select"-->
    <!--v-model="selectedVariantSet"-->
    <!--:options="variantSets"-->
    <!--:allow-empty="false"-->
    <!--:searchable="false"-->
    <!--:selectedLabel="''"-->
    <!--track-by="name"-->
    <!--label="name"-->
    <!--:deselectLabel="''"-->
    <!--:selectLabel="''"-->
    <!--:hideSelected="true"-->
    <!--placeholder="Wybierz"/>-->
    <!--</div>-->
    <!--<div class="variants-container" v-if="selectedVariantSet !== 0" style="border: 2px dashed red">-->
    <!--<div v-if="this.$store.state.product.variantSets.length !== 0" >-->
    <!--<div class="single-variant" v-for="variant in selectedVariants">-->
    <!--<label class="check-container variant-check-cont" v-if="variant.required === false">-->
    <!--<input type="checkbox" @change="removeVariant(variant)" :value="variant" class="variant-checkbox"-->
    <!--:checked = true>-->
    <!--<span class="checkmark"></span>-->
    <!--</label>-->
    <!--<div class="variant-header">-->
    <!--<p v-if="variant.required !== 1"> {{variant.name}} </p>-->
    <!--<p v-if="variant.required === 1"> {{variant.name}} * </p>-->
    <!--</div>-->
    <!--<div class="variant-content">-->
    <!--<div v-if="variant.type.type !== 2 "-->
    <!--class="price-options">-->
    <!--<p style="margin-right: 25px " v-if="variant.type.type === 0" class="label">Gdy wpisano:</p>-->
    <!--<p style="margin-right: 25px " v-if="variant.type.type === 1" class="label">Gdy-->
    <!--zaznaczono:</p>-->
    <!--<p style="margin-right: 25px " v-if="variant.type.type === 3" class="label">Gdy dodano-->
    <!--plik:</p>-->


    <!--<multiselect-->
    <!--class="shop-select price-select"-->
    <!--v-model="variant.priceOption"-->
    <!--:options="priceOptions"-->
    <!--:allow-empty="false"-->
    <!--:searchable="false"-->
    <!--:selectedLabel="''"-->
    <!--track-by="name"-->
    <!--label="name"-->
    <!--:deselectLabel="''"-->
    <!--:selectLabel="''"-->
    <!--:hideSelected="true"-->
    <!--placeholder="Wybierz"-->
    <!--style="width: 100%"-->

    <!--/>-->
    <!--<div class="price-inpt">-->
    <!--<input type="text" v-model="variant.priceValue"-->
    <!--v-if="variant.priceOption.type !== 0" placeholder="..."/>-->
    <!--</div>-->
    <!--<multiselect v-if="variant.priceOption.type !== 0"-->
    <!--class="shop-select curr-select"-->
    <!--v-model="variant.curr"-->
    <!--:options="currOptions"-->
    <!--:allow-empty="false"-->
    <!--:searchable="false"-->
    <!--:selectedLabel="''"-->
    <!--track-by="name"-->
    <!--label="name"-->
    <!--:deselectLabel="''"-->
    <!--:selectLabel="''"-->
    <!--:hideSelected="true"-->
    <!--placeholder="Wybierz"-->
    <!--style="width: 20%; margin-left: 25px"-->
    <!--/>-->


    <!--</div>-->
    <!--<div v-if="variant.type.type === 2">-->
    <!--<ul>-->
    <!--<li v-for="option in variant.selectOptions" class="select-options">-->
    <!--<label class="check-container">-->
    <!--<p class="label">-->
    <!--{{option.name}}-->
    <!--</p>-->
    <!--<input type="checkbox" v-model="selectedVariantOptions" :value="option" @click="setVariantOption(variant, option)">-->
    <!--<span class="checkmark"></span>-->
    <!--</label>-->
    <!--<div class="price-options-container"-->
    <!--v-if="selectedVariantOptions.find(el => el === option)">-->
    <!--<multiselect-->
    <!--class="shop-select price-select"-->
    <!--v-model="option.priceOption"-->
    <!--:options="priceOptions"-->
    <!--:allow-empty="false"-->
    <!--:searchable="false"-->
    <!--:selectedLabel="''"-->
    <!--track-by="name"-->
    <!--label="name"-->
    <!--:deselectLabel="''"-->
    <!--:selectLabel="''"-->
    <!--:hideSelected="true"-->
    <!--placeholder="Wybierz"-->
    <!--style="width: 25%"/>-->

    <!--<input type="text" v-model="option.priceValue"-->
    <!--v-if="option.priceOption.type !== 0" placeholder="..."/>-->

    <!--<multiselect v-if="option.priceOption.type !== 0"-->
    <!--class="shop-select curr-select"-->
    <!--v-model="option.curr"-->
    <!--:options="currOptions"-->
    <!--:allow-empty="false"-->
    <!--:searchable="false"-->
    <!--:selectedLabel="''"-->
    <!--track-by="name"-->
    <!--label="name"-->
    <!--:deselectLabel="''"-->
    <!--:selectLabel="''"-->
    <!--:hideSelected="true"-->
    <!--placeholder="Wybierz"-->
    <!--style="width: 9%"-->

    <!--/>-->
    <!--</div>-->
    <!--</li>-->
    <!--</ul>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--&lt;!&ndash;<p>&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;</p>&ndash;&gt;-->
    <!--&lt;!&ndash;<p>-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;NOT SELECTED-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;</p>&ndash;&gt;-->
    <!--&lt;!&ndash;<p>&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;</p>&ndash;&gt;-->

    <!--&lt;!&ndash;******************&ndash;&gt;-->
    <!--&lt;!&ndash;NOT SELECTED ARRAY&ndash;&gt;-->
    <!--&lt;!&ndash;******************&ndash;&gt;-->

    <!--<div v-if="otherVariants.length !== 0" style="border: 2px solid hotpink">-->
    <!--<div class="single-variant" v-for="variant in otherVariants">-->
    <!--<label class="check-container variant-check-cont" v-if="variant.required === false">-->
    <!--<input type="checkbox" @change="setVariants(variant)" :value="variant" class="variant-checkbox" :checked = false >-->
    <!--<span class="checkmark"></span>-->
    <!--</label>-->
    <!--<div class="variant-header">-->
    <!--<p> {{variant.name}} </p>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--&lt;!&ndash;<p>ALL</p>&ndash;&gt;-->
    <!--&lt;!&ndash;<div v-if="this.$store.state.product.variantSets.length === 0" style="border: 2px solid cornflowerblue">&ndash;&gt;-->
    <!--&lt;!&ndash;<div class="single-variant" v-for="variant in selectedVariantSet.variants">&ndash;&gt;-->
    <!--&lt;!&ndash;<label class="check-container variant-check-cont" v-if="variant.required === false">&ndash;&gt;-->
    <!--&lt;!&ndash;<input type="checkbox" @change="setVariants(variant)" :value="variant" class="variant-checkbox" :checked="false">&ndash;&gt;-->
    <!--&lt;!&ndash;<span class="checkmark"></span>&ndash;&gt;-->
    <!--&lt;!&ndash;</label>&ndash;&gt;-->
    <!--&lt;!&ndash;<div class="variant-header">&ndash;&gt;-->
    <!--&lt;!&ndash;<p v-if="variant.required !== 1"> {{variant.name}} </p>&ndash;&gt;-->
    <!--&lt;!&ndash;<p v-if="variant.required === 1"> {{variant.name}} * </p>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--&lt;!&ndash;<div class="variant-content" v-if="variant.required === 1">&ndash;&gt;-->
    <!--&lt;!&ndash;<div v-if="variant.type.type !== 2 "&ndash;&gt;-->
    <!--&lt;!&ndash;class="price-options">&ndash;&gt;-->
    <!--&lt;!&ndash;<p style="margin-right: 25px " v-if="variant.type.type === 0" class="label">Gdy wpisano:</p>&ndash;&gt;-->
    <!--&lt;!&ndash;<p style="margin-right: 25px " v-if="variant.type.type === 1" class="label">Gdy&ndash;&gt;-->
    <!--&lt;!&ndash;zaznaczono:</p>&ndash;&gt;-->
    <!--&lt;!&ndash;<p style="margin-right: 25px " v-if="variant.type.type === 3" class="label">Gdy dodano&ndash;&gt;-->
    <!--&lt;!&ndash;plik:</p>&ndash;&gt;-->


    <!--&lt;!&ndash;<multiselect&ndash;&gt;-->
    <!--&lt;!&ndash;class="shop-select price-select"&ndash;&gt;-->
    <!--&lt;!&ndash;v-model="variant.priceOption"&ndash;&gt;-->
    <!--&lt;!&ndash;:options="priceOptions"&ndash;&gt;-->
    <!--&lt;!&ndash;:allow-empty="false"&ndash;&gt;-->
    <!--&lt;!&ndash;:searchable="false"&ndash;&gt;-->
    <!--&lt;!&ndash;:selectedLabel="''"&ndash;&gt;-->
    <!--&lt;!&ndash;track-by="name"&ndash;&gt;-->
    <!--&lt;!&ndash;label="name"&ndash;&gt;-->
    <!--&lt;!&ndash;:deselectLabel="''"&ndash;&gt;-->
    <!--&lt;!&ndash;:selectLabel="''"&ndash;&gt;-->
    <!--&lt;!&ndash;:hideSelected="true"&ndash;&gt;-->
    <!--&lt;!&ndash;placeholder="Wybierz"&ndash;&gt;-->
    <!--&lt;!&ndash;style="width: 100%"&ndash;&gt;-->

    <!--&lt;!&ndash;/>&ndash;&gt;-->
    <!--&lt;!&ndash;<div class="price-inpt">&ndash;&gt;-->
    <!--&lt;!&ndash;<input type="text" v-model="variant.priceValue"&ndash;&gt;-->
    <!--&lt;!&ndash;v-if="variant.priceOption.type !== 0" placeholder="..."/>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--&lt;!&ndash;<multiselect v-if="variant.priceOption.type !== 0"&ndash;&gt;-->
    <!--&lt;!&ndash;class="shop-select curr-select"&ndash;&gt;-->
    <!--&lt;!&ndash;v-model="variant.curr"&ndash;&gt;-->
    <!--&lt;!&ndash;:options="currOptions"&ndash;&gt;-->
    <!--&lt;!&ndash;:allow-empty="false"&ndash;&gt;-->
    <!--&lt;!&ndash;:searchable="false"&ndash;&gt;-->
    <!--&lt;!&ndash;:selectedLabel="''"&ndash;&gt;-->
    <!--&lt;!&ndash;track-by="name"&ndash;&gt;-->
    <!--&lt;!&ndash;label="name"&ndash;&gt;-->
    <!--&lt;!&ndash;:deselectLabel="''"&ndash;&gt;-->
    <!--&lt;!&ndash;:selectLabel="''"&ndash;&gt;-->
    <!--&lt;!&ndash;:hideSelected="true"&ndash;&gt;-->
    <!--&lt;!&ndash;placeholder="Wybierz"&ndash;&gt;-->
    <!--&lt;!&ndash;style="width: 20%; margin-left: 25px"&ndash;&gt;-->
    <!--&lt;!&ndash;/>&ndash;&gt;-->


    <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--&lt;!&ndash;<div v-if="variant.type.type === 2">&ndash;&gt;-->
    <!--&lt;!&ndash;<ul>&ndash;&gt;-->
    <!--&lt;!&ndash;<li v-for="option in variant.selectOptions" class="select-options">&ndash;&gt;-->
    <!--&lt;!&ndash;<label class="check-container">&ndash;&gt;-->
    <!--&lt;!&ndash;<p class="label">&ndash;&gt;-->
    <!--&lt;!&ndash;{{option.name}}&ndash;&gt;-->
    <!--&lt;!&ndash;</p>&ndash;&gt;-->
    <!--&lt;!&ndash;<input type="checkbox" v-model="selectedVariantOptions" :value="option" @click="setVariantOption(variant, option)">&ndash;&gt;-->
    <!--&lt;!&ndash;<span class="checkmark"></span>&ndash;&gt;-->
    <!--&lt;!&ndash;</label>&ndash;&gt;-->
    <!--&lt;!&ndash;<div class="price-options-container"&ndash;&gt;-->
    <!--&lt;!&ndash;v-if="selectedVariantOptions.find(el => el === option)">&ndash;&gt;-->
    <!--&lt;!&ndash;<multiselect&ndash;&gt;-->
    <!--&lt;!&ndash;class="shop-select price-select"&ndash;&gt;-->
    <!--&lt;!&ndash;v-model="option.priceOption"&ndash;&gt;-->
    <!--&lt;!&ndash;:options="priceOptions"&ndash;&gt;-->
    <!--&lt;!&ndash;:allow-empty="false"&ndash;&gt;-->
    <!--&lt;!&ndash;:searchable="false"&ndash;&gt;-->
    <!--&lt;!&ndash;:selectedLabel="''"&ndash;&gt;-->
    <!--&lt;!&ndash;track-by="name"&ndash;&gt;-->
    <!--&lt;!&ndash;label="name"&ndash;&gt;-->
    <!--&lt;!&ndash;:deselectLabel="''"&ndash;&gt;-->
    <!--&lt;!&ndash;:selectLabel="''"&ndash;&gt;-->
    <!--&lt;!&ndash;:hideSelected="true"&ndash;&gt;-->
    <!--&lt;!&ndash;placeholder="Wybierz"&ndash;&gt;-->
    <!--&lt;!&ndash;style="width: 25%"/>&ndash;&gt;-->

    <!--&lt;!&ndash;<input type="text" v-model="option.priceValue"&ndash;&gt;-->
    <!--&lt;!&ndash;v-if="option.priceOption.type !== 0" placeholder="..."/>&ndash;&gt;-->

    <!--&lt;!&ndash;<multiselect v-if="option.priceOption.type !== 0"&ndash;&gt;-->
    <!--&lt;!&ndash;class="shop-select curr-select"&ndash;&gt;-->
    <!--&lt;!&ndash;v-model="option.curr"&ndash;&gt;-->
    <!--&lt;!&ndash;:options="currOptions"&ndash;&gt;-->
    <!--&lt;!&ndash;:allow-empty="false"&ndash;&gt;-->
    <!--&lt;!&ndash;:searchable="false"&ndash;&gt;-->
    <!--&lt;!&ndash;:selectedLabel="''"&ndash;&gt;-->
    <!--&lt;!&ndash;track-by="name"&ndash;&gt;-->
    <!--&lt;!&ndash;label="name"&ndash;&gt;-->
    <!--&lt;!&ndash;:deselectLabel="''"&ndash;&gt;-->
    <!--&lt;!&ndash;:selectLabel="''"&ndash;&gt;-->
    <!--&lt;!&ndash;:hideSelected="true"&ndash;&gt;-->
    <!--&lt;!&ndash;placeholder="Wybierz"&ndash;&gt;-->
    <!--&lt;!&ndash;style="width: 9%"&ndash;&gt;-->

    <!--&lt;!&ndash;/>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--&lt;!&ndash;</li>&ndash;&gt;-->
    <!--&lt;!&ndash;</ul>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--</div>-->
    <!--<br>-->
    <!--<br>-->
    <!--<br>-->
    <!--<br>-->
    <!--<br>-->
    <!--</div>-->
    <div class="l-wrapper">
        <div style="width: 100%;">
            <form action="" class="c-form items__container">
                <single-select :options="variantSets" v-model="selectedVariantSet"
                               placeholder="Zestaw wariantów"></single-select>
                <div class="items-list" v-if="!!selectedVariantSet.variants">
                    <div :class="{'items-list__item': true, 'item-active': selectedVariants.includes(variant)}"
                         v-for="variant in selectedVariantSet.variants">
                        <div class="c-form__checkbox">
                            <input type="checkbox" :value="variant" v-model="selectedVariants"
                                   :disabled="variant.required">
                            <label>
                                <span>{{variant.name}}</span>
                            </label>
                            <span class="variant__required" v-if="variant.required">*</span>
                        </div>
                        <div class="line"></div>
                        <div class="item__content" v-if="selectedVariants.includes(variant)">
                            <div class="single__item" v-if="variant.type.type !== 2">
                                <span v-if="variant.type.type === 0">Gdy wypełniono:</span>
                                <span v-if="variant.type.type === 1">Gdy zaznaczono:</span>
                                <span v-if="variant.type.type === 3">Gdy dodano:</span>
                                <template>
                                    <single-select :options="priceOptions" placeholder="Zmień cenę"
                                                   v-model="variant.priceOption"></single-select>
                                    <custom-input label="o" v-model="variant.priceValue" rules="" v-if="variant.priceOption.type !== 0"></custom-input>
                                    <single-select :options="currOptions" placeholder=""
                                                   v-model="variant.curr"></single-select>
                                </template>
                            </div>

                            <div class="single__item" v-if="variant.type.type === 2" v-for="option in variant.selectOptions">
                                <div class="c-form__checkbox">
                                    <input type="checkbox" :value="option" v-model="variant.selectedOptions" @change="show(variant.selectedOptions)">
                                    <label>
                                        <span>{{option.name}}</span>
                                    </label>
                                </div>
                                    <single-select :options="priceOptions" placeholder="Zmień cenę"
                                                   v-model="option.priceOption"></single-select>
                                    <custom-input label="o" v-model="option.priceValue" rules="" v-if="option.priceOption.type !== 0"></custom-input>
                                    <single-select :options="currOptions" placeholder=""
                                                   v-model="option.curr"></single-select>
                            </div>


                            <!--<div class="attributes-container">-->
                            <!--<div class="ite">-->
                            <!---->
                            <!--</div>-->
                            <!--&lt;!&ndash;<div class="single-attribute" v-for="attribute in set.attributes">&ndash;&gt;-->
                            <!--&lt;!&ndash;<span>{{attribute.name}}</span>&ndash;&gt;-->
                            <!--&lt;!&ndash;<div class="" v-if="attribute.type.type === 0">&ndash;&gt;-->
                            <!--&lt;!&ndash;<input type="text" v-model="attribute.defaultValue" class="attribute__input">&ndash;&gt;-->
                            <!--&lt;!&ndash;</div>&ndash;&gt;-->
                            <!--&lt;!&ndash;<div class="" v-if="attribute.type.type === 1">&ndash;&gt;-->
                            <!--&lt;!&ndash;<label class="check-container">&ndash;&gt;-->
                            <!--&lt;!&ndash;<input type="checkbox" v-model="attribute.checked">&ndash;&gt;-->
                            <!--&lt;!&ndash;<span class="checkmark"></span>&ndash;&gt;-->
                            <!--&lt;!&ndash;</label>&ndash;&gt;-->
                            <!--&lt;!&ndash;&lt;!&ndash;<input type="checkbox" v-model="attribute.checked" >&ndash;&gt;&ndash;&gt;-->
                            <!--&lt;!&ndash;</div>&ndash;&gt;-->
                            <!--&lt;!&ndash;<div class="" v-if="attribute.type.type === 2">&ndash;&gt;-->
                            <!--&lt;!&ndash;<select  v-model="attribute.defaultValue" class="attribute__select">&ndash;&gt;-->
                            <!--&lt;!&ndash;<option v-for="option in attribute.selectOptions" :value="option">&ndash;&gt;-->
                            <!--&lt;!&ndash;{{option.name}}&ndash;&gt;-->
                            <!--&lt;!&ndash;</option>&ndash;&gt;-->
                            <!--&lt;!&ndash;</select>&ndash;&gt;-->
                            <!--&lt;!&ndash;</div>&ndash;&gt;-->

                            <!--&lt;!&ndash;</div>&ndash;&gt;-->
                            <!--</div>-->
                            <div class="line"></div>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'variant-sets',
    computed: {
      variantSets: function () {
        return this.$store.getters.getVariantSets
      },
      selectedVariantSet: {
        get () {
          return this.$store.getters.getSelectedVariantSet
        },

        set (variantSet) {
          this.$store.commit('setSelectedVariantSet', variantSet)
        },
      },
      selectedVariants: {
        get () {
          return this.$store.getters.getSelectedVariants
        },
        set (variants) {
          this.$store.commit('setSelectedVariants', variants)
          // console.log(variants.pop())
        }
      },
      // 'variant.selectedOptions': {
      //   get () {
      //     return this.$store.getters.getSelectedOptions
      //   },
      //   set (options) {
      //     this.$store.commit('setSelectedOptions', options)
      //   }
      // }
      //
      // selectedVariantSet: {
      //   get: function () {
      //     return this.$store.getters.selectedVariantSet
      //   },
      //
      //   set: function (set) {
      //     this.$store.commit('selectedVariantSet', set)
      //   },
      //
      // },
      // selectedVariants: {
      //   get: function () {
      //     if (this.$store.state.product.variantSets.length === 0) {
      //       return this.selectedVariantSet.variants.filter(el => el.required === 1)
      //     }
      //     else {
      //       return this.$store.getters.selectedVariants
      //     }
      //   },
      //   set: function (newValue) {
      //     this.$store.commit('setSelectedVariants', newValue)
      //   },
      // },
      //
      // otherVariants: {
      //   get: function () {
      //     return this.$store.state.otherVariants
      //   },
      //
      //   set: function (val) {
      //     // this.$store.commit('setOtherVariants', val)
      //   },

      // },
    },

    watch: {
      selectedVariantSet (newSet) {
        newSet.variants.forEach(variant => {
          if (variant.required == 1) {
            this.$store.commit('addRequiredVariants', variant)
          }
            variant.selectedOptions = variant.selectOptions
          // variant.selectOptions.forEach(option => {
          //
          // } variant.selectedOptions.push(option))
        })
        // console.log('sth')
        // this.$store.commit('selectedVariantSet', newSet)
        // this.$store.commit('clearSelectedVariants')
        // this.otherVariants = []
      },
      // selectedVariants:
    },

    data: () => ({
      priceOptions: [
        {type: 0, name: 'nie zmieniaj'},
        {type: 1, name: 'Zwiększ o'},
        {type: 2, name: 'Zmniejsz o'},
      ],
      currOptions: [
        {type: 0, name: 'zł'},
        {type: 1, name: '%'},
      ],
      selectedSet: '',
      // selectedVariants: []
      // selectedVariantOptions: [],
    }),

    methods: {
      setRequiredVariantsAsSelected() {
        if(!!this.selectedVariantSet){
          this.selectedVariantSet.variants.map(item => {
            item.required ? this.$store.commit('addRequiredVariants', item) : ''
            // if(item.required == 1 ){
            //
            // }
          })
        }
      },
      show(sth) {
        console.log(sth)
      }
      //
      // removeVariant(variant){
      //   let index = this.selectedVariants.indexOf(variant)
      //   this.selectedVariants.splice(index, 1)
      //   this.otherVariants.unshift(variant)
      // },
      //
      //
      // setVariants (variant) {
      //   this.selectedVariants.push(variant)
      //   let index = this.otherVariants.indexOf(variant)
      //   this.otherVariants.splice(index, 1)
      // },
    },

    created: function () {
      this.setRequiredVariantsAsSelected()
      // this.$store.dispatch('getVariantSets')

    },
    //
    // beforeDestroy: function () {
    //
    //   this.otherVariants = this.selectedVariantSet.variants.filter((el) => !this.selectedVariants.includes(el))
    //
    // },

    destroyed: function () {
      // this.$store.commit('selectedVariantSet', this.selectedVariantSet)
      // this.$store.commit('setOtherVariants', this.otherVariants)
      // this.$store.commit('setSelectedVariants', this.selectedVariants)
    },
  }
</script>

<style scoped>

    .items__container {
        display: grid;
        grid-template-rows: 100px 1fr;
    }

    input:focus, select:focus {
        outline-width: 0;
    }

    .items-list {
        border: 1px solid #dddddd;
    }

    .items-list__item {
        width: 100%;
        background-color: #ffffff;
    }

    .c-form__checkbox {
        margin-left: 25px;
    }

    .c-form__checkbox label span {
        font-weight: 700;
        font-size: 120%;
        margin-left: 20px;
        padding: 30px;
    }

    .item__content {
        background-color: #ffffff;
    }

    .line {
        width: 100%;
        height: 1px;
        background-color: #dddddd;
    }

    .item-active {
        background-color: #eef0f3;
    }

    .attributes-container {
        padding: 25px 0 25px 90px;
    }

    .single-attribute {
        height: 50px;
        /*border: 1px solid red;*/
        padding: 5px 0;
        display: grid;
        grid-template-columns: 1fr 3fr;
        align-items: center;
    }

    .single-attribute span {
        font-size: 0.8rem;
    }

    .attribute__input {
        height: 35px;
        padding-left: 10px;
        border: 1px solid #dddddd;
        width: 55%;
    }

    .attribute__select {
        height: 35px;
        padding-left: 10px;
        border: 1px solid #dddddd;
        width: 55%;
        background-color: #ffffff;
    }

    .items__info {
        width: 80%;
        height: 60vh;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2.5rem;
        color: #c5c5c5;
        opacity: 0.5;
    }

    .check-container {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 12px;
        cursor: pointer;
        font-size: 18px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .check-container p {
        padding-top: 3px;
    }

    .check-container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        left: 5px;
        top: 5px;
    }

    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 23px;
        width: 23px;
        background-color: #FFFFFF;
        border: 1px solid #DAD8DA;

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

    .variant__required {
        font-size: 1.5rem;
        color: red;

    }

    .c-form__checkbox input {
        position: absolute;
        margin-top: 33px;
        margin-left: 3px;
        z-index: 1;
        opacity: 0;
        cursor: pointer;
        display: block;
    }

    .single__item {
        padding: 25px 75px;
        display: grid;
        grid-template-columns: 1fr 2fr 1fr 1fr;
        grid-gap: 10px;
        align-content: center;
        align-items: center;
    }

    .single__item span {
        font-size: 0.8rem;
    }

    .my-input{
        margin-bottom: 0 !important;
    }

</style>