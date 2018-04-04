<template>
    <ul class="variants-container">
        <li v-for="(item, key) in items" class="attr-list-item">
            {{item.name}}
            {{item.rate}}
            <div class="buttons-container">
                <button @click="showActions(key)" class="more-button">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </button>
                <div v-if="showButtons[key]" class="action-buttons">
                    <button @click="deleteVariant(key)" class="delete">Usuń</button>
                    <button class="edit" @click="editVariant(item, key)">Edytuj</button>
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
        showButtons: {},
      }
    },
    methods: {
      showActions (key) {
        this.showButtons[key] = !this.showButtons[key]
        this.$forceUpdate()
      },

      deleteVariant (index) {
        this.items.splice(index, 1)
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
          this.items.forEach((v, k) => {
            this.showButtons[k] = false
          })
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
        left: -120px;
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

    .action-buttons button:last-child {
        border-right: 1px solid #dde0e5;
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
    }

    .action-buttons button:hover {
        cursor: pointer;
        background-color: #dde0e5;
    }
</style>