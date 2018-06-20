<!--<template>-->
<!--<div class="single-attribute">-->
<!--<form class="single-attribute-form">-->
<!--<div class="info" v-if="showInfoAdd == true">-->
<!--<p>Atrybut został dodany!</p>-->
<!--</div>-->
<!--<div class="sing-attr-row">-->
<!--<custom-input label="'Nazwa atrybutu'" rules="required" min-input-length="3"></custom-input>-->
<!--</div>-->

<!--<div class="sing-attr-row">-->
<!--<label class="attr-label">Typ atrybutu</label>-->
<!--<div class="input-container">-->
<!--<multiselect-->
<!--class="shop-select"-->
<!--v-model="attribute.type"-->
<!--:options="options"-->
<!--:allow-empty="false"-->
<!--:searchable="false"-->
<!--:selectedLabel="''"-->
<!--track-by="name"-->
<!--label="name"-->
<!--id="ms-1"-->
<!--:deselectLabel="''"-->
<!--:selectLabel="''"-->
<!--:hideSelected="true"-->
<!--placeholder="Wybierz"></multiselect>-->
<!--</div>-->
<!--</div>-->
<!--<div class="sing-attr-row">-->
<!--<label class="attr-label">Aktywność</label>-->
<!--<div class="input-container">-->
<!--<div class="checkbox-square form-group">-->
<!--<input type="checkbox" id="attr-visibility" class="visibility-hidden"-->
<!--v-model="attribute.visibility">-->
<!--<label for="attr-visibility" class="square"></label>-->
<!--</div>-->
<!--</div>-->
<!--</div>-->
<!--<div class="sing-attr-row" v-if="attribute.type.type == 1">-->
<!--<label class="attr-label">Domyślnie zaznaczony</label>-->
<!--<div class="input-container">-->
<!--<div class="checkbox-square form-group">-->
<!--<input type="checkbox" id="def-checked" class="visibility-hidden" v-model="attribute.checked">-->
<!--<label for="def-checked" class="square"></label>-->
<!--</div>-->
<!--</div>-->
<!--</div>-->
<!--<div class="sing-attr-row" v-if="attribute.type.type == 0">-->
<!--<label class="attr-label">Wartość domyślna</label>-->
<!--<div class="input-container">-->
<!--<div class="cust-inpt">-->
<!--<input type="text" name="name" placeholder="..." v-model="attribute.defaultValue">-->
<!--</div>-->
<!--</div>-->
<!--</div>-->
<!--<div class="sing-attr-row" v-if="attribute.type.type == 2">-->
<!--<label class="attr-label">Pole dla select</label>-->
<!--<div class="input-container">-->
<!--<div class="select-input-container">-->
<!--<div class="select-input">-->
<!--<input type="text" name="name" placeholder="..." v-model="selectName">-->
<!--</div>-->
<!--<button class="button-select-fields" @click.prevent="addOption()">+</button>-->
<!--</div>-->

<!--</div>-->
<!--</div>-->

<!--<div class="sing-attr-row" v-for="(item, index) in attribute.selectOptions" v-if="attribute.type.type == 2">-->
<!--<label class="attr-label"></label>-->
<!--<div class="input-container">-->
<!--<div class="select-input-container">-->
<!--<div class="select-input">-->
<!--<input type="text" name="name" placeholder="..." v-model="item.name">-->
<!--</div>-->
<!--<button class="button-select-fields" @click.prevent="removeOption(index)">-</button>-->

<!--</div>-->
<!--</div>-->
<!--</div>-->
<!--<div class="sing-attr-row" v-if="attribute.selectOptions != 0">-->
<!--<label class="attr-label">Domyślna opcja</label>-->
<!--<div class="input-container">-->
<!--<multiselect-->
<!--class="shop-select"-->
<!--v-model="attribute.defaultValue"-->
<!--:options="attribute.selectOptions"-->
<!--:allow-empty="false"-->
<!--:searchable="false"-->
<!--:selectedLabel="''"-->
<!--track-by="name"-->
<!--label="name"-->
<!--:deselectLabel="''"-->
<!--:selectLabel="''"-->
<!--:hideSelected="true"-->
<!--placeholder="Wybierz"></multiselect>-->
<!--</div>-->
<!--</div>-->

