<template>
    <draggable :element="'ul'" :list="children" class="dragArea list-group" :options="{group:{ name:'g1'}}">
        <li :key="key" v-for="(el, key) in children" class="drag-undercategory">
            {{el.name}}
            <div class="buttons-container">
                <div v-if="showButtons[key]"  class="action-buttons">
                    <button  class="delete" @click="deleteCategory(el)">Usuń</button>
                    <button class="edit" @click = "editAttributeSet(item)">Edytuj</button>
                    <button class="edit" @click = "editAttributeSet(item)">Duplikuj</button>
                </div>
                <button @click="showActions(key)" class="more-button">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </button>
            </div>
                <drag class="list-item" v-if="el.children" :children="el.children" :item="el"></drag>
        </li>
    </draggable>
</template>

<script>
    import draggable from 'vuedraggable'
  export default {
    name: "drag",
    props: ['children', 'item'],
    data () {
      return {
      showButtons: {},
      }
    },
    components: {
      draggable
    },
    methods: {
      showActions (key){
        this.showButtons[key] = !this.showButtons[key]
        this.$forceUpdate()
      },
      deleteCategory(item){
        axios.delete('categories/' + item.id).then(result => {
          let index = this.children.indexOf(this.children.find(el => el.id == item.id))
          this.children.splice(index, 1)

        })
      },
    },
  }
</script>

<style scoped>
.drag-undercategory {
    margin: 20px 0;
}
.categories-list-item {
    margin: 10px 0;
}
.buttons-container {
    display: flex;
    float: right;
}
.more-button {
    height: 10px;
    border: none;
    color: #dde0e5;
    background-color: #ffffff;
    z-index: 5;
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