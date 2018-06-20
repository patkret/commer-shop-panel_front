

<template>
  <div style="background-color: #ffffff; width: 40%; padding: 40px">
    <form action="" class="c-form" @submit.prevent="saveCategory">

      <div class="c-form__fieldset">
        <div class="c-form__field-wrapper">
          <custom-input :label="'Nazwa'" v-model="editingCategory.name" rules="required" min-input-length="4" />
        </div>
      </div>
      <div class="c-form__fieldset">
            <div class="c-form__switch">
              <div class="c-form__switch-label">Aktywność</div>

              <div class="c-form__switch-control">
                <input type="checkbox" id="visibility" v-model="visibility">
                <label for="visibility"></label>
              </div>
            </div>
          </div>
      <div class="c-form__fieldset" @click="toggleCategory = !toggleCategory">
        <div :class="{'c-form__multiselect js-multiselect': true, 'c-form__multiselect js-multiselect is-opened': toggleCategory}">
          <span class="c-form__multiselect-name">
            Wybierz kategorię
            <span class="c-arrow-down"></span>
          </span>
          <ul class="c-form__multiselect-menu">

            <li class="c-form__multiselect-menu-item" v-for="item in items">
              <div class="c-form__checkbox">
                <input v-model="selectedCategory" type="checkbox" :id="item.id">
                <label>
                  <span>{{item.name}}</span>
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="c-form__fieldset">
        <div class="c-form__field-wrapper">
          <custom-input :label="'Tytuł'" v-model="page_title" rules="required" />
        </div>
      </div>
      <div class="c-form__fieldset">
        <div class="c-form__field-wrapper">
          <custom-input :label="'keywords'" v-model="metaKeywords" rules="required" />
        </div>
      </div>
      <div class="c-form__fieldset">
        <div class="c-form__field-wrapper">
          <custom-input :label="'description'" v-model="metaDescription" rules="required" />
        </div>
      </div>
      <div class="c-form__fieldset">
        <div class="c-form__field-wrapper">
          <custom-input :label="'URL'" v-model="addressUrl" rules="required" />
        </div>
      </div>
      <div class="h-center">
        <button type="submit" class="c-button c-form__button">
          <span>Zapisz</span>
        </button>
      </div>

    </form>
  </div>
</template>

<script>
  export default {
    name: "edit-category",
    props:['category', 'childCategory'],
    data: () => {
      return {
        selectedCategory: null,
        editingCategory: {
          name: '',
          description: '',
          page_title: '',
          metaDescription: '',
          metaKeywords: '',
          addressUrl: '',
          parent_id: '',
          // selectedCategory: '',
        },
        items: [],
        showInfoEdit: false,
      }
    },
    watch: {
      showInfoEdit: function () {
        setTimeout(() => {
          this.showInfoEdit = false
          this.$parent.$data.type = 2
        }, 3000)
      },
      selectedCategory: function(e) {
        this.editingCategory.parent_id = this.selectedCategory.id
      },
      items: function (val){
       this.selectedCategory = val.find(el => el.id === this.editingCategory.parent_id)
      },

    },
    methods: {
      updateCategory() {
        this.$validator.validateAll().then((result) => {
          if (result) {
              axios.put('categories/' + this.editingCategory.id , {
                editedCategory: this.editingCategory
              }).then(result => {
                console.log(result.data)
              });;
            this.showInfoEdit = true
            setTimeout(() => {
              this.$parent.$data.type = 2
            }, 500)
          }
        })
      },
    },
    beforeCreate: function(){
      axios('all-categories')
        .then(result => {
          this.items = result.data
        });

    },
    created: function () {

      this.editingCategory = this.category;

      if(this.childCategory){
        this.editingCategory = this.childCategory

      }

    },
  }
</script>

<style scoped>
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
    .info {
        width: 100%;
        height: 50px;
        background-color: #94C01E;
        margin-bottom: 50px;
        color: #FFFFFF;
        text-align: center;
        display: flex;
        justify-content: center;
        aling-items: center;
        border-radius: 5px;
    }
</style>