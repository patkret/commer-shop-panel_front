
<template>
    <div class="attr-container">
        <ul class="attr-list">
            <li v-for="(item, key) in attributes" class="attr-list-item">
                {{item.id}} {{item.name}}
                <div class="h-relative">
                       <span class="c-actions-button js-actions-button" @click="showActions(key)">
                                            <i></i>
                                        </span>
                    <div :class="{'c-actions js-actions': true , 'is-active': index === key}">
                        <div class="c-actions__row">
                            <button class="c-actions__item" type="button" @click="deleteAttribute(key)">Usuń</button>
                            <router-link :to="'attribute-edit/' + key" class="c-actions__item" tag="button" @click.native="setActiveRoute(item)">Edytuj</router-link>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: 'attributes-list',
    data () {
      return {
        index:'',
        show: false,
      }
    },

    computed: {
      attributes: function () {
        return this.$store.getters.getAttributesInSet
      }
    },
    methods: {
      setActiveRoute(item){
        this.$parent.activeRoute = 'attribute-sets/add/attribute-edit'
      },
      showActions (key) {
        if(this.index === key){
          this.show = false
          this.index = ''
        }
        else{
          this.show = true
          this.index = key
        }
      },
      deleteAttribute (index) {
        this.$swal({
          title: 'Czy chcesz usunąć atrybut?',
          text: 'Ta akcja nieodwracalnie usunie atrybut',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          cancelButtonText: 'Anuluj',
          confirmButtonText: 'Usuń',
        }).then((result) => {
            if (result.value) {
              this.attributes.splice(index, 1)
              this.$swal({
                title: 'Usunięto!',
                text: 'Atrybut został usunięty',
                type: 'success',
                confirmButtonText: 'OK'
              })
            } else {
              this.$swal('Anulowane', 'Atrybut nie został usunięty', 'info')
            }
          },
          dismiss => {
          }).catch(this.$swal.noop)
      },
      editAttribute(item, key){
        this.$emit('singleAttribute', item, key)
      }
    },
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