<template>

    <!--<ul class="vat-container">-->
        <!--<li v-for="(item, key) in items" class="attr-list-item">-->
            <!--{{item.id}}. {{item.name}}-->
            <!--<div class="buttons-container">-->
                <!--<button @click="showActions(key)" class="more-button">-->
                    <!--<span class="dot"></span>-->
                    <!--<span class="dot"></span>-->
                    <!--<span class="dot"></span>-->
                <!--</button>-->
                <!--<div v-if="showButtons[key]" class="action-buttons">-->
                    <!--<button @click="deleteStock(item)" class="delete">Usuń</button>-->
                    <!--<button class="edit" @click="editStock(item)">Edytuj</button>-->
                    <!--<button class="edit" @click="addToStock(item)">Stan magazynu</button>-->
                <!--</div>-->
            <!--</div>-->
        <!--</li>-->
    <!--</ul>-->

    <div>
        <div class="l-table-filters">
            <div class="l-table-filters__left">
                <div class="c-dropdown js-dropdown">
                                <span class="c-dropdown__name">
                                    Wybierz działanie
                                    <span class="c-arrow-down"></span>
                                </span>

                    <ul class="c-dropdown__menu">
                        <li class="c-dropdown__menu-item">
                            <a href="">
                                Cena
                                <span class="c-arrow-down"></span>
                            </a>
                        </li>
                        <li class="c-dropdown__menu-item is-active">
                            <a href="">
                                Kto przygotował
                                <span class="c-arrow-down"></span>
                            </a>
                        </li>
                    </ul>
                </div>

                <div class="c-dropdown js-dropdown">
                                <span class="c-dropdown__name">
                                    Filtrowanie
                                    <span class="c-arrow-down"></span>
                                </span>

                    <ul class="c-dropdown__menu">
                        <li class="c-dropdown__menu-item">
                            <a href="">
                                Cena
                                <span class="c-arrow-down"></span>
                            </a>
                        </li>
                        <li class="c-dropdown__menu-item is-active">
                            <a href="">
                                Kto przygotował
                                <span class="c-arrow-down"></span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="l-table-filters__right">

                <!--<div class="c-dropdown js-dropdown">-->
                <!--<span class="c-dropdown__name">-->
                <!--Filtrowanie-->
                <!--<span class="c-arrow-down"></span>-->
                <!--</span>-->

                <!--<ul class="c-dropdown__menu">-->
                <!--<li class="c-dropdown__menu-item">-->
                <!--<a href="">-->
                <!--Cena-->
                <!--<span class="c-arrow-down"></span>-->
                <!--</a>-->
                <!--</li>-->
                <!--<li class="c-dropdown__menu-item is-active">-->
                <!--<a href="">-->
                <!--Kto przygotował-->
                <!--<span class="c-arrow-down"></span>-->
                <!--</a>-->
                <!--</li>-->
                <!--</ul>-->
                <!--</div>-->
            </div>
        </div>

        <div class="c-table">
            <table>
                <thead>
                <tr>
                    <th>
                        <input type="checkbox">
                    </th>
                    <th>ID</th>
                    <th>Nazwa</th>
                    <th>Na magazynie</th>
                    <th>Akcja</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(warehouse, key) in items">
                    <td data-th="Wybierz">
                        <input type="checkbox">
                    </td>
                    <td data-th="ID">{{warehouse.id}}</td>
                    <td data-th="Nazwa">{{warehouse.name}}</td>
                    <td data-th="Ilosc">{{warehouse.warehouse_items.length}}</td>
                    <td data-th="Akcja" class="h-relative">
                                        <span class="c-actions-button js-actions-button" @click="showActions(key)">
                                            <i></i>
                                        </span>
                        <div :class="{'c-actions js-actions': true , 'c-actions js-actions is-active': index === key}">
                            <div class="c-actions__row">
                                <button class="c-actions__item" @click="deleteStock(warehouse)">Usuń</button>
                                <router-link :to="'edit/' + warehouse.id" class="c-actions__item" tag="button">Edytuj</router-link>
                                <router-link :to="'items/' + warehouse.id" class="c-actions__item" tag="button">Stan</router-link>
                            </div>
                        </div>
                    </td>
                </tr>

                </tbody>
            </table>

            <div class="c-pagination">
                <button type="button" @click.prevent="changePage(current_page - 1)" :disabled="current_page === 1"><i
                        class="fa fa-chevron-left"></i></button>
                <input type="number" id="page" v-model="current_page" class="paginator--input"
                       @keyup.enter="changePage(current_page)"/>
                <span>z</span>
                <span class="paginator--last_page"> {{last_page}}</span>
                <button type="button" :disabled="current_page === last_page">
                    <i class="fa fa-chevron-right" @click.prevent="changePage(current_page +1)"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'stock-list',
    data () {
      return {
        items: [],
        showButtons: {},
        index: '',
        current_page: '',
        last_page: '',

      }
    },
    methods: {
      showActions (key) {
          if (this.index === key) {
            this.show = false
            this.index = ''
          }
          else {
            this.show = true
            this.index = key
        }
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
      changePage (page) {
        if (page > this.last_page) {
          this.current_page = this.last_page
        }
        else {
          this.current_page = page
        }
        axios(`/warehouses-all/?page=${page}`).
          then(result => {
            this.items = result.data.data
            this.current_page = result.data.current_page
            this.last_page = result.data.last_page
          })
      },

    },
    created: function () {
      axios('warehouses-all').
        then(result => {
          this.items = result.data.data
          this.current_page = result.data.current_page
          this.last_page = result.data.last_page
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


    .c-table table th:first-child, .c-table table td:first-child {
        width: 15px;
        text-align: left;
    }

    .c-table table th:nth-child(2), .c-table table td:nth-child(2) {
        width: 15px;
        text-align: left;
    }
    .c-table table th:nth-child(3), .c-table table td:nth-child(3) {
        width: 100%;
        text-align: left;
    }

    .l-table-filters__right {
        border-right: 1px solid #dddddd;
    }
    .c-actions__item:first-child, .c-actions__item:nth-child(2){
        border-right: none;
    }
</style>
