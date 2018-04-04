<template>
    <div>
        <h1 class="card-name">Kategorie</h1>
        <div class="categories-container">
            <div class="categories-list">
                <div class="list-container">
                    <draggable :element="'ul'"
                               :list="items"
                               class="dragArea list-group"
                               :options="{group:{name: 'g1'}}">
                        <li class="categories-list-item" v-for="(item, key) in items">
                            <img @click="collapseCategories(key)" class="categories-list-img gorka" src="../../assets/img/icons/list-plus.png" alt="plusik">
                            <a class="list-anchor" href="" @click.prevent="editCategory(item.id)">{{item.name}}</a>
                            <div v-if="underCategories[key]">
                                <drag class="list-item" v-if="item.children" :children="item.children" :item="item"></drag>
                            </div>
                        </li>
                    </draggable>

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
                        <label class="form-label col-1" for="">Opis kategorii</label>
                        <div class="form-data col-2">
                            <textarea v-model="description" class="form-textarea" name="description" id=""></textarea>
                        </div>
                        <div class="col-3"></div>
                    </div>
                    <div class="form-row">
                        <label class="form-label col-1" for="">Tytuł strony</label>
                        <div class="form-data col-2">
                            <input  v-model="title" v-validate="'required'" :class="{'input': true, 'is-danger input-border': errors.has('title') }" class="form-input " type="text" name="title">
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
                            <input  v-model="metaDescription" class="form-input " type="text" name="metaDescription">
                        </div>
                        <div class="form-help col-3">
                            <div class="form-help-square"></div>
                            <div class="form-help-cloud"><p>Pomocny Krzysztof</p></div>
                        </div>
                    </div>
                    <div class="form-row">
                        <label class="form-label col-1" for="">Meta Keywords</label>
                        <div class="form-data col-2">
                            <input  v-model="metaKeywords" class="form-input" type="text" name="metaKeywords">
                        </div>
                        <div class="form-help col-3">
                            <div class="form-help-square"></div>
                            <div class="form-help-cloud"><p>Pomocny Krzysztof</p></div>
                        </div>
                    </div>
                    <div class="form-row">
                        <label class="form-label col-1" for="">Url</label>
                        <div class="form-data col-2">
                            <input  v-model="addressUrl" class="form-input " type="text" name="addressUrl">

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
  import drag from './Drag.vue'

  export default {
    name: "Categories",
    components: {
      draggable,
      drag,
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
        justCreated: false,
        underCategories: {},
      }
    },
    watch: {
      items: {
        handler () {
          if (this.justCreated) {
            axios.patch('categories/save-orders', {
              categories: this.items,
            }).then(result => {

              console.log(result.data)

            })
          } else {
            this.justCreated = true
          }
        },
        deep: true,
      },
    },
    methods: {
      // underCategories(key) {
      //
      // },
      collapseCategories(key) {
        this.underCategories[key] = !this.underCategories[key]
        this.$forceUpdate()
      },

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
      this.items.forEach((v,k) => {
        this.underCategories[k] = false
      })
    },
  }
</script>

<style scoped>
    .gorka {
        z-index: 10;
    }
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