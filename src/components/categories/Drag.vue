<template>
    <draggable :element="'ul'" :list="children" class="dragArea list-group" :options="{group:{ name:'g1'}}">
        <li class="list-item" :key="key" v-for="(el, key) in children" :class="{'drag-undercategory': true, 'drag-undercategory active': index === key}">
           <p class="list-item-p">{{el.name}}</p>
            <div class="buttons-container">
                <button @click="showActions(key)" :class="{'more-button': true, 'more-button active': show === true && index === key}">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </button>
                <div class="arrow-left"  v-if="index === key && show === true">
                    <div class="action-buttons">
                        <button @click="deleteCategory(el)" class="delete">Usuń</button>
                        <button @click="editCategory(el)" class="edit">Edytuj</button>
                    </div>
                </div>
            </div>
                <drag class="list-item-drag" v-if="el.children" :children="el.children" :item="el"></drag>
        </li>
    </draggable>
</template>

<script>
    import draggable from 'vuedraggable'
  export default {
    name: "drag",
    props: ['children', 'item', 'category'],
    data () {
      return {
        items: [],
        buttons: [],
        index: '',
        show : false
      }
    },
    components: {
      draggable
    },
    methods: {
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
      deleteCategory(item){
        axios.delete('categories/' + item.id).then(result => {
          let index = this.children.indexOf(this.children.find(el => el.id == item.id))
          this.children.splice(index, 1)
        })
      },
      editCategory (item) {
        this.$emit('singleCategory', item)
        console.log(item)
      },
    },
  }
</script>

<style scoped>
.drag-undercategory {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    padding: 10px 0;

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
    left: -115px;
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
}
.action-buttons button:first-child {
    border-right: 1px solid #dde0e5;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
}
.action-buttons button:last-child {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
}
.action-buttons button:hover {
    cursor: pointer;
    background-color: #dde0e5;
}
.active{
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