<template>
    <!--<div>-->
    <!--<p v-if="info" class="attribute-alert"> Przynajmniej jeden atrybut musi być wybrany.</p>-->
    <!--<form class="attribute-form">-->

    <!--<div class="attributes-col">-->
    <!--<div class="attributes-row">-->
    <!--<div class="label-col">-->
    <!--<label>Nazwa</label>-->
    <!--</div>-->
    <!--<div class="input-col">-->
    <!--<div :class="{'attr-input': true,  'attr-input inpt-border': errors.has('name')}">-->
    <!--<input type="text" v-validate="'required'" :class="{'single-input': true, }"-->
    <!--placeholder="Nazwa..." name="name" v-model="name">-->
    <!--</div>-->
    <!--<span v-show="errors.has('name')" class="validator-help">{{ errors.first('name') }}</span>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="attributes-row">-->
    <!--<div class="label-col">-->
    <!--<label>Aktywność</label>-->
    <!--</div>-->
    <!--<div class="input-col">-->
    <!--<div class="checkbox-square">-->
    <!--<input class="visibility-hidden" type="checkbox" id="checkbox" v-model="visibility">-->
    <!--<label for="checkbox" class="square"></label>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="attributes-row">-->
    <!--<div class="label-col">-->
    <!--<label></label>-->
    <!--</div>-->
    <!--<div class="input-col">-->
    <!--<button class="custom-button" @click.prevent="saveAttributeSet">ZAPISZ</button>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</form>-->
    <!--<div class="top-menu-container">-->
    <!--<div class="top-menu">-->
    <!--<ul class="top-menu-items">-->
    <!--<li @click="changeType(1)" :class="{'top-menu-item': true, 'top-menu-item-active': type === 1}">-->
    <!--Kategorie dla zestawu-->
    <!--</li>-->
    <!--<li @click="changeType(2)" :class="{'top-menu-item': true, 'top-menu-item-active': type === 2}">Dodaj-->
    <!--atrybut-->
    <!--</li>-->
    <!--<li @click="changeType(3)" :class="{'top-menu-item': true, 'top-menu-item-active': type === 3}">-->
    <!--Wybrane atrybuty-->
    <!--</li>-->
    <!--<li v-if="type === 4" :class="{'top-menu-item': true, 'top-menu-item-active': type === 4}">-->
    <!--Edycja atrybutu-->
    <!--</li>-->
    <!--</ul>-->
    <!--</div>-->
    <!--<div class="menu-tab">-->
    <!--<categories-list v-if="type == 1" @mainCategories="getMainCategories"-->
    <!--@children="getChildren"></categories-list>-->
    <!--<add-attribute v-if="type == 2" @attribute="getAttribute"></add-attribute>-->
    <!--<attributes-list v-if="type == 3" :attributes="attributes"-->
    <!--@singleAttribute="editAttribute"></attributes-list>-->
    <!--<edit-attribute v-if="type == 4" :singleAttribute="attribute" @attribute="updateAttribute"></edit-attribute>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <div class="l-wrapper f-center">
        <div style="width: 100%;" class="f-content">
            <form action="" class="c-form" @submit.prevent="saveAttributeSet">
                <div class="c-form__row-wrapper">
                    <div class="c-form__row-content">
                        <div class="c-form__fieldset">
                            <div class="c-form__field-wrapper">
                                <custom-input :label="'Nazwa'" rules="required" :minInputLength="3" v-model="name"/>
                            </div>
                        </div>
                        <div class="c-form__fieldset">
                            <div class="c-form__switch">
                                <div class="c-form__switch-label">Aktywność</div>

                                <div class="c-form__switch-control">
                                    <input type="checkbox" id="visibility" v-model="visibility">
                                    <label for="visibility"></label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="c-form__two-column">
                    <div class="c-form__side-menu">
                        <ul>
                            <li>
                                <router-link :to="'categories'">Kategorie</router-link>
                            </li>
                            <li>
                                <router-link :to="'attribute-add'">Dodaj atrybut</router-link>
                            </li>
                            <li><router-link :to="'attributes'">Wszystkie atrybuty</router-link></li>
                        </ul>
                    </div>
                    <div class="c-form__cont">
                        <router-view></router-view>
                    </div>
                </div>


                <div class="h-center">
                    <button type="submit" class="c-button c-form__button">
                        <span>Zapisz</span>
                    </button>
                </div>

            </form>

        </div>
    </div>
</template>

<script>

  export default {
    name: 'attribute-set-form',
    data: () => ({
      name: '',
      visibility: 1,
      type: 1,
      defaultValue: '',
      attributes: [],
      defaultCategories: '',
      mainCategories: '',
      children: '',
      attribute: '',
      indexOfAttribute: '',
      info: false,

    }),

    watch: {
      indexOfAttribute () {
        this.type = 4
      },
    },

    methods: {

      changeType: function (type) {
        this.type = type
      },
      getAttribute (attribute) {
        this.attributes.push(attribute)

        setTimeout(() => {
          this.type = 3
        }, 2000)
      },
      getMainCategories (mainCategories) {
        this.mainCategories = mainCategories
      },
      getChildren (children) {
        this.children = children
      },
      editAttribute (attribute, key) {
        this.attribute = attribute
        this.indexOfAttribute = key
        this.type = 4
      },
      updateAttribute (attribute, key) {
        this.attributes[key] = attribute
        this.indexOfAttribute = ''
      },
      saveAttributeSet () {
        this.$validator.validateAll().then((result) => {
          if (this.attributes.length === 0) {
            this.info = !this.info
          }
          else if (result) {
            axios.post('/attribute-sets', {
              name: this.name,
              visibility: this.visibility,
              attributes: JSON.stringify(this.attributes),
              defaultCategoriesIds: this.mainCategories.concat(this.children),
            }).then(() => {
              this.$parent.$data.type = 2
            })
          }
        })

      },
    },
  }
</script>
<style scoped>

    .l-wrapper {
        padding: 50px 0 50px 0;
    }

    .f-center {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-areas: "form-content";
    }

    .c-form__row-wrapper {
        display: grid;
        grid-template-columns: 28% 1fr 28%;
        height: 180px;
        grid-template-areas: ". row-content .";
    }

    .c-form__row-content {
        grid-area: row-content;
    }

    .c-form__two-column {
        display: grid;
        grid-template-columns: 3fr 9fr;
        width: 100%;
        border-top: 1px solid #dddddd;
        border-bottom: 1px solid #dddddd;
    }

    .c-form__side-menu {
        border-right: 1px solid #dddddd;
        font-size: 1rem;
        padding-top: 50px;
    }

    .c-form__side-menu ul {
        margin-left: 40px;
    }

    .c-form__side-menu ul li {
        padding: 0 30px 50px 30px;
    }

    .c-form__cont {
        padding: 50px;
    }

</style>