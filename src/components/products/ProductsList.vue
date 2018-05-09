<template>
    <div>
        <div>
            <label class="switch">
                <input type="checkbox">
                <span class="slider round"></span>
            </label>
            <h1 class="card-name">Lista Produktów</h1>
            <ul class="products-list">
                <li  :class="{'products-list-item': true, 'products-list-item active-blue': type == 1}" @click.prevent="changeComponent(1)">Wszystkie produkty</li>
                <li  :class="{'products-list-item': true, 'products-list-item active-blue': type == 2}" @click.prevent="changeComponent(2)">Wyróżnione produkty</li>
                <li  :class="{'products-list-item': true, 'products-list-item active-blue': type == 3}" @click.prevent="changeComponent(3)">Zaimportowane</li>
                <li  :class="{'products-list-item': true, 'products-list-item active-blue': type == 4}" @click.prevent="changeComponent(4)">Brak na magazynie</li>
                <li  :class="{'products-list-item': true, 'products-list-item active-blue': type == 5}" @click.prevent="changeComponent(5)">Szkice produktów</li>
            </ul>
            <div class="component-container">

                <!--MODAL-->
                <transition name="modal" v-if="modal">
                    <div class="modal-mask">
                        <div class="modal-wrapper">
                            <div class="modal-container">
                                <div class="modal-header">
                                    <h3 class="modal-heading">Szczegóły Produktu</h3>
                                </div>
                                <div class="modal-body">
                                   <div class="modal-row">
                                       <p class="property-name">Nazwa produktu:</p>
                                       <p class="property-data">Nazwa produktu</p>
                                   </div>
                                    <div class="modal-row">
                                       <p class="property-name">SKU Produktu:</p>
                                       <p class="property-data">Nazwa produktu</p>
                                   </div>
                                    <div class="modal-row">
                                       <p class="property-name">Cena:</p>
                                       <p class="property-data">Nazwa produktu</p>
                                   </div>
                                    <div class="modal-row">
                                       <p class="property-name">Galeria</p>
                                       <p class="property-data">Nazwa produktu</p>
                                   </div>

                                </div>
                                    <button class="modal-close-button" @click="modal = false">X</button>
                            </div>
                        </div>
                    </div>
                </transition>

                <!--KONIEC MODALA-->
                <div v-if="type == 1" @singleProduct="editProduct">
                    <div class="products-container">
                        <h4 class="products-container-heading">Produkty</h4>
                        <div class="products-row">
                            <div class="filter-container">
                                <div class="filter-status">
                                    <label class="filter-label">Filtruj</label>
                                    <multiselect
                                            class="admin-select"
                                            v-model="selectedFilter"
                                            :allow-empty="false"
                                            :searchable="false"
                                            :selectedLabel="''"
                                            track-by="name"
                                            :options="filters"
                                            label="name"
                                            :deselectLabel="''"
                                            :selectLabel="''"
                                            :hideSelected="true"
                                            placeholder="Wybierz"/>
                                </div>
                            </div>
                            <div class="search-container"></div>
                        </div>
                        <table class="products-table">
                            <thead class="table-heading">
                            <tr class="table-row">
                                <th class="col-1">
                                    <label class="check-container check-all">
                                        <input type="checkbox" @click="selectAll" >
                                        <span class="checkmark"></span>
                                    </label>
                                </th>
                                <th class="col-2">Obraz</th>
                                <th class="col-3">SKU Produktu</th>
                                <th class="col-4 text-left">Nazwa produktu</th>
                                <th class="col-5">Cena</th>
                                <th class="col-6">Akcja</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="table-row" v-for="(item,key) in items" :class="{'attr-list-item': true, 'attr-list-item active': index === key}">
                                <td class="table-td col-1">
                                    <label class="check-container">
                                        <input type="checkbox" v-model="selectedProducts" :value="item.id">
                                        <span class="checkmark"></span>
                                    </label>
                                </td>
                                <td class="table-td col-2"><img class="ziemniak" src="../../assets/img/ziemniak.jpeg" alt=""></td>
                                <td class="table-td col-3">{{item.symbol}}</td>
                                <td class="table-td col-4 text-left">{{item.name}}</td>
                                <td class="table-td col-5">{{item.price}}</td>
                                <td class="table-td col-6">
                                    <div class="buttons-container">
                                        <button @click="showActions(key)" :class="{'more-button': true, 'more-button active': show === true && index === key}">
                                            <span class="dot"></span>
                                            <span class="dot"></span>
                                            <span class="dot"></span>
                                        </button>
                                        <div class="arrow-left"  v-if="index === key && show === true">
                                            <div class="action-buttons">
                                                <button @click="showModal(item)" class="details">Szczegóły</button>
                                                <button @click="deleteProduct(item)" class="delete">Usuń</button>
                                                <router-link :to="'/products/edit/' +item.id" tag="button" class="edit">Edytuj</router-link>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div class="action-select-container">
                            <p class="action-select-p">Wybierz akcję</p>
                            <div class="action-select">
                                <multiselect
                                        class=" admin-select products-select"
                                        v-model="selectedAction"
                                        :allow-empty="false"
                                        :searchable="false"
                                        :selectedLabel="''"
                                        track-by="name"
                                        :options="actions"
                                        label="name"
                                        :deselectLabel="''"
                                        :selectLabel="''"
                                        :hideSelected="true"
                                        placeholder="Wybierz"/>
                                <button @click="deleteSelected()" class="use-button">Wykonaj</button>
                            </div>
                        </div>
                    </div>
                </div>
                <highlited-products v-if="type == 2"></highlited-products>
                <imported-products v-if="type == 3"></imported-products>
                <sketch-products v-if="type == 5"></sketch-products>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'products-list',
    data () {
      return {
        items: [],
        selectedProducts: [],
        buttons: [],
        index: '',
        show : false,
        type: 1,
        editingProduct: '',
        modal: false,
        filters: [
          {name: 'Po ID'},
          {name: 'Po nazwie'},
          {name: 'Po dacie'},
          {name: 'Po swojemu :0'},
        ],
        actions: [
          {
            id: 0,
            name: 'Usuń zaznaczone',
          },
        ],
        value: '',
        selectedFilter: '',
        selectedAction: '',
      }
    },
    watch: {
      selectedAction: function (val)  {
        if(val.id === 0){

        }
      },
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
      showModal () {
       this.modal = true
      },
      selectAll () {
        if (this.selectedProducts.length !== 0) {
          this.selectedProducts = []
        }
        else {
          this.selectedProducts = this.items
        }

      },
      deleteProduct (item) {
        this.$swal({
          title: 'Czy chcesz usunąć produkt',
          text: 'Ta akcja nieodwracalnie usunie produkt',
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
              axios.delete('products/' + item.id).then(
                result => {
                  console.log(result)
                })
              this.$swal({
                title: 'Usunięto!',
                text: 'Produkt został usunięty',
                type: 'success',
                confirmButtonText: 'OK'
              })
            } else {
              this.$swal('Anulowane', 'Produkt nie został usunięty.', 'info')
            }
          },
          dismiss => {
          }).catch(this.$swal.noop)
      },
      deleteSelected (selectedProducts) {
        if (this.selectedAction != 0 ) {
          this.$swal({
            title: 'Czy chcesz usunąć produkty',
            text: 'Ta akcja nieodwracalnie usunie zaznaczone produkty',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'Anuluj',
            confirmButtonText: 'Usuń',
          }).then((result) => {
              if(result.value) {
                axios.delete('/products/delete-all/' + this.selectedProducts
                ).then((result) => {
                 console.log(result)
                  console.log(this.selectedProducts)
                })

                this.$swal({
                  title: 'Usunięto!',
                  text: 'Produkt został usunięty',
                  type: 'success',
                  confirmButtonText: 'OK'
                })
              } else {
                this.$swal('Anulowane', 'Produkty nie zostały usunięte.', 'info')
              }
            },
            dismiss => {
            }).catch(this.$swal.noop)
        }
    },
      editProduct (item) {
        this.$emit('singleProduct',item)
      },
      changeComponent(type){
        this.type = type
      },
    },
    created: function () {
      axios('products').then(result =>
        this.items = result.data)
    },
  }
