<template>
    <div style="background-color: #ffffff; width: 40%; padding: 40px">
        <form action="" class="c-form" @submit.prevent="saveCategory">

            <div class="c-form__fieldset">
                <div class="c-form__field-wrapper">
                    <custom-input :label="'Nazwa'" v-model="name" rules="required" min-input-length="4"/>
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

                        <li class="c-form__multiselect-menu-item" v-for="item in items" @click.stop>
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
                    <custom-input :label="'Tytuł'" v-model="page_title" rules="required"/>
                </div>
            </div>
            <div class="c-form__fieldset">
                <div class="c-form__field-wrapper">
                    <custom-input :label="'keywords'" v-model="metaKeywords" rules="required"/>
                </div>
            </div>
            <div class="c-form__fieldset">
                <div class="c-form__field-wrapper">
                    <custom-input :label="'description'" v-model="metaDescription" rules="required"/>
                </div>
            </div>
            <div class="c-form__fieldset">
                <div class="c-form__field-wrapper">
                    <custom-input :label="'URL'" v-model="addressUrl" rules="required"/>
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
    name: 'add-category',
    data () {
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
      }
    },

    methods: {
      //     removeRequiredAttribute(){
      //     document.getElementById("description").required = false;
      //     document.getElementById('page_title').required = false;
      //     document.getElementById('metaDescription').required = false;
      //     document.getElementById('metaKeywords').required = false;
      //     document.getElementById('addressUrl').required = false;

      //   },
      //   saveCategory () {
      //       this.$validator.validateAll().then((result) => {
      //         let parent_id = this.selectedCategory.id
      //         if (parent_id > 0) {
      //           axios.post('/categories', {
      //             name: this.name,
      //             visibility: this.visibility,
      //             page_title: this.page_title,
      //             description: this.description,
      //             parent_id: this.selectedCategory.id,
      //           }).then(() => {
      //             this.$parent.$data.type = 2
      //           })
      //         } else {
      //           axios.post('/categories', {
      //             name: this.name,
      //             visibility: this.visibility,
      //             page_title: this.page_title,
      //             description: this.description,
      //             parent_id: 0,
      //           }).then(() => {
      //             this.$parent.$data.type = 2
      //           })

    //         }
    //       })
    //     },
 saveCategory () {
       this.$validator.validateAll().then((result) => {
         if (result) {
           axios.post('/categories', {
             name: this.name,
             visibility: this.visibility,
             page_title: this.page_title,
             metaDescription: this.metaDescription,
             metaKeywords: this.metaKeywords,
             addressUrl: this.addressUrl,
             selectedCategory: this.selectedCategory,
             parent_id: this.parent_id,
           }).then(() => {
             this.$router.push('/categories/list')
             this.$emit('updateList')
           })
         }
       })
     },
      },
    },
    created: function () {
      axios('all-categories').then(result => {
        this.items = result.data
      })

      console.log(this.$router)
    },
    // beforeUpdate: function () {

    //     this.removeRequiredAttribute()

    // }

  }
</script>

<style scoped>

</style>