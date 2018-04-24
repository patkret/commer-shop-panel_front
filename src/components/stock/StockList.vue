<template>

    <ul class="vat-container">
        <li v-for="(item, key) in items" class="attr-list-item">
            {{item.id}}. {{item.name}}
            <div class="buttons-container">
                <button @click="showActions(key)" class="more-button">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </button>
                <div v-if="showButtons[key]" class="action-buttons">
                    <button @click="deleteStock(item)" class="delete">Usuń</button>
                    <button class="edit" @click="editStock(item)">Edytuj</button>
                    <button class="edit" @click="addToStock(item)">Stan magazynu</button>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
  export default {
    name: 'stock-list',
    data () {
      return {
        items: [],
        showButtons: {},
      }
    },
    methods: {
      showActions (key) {
        this.showButtons[key] = !this.showButtons[key]
        this.$forceUpdate()
      },
      addToStock (item) {
        this.$emit('addToStock', item)
      },
      editStock (item) {
        this.$emit('stock', item)
      },

      deleteStock (item) {
        this.$swal({
          title: 'Czy chcesz usunąć magazyn?',
          text: 'Ta akcja nieodwracalnie usunie magazyn',
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
              axios.delete('warehouses/' + item.id).then(
                result => {
                  console.log(result)
                })
              this.$swal({
                title: 'Usunięto!',
                text: 'Magazyn został usunięty',
                type: 'success',
                confirmButtonText: 'OK',
              })
            } else {
              this.$swal('Anulowano', 'Magazyn nie został usunięty.', 'info')
            }
          },
          dismiss => {
          }).catch(this.$swal.noop)
      },

    },
    created: function () {
      axios('warehouses').
        then(result => {
          this.items = result.data
          this.items.forEach((v, k) => {
            this.showButtons[k] = false
          })
        })
    },
  }
</script>

<style scoped>
    .vat-container {
        width: 80%;
        background-color: #ffffff;
        margin-left: 20px;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 5px 5px 5px 2px #eff1f4;
    }

    .attr-p {
        text-align: right;
    }

    .attr-list-item {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        height: 40px;
        line-height: 40px;
        margin: 5px 0;
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
        top: 0;
        left: -250px;
        display: flex;
        border: 1px solid #dde0e5;
        border-radius: 5px;
    }

    .action-buttons button {
        /*border: 1px solid #dde0e5;*/
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

    .action-buttons button:nth-child(2) {
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

</style>