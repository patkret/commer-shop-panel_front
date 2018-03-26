<template>
    <div>
        <form class="attribute-form" >
            <div class="attributes-col">
                <div class="attributes-row">
                    <div class="label-col">
                        <label>Nazwa</label>
                    </div>
                    <div class="input-col">
                        <div :class="{'attr-input': true,  'attr-input inpt-border': errors.has('name')}">
                            <input type="text" v-validate="'required'" :class="{'single-input': true, }" placeholder="Nazwa..." name="name" v-model="name">
                        </div>
                        <span v-show="errors.has('name')" class="validator-help">{{ errors.first('name') }}</span>
                    </div>
                </div>
                <div class="attributes-row">
                    <div class="label-col">
                        <label>Aktywność</label>
                    </div>
                    <div class="input-col">
                        <div class="checkbox-square">
                            <input class="visibility-hidden" type="checkbox" id="checkbox" v-model="visibility">
                            <label for="checkbox" class="square"></label>
                        </div>
                    </div>
                </div>
                <div class="attributes-row">
                    <div class="label-col">
                        <label></label>
                    </div>
                    <div class="input-col">
                        <button class="custom-button" @click.prevent="saveAttributeSet">ZAPISZ</button>
                    </div>
                </div>
            </div>
        </form>
        <div class="top-menu-container">
            <div class="top-menu">
                <ul class="top-menu-items">
                   <li @click="changeType(1)">Kategorie dla atrybutu</li>
                   <li @click="changeType(2)">Dodaj atrybut</li>
                   <li @click="changeType(3)">Wybrane atrybuty</li>
                </ul>
            </div>
            <div class="menu-tab">
                <categories-list v-if="type == 1" @mainCategories="getMainCategories" @children="getChildren"></categories-list>
                <add-attribute v-if="type == 2" @attribute ="getAttribute"></add-attribute>
                <attributes-list v-if="type == 3" :attributes="attributes"></attributes-list>
            </div>
        </div>
    </div>
</template>

<script>
  import addAttribute from './addAttribute'
  import CategoriesList from './CategoriesList'
  import attributesList from './attributesList'
  export default {
    name: 'attribute-set-form',
    components: {
      CategoriesList,
      addAttribute,
      attributesList
    },
    data: () => ({
      name: '',
      visibility: 1,
      type: 1,
      defaultValue: '',
      attributes: [],
      defaultCategories: '',
      mainCategories: '',
      children: ''
    }),

    methods:{
      changeType: function(type){
        this.type = type;
      },
      getAttribute(attribute){
       this.attributes.push(attribute)
      },
      getMainCategories(mainCategories){
        this.mainCategories = mainCategories
      },
      getChildren(children){
        this.children = children
      },
      saveAttributeSet(){
        this.$validator.validateAll().then((result) => {
          if (result) {
            axios.post('/attribute-sets', {
              name: this.name,
              visibility: this.visibility,
              attributes: JSON.stringify(this.attributes),
              defaultCategoriesIds: this.mainCategories.concat(this.children)
            }).then(() => {
              this.$parent.$data.type = 2
            })
          }
        })

      }
    }
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

    .custom-button{
        margin: 0;
    }

    .top-menu-container{
        display: grid;
        grid-template-columns: 90% 10%;
        grid-template-rows: 20% 60px 80%;
        grid-template-areas: "top-menu ."
        ". .  "
        "menu-tab . ";
        margin-top: 20px;

    }
    .top-menu{
        grid-area: top-menu;
        border-bottom: 1px solid #E5E7ED;
        height: 60px;
        justify-items: start;
    }

    .top-menu-items{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        padding: 0;
    }

    .top-menu-items li{
        margin-right: 60px;
        cursor: pointer;
    }

    .menu-tab{
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




</style>