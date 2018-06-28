<template>
    <div class="component__content">
        <div class="c-single-col">
            <div class="component__row">
                <custom-input label="Nazwa wariantu" rules="required" :min-input-length="3"
                              v-model="variant.name"></custom-input>
            </div>

            <div class="component__row">
                <div class="c-form__switch">
                    <div class="c-form__switch-label">Wymagany</div>

                    <div class="c-form__switch-control">
                        <input type="checkbox" id="required" v-model="variant.required">
                        <label for="required"></label>
                    </div>
                </div>
            </div>

            <div class="component__row">
                <single-select :options="options" v-model="variant.type" placeholder="Typ wariantu"/>
            </div>

            <div class="component__row price__row" v-if="variant.type.type !== 2">
                <span class="price__label" v-if="variant.type.type === 0">Gdy wypełniono</span>
                <span class="price__label" v-if="variant.type.type === 1">Gdy zaznaczono</span>
                <span class="price__label" v-if="variant.type.type === 3">Gdy dodano</span>
                <single-select :options="priceOptions" v-model="variant.priceOption" style="min-width: 150px"
                               class="price__select" placeholder="Zmiana ceny"></single-select>
                <template v-if="variant.priceOption.type !== 0">
                    <custom-input label="o" rules="required|numeric" v-model="variant.priceValue"
                                  class="price__value"></custom-input>
                    <single-select :options="currOptions" v-model="variant.curr" class="price__curr"></single-select>
                </template>
            </div>

            <div class="component__row select__price-row" v-if="variant.type.type === 2">
                <custom-input class="price__label" label="Pole" v-model="selectName" rules="required" ></custom-input>
                <single-select :options="priceOptions" v-model="variant.priceOption" style="min-width: 150px"
                               class="price__select" placeholder="Zmiana ceny"></single-select>
                <template v-if="variant.priceOption.type !== 0">
                    <custom-input label="Wartość" rules="required|numeric" v-model="variant.priceValue"
                                  class="price__value"></custom-input>
                    <single-select :options="currOptions" v-model="variant.curr" class="price__curr"></single-select>
                </template>
                <button class="icon__button" type="button" @click="addOption"><i class="fa fa-plus"></i></button>
            </div>

            <div class="component__row select__price-row"
                 v-if="variant.type.type === 2 && variant.selectOptions.length > 0"
                 v-for="(item, index) in variant.selectOptions">
                <custom-input class="price__label" label="Pole" v-model="item.name" rules=""></custom-input>
                <single-select :options="priceOptions" v-model="item.priceOption" style="min-width: 150px"
                               class="price__select" placeholder="Zmiana ceny"></single-select>
                <template v-if="item.priceOption.type !== 0">
                    <custom-input label="Wartość" rules="required|numeric" v-model="item.priceValue"
                                  class="price__value"></custom-input>
                    <single-select :options="currOptions" v-model="item.curr" class="price__curr"></single-select>
                </template>
                <button class="icon__button" type="button" @click.stop="removeOption(index)" style="color: red;"><i
                        class="fa fa-trash"></i></button>
            </div>

            <div class="component__row">
                <div class="h-center">
                    <button type="button" class="c-button c-form__button" @click="addVariant()">
                        <span>Dodaj</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'add-variant',
    data: () => ({
      options: [
        {type: 0, name: 'Pole tekstowe'},
        {type: 1, name: 'Checkbox'},
        {type: 2, name: 'Select'},
        {type: 3, name: 'Plik'},
      ],
      priceOptions: [
        {type: 0, name: 'nie zmieniaj'},
        {type: 1, name: 'Zwiększ o'},
        {type: 2, name: 'Zmniejsz o'},
      ],
      currOptions: [
        {type: 0, name: 'zł'},
        {type: 1, name: '%'},
      ],

      selectName: '',
      variant: {
        name: '',
        type: {type: 0, name: 'Pole tekstowe'},
        priceOption: {type: 0, name: 'nie zmieniaj'},
        priceValue: '',
        curr: {type: 0, name: 'zł'},
        required: 1,
        selectOptions: [],

      },
      ifEdit: false,
    }),

    methods: {
      checkIfEdit () {
        if (this.$route.params.item) {
          this.ifEdit = true
          this.variant = this.$store.state.variantSets.variants[this.$route.params.item]
        }
      },
      addOption () {

          this.variant.selectOptions.push({
            name: this.selectName,
            priceOption: this.variant.priceOption,
            priceValue: this.variant.priceValue,
            curr: this.variant.curr,
          })
          this.selectName = ''
          this.variant.priceOption = {type: 0, name: 'nie zmieniaj'}
          this.variant.priceValue = ''
      },
      removeOption (index) {

        this.variant.selectOptions.splice(index, 1)
      },
      addVariant () {
        let tempVariant =
          {
            name: this.variant.name,
            type: this.variant.type,
            priceOption: this.variant.priceOption,
            priceValue: this.variant.priceValue,
            curr: this.variant.curr,
            required: this.variant.required,
            selectOptions: this.variant.selectOptions,
          }

        this.$validator.validateAll().then((result) => {
          if (result) {
            if (!this.ifEdit) {
              this.setVariant(tempVariant)
              this.$router.replace('all-variants')
              if (this.$route.params.id) {
                this.$parent.setActiveRoute(`/variants/edit/:id/all-variants`)
              }
              else {
                this.$parent.setActiveRoute('/variants/add/all-variants')
              }
            }
            else {
              this.$store.state.variantSets[this.$route.params.item] = tempVariant
              if (this.$route.params.id) {
                this.$router.replace(`/variants/edit/${this.$route.params.id}/all-variants`)
                this.$parent.setActiveRoute('/variants/edit/:id/all-variants')
              }
              else {
                this.$router.replace('/variants/add/all-variants')
                this.$parent.setActiveRoute('/variants/add/all-variants')
              }

              this.showInfoEdit = true
            }

          }
        })
      },
      setVariant (variant) {
        this.$store.commit('setVariant', variant)
      },
    },

    created: function () {
      this.checkIfEdit()
    },

  }
