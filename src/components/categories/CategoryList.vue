<template>
    <div class="categories-container">
        <div class="categories-list">
            <div class="list-container">
                <draggable :element="'ul'"
                           :list="items"
                           class="dragArea list-group"
                           :options="{group:{name: 'g1'}}">
                    <li class="categories-list-item" v-for="(item, key) in items">
                        <img class="categories-list-img lvlUp" src="../../assets/img/icons/list-plus.png" alt="plusik">
                        {{item.name}}
                        <div class="buttons-container">
                            <div v-if="showButtons[key]" class="action-buttons">
                                <button class="delete" @click="deleteCategory(item)">Usuń</button>
                                <button class="edit" @click = "editAttributeSet(item)">Edytuj</button>
                                <button class="edit" @click = "editAttributeSet(item)">Duplikuj</button>
                            </div>
                            <button @click="showActions(key)" class="more-button">
                                <span class="dot"></span>
                                <span class="dot"></span>
                                <span class="dot"></span>
                            </button>
                        </div>
                            <drag class="list-item" v-if="item.children" :children="item.children" :item="item"></drag>
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
    components: {
      draggable,
      drag,
    },
    data () {
      return {
        name: '',
        description: '',
        title: '',
        metaDescription: '',
        metaKeywords: '',
        addressUrl: '',
        items: [],
        selectedCategory: '',
        justCreated: false,
        showButtons: {},
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
      showActions (key){
        this.showButtons[key] = !this.showButtons[key]
        this.$forceUpdate()
      },
      editCategory(id){
        let category = this.items.find(item => item.id === id)
        this.name = category.name
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
      deleteCategory(item){
        axios.delete('categories/' + item.id).then(result => {
          axios('categories').
          then(result => {
            this.items = result.data
          });
        })
      },


    },
    created: function () {
      axios('categories')
        .then(result => this.items = result.data)
      this.items.forEach((v,k) => {
        this.underCategories[k] = false
      })
    },
  }
</script>

<style scoped>
    .lvlUp {
        z-index: 10;
    }
    .categories-container {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-areas: 'categories-list' ;
    }
    .categories-list {
        grid-area: categories-list;
    }
    .sortable-chosen {
        border: 1px #000000 dashed;
    }
    .categories-list-item {
        margin: 10px 0;
    }
    .categories-list-img {
        padding-bottom: 3px;
        margin-right: 5px;
    }
    .list-item {
        margin: 10px 0;

    }
    .list-container {
        margin: 0px 50px 0 50px;
        border: 1px solid #f2f4f7;
        border-radius: 10px;
        background-color: #ffffff;
        padding: 30px;
        box-shadow: 5px 5px 5px 2px #eff1f4;
    }
   .buttons-container {
       /*display: none;*/
       display: flex;
       float: right;
   }
    .more-button {
        height: 5px;
        border: none;
        color: #dde0e5;
        background-color: #ffffff;
    }
    .dot {
        height: 6px;
        width: 6px;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
        margin-bottom: 7px;
    }
    .action-buttons {
        left: -120px;
        margin-bottom: 5px;
        display: flex;
        border: 1px solid #dde0e5;
        border-radius: 5px;
    }
    .action-buttons button {
        background-color: #ffffff;
        height: 20px;
        border-radius: 5px;
        border: none;
    }
    .action-buttons button {
        border-right: 1px solid #dde0e5;
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
</style>