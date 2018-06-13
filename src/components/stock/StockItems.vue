<template>
    <!--<div>-->
        <!--<div class="card-header" v-if="type === 1">-->
            <!--<h3>{{stock.name}}</h3>-->
            <!--<button class="custom-button" @click="changeType(2)">Dodaj do magazynu</button>-->
        <!--</div>-->

        <!--<add-to-stock v-if="type === 2" :stock="stock"/>-->
        <!--<div class="table-container" v-if="type === 1">-->
        <!--<table class="stock-table">-->
            <!--<tr class="table-head">-->
                <!--<th>ID</th>-->
                <!--<th>Dodano</th>-->
                <!--<th>Ilość</th>-->
                <!--<th>Cena</th>-->
                <!--<th>Akcja</th>-->
            <!--</tr>-->
            <!--<tr v-for="(item,key) in items" :class="{'single-item': true, 'single-item active': index === key}">-->
                <!--<td>{{item.group_id}}.</td>-->
                <!--<td>{{item.added_at}}</td>-->
                <!--<td>{{item.quantity}}</td>-->
                <!--<td>{{item.price}} zł</td>-->
                <!--<td>-->
                    <!--<div class="buttons-container">-->
                        <!--<button @click="showActions(key)" :class="{'more-button': true, 'more-button active': index === key}">-->
                            <!--<span class="dot"></span>-->
                            <!--<span class="dot"></span>-->
                            <!--<span class="dot"></span>-->
                        <!--</button>-->
                        <!--<div v-if="index === key && show === true" class="action-buttons">-->
                            <!--<button @click="deleteStockItems(item)" class="delete">Usuń</button>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</td>-->
            <!--</tr>-->
        <!--</table>-->
        <!--</div>-->
    <!--</div>-->

</template>

<script>
  import AddToStock from './addToStock'

  export default {
    components: {AddToStock},
    name: 'stock-items',
    props: ['stock'],
    data: () => ({
      items: [],
      index: '',
      show: false,
      type: 1,
    }),

    watch: {
      type: function (val) {
        if (val === 1) {
          axios('warehouse-items/' + this.stock.id).then(result => {
            this.items = result.data
          })
        }
      },
    },
    methods: {
      showActions (key) {
        if (this.index === key) {
          this.index = ''
          this.show = false
        }
        else {
          this.index = key
          this.show = true
        }
      },

      changeType (type) {
        this.type = type
      },

      deleteStockItems (item) {
        axios.delete('warehouse-items/' + item.group_id).then(() => {
          axios('warehouse-items/' + this.stock.id).then(result => {
            this.items = result.data
          })
          this.index = ''
          this.show = false
        })
      },
    },

    created: function () {
      axios('warehouse-items/' + this.stock.id).then(result => {
        this.items = result.data
      })
    },
  }
</script>

<style scoped>
    .stock-list {
        margin-left: 45px;
    }

    .table-container {
        width: 80%;
        background-color: #ffffff;
        margin-left: 20px;
        padding: 40px;
        border-radius: 5px;
        box-shadow: 5px 5px 5px 2px #eff1f4;

    }
    .stock-table{
        border-collapse: collapse;
        width: 100%;
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
        border-radius: 5px;
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
        left: -60px;
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

    .table-head {
        text-align: left;
        height: 55px;
    }

    .single-item {
        height: 55px;
        border-radius: 5px;
    }

    .active {
        background-color: #F4F4F9;
        border-radius: 5px;
    }

    .custom-button {
        width: 150px;
        margin: 10px 0 0 60px;
    }

    .card-header {
        display: inline-flex;
        margin: 0 0 45px 20px;
    }

</style>