</script>

<style scoped>
    .component__content {
        display: grid;
        grid-template-columns: 15% 1fr 15%;
        grid-template-areas: ". middle-col .";
    }

    .c-single-col {
        grid-area: middle-col;
        grid-auto-rows: 1fr;
        /*height: 300px;*/
    }

    .c-dropdown {
        margin: 15px 0 15px 0;
        height: 38px;
        width: 100%;

    }

    .c-dropdown__name {
        line-height: 38px;
        padding-left: 15px;
    }

    .custom-textarea {
        resize: none;
        width: 100%;
        border: 1px solid #dddddd;
        font-size: 0.8rem;
        padding: 10px 15px 10px 15px;
    }

    textarea:focus {
        outline-width: 0;
    }

    .c-dropdown__menu {
        width: 100%;
    }

    .checked__label {
        max-width: 58px;
    }

    .checkbox__row {
        margin-bottom: 15px;
    }

    .select__row {
        display: grid;
        grid-template-columns: 95% 5%;
        align-items: start;
    }

    .icon__button {
        border: none;
        background: transparent;
        height: 38px;
        color: #2595ec;
        cursor: pointer;
    }

    .icon__button:focus {
        outline-width: 0;
    }

    .remove__button {
        color: red;
    }

    .success-info {
        position: absolute;
        font-size: 0.9rem;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        top: 100px;
        left: 350px;
        width: 79%;
        background-color: #00DD00;
        color: #ffffff;
        padding: 20px;
        border-radius: 3px;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .price__row {
        font-size: 12px;
        display: grid;
        grid-template-columns: 1fr 15px 3fr 15px 1fr 15px 1fr;
        grid-template-areas: "label . price-select . price-value . price-curr ";
        align-items: center;
        margin-top: 10px;
    }

    .price__label {
        margin: 0;
        grid-area: label;
    }

    .price__select {
        margin: 0;
        grid-area: price-select;
    }

    .price__value {
        margin: 0;
        grid-area: price-value;
    }

    .price__curr {
        grid-area: price-curr;
    }

    .icon__button {
        grid-area: button;
    }

    .select__price-row {
        display: grid;
        grid-template-columns: 3fr 15px 2fr 15px 1fr 15px 1fr 15px;
        grid-template-areas: "label . price-select . price-value . price-curr button";
        margin-top: 15px;

    }
    .component__row {
        margin-bottom: 20px;
    }

</style>
