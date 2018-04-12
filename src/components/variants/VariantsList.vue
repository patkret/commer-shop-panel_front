<template>
    <ul class="variants-container">
        <li v-for="(item, key) in items" :class="{'attr-list-item': true, 'attr-list-item active': index === key}">
           <p>{{item.id}} {{item.name}}</p>
            <div class="buttons-container">
                <button @click="showActions(key)" :class="{'more-button': true, 'more-button active': show === true && index === key}">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </button>
                <div class="arrow-left"  v-if="index === key && show === true">
                    <div class="action-buttons">
                        <button @click="deleteVariant(item)" class="delete">Usuń</button>
                        <button @click="editVariant(item)" class="edit">Edytuj</button>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
  export default {
    name: 'variants-list',
    props: ['variants'],
    data () {
      return {
        items: [],
        buttons: [],
        index: '',
        show : false
      }
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
      deleteVariant (index) {
        this.$swal({
          title: 'Czy chcesz usunąć użytkownika?',
          text: 'Ta akcja nieodwracalnie usunie użytkownika',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          cancelButtonText: 'Anuluj',
          confirmButtonText: 'Usuń',
        }).then((result) => {
            this.items.splice(index, 1)
            this.$swal({
              title: 'Usunięto!',
              text: 'Użytkownik został usunięty',
              type: 'success',
              confirmButtonText: 'OK'
            })
          },
          dismiss => {
            console.log(result.dismiss)
          }).catch(swal.noop)
      },
      editVariant (item, key) {
        this.$emit('singleVariant', item, key)
      },
    },
    created: function () {

      if (this.variants) {
        this.items = this.variants
      }
      else {
        axios('variant-groups').then(result => {
          this.items = result.data
        })
      }
    },
  }
</script>

<style scoped>
    .variants-container {
        width: 80%;
        background-color: #ffffff;
        margin-left: 20px;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 5px 5px 5px 2px #eff1f4;
    }
    .attr-list-item {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        height: 40px;
        line-height: 40px;
        margin: 5px 0;
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