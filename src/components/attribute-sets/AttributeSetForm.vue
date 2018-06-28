<template>
    <div class="l-wrapper f-center">
        <transition name="fade">
            <div class="err-info" v-if="info">
                <span>Dodaj atrybut aby zapisać zestaw!</span>
            </div>
        </transition>

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
                        <template v-if="!ifEdit">
                            <ul>
                                <li v-for="link in addTabs" @click="setActiveRoute(link.path)">
                                    <router-link :to="{name: link.componentName}"
                                                 :class="{'link': true, 'link item__is-active': activeRoute === link.path}">
                                        {{link.name}}
                                    </router-link>
                                </li>
                                <li v-if="activeRoute === 'attribute-sets/add/attribute-edit'">
                                <span :class="{'link': true, 'link item__is-active': activeRoute === 'attribute-sets/add/attribute-edit' }"
                                >Edytuj atrybut
                                </span>
                                </li>
                            </ul>
                        </template>
                        <template v-if="ifEdit">
                            <ul>
                                <li v-for="link in editTabs" @click="setActiveRoute(link.path)">
                                    <router-link :to="{name: link.componentName}"
                                                 :class="{'link': true, 'link item__is-active': activeRoute === link.path}"
                                    >{{link.name}}
                                    </router-link>
                                </li>
                                <li v-if="activeRoute === `attribute-sets/edit/${attributeSet.id}/attribute-edit`">
                                <span :class="{'link': true, 'link item__is-active': activeRoute === 'attribute-sets/add/attribute-edit' }"
                                >Edytuj atrybut
                                </span>
                                </li>
                            </ul>
                        </template>

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
    computed: {
      attributeSet () {
        return this.$store.getters.getAttributeSet
      },
      attributes: function () {
        return this.$store.getters.getAttributesInSet
      },
      defaultCategoriesIds: function () {
        return this.$store.getters.getAttributeSetDefaultCategories
      },
    },
    data: () => ({
      name: '',
      visibility: 1,
      info: false,
      activeRoute: '',
      ifEdit: '',
      addTabs: [
        {name: 'Kategorie', path: '/attribute-sets/add/categories', componentName: 'AttributesCategoriesList'},
        {name: 'Dodaj atrybut', path: '/attribute-sets/add/attribute-add', componentName: 'addAttribute'},
        {name: 'Wszystkie atrybuty', path: '/attribute-sets/add/attributes', componentName: 'attributesList'},
      ],
      editTabs: [
        {name: 'Kategorie', path: `/attribute-sets/edit/:item/categories`, componentName: 'AttributesCategoriesListEdit'},
        {name: 'Dodaj atrybut', path: '/attribute-sets/edit/:item/attribute-add', componentName: 'addAttributeEdit'},
        {name: 'Wszystkie atrybuty', path: '/attribute-sets/edit/:item/attributes', componentName: 'attributesListEdit'},
      ],

    }),
    watch: {
      attributeSet (data) {
        this.name = data.name
        this.visibility = data.visibility
      },
    },

    methods: {
      checkIfEdit() {
        this.$route.params.item ? this.ifEdit = true : this.ifEdit = false
      },
      setActiveRoute (route) {
        this.ifEdit ? this.activeRoute = '/attribute-sets/edit/:item/categories' : this.activeRoute = route
        // this.activeRoute = route
      },
      getAttributeSetToEdit () {
        this.ifEdit ? this.$store.dispatch('fetchAttributeSet', this.$route.params.item) : ''
        // if (this.ifEdit) {
        //   this.$store.dispatch('fetchAttributeSet', this.$route.params.item)
        // }
      },
      clearFormData () {
        this.$store.commit('clearSelectedCategories')
        this.$store.commit('clearAttributesInSet')
      },
      saveAttributeSet () {
        this.$validator.validateAll().then((result) => {
          if (this.attributes.length === 0) {
            this.info = true
            setTimeout(() => {
              this.info = false
            }, 3000)
          }
          else if(result) {
            if(!this.ifEdit){
              axios.post('/attribute-sets', {
                name: this.name,
                visibility: this.visibility,
                attributes: JSON.stringify(this.attributes),
                defaultCategoriesIds: this.defaultCategoriesIds,
              }).then(() => {
                this.$router.push('/attribute-sets/list')
                this.clearFormData()
              })
            }
            else{
              axios.put(`/attribute-sets/${this.attributeSet.id}`, {
                name: this.name,
                visibility: this.visibility,
                attributes: JSON.stringify(this.attributes),
                defaultCategoriesIds: this.defaultCategoriesIds,
              }).then(() => {
                this.$router.push('/attribute-sets/list')
                this.clearFormData()
              })
            }

          }
        })

      },
    },

    created: function () {
      this.checkIfEdit()
      this.setActiveRoute(this.$route.path)
      this.getAttributeSetToEdit()
    },

    destroyed () {
      this.$store.commit('clearSelectedCategories')
      this.$store.commit('clearAttributesInSet')
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

    .item__is-active {
        border-bottom: 4px solid #2595ec;

    }

    .link {
        padding-bottom: 15px;
        cursor: pointer;
        white-space: nowrap;
    }

    .err-info {
        position: absolute;
        font-size: 0.9rem;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        top: 100px;
        left: 350px;
        width: 79vw;
        background-color: red;
        color: #ffffff;
        padding: 20px;
        border-radius: 3px;
    }

</style>