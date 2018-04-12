<template>
    <div class="single-attribute">
        <form class="single-attribute-form">
            <div class="info" v-if="showInfoEdit == true">
                <p>Atrybut został edytowany!</p>
            </div>
            <div class="sing-attr-row">
                <label class="attr-label">Nazwa</label>
                <div class="input-container">
                    <div class="input-col">
                        <div :class="{'cust-inpt': true,  'cust-inpt inpt-border': errors.has('name')}">
                            <input type="text" v-validate="'required'" :class="{'single-input': true, }"
                                   placeholder="Nazwa..." name="name" v-model="attribute.name">
                        </div>
                        <span v-show="errors.has('name')" class="validator-help">{{ errors.first('name') }}</span>
                    </div>
                </div>
            </div>
            <div class="sing-attr-row">
                <label class="attr-label">Typ atrybutu</label>
                <div class="input-container">
                    <multiselect
                            class="shop-select"
                            v-model="attribute.type"
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
                <label class="attr-label">Aktywność</label>
                <div class="input-container">
                    <div class="checkbox-square form-group">
                        <input type="checkbox" id="attr-visibility" class="visibility-hidden"
                               v-model="attribute.visibility">
                        <label for="attr-visibility" class="square"></label>
                    </div>
                </div>
            </div>
            <div class="sing-attr-row" v-if="attribute.type.type == 1">
                <label class="attr-label">Domyślnie zaznaczony</label>
                <div class="input-container">
                    <div class="checkbox-square form-group">
                        <input type="checkbox" id="def-checked" class="visibility-hidden" v-model="attribute.checked">
                        <label for="def-checked" class="square"></label>
                    </div>
                </div>
            </div>
            <div class="sing-attr-row" v-if="attribute.type.type == 0">
                <label class="attr-label">Wartość domyślna</label>
                <div class="input-container">
                    <div class="cust-inpt">
                        <input type="text" name="name" placeholder="..." v-model="attribute.defaultValue">
                    </div>
                </div>
            </div>
            <div class="sing-attr-row" v-if="attribute.type.type == 2">
                <label class="attr-label">Pole dla select</label>
                <div class="input-container">
                    <div class="select-input-container">
                        <div class="select-input">
                            <input type="text" name="name" placeholder="..." v-model="selectName">
                        </div>
                        <button class="button-select-fields" @click.prevent="addOption()">+</button>
                    </div>

                </div>
            </div>

            <div class="sing-attr-row" v-for="(item, index) in attribute.selectOptions" v-if="attribute.type.type == 2">
                <label class="attr-label"></label>
                <div class="input-container">
                    <div class="select-input-container">
                        <div class="select-input">
                            <input type="text" name="name" placeholder="..." v-model="item.name">
                        </div>
                        <button class="button-select-fields" @click.prevent="removeOption(index)">-</button>

                    </div>
                </div>
            </div>
            <div class="sing-attr-row" v-if="attribute.selectOptions != 0">
                <label class="attr-label">Domyślna opcja</label>
                <div class="input-container">
                    <multiselect
                            class="shop-select"
                            v-model="attribute.defaultValue"
                            :options="attribute.selectOptions"
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

            <div class="sing-attr-row">
                <label class="attr-label">Opis</label>
                <div class="input-container">
                    <div class="cust-textarea">
                        <textarea class="textarea1" name="description" placeholder="..."
                                  v-model="attribute.description"></textarea>
                    </div>
                </div>
            </div>
        </form>
        <button class="custom-button" @click.prevent="updateAttribute()">ZAPISZ</button>
    </div>
</template>

<script>
  export default {
    name: 'edit-attribute',
    props: ['singleAttribute'],
    data: () => ({
      options: [
        {type: 0, name: 'Pole tekstowe'},
        {type: 1, name: 'Checkbox'},
        {type: 2, name: 'Select'},
      ],
      selectName: '',
      attribute: {
        name: '',
        type: '',
        visibility: 1,
        description: '',
        checked: 1,
        selectOptions: [],
        defaultValue: '',
      },

      showInfoEdit: false,
    }),
    watch: {

      showInfoEdit: function () {
        setTimeout(() => {
          this.showInfoEdit = false
          this.$parent.$data.type = 3
        }, 3000)
      },
    },
    methods: {
      addOption () {
        this.attribute.selectOptions.push({name: this.selectName})
        this.selectName = ''
      },
      removeOption (index) {

        this.attribute.selectOptions.splice(index, 1)
      },
      updateAttribute () {

        this.$validator.validateAll().then((result) => {
          if (result) {
            this.$emit('attribute', this.attribute, this.indexOfAttribute)
            this.showInfoEdit = true
          }
        })
      },
    },

    created: function () {
      if (this.singleAttribute) {
        this.attribute = this.singleAttribute
      }
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
        width: 78.5%;
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

</style>
