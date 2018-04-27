<template>
    <draggable :element="'ul'" :list="children" class="dragArea list-group" :options="{group:{ name:'g1'}}">
        <li class="list-item" :key="key" v-for="(el, key) in children">
            <div :class="{'drag-undercategory': true, 'drag-undercategory active': index === key}">
                <p class="list-item-p">{{el.name}}</p>
                <div class="buttons-container">
                    <button @click="showActions(key)"
                            :class="{'more-button': true, 'more-button active': show === true && index === key}">
                        <span class="dot"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                    </button>
                    <div class="arrow-left" v-if="index === key && show === true">
                        <div class="action-buttons">
                            <button @click="deleteCategory(el)" class="delete">Usuń</button>
                            <button @click="editCategory(el)" class="edit">Edytuj</button>
                            <button @click="duplicateCategory(el)" class="duplicate">Duplikuj</button>
                        </div>
                    </div>
                </div>
            </div>
            <drag class="list-item-drag" v-if="el.children" :children="el.children" :item="el" @duplCategory="duplicateCategory" @singleCategory="editCategory" ></drag>
        </li>
    </draggable>
</template>

<script>
  import draggable from 'vuedraggable'

  export default {
    name: "drag",
    props: ['children', 'item', 'category'],
    data() {
      return {
        buttons: [],
        index: '',
        show: false,
        items: [],
        justCreated: false,
      }
    },
    components: {
      draggable,
    },
    watch: {
      children: {
        handler () {
          if (this.justCreated) {
            axios.patch('categories/save-orders', {
              categories: this.children,
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
      showActions(key) {
        if (this.index === key) {
          this.show = false
          this.index = ''
        }
        else {
          this.show = true
          this.index = key
        }
      },
      deleteCategory (el) {
        this.$swal({
          title: 'Czy chcesz usunąć kategorie?',
          text: 'Ta akcja nieodwracalnie usunie kategorię i wszystkie jej kategorie.',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          cancelButtonText: 'Anuluj',
          confirmButtonText: 'Usuń',
        }).then((result) => {
            if (result.value) {
              let itemIndex = this.children.map(x => x.id).indexOf(el.id)
              this.children.splice(itemIndex, 1)
              axios.delete('categories/' + el.id)
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
      editCategory(el) {
        this.$emit('singleCategory', el)
      },
      duplicateCategory(el) {
        this.$emit('duplCategory', el)
      },
    },


  }
</script>

<style scoped>
    .sortable-chosen {
        border: 1px #000000 dashed;
    }
    .drag-undercategory {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        width: 100%;
        padding: 10px 0 10px 10px;

    }

    .list-item {
        display: flex;
        justify-content: space-between;
        width: 100%;
        flex-wrap: wrap;
    }

    .list-item-drag {
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        min-height: 40px;
        height: auto;
    }
    .list-group {
        padding-left: 10px;
    }

    .attr-list-item p {
        margin: 0 0 0 0px;
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

    .active {
        background-color: #F3F4F8;
        border-radius: 5px;
    }

    .arrow-left {
        width: 0;
        height: 0;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-left: 8px solid #FFFFFF;
        position: absolute;
        z-index: 20;
        top: 36%;
        right: 42px;
    }
</style>