</script>
<style scoped>
    /*PRODUKTY */
    .products-list {
        display: flex;
        border-bottom: 1px solid #dde0e5;
        font-weight: 700;
        font-size: 12px;
        margin: 40px;
        padding-left: 0;
    }
    .products-list-item {
        padding: 20px;
        margin: 0 20px;
        cursor: pointer;
        color: #626364;
        font-weight: 700;
    }
    .products-list-item:first-child {
        margin-left: 0;
        padding-left: 0;
    }
    .active-blue {
        border-bottom: 2px solid #2596eb;
        color: #000000;
    }
    .products-table {
        width: 90%;
        margin: 0 auto;
        margin-left: 0;
    }
    /*KONIEC PRODUKTÓW*/
    .products-container {
        background-color: #ffffff;
        font-size: 16px;
        font-weight: 500;
    }
    .attr-list-item {
     padding: 10px 0 10px 18px;
    }
    .products-select {
        width: 200px;
        align-self: center;
        height: 20px;
    }
    .action-select-container {
        display: flex;
        flex-direction: column;
        margin: 40px 0;
    }
    .action-select {
        display: flex;
        height: 40px;
    }
    .action-select-p {
        font-size: 12px;
        padding-left: 5px;
    }
    .use-button {
        margin: 10px 0 0 10px;
        align-self: center;
        background: linear-gradient(to right, #21c8cc, #2595ec);
        border: none;
        font-weight: 700;
        height: 40px;
        width: 130px;
        border-radius: 5px;
        color: #ffffff;
        font-size: 14px;
    }
    thead .table-row {
        display: grid;
        grid-template-columns: 5% 15% 15% 35% 5% 25%;
        grid-template-areas: 'col-1 col-2 col-3 col-4 col-5 col-6';
        text-align: center;
        padding: 10px 0 0 0;
        height: 20px;
        line-height: 20px;
    }
    thead .check-container {
        bottom: 40%;
        left: 35%;
    }
    .table-row {
        display: grid;
        grid-template-columns: 5% 15% 15% 35% 5% 25%;
        grid-template-areas: 'col-1 col-2 col-3 col-4 col-5 col-6';
        text-align: center;
        margin: 40px 0;
    }
    .table-td {
        height: 50px;
        line-height: 50px;
    }
    .col-1 {
        grid-area: col-1;
        text-align: left;
    }
    .col-2 {
        grid-area: col-2;
        text-align: left;
        margin-left: 15px;
    }
    tbody .col-2 {
       margin-left: 0;
    }
    .col-3 {
        grid-area: col-3;
        text-align: left;
    }
    .col-4 {
        grid-area: col-4;
    }
    .col-5 {
        grid-area: col-5;
        text-align: right;
    }
    tbody .col-5 {
        text-align: center;
    }
    .col-6 {
        grid-area: col-6;
        text-align: right;
    }
    .table-heading {
        padding-top: 40px;
    }
    .table-row:first-of-type {
        margin-top: 10px;
    }
    .products-row {
        display: flex;
        justify-content: space-between;
    }
    .filter-container {
        display: flex;
    }
    .filter-status, .filter-keyword {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        font-size: 12px;
        font-weight: 700;
    }
    .filter-status {
        margin-right: 20px;
    }
    .products-input {
        background-color: #f5f7fa;
        border-radius: 5px;
        border: none;
        height: 40px;
        line-height: 40px;
        padding-right: 60px;
        padding-left: 10px;
        font-weight: 700;
    }
    .admin-select {
        font-size: 10px;
        border-radius: 5px;
    }
    .admin .multiselect__tags {
        background-color: #f5f7fa;
        border: none;
        width: 170px;
        margin-top: 1px;
        color: #000;
        border-radius: 5px;
    }
    .admin .multiselect__single {
        background-color: #f5f7fa;
        font-size: 12px;
        font-weight: 700;
    }
    .admin .multiselect__content-wrapper {
        border: 1px solid #f5f7fa;
        border-top: none;
        border-radius: 5px;
        width: 100%;
    }
    .action-select-container {
        padding-bottom: 30px;
    }
    /*ACTION BUTTONS*/
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
    .action-buttons {
        position: absolute;
        top: -20px;
        display: flex;
        border: 1px solid #dde0e5;
        border-radius: 5px;
        z-index: -1;
        margin-left: 10%;
    }
    .action-buttons button {
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
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
    }
    .action-buttons button:hover {
        cursor: pointer;
        background-color: #dde0e5;
    }
    .active{
        background-color: #F3F4F8;
        border-radius: 5px;
    }
    .arrow-left{
        position: absolute;
        width: 0;
        height: 0;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-left:15px solid transparent;
        z-index: 20;
        top: 36%;
    }
    .table-row th {
        font-size: 14px;
        text-transform: uppercase;
    }
    /*CHECKBOX*/
    .check-container {
        display: block;
        position: relative;
        margin-top: 10px;
        padding-left: 35px;
        margin-bottom: 12px;
        cursor: pointer;
        font-size: 18px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .check-container p {
        padding-top: 3px;
    }
    .check-container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        margin-top: -35px;
    }
    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 23px;
        width: 23px;
        background-color: #FFFFFF;
        border: 1px solid #DAD8DA;
        border-radius: 5px;
    }
    .check-container:hover input ~ .checkmark {
        background-color: #ccc;
    }
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }
    .check-container input:checked ~ .checkmark:after {
        display: block;
    }
    .check-container .checkmark:after {
        left: 8px;
        top: 3px;
        width: 5px;
        height: 10px;
        border: solid black;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
    .action-select-p {
        font-size: 14px;
        font-weight: 700;
    }
    .text-left {
        text-align: left;
        padding-left: 30px;
        margin-bottom: 10px;
    }
    .filter-label {
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 10px;
    }
    .ziemniak {
        height: 62px;
        width: 62px;
    }

    /*MODAL*/

    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        width: 50%;
        height: 50%;
        background-color: #ffffff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        border-radius: 5px;
        padding: 10px;
    }
    .modal-close-button {
        border-radius: 100%;
        height: 40px;
        width: 40px;
        background-color: #ffffff;
        position: absolute;
        top: -3%;
        right: -2%;
        text-transform: uppercase;
        border: 1px solid #000000;
    }
    .modal-close-button:hover {
        background-color: #eeeeee;
    }
    .modal-heading {
        text-align: center;
    }
    .modal-row {
        display: grid;
        grid-template-areas: 'property-name property-data';
        grid-template-columns: 50% 50%;
    }
    .property-name {
        font-weight: bold;
        font-size: 16px;
        text-transform: uppercase;
        padding-left: 20px;
    }
    /*SWITCh*/

    /* The switch - the box around the slider */
    .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
    }

    /* Hide default HTML checkbox */
    .switch input {display:none;}

    /* The slider */
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
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
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
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }

    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
        border-radius: 50%;
    }
</style>