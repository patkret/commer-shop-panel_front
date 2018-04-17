<template>
    <div class="categories-container">
        <div class="categories-list">
            <div class="list-container">
                <draggable :element="'ul'"
                           :list="items"
                           class="dragArea list-group lista-dziecko"
                           :options="{group:{name: 'g1'}}">
                    <li v-for="(item, key) in items" :class="{'attr-list-item': true, 'attr-list-item active': index === key}">
                        <div class="top-category">
                            <div>
                            {{item.name}}
                            </div>
                            <div class="buttons-container">
                                <button @click="showActions(key)" :class="{'more-button': true, 'more-button active': show === true && index === key}">
                                    <span class="dot"></span>
                                    <span class="dot"></span>
                                    <span class="dot"></span>
                                </button>
                                <div class="arrow-left"  v-if="index === key && show === true">
                                    <div class="action-buttons">
                                        <button @click="deleteCategory(item)" class="delete">Usuń</button>
                                        <button @click="editCategory(item)" class="edit">Edytuj</button>
                                        <button @click="duplicateCategory(item)" class="edit">Duplikuj</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                            <drag class="list-item" v-if="item.children" :children="item.children" :item="item" @singleCategory="editChild"></drag>
                    </li>
                </draggable>
            </div>
        </div>
    </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import drag from './Drag.vue'

  export default {
    name: "Categories",
    props: ['editingCategory'],
    components: {
      draggable,
      drag,
    },
    data () {
      return {
        items: [],
        selectedCategory: '',
        justCreated: false,
        buttons: [],
        index: '',
        show : false,
        child: ''
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
      editChild(child){
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
      editCategory (item) {
        this.$emit('singleCategory', item)
      },
      saveCategory () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            axios.post('/categories', {
              name: this.name,
              visibility: this.visibility,
              parent_id: this.selectedCategory.id,
            }).then(() => {
              this.$router.replace('/categories')
            })
          }
        });
      },
      deleteCategory (index) {
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
              this.items.splice(index, 1)
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
      duplicateCategory: function (item) {
        axios.post('/categories/' + item.id + '/duplicate').then(() => {
          console.log('duplicated')
        })
        axios('categories').
        then(result => {
          this.items = Object.values(result.data)
        })
      },
    },
    created: function () {
      axios('categories')
        .then(result => this.items = result.data)
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
        margin: 0px 50px 0 50px;
        border: 1px solid #f2f4f7;
        border-radius: 10px;
        background-color: #ffffff;
        padding: 30px;
        box-shadow: 5px 5px 5px 2px #eff1f4;
    }
    .attr-list-item {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 0px 0px 0px 10px;
        min-height: 40px;
        line-height: 40px;
        margin: 5px 0;
        text-align: left;
    }
    .top-category {
        display: flex;
        justify-content: space-between;
        width: 100%;
       padding: 10px;
    }
    .active {
        background-color: #F3F4F8;
        border-radius: 5px;
    }
    .attr-list-item p{
        margin: 0 0 0 10px;
        padding: 0;
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
    .action-buttons {
        position: absolute;
        top: -22px;
        left: -185px;
        display: flex;
        border: 1px solid #dde0e5;
        border-radius: 5px;
        z-index: -1;
    }
    .action-buttons button {
        background-color: #ffffff;
        height: 40px;
        border-radius: 5px;
        border: none;
        border-right: 1px solid #dde0e5;
    }
    .action-buttons button:first-child {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
    .action-buttons button:nth-child(2) {
        border-radius: 0;
    }
    .action-buttons button:last-child {
        border-right: none;
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
    }
    .action-buttons button:hover {
        cursor: pointer;
        background-color: #dde0e5;
    }
    .active .top-category, .active .more-button{
        background-color: #F3F4F8;
        border-radius: 5px;
    }
    .arrow-left{
        width: 0;
        height: 0;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-left:8px solid #FFFFFF;
        position: absolute;
        z-index: 20;
        top: 36%;
        right: 42px;
    }

</style>