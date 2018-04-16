<template>
    <div>
        <form class="attribute-form">
            <div class="attributes-col">
                <div class="attributes-row">
                    <div class="label-col">
                        <label>Nazwa</label>
                    </div>
                    <div class="input-col">
                        <div :class="{'attr-input': true,  'attr-input inpt-border': errors.has('name')}">
                            <input type="text" v-validate="'required'" :class="{'single-input': true, }"
                                   placeholder="Nazwa..." name="name" v-model="name">
                        </div>
                        <span v-show="errors.has('name')" class="validator-help">{{ errors.first('name') }}</span>
                    </div>
                </div>
                <div class="attributes-row">
                    <div class="label-col">
                        <label></label>
                    </div>
                    <div class="input-col">
                        <button class="custom-button" @click.prevent="saveVariantSet">ZAPISZ</button>
                    </div>
                </div>
            </div>
        </form>
        <div class="top-menu-container">
            <div class="top-menu">
                <ul class="top-menu-items">

                    <li @click="changeType(1)" :class="{'top-menu-item': true, 'top-menu-item-active': type == 1}">Dodaj
                        cechę
                    </li>
                    <li @click="changeType(2)" :class="{'top-menu-item': true, 'top-menu-item-active': type == 2}">
                        Wybrane cechy
                    </li>
                    <li v-if="type == 3" :class="{'top-menu-item': true, 'top-menu-item-active': type == 3}">
                        Edycja cechy
                    </li>
                </ul>
            </div>
            <div class="menu-tab">
                <add-variant v-if="type == 1" @variant=getVariant></add-variant>
                <variants-list v-if="type == 2" :variants="variants" @singleVariant="editVariant"></variants-list>
                <edit-variant v-if="type == 3" :singleVariant="variant" @variant="updateVariant"></edit-variant>

            </div>
        </div>
    </div>
</template>

<script>
  import addVariant from './addVariant'
  import VariantsList from './VariantsList'
  import editVariant from './editVariant'

  export default {
    props: ['set', 'side_type'],
    components: {
      VariantsList,
      addVariant,
      editVariant,
    },
    name: 'variant-set-form',
    data: () => ({
      name: '',
      visibility: 1,
      type: 1,
      variants: [],
      indexOfVariant: '',
      variant: '',

    }),

    watch: {
      indexOfVariant () {
        this.type = 3
      },
      side_type () {
        this.name = ''
        setTimeout(() => {
          this.errors.clear()
        }, 1)

        this.variants = []
      },
    },

    methods: {

      changeType: function (type) {
        this.type = type
      },
      getVariant (variant) {
        if(variant.required === 1){
          this.variants.unshift(variant)
        }
        else{
          this.variants.push(variant)
        }

        setTimeout(() => {
          this.type = 2
        }, 2000)
      },
      editVariant (variant, key) {
        this.variant = variant
        this.indexOfVariant = key
        this.type = 3
      },
      updateVariant (variant) {
        this.variants[this.indexOfVariant] = variant
        this.indexOfAttribute = ''
      },
      saveVariantSet () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            if (this.set) {
              axios.put('/variant-groups/' + this.set.id, {
                name: this.name,
                variants: JSON.stringify(this.variants),
              }).then(() => {
                this.$parent.$data.type = 2
              })
            }
            else {
              axios.post('/variant-groups', {
                name: this.name,
                variants: JSON.stringify(this.variants),
              }).then(() => {
                this.$parent.$data.type = 2
              })
            }

          }
        })

      },
    },

    created: function () {
      if (this.set) {
        this.name = this.set.name
        this.variants = JSON.parse(this.set.variants)
      }

    },
  }
</script>

<style scoped>
    .attribute-form {
        display: grid;
        grid-template-columns: 5% auto 25%;
        grid-template-areas: ". attributes-col .";
        margin-top: 20px;
    }

    .attributes-col {
        grid-area: attributes-col;
    }

    .attributes-row {
        display: grid;
        height: 50px;
        grid-template-columns: 20% 20px 80%;
        grid-template-areas: " attr-label . input-col . ";
        margin-bottom: 20px;
    }

    .label-col {
        grid-area: attr-label;
        justify-self: end;
        align-self: center;
    }

    .input-col {
        grid-area: input-col;
        align-self: center;
    }

    .attr-input {

        height: 40px;
        border-radius: 5px;
        background-color: #FFFFFF;
        display: flex;
        align-items: center;
    }

    .single-input {
        border: none;
        width: 100%;
        margin-left: 15px;
    }

    .checkbox-square {
        margin-left: -12px;
    }

    .custom-button {
        margin: 0;
    }

    .top-menu-container {
        display: grid;
        grid-template-columns: 90% 10%;
        grid-template-rows: 20% 60px 80%;
        grid-template-areas: "top-menu ." ". .  " "menu-tab . ";
        margin-top: 20px;

    }

    .top-menu {
        grid-area: top-menu;
        border-bottom: 1px solid #E5E7ED;
        height: 60px;
        justify-items: start;

    }

    .top-menu-items {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        padding: 0;

    }

    .top-menu-item {
        text-wrap: none;
        margin-right: 60px;
        cursor: pointer;
    }

    .menu-tab {
        grid-area: menu-tab;

    }

    .validator-help {
        background-color: red;
        border-radius: 5px;
        color: #fff;
        padding: 10px 0 10px 10px;
        font-size: 12px;
        font-weight: 700;
        border-top-right-radius: 0;
        border-top-left-radius: 0;
    }

    .input-col {
        display: flex;
        flex-direction: column;
    }

    .inpt-border {
        border: 1px solid red;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }
    .top-menu-item-active {
        border-bottom: 2px solid #2595ec;
        padding-bottom: 25px;
    }
</style>