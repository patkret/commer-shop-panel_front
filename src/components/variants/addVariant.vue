<template>
    <div class="single-attribute">
        <form class="single-attribute-form">
            <div class="info" v-if="showInfoAdd == true">
                <p>Cecha została dodana!</p>
            </div>
            <div class="sing-attr-row">
                <label class="attr-label">Nazwa</label>
                <div class="input-container">
                    <div class="input-col">
                        <div :class="{'cust-inpt': true,  'cust-inpt inpt-border': errors.has('name')}">
                            <input type="text" v-validate="'required'" :class="{'single-input': true, }"
                                   placeholder="Nazwa..." name="name" v-model="variant.name">
                        </div>
                        <span v-show="errors.has('name')" class="validator-help">{{ errors.first('name') }}</span>
                    </div>
                </div>
            </div>

            <div class="sing-attr-row">
                <label class="attr-label">Typ cechy</label>
                <div class="input-container">
                    <multiselect
                            class="shop-select"
                            v-model="variant.type"
                            :options="options"
                            :allow-empty="false"
                            :searchable="false"
                            :selectedLabel="''"
                            track-by="name"
                            label="name"
                            id="ms-1"
                            :deselectLabel="''"
                            :selectLabel="''"
                            :hideSelected="true"
                            placeholder="Wybierz"></multiselect>
                </div>
            </div>
            <div class="sing-attr-row">
                <label class="attr-label">Wymagany</label>
                <div class="input-container">
                    <div class="checkbox-square form-group">
                        <input type="checkbox" id="attr-visibility" class="visibility-hidden"
                               v-model="variant.required">
                        <label for="attr-visibility" class="square"></label>
                    </div>
                </div>
            </div>
            <div class="sing-attr-row" v-if="variant.type.type !== 2">
                <label class="attr-label" v-if="variant.type.type == 0">Gdy wypełniono:</label>
                <label class="attr-label" v-if="variant.type.type == 1">Gdy zaznaczono:</label>
                <label class="attr-label" v-if="variant.type.type == 3">Gdy dodano:</label>
                <div class="input-container">
                    <div class="inpt-row">
                        <multiselect
                                class="shop-select"
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
                                placeholder="Wybierz"></multiselect>

                        <div class="input-col" v-if="variant.priceOption.type !== 0">
                            <div class="cust-inpt"
                                 style="margin-left: 10px; height: 40px; width: 80px; margin-right: 10px">
                                <input type="text"
                                       placeholder="..." name="priceValue" v-model="variant.priceValue"
                                       style="width: 70%; padding-top: 5px">
                            </div>
                        </div>
                        <multiselect v-if="variant.priceOption.type !== 0 && variant.priceValue !== ''"
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
                                     placeholder="Wybierz"></multiselect>
                    </div>
                </div>

            </div>
            <div class="sing-attr-row" v-if="variant.type.type == 2">
                <label class="attr-label">Pole dla select</label>
                <div class="input-container">
                    <div class="select-input-container">
                        <div class="select-input" style="width: 40%; height: 40px; margin-right: 10px">
                            <input type="text" name="name" placeholder="..." v-model="selectName"
                                   style="padding-top: 5px; width: 87%">
                        </div>
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
                                style="width: 25%;"></multiselect>

                        <div class="input-col" v-if="variant.priceOption.type !== 0">
                            <div class="cust-inpt"
                                 style="margin-left: 10px; height: 40px; width: 80px; margin-right: 10px">
                                <input type="text"
                                       placeholder="..." name="priceValue" v-model="variant.priceValue"
                                       style="width: 70%; padding-top: 5px">
                            </div>
                        </div>

                        <multiselect v-if="variant.priceOption.type !== 0 && variant.priceValue !== ''"
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
                                     placeholder="Wybierz"></multiselect>
                        <button class="button-select-fields" @click.prevent="addOption()">+</button>
                    </div>

                </div>
            </div>

            <div class="sing-attr-row" v-for="(item, index) in variant.selectOptions" v-if="variant.type.type === 2">
                <label class="attr-label"></label>
                <div class="input-container">
                    <div class="select-input-container">
                        <div class="select-input" style="width: 40%; height: 40px; margin-right: 10px">

                            <input type="text" name="name" placeholder="..." v-model="item.name"
                                   style="padding-top: 5px; width: 87%">
                        </div>
                        <multiselect
                                class="shop-select price-select"
                                v-model="item.priceOption"
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
                                style="width: 25%"></multiselect>

                        <div class="input-col" v-if="item.priceOption.type !== 0">
                            <div class="cust-inpt"
                                 style="margin-left: 10px; height: 40px; width: 80px; margin-right: 10px">
                                <input type="text"
                                       placeholder="..." name="priceValue" v-model="item.priceValue"
                                       style="width: 70%; padding-top: 5px">
                            </div>
                        </div>

                        <multiselect v-if="item.priceOption.type !== 0"
                                     class="shop-select curr-select"
                                     v-model="item.curr"
                                     :options="currOptions"
                                     :allow-empty="false"
                                     :searchable="false"
                                     :selectedLabel="''"
                                     track-by="name"
                                     label="name"
                                     :deselectLabel="''"
                                     :selectLabel="''"
                                     :hideSelected="true"
                                     placeholder="Wybierz"></multiselect>
                        <button class="button-select-fields" @click.prevent="removeOption(index)">-</button>

                    </div>
                </div>
            </div>
        </form>
        <button class="custom-button" @click.prevent="addVariant()">DODAJ</button>
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
      showInfoAdd: false,
      showInfoEdit: false,
    }),
    watch: {
      showInfoAdd: function () {
        setTimeout(() => {
          this.showInfoAdd = false
        }, 3000)
      },
    },
    methods: {
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
        this.$validator.validateAll().then((result) => {
          if (result) {
            let tempVariant = {
              name: this.variant.name,
              type: this.variant.type,
              required: this.variant.required,
              selectOptions: this.variant.selectOptions,
              curr: this.variant.curr,
              priceOption: this.variant.priceOption,
              priceValue: this.variant.priceValue,
            }

            this.$emit('variant', tempVariant)

            this.showInfoAdd = true

            this.variant.name = ''
            this.variant.type = {type: 0, name: 'Pole tekstowe'}
            this.variant.required = 1
            this.variant.selectOptions = []
            this.variant.curr = {type: 0, name: 'zł'}
            this.variant.priceValue = ''
            this.variant.priceOption = {type: 0, name: 'nie zmieniaj'}
            setTimeout(() => {
              this.errors.clear()
            }, 2)
          }
        })
      },
    },
  }
