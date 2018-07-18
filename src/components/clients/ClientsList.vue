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
        </div>

        <div class="c-table">
            <table>
                <thead>
                <tr>
                    <th>
                        <input type="checkbox">
                    </th>
                    <th>ID</th>
                    <th>Ilość zamówień</th>
                    <th>Klient</th>
                    <th>Status konta</th>
                    <th>Data rejestracji</th>
                    <th>Akcja</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(client, key) in items">
                    <td data-th="Wybierz">
                        <input type="checkbox">
                    </td>
                    <td data-th="ID">{{client.id}}</td>
                    <td data-th="Ilosc zamowien"> 1</td>
                    <td data-th="Klient">
                        {{(client.first_name + ' ' + client.last_name)}}
                    </td>
                    <td data-th="Status rejestracji">
                        <p v-if="client.status === 0">Niezatwierdzone</p>
                        <p v-else="client.status === 1">Aktywny</p>
                    </td>
                    <td data-th="Data rejestracji">
                        {{client.created_at}}
                    </td>
                    <td data-th="Akcja" class="h-relative">
                                        <span class="c-actions-button js-actions-button" @click="showActions(key)">
                                            <i></i>
                                        </span>
                        <div :class="{'c-actions js-actions': true , 'c-actions js-actions is-active': index === key}">
                            <div class="c-actions__row">
                                <button class="c-actions__item" @click="deleteClient(client, key)">Usuń</button>
                                <router-link :to="'edit/' + client.id + '/categories'" class="c-actions__item" tag="button">Edytuj</router-link>
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
    name: 'clients-list',
    data () {
      return {
        items: [],
        index: '',
        show : false,
        current_page: '',
        last_page: ''
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
      deleteClient (item, key) {
        this.$swal({
          title: 'Czy chcesz usunąć klienta?',
          text: 'Ta akcja nieodwracalnie usunie klienta',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          cancelButtonText: 'Anuluj',
          confirmButtonText: 'Usuń',
        }).then((result) => {
            if (result.value) {
              this.items.splice(key, 1)
              axios.delete('clients/' + item.id).then(
                result => {
                  console.log(result)
                })
              this.$swal({
                title: 'Usunięto!',
                text: 'Klient został usunięty',
                type: 'success',
                confirmButtonText: 'OK'
              })
            } else {
              this.$swal('Anulowane', 'Klient nie został usunięty', 'info')
            }
          },
          dismiss => {
          }).catch(this.$swal.noop)
      },
      fetchClients() {
        axios('clients?page=1').
          then(result => {
            this.current_page = result.data.current_page
            this.items = result.data.data
            this.last_page = result.data.last_page
          });
      },
      changePage (page) {
        if (page > this.last_page) {
          this.current_page = this.last_page
        }
        else {
          this.current_page = page
        }
        axios(`/clients/?page=${page}`).
          then(result => {
            this.items = result.data.data
            this.current_page = result.data.current_page
            this.last_page = result.data.last_page
          })
      },
    },
    created: function () {
      this.fetchClients();
    }
  }
</script>

<style scoped>

    .c-table table th:first-child, .c-table table td:first-child {
        width: 10px;
        text-align: left;
    }

    .c-table table th:nth-child(2), .c-table table td:nth-child(2) {
        width: 10px;
        text-align: left;
    }

    .c-table table th:nth-child(3), .c-table table td:nth-child(3) {
        width: 10px;
        text-align: left;
    }
    .c-table table th:nth-child(4), .c-table table td:nth-child(4) {
        width: 65%;
        text-align: left;
    }

</style>