<!--<div class="sing-attr-row">-->
<!--<label class="attr-label">Opis</label>-->
<!--<div class="input-container">-->
<!--<div class="cust-textarea">-->
<!--<textarea class="textarea1" name="description" placeholder="..."-->
<!--v-model="attribute.description"></textarea>-->
<!--</div>-->
<!--</div>-->
<!--</div>-->
<!--</form>-->
<!--<button class="custom-button" @click.prevent="addAttribute()">DODAJ</button>-->
<!--</div>-->
<!--</template>-->

<template>
    <div class="component__content">
        <div class="c-single-col">
            <div class="component__row">
                <custom-input label="Nazwa atrybutu" rules="required" :min-input-length="3"
                              v-model="attribute.name"></custom-input>
            </div>
            <div class="component__row">
                <div class="c-form__switch">
                    <div class="c-form__switch-label">Aktywność</div>

                    <div class="c-form__switch-control">
                        <input type="checkbox" id="visibility" v-model="attribute.visibility">
                        <label for="visibility"></label>
                    </div>
                </div>
            </div>
            <div class="component__row">
                <div :class="{'c-dropdown js-dropdown' :true, 'c-dropdown js-dropdown is-opened': showOptions }" @click="showOptions = !showOptions">
                                <span class="c-dropdown__name">
                                    Typ atrybutu
                                    <span class="c-arrow-down"></span>
                                </span>

                    <ul class="c-dropdown__menu">
                        <li class="c-dropdown__menu-item" v-for="option in options">
                            <a href="">
                                {{option.name}}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
  export default {
    name: 'add-attribute',
    data: () => ({
      options: [
        {type: 0, name: 'Pole tekstowe'},
        {type: 1, name: 'Checkbox'},
        {type: 2, name: 'Select'},
      ],
      selectName: '',
      attribute: {
        name: '',
        type: {type: 0, name: 'Pole tekstowe'},
        visibility: 1,
        description: '',
        checked: 1,
        selectOptions: [],
        defaultValue: '',
      },
      showOptions: false,
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
        this.attribute.selectOptions.push({name: this.selectName})
        this.selectName = ''
      },
      removeOption (index) {

        this.attribute.selectOptions.splice(index, 1)
      },
      addAttribute () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            let tempAttr = {
              name: this.attribute.name,
              type: this.attribute.type,
              visibility: this.attribute.visibility,
              description: this.attribute.description,
              checked: this.attribute.checked,
              defaultValue: this.attribute.defaultValue,
              selectOptions: this.attribute.selectOptions,
            }

            this.$emit('attribute', tempAttr)

            this.showInfoAdd = true

            this.attribute.name = ''
            this.attribute.type = ''
            this.attribute.visibility = 1
            this.attribute.description = ''
            this.attribute.checked = 1
            this.attribute.selectOptions = []
            this.attribute.defaultValue = ''
          }
        })
      },
    },
  }
</script>

<style scoped>
    .component__content {
        display: grid;
        grid-template-columns: 20% 1fr 20%;
        grid-template-areas: ". middle-col .";
    }

    .c-single-col {
        grid-area: middle-col;
        grid-auto-rows: 1fr;
        /*height: 300px;*/
    }

    .c-dropdown{
        margin-top: 15px;
        height: 38px;
        width: 100%;

    }
    .c-dropdown__name{
        line-height: 38px;
    }
    .c-dropdown__name span{}

    /*.c-form__switch-label{*/
    /*padding: 0;*/
    /*}*/

</style>
