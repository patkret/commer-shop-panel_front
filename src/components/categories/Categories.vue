<template>
    <div>
        <h1 class="card-name">Kategorie</h1>
        <div class="categories-container">
            <div class="categories-list">
                <div class="list-container">
                    <ul :list="items" >
                        <draggable>
                            <li class="categories-list-item" v-for="item in items">
                                <img class="categories-list-img" src="../../assets/img/icons/list-plus.png" alt="plusik">
                                <a class="list-anchor" href="" @click.prevent="editCategory(item.id)">{{item.name}}</a>
                            </li>
                        </draggable>
                    </ul>
                </div>
            </div>
            <div class="categories-details">
                <form @submit.prevent="saveCategory">
                    <div class="form-row">
                        <label class="form-label col-1" for="name">Dodaj kategorie</label>
                        <div class="form-data col-2">
                            <input  v-model="name" v-validate="'required'" :class="{'input': true, 'is-danger input-border': errors.has('name') }" class="form-input " type="text" name="name">
                            <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
                        </div>
                    </div>
                    <div class="form-row">
                        <label for="" class="form-label col-1">Przypisz do</label>
                        <multiselect
                                class="shop-select categories-form-field"
                                v-model="selectedCategory"
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
                            <input class="visibility-hidden" type="checkbox" id="checkbox">
                            <label for="checkbox" class="square"></label>
                        </div>
                    </div>
                    <div class="form-row">
                        <label class="form-label col-1" for="">Opis produktu</label>
                        <div class="form-data col-2">
                            <textarea v-model="description" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('description') }" class="form-textarea" name="description" id=""></textarea>
                            <span v-show="errors.has('description')" class="help is-danger">{{ errors.first('description') }}</span>
                    </div>
                        <div class="col-3"></div>
                    </div>
                    <div class="form-row">
                        <label class="form-label col-1" for="">Tytuł strony</label>
                        <div class="form-data col-2">
                            <input  v-model="title" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('title') }" class="form-input " type="text" name="title">
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
                            <input  v-model="metaDescription" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('metaDescription') }" class="form-input " type="text" name="metaDescription">
                            <span v-show="errors.has('metaDescription')" class="help is-danger">{{ errors.first('metaDescription') }}</span>
                        </div>
                        <div class="form-help col-3">
                            <div class="form-help-square"></div>
                            <div class="form-help-cloud"><p>Pomocny Krzysztof</p></div>
                        </div>
                    </div>
                    <div class="form-row">
                        <label class="form-label col-1" for="">Meta Keywords</label>
                        <div class="form-data col-2">
                            <input  v-model="metaKeywords" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('metaKeywords') }" class="form-input " type="text" name="metaKeywords">
                            <span v-show="errors.has('metaKeywords')" class="help is-danger">{{ errors.first('metaKeywords') }}</span>
                        </div>
                        <div class="form-help col-3">
                            <div class="form-help-square"></div>
                            <div class="form-help-cloud"><p>Pomocny Krzysztof</p></div>
                        </div>
                    </div>
                    <div class="form-row">
                        <label class="form-label col-1" for="">Url</label>
                        <div class="form-data col-2">
                            <input  v-model="addressUrl" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('addressUrl') }" class="form-input " type="text" name="addressUrl">
                            <span v-show="errors.has('addressUrl')" class="help is-danger">{{ errors.first('addressUrl') }}</span>
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
            </div>
        </div>
    </div>
</template>

<script>
  import draggable from 'vuedraggable'

  export default {
    name: "Categories",
    components: {
      draggable,
    },
    data () {
      return {
        name: '',
        description: '',
        title: '',
        metaDescription: '',
        metaKeywords: '',
        addressUrl: '',
        items: [],
        selectedCategory: '',
      }
    },
    methods: {
      editCategory(id){
        let category = this.items.find(item => item.id === id)
        this.name = category.name
      },
      saveCategory () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            axios.post('/categories', {
              name: this.name,
              visibility: this.visibility,
              parent_id: this.selectedCategory.id,
            }).then(() => {
              this.$router.replace('/categories')
            })
          }
        });
      },

    },
    created: function () {
      axios('categories')
      .then(result => this.items = result.data)
    },
  }
</script>

<style scoped>
    .categories-container {
        display: grid;
        grid-template-columns: 390px 520px 1fr;
        grid-template-areas: 'categories-list categories-details' ;
    }
    .categories-list {
        grid-area: categories-list;
    }
    .categories-list-item {
        margin: 10px 0;
    }
    .categories-list-img {
        padding-bottom: 3px;
        margin-right: 5px;
    }
    .categories-details {
        grid-area: categories-details;
        margin-top: 40px;
    }
    .list-container {
        margin: 35px 50px 0 50px;
        border: 1px solid #f2f4f7;
        border-radius: 10px;
        background-color: #ffffff;
        padding: 30px;
        box-shadow: 5px 5px 5px 2px #eff1f4;
    }
    .list-anchor {
        color: #000000;
    }
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
</style>