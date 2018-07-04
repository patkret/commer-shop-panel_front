<template>
    <div class="attr-container">
        <ul class="attr-list">
            <li v-for="(item, key) in variants" class="attr-list-item">
                {{item.id}} {{item.name}}
                <div class="h-relative">
                       <span class="c-actions-button js-actions-button" @click="showActions(key)">
                                            <i></i>
                                        </span>
                    <div :class="{'c-actions js-actions': true , 'is-active': index === key}">
                        <div class="c-actions__row">
                            <button class="c-actions__item" type="button" @click="deleteVariant(key)">Usuń</button>
                            <router-link :to="'variant-edit/' + key" class="c-actions__item" tag="button" @click.native="setActiveRoute(key)">Edytuj</router-link>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: 'all-variants',
    data: () => ({
      index:'',
      show: false,
      variants: []
    }),

    methods: {
      showActions (key) {
        if (this.index === key) {
          this.show = false
          this.index = ''
        }
        else {
          this.show = true
          this.index = key
        }
      },
      setActiveRoute(item){
        if(this.$route.params.id){
          this.$parent.setActiveRoute(`variants/edit/${this.$route.params.id}/variant-edit/${item}`)
        }
        else{
          this.$parent.setActiveRoute('variants/add/variant-edit/' + item)
        }

      },
      deleteVariant(id){
        this.$store.commit('removeVariant', id)
      }
    },

    created() {
      this.variants = this.$store.getters.getVariants
    }

  }
</script>

<style scoped>
    .attr-container{
        margin: -50px;
    }
    .attr-list-item{
        width: 100%;
        height: 60px;
        border-bottom: 1px solid #dddddd;
        display: grid;
        grid-template-columns: 90% 10%;
        align-items: center;
        padding-left: 35px;
        font-size: 0.8rem;
    }

    .f-content .c-form__cont{
        margin: 0;
        padding: 0;
    }
    .c-actions{
        top: -12px;
        left: -15px;
    }
</style>