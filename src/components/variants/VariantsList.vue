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
                    <th>Nazwa zestawu</th>
                    <th>Ilość wariantów</th>
                    <th>Akcja</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(set, key) in items">
                    <td data-th="Wybierz">
                        <input type="checkbox">
                    </td>
                    <td data-th="ID">{{set.id}}</td>
                    <td data-th="Nazwa">{{set.name}}</td>
                    <td data-th="Ilosc">{{set.variants.length}}</td>
                    <td data-th="Akcja" class="h-relative">
                                        <span class="c-actions-button js-actions-button" @click="showActions(key)">
                                            <i></i>
                                        </span>
                        <div :class="{'c-actions js-actions': true , 'c-actions js-actions is-active': index === key}">
                            <div class="c-actions__row">
                                <button class="c-actions__item" @click="deleteVariantSet(key, set)">Usuń</button>
                                <router-link :to="'edit/' + set.id + '/variant-add'" class="c-actions__item">Edytuj
                                </router-link>
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

<script>
  export default {
    name: 'variants-list',
    data () {
      return {
        items: [],
        index: '',
        show: false,
      }
    },
    methods: {
      fetchVariantSets () {
        axios('variant-groups').then(result => {
          result.data.forEach(el => {
            if (el.variants != 0) {
              el.variants = JSON.parse(el.variants)
            }
          })
          this.items = result.data
        })
      },
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
      deleteVariantSet (index, item) {
        this.$swal({
          title: 'Czy chcesz usunąć wariant?',
          text: 'Ta akcja usunie zestaw w którym znajdują się warianty!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          cancelButtonText: 'Anuluj',
          confirmButtonText: 'Usuń',
        }).then((result) => {
            if (result.value) {
              this.items.splice(index, 1)
              this.show = false
              this.index = ''
              axios.delete('variant-groups/' + item.id).then(() => {
                this.$swal({
                  title: 'Usunięto!',
                  text: 'Zestaw został usunięty',
                  type: 'success',
                  confirmButtonText: 'OK',
                })
              })

            } else {
              this.$swal('Anulowane', 'Wariant nie został usunięty', 'info')
            }
          },
          dismiss => {
          }).catch(this.$swal.noop)
      },
    },
    created: function () {
      this.fetchVariantSets()
    },
  }
</script>
