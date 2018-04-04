<template>
    <div>
        <div id="main-content-with-side-menu">
            <h1 class="card-name">Kategorie</h1>
            <div class="side-menu-container">
                <div id="side-menu">
                    <div class="side-button" :class="{'side-menu-item': true, 'side-menu-item active': type == 1}" @click.prevent="changeComponent(1)">
                        <p>Dodaj kategorie</p>
                    </div>
                    <div class="side-button" :class="{'side-menu-item' : true, 'side-menu-item active': type == 2}" @click.prevent="changeComponent(2)">
                        <p>Wszystkie kategorie</p>
                    </div>
                </div>
            </div>
            <div class="component-container">
                <add-category v-if="type == 1"></add-category>
                <category-list v-if="type == 2"></category-list>
            </div>
        </div>

    </div>
</template>

<script>

  import AddCategory from './AddCategory'
  import EditCategory from './EditCategory'
  import CategoryList from './CategoryList'

  export default {
    name: "Categories",
    components: {
      CategoryList,
      EditCategory,
      AddCategory,
    },
    data: () => ({
      type: 2,
      categories: '',
    }),
    methods: {
      changeComponent(type){
        this.type = type
      },
    }

  }
</script>

<style scoped>



    /*STARE STYLE */

    .form-row {
        display: grid;
        margin: 20px 0;
        grid-template-areas: 'col-1 col-2 col-3';
        grid-template-columns: 130px 520px 1fr;
    }
    .col-1 {
        grid-area: col-1;
    }
    .col-2 {
        grid-area: col-2;
    }
    .col-3 {
        grid-area: col-3;
    }
    .form-label {
        font-weight: 700;
        margin-top: 10px;
        margin-right: 15px;
        font-size: 12px;
        text-align: right;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    }
    .form-input {
        background-color: #ffffff;
        margin-left: 10px;
        border-radius: 10px;
        height: 35px;
        line-height: 35px;
        padding-left: 10px;
        border:none;
        font-size: 12px;
        font-weight: 700;
    }
    .form-textarea {
        resize: none;
        height: 250px;
        width: available;
        margin-left: 10px;
        padding: 10px 0 0 10px;
        border: none;
        border-radius: 10px;
        font-size: 12px;
        font-weight: 700;
    }
    .shop-select {
        width: auto;
        background-color: #ffffff;
        margin-left: 10px;
    }
    .form-help {
        display: flex;
    }
    .form-help-square {
        height: 25px;
        width: 30px;
        border-radius: 5px;
        margin: 5px 0 0 10px;
        background: #30c8c9 url('../../assets/img/icons/question-mark.png') no-repeat center center;
    }
    .form-help-cloud {
        display: none;
        background: #30c8c9;
        width: 120px;
        height: 35px;
        margin-left:  10px;
        font-size: 10px;
        text-align: center;
        color: #ffffff;
        border-radius: 5px;
        transition: 1s;
        position: relative;
    }
    .form-help-cloud:before {
        right: 100%;
        top: calc(50% - 6px);
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        border-right-color: #30c8c9;
        border-width: 6px;
    }
    .form-help-square:hover ~ .form-help-cloud {
        display: block;
        transition: 1s;
    }
    .form-help-square:hover ~ .form-help-cloud::before {
        display: block;
    }
    .form-data {
        display: flex;
        flex-direction: column;
    }
    .input-border {
        border: 2px solid red;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }
    .form-data span {
        background-color: red;
        border-radius: 5px;
        color: #fff;
        padding: 10px 0 10px 10px;
        font-size: 12px;
        font-weight: 700;
        margin-left: 10px;
        z-index: -2;
        border-top-right-radius: 0;
        border-top-left-radius: 0;
    }
    .sortable-chosen {
        border: 1px #000000 dashed;
    }

    .shop-select {
        background-color: #ffffff;
    }
    .shop-select .multiselect__tags {
        background-color: #f5f7fa;
        border: none;
        width: 170px;
        margin-top: 1px;
        color: #000;
        border-radius: 5px;
    }
    .shop-select .multiselect__single {
        background-color: #ffffff;
        font-size: 12px;
        font-weight: 700;
    }
    .shop-select .multiselect__content-wrapper {
        border: 1px solid #ffffff;
        border-top: none;
        border-radius: 5px;
        width: 100%;
    }
    .multiselect .multiselect--active {
        background-color: #ffffff;
    }
    .multiselect .multiselect__option {
        border-top: 1px solid #dde0e5;
    }
    .multiselect .multiselect__option--highlight {
        background-color: #f5f7fa;
        color: #000000;
        border-top: 1px solid #dde0e5;
    }
    .mulitselect .multiselect__content:first-child {
        border-top: none;
    }
    .multiselect .multiselect__select::before {
        /*border: none;*/
        height: 20px;
        border-color: #000 transparent transparent;
        border-width: 4px 4px 0;
        width: 20px;
    }

</style>