<template>
    <form action="" class="c-form" @submit.prevent="saveCategory">

      <div class="c-form__fieldset">
        <div class="c-form__field-wrapper">
          <custom-input :label="'Nazwa'" v-model="name" rules="required" min-input-length="4" />
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

            <li class="c-form__multiselect-menu-item" v-for="item in items" :key="item.id" @click.stop>
              <div class="c-form__checkbox">
                <input v-model="selectedCategory" type="checkbox" :value="item.id">
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
</template>

<script>
  export default {
    name: "duplicate-category",
    props: ['category', 'childCategory'],
    data: () => {
      return {
           name: '',
            metaDescription: '',
        page_title: '',
        metaKeywords: '',
        addressUrl: '',
        visibility: '',
        parent_id: '',
        items: [],
        selectedCategory: [],
        toggleCategory: false,
        showInfoDuplicate: false,
        items: [],
      }
    },
    watch: {
      showInfoDuplicate: function () {
        setTimeout(() => {
          this.showInfoDuplicate = false
          this.$parent.$data.type = 2
        }, 3000)
      },
    },
    methods: {

      duplicateCategory() {
          axios.post('/categories/' + this.duplicatingCategory.id + '/duplicate').then(() => {
            axios('categories').
            then(result => {
              this.items = Object.values(result.data)
            })
          });
        this.showInfoDuplicate = true
        setTimeout(() => {
          this.$parent.$data.type = 2
        }, 1000)
        }
    },
    created: function () {
      axios('all-categories')
        .then(result => {
          this.items = result.data
        });

      this.duplicatingCategory = this.category;

      if(this.childCategory){
        this.duplicatingCategory = this.childCategory
      }


    },
  }
</script>

<style scoped>
</style>