</script>

<style scoped>
    .single-attribute {
        display: grid;
        grid-template-columns: 10% 70% 20%;
        grid-template-rows: auto 50px;
        grid-template-areas: ". sing-attr-form ." ". cust-button .";
    }

    .single-attribute-form {
        grid-area: sing-attr-form;
        display: grid;
    }

    .sing-attr-row {
        display: grid;
        grid-template-columns: 20% 30px 80%;
        grid-template-areas: "label . input";
        margin-bottom: 25px;
    }

    .attr-label {
        grid-area: label;
        justify-self: end;
        align-self: center;
    }

    .input-container {
        grid-area: input;
        align-self: center;
    }

    .cust-inpt {
        width: 80%;
        height: 35px;
        background-color: white;
        border-radius: 5px;
        align-content: center;
    }

    .cust-inpt input {
        border: none;
        width: 95%;
        margin-left: 15px;
        margin-top: 7px;
    }

    .checkbox-square {
        margin-left: -13px;

    }

    .cust-textarea {
        width: 80%;
        height: 150px;
        background-color: white;
        border-radius: 5px;
        align-content: center;
    }

    .textarea1 {
        border: none;
        resize: none;
        width: 95%;
        height: 135px;
        margin-left: 15px;
        margin-top: 5px;
    }

    .custom-button {
        grid-area: cust-button;
        margin: 0 50px 0 180px;
    }

    .cust-inpt-select {
        width: 70%;
        background-color: #FFFFFF;
    }

    .cust-inpt-select input {
        border: none;
        width: 90%;
    }

    .button-select-fields {
        border: none;
        background-color: #F6F7FB;
    }

    .select-input-container {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }

    .select-input {
        width: 75%;
        height: 35px;
        border: none;
        background-color: #FFFFFF;
        border-radius: 5px;
    }

    .select-input input {
        width: 95%;
        margin-left: 15px;
        margin-top: 5px;
        border: none;
    }

    .info {
        width: 100%;
        height: 50px;
        background-color: #94C01E;
        margin-bottom: 50px;
        color: #FFFFFF;
        text-align: center;
    }

    .validator-help {
        width: 78%;
        background-color: red;
        border-radius: 5px;
        color: #fff;
        padding: 10px 0 10px 10px;
        font-size: 12px;
        font-weight: 700;
        border-top-right-radius: 0;
        border-top-left-radius: 0;
    }

    .inpt-border {
        border: 1px solid red;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    .input-col {
        display: flex;
        flex-direction: column;
    }

    .inpt-row {
        display: flex;
        flex-direction: row;
    }

    .curr-select {
        width: 70px;
    }

</style>
