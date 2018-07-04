<template>
    <div class="l-wrapper f-center">
        <!--<transition name="fade">-->
        <!--<div class="err-info" v-if="info">-->
        <!--<span>Dodaj atrybut aby zapisać zestaw!</span>-->
        <!--</div>-->
        <!--</transition>-->

        <div style="width: 100%;" class="f-content">
            <form action="" class="c-form" @submit.prevent="saveVariantSet">
                <div class="c-form__row-wrapper">
                    <div class="c-form__row-content">
                        <div class="c-form__fieldset">
                            <div class="c-form__field-wrapper">
                                <custom-input :label="'Nazwa'" rules="required" :minInputLength="3"
                                              v-model="variantSet.name"/>
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
                                <li v-if="activeRoute === `variants/add/variant-edit/${$route.params.item}`">
                                <span class="link item__is-active"
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
                                <li v-if="activeRoute === `variants/edit/${variantSet.id}/variant-edit/${$route.params.item}`">
                                <span class="link item__is-active"
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

    name: 'variant-set-form',
    data: () => ({
      ifEdit: false,
      activeRoute: '',
      addTabs: [
        {name: 'Dodaj wariant', path: '/variants/add/variant-add', componentName: 'addVariant'},
        {name: 'Wszystkie warianty', path: '/variants/add/all-variants', componentName: 'allVariants'},
      ],
      editTabs: [
        {name: 'Dodaj wariant', path: '/variants/edit/:id/variant-add', componentName: 'addVariantEdit'},
        {name: 'Wszystkie warianty', path: '/variants/edit/:id/all-variants', componentName: 'allVariantsEdit'},
      ],

    }),
    computed: {
      variantSet: function () {
        return this.$store.getters.getVariantSet
      },
      variants: function () {
        return this.$store.getters.getVariants
      },
    },
    methods: {

      checkIfEdit () {
        if (this.$route.params.id) {
          this.setActiveRoute('/variants/edit/:id/variant-add')
          this.ifEdit = true
          this.$store.dispatch('fetchVariantSet', this.$route.params.id)
        }
      },
      setName () {
        if (this.$route.params.id) {
          this.name = this.$store.state.variantSets.variantSet.name
        }
      },

      saveVariantSet () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            if (this.ifEdit) {
              axios.put('/variant-groups/' + this.variantSet.id, {
                name: this.variantSet.name,
                variants: JSON.stringify(this.variants),
              }).then(() => {
                this.$router.push('/variants/list')
              })
            }
            else {
              axios.post('/variant-groups', {
                name: this.variantSet.name,
                variants: JSON.stringify(this.variants),
              }).then(() => {
                this.$router.push('/variants/list')
              })
            }
          }
        })

      },

      setActiveRoute (path) {
        this.activeRoute = path
      },
    },
    beforeCreate: function () {

    },

    created: function () {
      this.setActiveRoute(this.$route.path)
      this.checkIfEdit()
    },
    mounted: function () {
      this.setName()
    },

    destroyed: function () {
      this.$store.commit('clearForm')
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