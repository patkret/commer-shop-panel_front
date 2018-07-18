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
      </div>

      <div class="l-table-filters__right">
      </div>
    </div>

    <div class="c-table">
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox">
            </th>
            <th>Nazwa administratora</th>
            <th>E-mail</th>
            <th>Numer telefonu</th>
            <th>Data dodania</th>
            <th>Akcja</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in items">
            <td data-th="Wybierz">
              <input type="checkbox">
            </td>
            <td data-th="Nazwa">{{item.first_name}} {{item.last_name}}</td>
            <td data-th="E-mail">{{item.email}}</td>
            <td data-th="Telefon">{{item.phone_no}}</td>
            <td data-th="data">{{item.created_at}}</td>
            <td data-th="Akcja" class="h-relative">
              <span class="c-actions-button js-actions-button" @click="showActions(key)">
                <i></i>
              </span>
              <div :class="{'c-actions js-actions': true , 'c-actions js-actions is-active': index === key}">
                <div class="c-actions__row">
                  <button class="c-actions__item" @click="deleteUser(item)">Usuń</button>
                  <router-link :to="'edit/' + item.id" class="c-actions__item" tag="button">Edytuj</router-link>
                  <router-link :to="'duplicate/' + item.id" class="c-actions__item" tag="button">Duplikuj</router-link>
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
    name: "users-list",
    props: ['editingUser'],
    data () {
      return {
        items: [],
        buttons: [],
        index: '',
        show : false,
        modal: false,
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
      deleteUser (item) {
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
            if(result.value) {
              let itemIndex = this.items.map(x => x.id).indexOf(item.id)
              this.items.splice(itemIndex, 1)
              axios.delete('users/' + item.id).then(
                result => {
                  console.log(result)
                  this.show = false
                  this.index = ''
                })
              this.$swal({
                title: 'Usunięto!',
                text: 'Użytkownik został usunięta',
                type: 'success',
                confirmButtonText: 'OK'
              })
            } else {
              this.$swal('Anulowane', 'Użytkownik nie został usunięty.', 'info')
            }
          },
          dismiss => {
          }).catch(this.$swal.noop)
      },
    },
    created: function () {
      axios('users').
      then(result => {
        this.items = result.data
      });
    }
  }
</script>

<style scoped>
    .container {
        position: relative;
    }
    .users-container {
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

    }
    .dot {
        height: 6px;
        width: 6px;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
    }
    .active{
        background-color: #F3F4F8;
        border-radius: 5px;
    }
    .action-buttons {
        position: absolute;
        top: -22px;
        left: -185px;
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
        border-right: 1px solid #dde0e5;
    }
    .action-buttons button:first-child {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
    .action-buttons button:nth-child(2) {
        border-radius: 0;
    }
    .action-buttons button:last-child {
        border-right: none;
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
    }
    .action-buttons button:hover {
        cursor: pointer;
        background-color: #dde0e5;
    }
    .active .top-category, .active .more-button{
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