<template>
  <div style="display: flex; justify-content: space-between;">
    <div style="width: 30%;">
      <div>
        <draggable :element="'ul'" :list="items" class="dragArea list-group lista-dziecko" :options="{group:{name: 'g1'}}">
          <li v-for="(item, key) in items" class="c-list">
            <div class="top-category attr-list-item" :class="{'attr-list-item active': index === key}">
              <input class="new-checkbox" type="checkbox"> {{item.name}}
                <div data-th="Akcja" class="h-relative">
                  <span class="c-actions-button js-actions-button" @click="showActions(key)">
                    <i></i>
                  </span>
                  <div :class="{'c-actions js-actions': true , 'c-actions js-actions is-active': index === key}">
                    <div class="c-actions__row">
                      <button class="c-actions__item" @click="deleteCategory(item)">Usuń</button>
                      <router-link :to="'edit/' + item.id" class="c-actions__item">Edytuj</router-link>
                      <router-link :to="'categories/list/duplicate/' +item.id" class="c-actions__item">Duplikuj</router-link>
                    </div>
                  </div>
                </div>
           
            </div>
            <drag class="list-item" v-if="item.children" :children="item.children" :item="item"></drag>
          </li>
        </draggable>
      </div>
    </div>
    <router-view @updateList="fetchItems"></router-view>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import drag from './Drag.vue'
  import AddCategory from './AddCategory'
  import EditCategory from './EditCategory'
  import DuplicateCategory from './DuplicateCategory'
  export default {
    name: "CategoriesList",
    // props: ['editingCategory', 'duplicatingCategory'],
    components: {
      draggable,
      drag,
    },
    data: function () {
      return {
        items: [],
        selectedCategory: '',
        justCreated: false,
        buttons: [],
        index: '',
        show : false,
        child: '',
      }
    },
    watch: {
      items: {
        handler () {
          if (this.justCreated) {
            axios.patch('categories/save-orders', {
              categories: this.items,
            }).then(result => {
              console.log(result.data)
            })
          } else {
            this.justCreated = true
          }
        },
        deep: true,
      },
    },

    methods: {
      fetchItems() {
      axios('categories')
        .then(result => this.items = result.data)
      },
      editChild(child){
       this.child = child
        this.$emit('child', this.child)
      },
      duplicateChild(child){
        this.child = child
        this.$emit('child', this.child)
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
      duplicateCategory (item) {
        this.$emit('duplCategory', item)
      },
      editCategory (item) {
        this.$emit('singleCategory', item)
      },
      deleteCategory (item) {
        this.$swal({
          title: 'Czy chcesz usunąć kategorie?',
          text: 'Ta akcja nieodwracalnie usunie kategorię',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          cancelButtonText: 'Anuluj',
          confirmButtonText: 'Usuń',
        }).then((result) => {
            if (result.value) {
              let itemIndex = this.items.map(x => x.id).indexOf(item.id)
              this.items.splice(itemIndex, 1)
              axios.delete('/categories/' + item.id)
              this.$swal({
                title: 'Usunięto!',
                text: 'Kategoria została usunięta',
                type: 'success',
                confirmButtonText: 'OK'
              })
            } else {
              this.$swal('Anulowane', 'Kategoria nie została usunięta', 'info')
            }
          },
          dismiss => {
          }).catch(this.$swal.noop)
      },

    },
    created: function () {
    this.fetchItems()
    },
  }
</script>

<style scoped>
    .categories-container {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-areas: 'categories-list' ;
    }
    .categories-list {
        grid-area: categories-list;
        height: auto;
    }
    .sortable-chosen {
        border: 1px #000000 dashed;
    }
    .list-container {
        border: 1px solid #f2f4f7;
        border-radius: 10px;
        background-color: #ffffff;
        padding: 10px;
        box-shadow: 5px 5px 5px 2px #eff1f4;
    }
    .attr-list-item {
        display: flex;
        /* justify-content: space-between; */
        flex-wrap: wrap;
        min-height: 40px;
        line-height: 40px;
        margin: 5px 0;
        text-align: left;
    }

    .top-category {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
    .active {
        background-color: #F3F4F8;
        border-radius: 5px;
    }
    .buttons-container {
        position: relative;
    }
    .more-button {
        height: 40px;
        border: none;
        color: #dde0e5;
        background-color: #ffffff;
        padding-bottom: 15px;
    }
    .dot {
        height: 6px;
        width: 6px;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
    }
    .active .top-category, .active .more-button{
        background-color: #F3F4F8;
        border-radius: 5px;
    }

</style>