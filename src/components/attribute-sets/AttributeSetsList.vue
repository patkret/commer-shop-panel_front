<!--<template>-->
    <!--<div class="attr-container">-->
        <!--<h4 class="attr-p">Akcja</h4>-->
        <!--<ul class="attr-list">-->
            <!--<li v-for="(item, key) in items" :class="{'attr-list-item': true, 'attr-list-item active': index === key}">-->
                <!--<p>{{item.id}}. {{item.name}}</p>-->
                <!--<div class="buttons-container">-->
                    <!--<button @click="showActions(key)" :class="{'more-button': true, 'more-button active': show === true && index === key}">-->
                        <!--<span class="dot"></span>-->
                        <!--<span class="dot"></span>-->
                        <!--<span class="dot"></span>-->
                    <!--</button>-->
                    <!--<div class="arrow-left"  v-if="index === key && show === true">-->
                    <!--<div class="action-buttons">-->
                        <!--<button class="delete" @click="deleteAttributeSet(item)">Usuń</button>-->
                        <!--<button class="edit" @click = "editAttributeSet(item)">Edytuj</button>-->
                    <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</li>-->
        <!--</ul>-->
    <!--</div>-->
<!--</template>-->

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
                    <th>Aktywność</th>
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
                    <td data-th="Widocznosc">
                        <span v-if="set.visibility">Tak</span>
                        <span v-if="!set.visibility">Nie</span>
                    </td>
                    <td data-th="Akcja" class="h-relative">
                                        <span class="c-actions-button js-actions-button" @click="showActions(key)">
                                            <i></i>
                                        </span>
                        <div :class="{'c-actions js-actions': true , 'c-actions js-actions is-active': index === key}">
                            <div class="c-actions__row">
                                <button class="c-actions__item" @click="deleteAttributeSet(set)">Usuń</button>
                                <router-link :to="'edit/' + set.id + '/categories'" class="c-actions__item">Edytuj</router-link>
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
    name: 'attribute-sets-list',
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
      deleteAttributeSet (item) {
        this.$swal({
          title: 'Czy chcesz usunąć zestaw atrybutów?',
          text: 'Ta akcja nieodwracalnie usunie zestaw atrybutów',
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
                    axios.delete('attribute-sets/' + item.id).then(
                      result => {
                        console.log(result)
                      })
              this.$swal({
                title: 'Usunięto!',
                text: 'Zestaw atrybutów został usunięty',
                type: 'success',
                confirmButtonText: 'OK'
              })
            } else {
              this.$swal('Anulowane', 'Zestaw atrybutów nie został usunięty', 'info')
            }
          },
          dismiss => {
          }).catch(this.$swal.noop)
      },
      editAttributeSet(item){
        axios('attribute-sets/' + item.id).
          then(result => {
            this.$emit('attributeSet', result.data)
          });
      }
    },
    created: function () {
      axios('attribute-sets').
      then(result => {
        this.items = result.data
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

</style>