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
          <tr v-for="(vendor, key) in vendors">
            <td data-th="Wybierz">
              <input type="checkbox">
            </td>
            <td data-th="ID">{{vendor.id}}</td>
            <td data-th="Nazwa">{{vendor.name}}</td>
            <td>
              <div class="c-form__fieldset">
                <div class="c-form__switch">
                  <div class="c-form__switch-control">
                    <input type="checkbox" :id="vendor.id" v-model="vendor.is_visible" @change="changeVisibility(vendor.id, vendor.is_visible)">
                    <label :for="vendor.id"></label>
                  </div>
                </div>
              </div>
            </td>
            <td data-th="Akcja" class="h-relative">
              <span class="c-actions-button js-actions-button" @click="showActions(key)">
                <i></i>
              </span>
              <div :class="{'c-actions js-actions': true , 'c-actions js-actions is-active': index === key}">
                <div class="c-actions__row">
                  <button class="c-actions__item" @click="deleteVendor(vendor)">Usuń</button>
                  <router-link :to="'edit/' + vendor.id" class="c-actions__item">Edytuj</router-link>
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
    name: "vendors-list",
    data () {
      return {
        vendors: [],
        showButtons: {},
        index: '',
      }
    },
    methods: {
        changeVisibility(id, visibility){
          console.log(id, visibility)
            axios.put('/vendors/change-visibility', {
                id: id,
                is_visible: visibility
            }).then(result => {
                console.log(result)
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
      editVendor(item){
        this.$emit('vendor', item)
      },

      deleteVendor (vendor) {
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
              let itemIndex = this.vendors.map(x => x.id).indexOf(vendor.id)
              this.vendors.splice(itemIndex, 1)
              axios.delete('vendors/' + vendor.id).then(
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
        this.vendors = result.data
        this.vendors.forEach((v,k) => {
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
</style>