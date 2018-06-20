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
        <transition name="fade">
            <div class="success-info" v-if="showInfoAdd">
                <span>Atrybut został pomyślnie dodany!</span>
            </div>
        </transition>

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
                <div :class="{'c-dropdown js-dropdown' :true, 'c-dropdown js-dropdown is-opened': showOptions }"
                     @click="showOptions = !showOptions">
                                <span class="c-dropdown__name">
                                    {{attribute.type.name}}
                                    <span class="c-arrow-down"></span>
                                </span>

                    <ul class="c-dropdown__menu">
                        <li class="c-dropdown__menu-item" v-for="option in options">
                            <a href="" @click.prevent="attribute.type = option">
                                {{option.name}}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="component__row" v-if="attribute.type.type === 0">
                <custom-input label="Wartość domyślna" rules="" min-input-length="1"
                              v-model="attribute.defaultValue"></custom-input>
            </div>
            <div class="component__row checkbox__row" v-if="attribute.type.type === 1">
                <div class="c-form__switch">
                    <div class="c-form__switch-label checked__label">Domyślnie zaznaczony</div>

                    <div class="c-form__switch-control">
                        <input type="checkbox" id="checked" v-model="attribute.checked">
                        <label for="checked"></label>
                    </div>
                </div>
            </div>
            <div class="component__row select__row" v-if="attribute.type.type === 2">
                <custom-input label="Pole dla select" v-model="selectName" rules=""
                              min-input-length="1"></custom-input>
                <button class="icon__button" type="button" @click.stop="addOption"><i class="fa fa-plus"></i></button>
            </div>
            <div class="component__row select__row" v-for="(option, index) in attribute.selectOptions" v-if="attribute.type.type === 2">
                <custom-input label="Pole" v-model="option.name" rules=""
                              min-input-length="1"></custom-input>
                <button class="icon__button remove__button" type="button" @click="removeOption(index)"><i class="fa fa-times"></i></button>
            </div>
            <div class="component__row" v-if="attribute.type.type === 2 && attribute.selectOptions.length >0">
                <div :class="{'c-dropdown js-dropdown' :true, 'c-dropdown js-dropdown is-opened': showSelectDefaultValues }"
                     @click="showSelectDefaultValues = !showSelectDefaultValues">
                                <span class="c-dropdown__name">
                                    {{attribute.defaultValue.name}}
                                    <span class="c-arrow-down"></span>
                                </span>

                    <ul class="c-dropdown__menu">
                        <li class="c-dropdown__menu-item" v-for="option in attribute.selectOptions">
                            <a href="" @click.prevent="attribute.defaultValue = option">
                                {{option.name}}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="component__row">
                <textarea class="custom-textarea" rows="12" placeholder="Opis" v-model="attribute.description"></textarea>
            </div>
            <div class="component__row">
                <div class="h-center">
                    <button type="button" class="c-button c-form__button" @click="addAttribute()">
                        <span>Dodaj</span>
                    </button>
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
      showSelectDefaultValues: false,
      i: 0,

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
        this.i = this.i +1
        this.attribute.selectOptions.push({name: this.selectName, id: this.i})
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

            this.$store.commit('setAttributeInSet', tempAttr)

            // this.$emit('attribute', tempAttr)

            this.showInfoAdd = true

            this.attribute.name = ''
            this.attribute.type = {type: 0, name: 'Pole tekstowe'}
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

    .remove__button{
        color: red;
    }

    .success-info{
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
    .fade-enter, .fade-leave-to{
        opacity: 0;
    }


</style>
