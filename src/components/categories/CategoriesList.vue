<template>
  <div style="display: flex; justify-content: space-between;">
    <div class="categories-list">
        <draggable :element="'ul'" :list="items" class="" :options="{group:{name: 'g1'}}">
          <li v-for="(item, key) in items" class="c-list">
            <div class="top-category attr-list-item" :class="{'attr-list-item active': index === key}">
              <input class="new-checkbox categories-checkbox" type="checkbox"> {{item.name}}
                <div data-th="Akcja" class="h-relative">
                  <span class="c-actions-button js-actions-button" @click="showActions(key)">
                    <i></i>
                  </span>
                  <div :class="{'c-actions js-actions': true , 'c-actions js-actions is-active': index === key}">
                    <div class="c-actions__row">
                      <button class="c-actions__item" @click="deleteCategory(item)">Usuń</button>
                      <router-link :to="'list/edit/'+item.id" class="c-actions__item">Edytuj</router-link>
                      <router-link :to="'list/duplicate/'+item.id" class="c-actions__item">Duplikuj</router-link>
                    </div>
                  </div>
                </div>
           
            </div>
            <drag class="list-item" v-if="item.children" :children="item.children" :item="item"></drag>
          </li>
        </draggable>
      
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
      // editChild(child){
      //  this.child = child
      //   this.$emit('child', this.child)
      // },
      // duplicateChild(child){
      //   this.child = child
      //   this.$emit('child', this.child)
      // },
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
      // duplicateCategory (item) {
      //   this.$emit('duplCategory', item)
      // },
      // editCategory (item) {
      //   this.$emit('singleCategory', item)
      // },
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
.categories-list {
  width: 40%;
  background-color: #ffffff;
  padding: 20px 40px;
  font-size: 14px;
}
.categories-checkbox {
  margin-top: 15px;
  margin-left: 50px;
}
.sortable-chosen {
  border: 1px #4817b9 dashed;
}

.attr-list-item {
  display: flex;
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


</style>