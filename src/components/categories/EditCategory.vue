<template>
    <form @submit.prevent="updateCategory">
        <div class="info" v-if="showInfoEdit == true">
            <p>Kategoria została zedytowana!</p>
        </div>
        <div class="form-row">
            <label class="form-label col-1" for="">Nazwa kategorii</label>
            <div class="form-data col-2">
                <input  v-model="editingCategory.name" v-validate="'required'" :class="{'input': true, 'is-danger input-border': errors.has('name') }" class="form-input " type="text" name="name">
                <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
            </div>
        </div>
        <div class="form-row">
            <label for="" class="form-label col-1">Przypisz do</label>
            <multiselect
                    class="shop-select categories-form-field"
                    v-model="editingCategory.selectedCategory"
                    :options="items"
                    :allow-empty="false"
                    :searchable="false"
                    :selectedLabel="''"
                    track-by="name"
                    label="name"
                    :deselectLabel="''"
                    :selectLabel="''"
                    :hideSelected="true"
                    placeholder="Wybierz"></multiselect>
        </div>
        <div class="form-row">
            <label class="form-label col-1" for="">Aktywność</label>
            <div class="checkbox-square form-group">
                <input v-model="editingCategory.visibility" class="visibility-hidden" type="checkbox" id="checkbox">
                <label for="checkbox" class="square"></label>
            </div>
        </div>
        <div class="form-row">
            <label class="form-label col-1" for="">Opis kategorii</label>
            <div class="form-data col-2">
                <textarea v-model="editingCategory.description" class="form-textarea" name="description" id=""></textarea>
            </div>
            <div class="col-3"></div>
        </div>
        <div class="form-row">
            <label class="form-label col-1" for="">Tytuł strony</label>
            <div class="form-data col-2">
                <input  v-model="editingCategory.page_title" v-validate="'required'" :class="{'input': true, 'is-danger input-border': errors.has('title') }" class="form-input " type="text" name="title">
                <span v-show="errors.has('title')" class="help is-danger">{{ errors.first('title') }}</span>
            </div>
            <div class="form-help col-3">
                <div class="form-help-square"></div>
                <div class="form-help-cloud"><p>Pomocny Krzysztof</p></div>
            </div>
        </div>
        <div class="form-row">
            <label class="form-label col-1" for="">Meta description</label>
            <div class="form-data col-2">
                <input  v-model="editingCategory.metaDescription" class="form-input " type="text" name="metaDescription">
            </div>
            <div class="form-help col-3">
                <div class="form-help-square"></div>
                <div class="form-help-cloud"><p>Pomocny Krzysztof</p></div>
            </div>
        </div>
        <div class="form-row">
            <label class="form-label col-1" for="">Meta Keywords</label>
            <div class="form-data col-2">
                <input  v-model="editingCategory.metaKeywords" class="form-input" type="text" name="metaKeywords">
            </div>
            <div class="form-help col-3">
                <div class="form-help-square"></div>
                <div class="form-help-cloud"><p>Pomocny Krzysztof</p></div>
            </div>
        </div>
        <div class="form-row">
            <label class="form-label col-1" for="">Url</label>
            <div class="form-data col-2">
                <input  v-model="editingCategory.addressUrl" class="form-input " type="text" name="addressUrl">

            </div>
            <div class="form-help col-3">
                <div class="form-help-square"></div>
                <div class="form-help-cloud"><p>Pomocny Krzysztof</p></div>
            </div>
        </div>
        <div class="form-row">
            <button type="submit" class="custom-button col-2">Zapisz</button>
        </div>
    </form>
</template>

<script>
  export default {
    name: "edit-category",
    props:['category', 'childCategory'],
    data: () => {
      return {
        editingCategory: {
          name: '',
          description: '',
          page_title: '',
          metaDescription: '',
          metaKeywords: '',
          addressUrl: '',
          parent_id: '',
          selectedCategory: '',
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
    },
    methods: {
      updateCategory() {
        this.$validator.validateAll().then((result) => {
          if (result) {
              axios.put('categories/' + this.editingCategory.id , {
                editedCategory: this.editingCategory
              });
            this.showInfoEdit = true
            setTimeout(() => {
              this.$parent.$data.type = 2
            }, 500)
          }
        })
      },
    },
    created: function () {
      axios('all-categories')
        .then(result => {
          this.items = result.data

        });

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