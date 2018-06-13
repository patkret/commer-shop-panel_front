<template>
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
                    <th>Aktywność</th>
                    <th>Akcja</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, key) in items">
                    <td data-th="Wybierz">
                        <input type="checkbox">
                    </td>
                    <td data-th="ID">{{item.id}}</td>
                    <td data-th="Nazwa">{{item.name}}</td>
                    <td>
                        <label class="switch">
                            <input type="checkbox">
                            <span class="slider round"></span>
                        </label>
                    </td>
                    <td data-th="Akcja" class="h-relative">
                                        <span class="c-actions-button js-actions-button" @click="showActions(key)">
                                            <i></i>
                                        </span>
                        <div :class="{'c-actions js-actions': true , 'c-actions js-actions is-active': index === key}">
                            <div class="c-actions__row">
                                <button class="c-actions__item" @click="deleteVendor(item)">Usuń</button>
                                <router-link :to="'edit/' + item.id" class="c-actions__item">Edytuj</router-link>
                            </div>
                        </div>
                    </td>
                </tr>

                </tbody>
            </table>

            <div class="c-pagination">
            </div>
        </div>
    </div>


</template>
    <!-- <ul class="vat-container">
        <li v-for="(item, key) in items" class="attr-list-item">
           {{item.id}}. {{item.name}}
            <div class="buttons-container">
                <button @click="showActions(key)" class="more-button">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </button>
                <div v-if="showButtons[key]" class="action-buttons">
                    <button @click="deleteVendor(item)" class="delete">Usuń</button>
                    <button class="edit" @click="editVendor(item)">Edytuj</button>
                </div>
            </div>
        </li>
    </ul> -->

<script>
  export default {
    name: "vendors-list",
    data () {
      return {
        items: [],
        showButtons: {},
        index: '',
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
      editVendor(item){
        this.$emit('vendor', item)
      },

      deleteVendor (item) {
        this.$swal({
          title: 'Czy chcesz usunąć producenta?',
          text: 'Ta akcja nieodwracalnie usunie producenta',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          cancelButtonText: 'Anuluj',
          confirmButtonText: 'Usuń',
        }).then((result) => {
            if(result.value) {
              let itemIndex = this.items.map(x => x.id).indexOf(item.id)
              this.items.splice(itemIndex, 1)
              axios.delete('vendors/' + item.id).then(
                result => {
                  console.log(result)
                })
              this.$swal({
                title: 'Usunięto!',
                text: 'Producent został usunięty',
                type: 'success',
                confirmButtonText: 'OK'
              })
            } else {
              this.$swal('Anulowane', 'Producent nie został usunięty.', 'info')
            }
          },
          dismiss => {
          }).catch(this.$swal.noop)
      },

    },
    created: function () {
      axios('vendors').
      then(result => {
        this.items = result.data
        this.items.forEach((v,k) => {
          this.showButtons[k] = false
        })
      });
    }
  }
</script>

<style scoped>
    
    .c-table table th:first-child, .c-table table td:first-child {
        width: 15px;
        text-align: left;
    }

    .c-table table th:nth-child(2), .c-table table td:nth-child(2) {
        width: 15px;
        text-align: left;
    }

    .c-table table th:nth-child(3), .c-table table td:nth-child(3) {
        width: 70%;
        text-align: left;
    }

    .l-table-filters__right {
        border-right: 1px solid #dddddd;
    }
      /*SWITCh*/

    .switch {
        position: relative;
        display: inline-block;
        width: 40px;
        height: 20px;
    }
    .switch input {display:none;}

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 15px;
        width: 15px;
        left: 4px;
        bottom: 3px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
    }

    input:checked + .slider {
        background-color: #00DE01;
    }

    input:focus + .slider {
        box-shadow: 0 0 1px #00DE01;
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(18px);
        -ms-transform: translateX(18px);
        transform: translateX(18px);
    }

    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
        border-radius: 50%;
    }
</style>