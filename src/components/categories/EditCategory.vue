
<template>
  <div style="background-color: #ffffff; width: 40%; padding: 40px">
    <form action="" class="c-form" @submit.prevent="updateCategory()">

      <div class="c-form__fieldset">
        <div class="c-form__field-wrapper">
          <custom-input :label="'Nazwa'" v-model="category.name" rules="required" min-input-length="4" />
        </div>
      </div>
      <div class="c-form__fieldset">
        <div class="c-form__switch">
          <div class="c-form__switch-label">Aktywność</div>

          <div class="c-form__switch-control">
            <input type="checkbox" id="visibility" v-model="category.visibility">
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
                <input v-model="category.selectedCategory" type="checkbox" :value="item.id">
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
          <custom-input :label="'Tytuł'" v-model="category.page_title" rules="required" />
        </div>
      </div>
      <div class="c-form__fieldset">
        <div class="c-form__field-wrapper">
          <custom-input :label="'keywords'" v-model="category.metaKeywords" rules="required" />
        </div>
      </div>
      <div class="c-form__fieldset">
        <div class="c-form__field-wrapper">
          <custom-input :label="'description'" v-model="category.metaDescription" rules="required" />
        </div>
      </div>
      <div class="c-form__fieldset">
        <div class="c-form__field-wrapper">
          <custom-input :label="'URL'" v-model="category.addressUrl" rules="required" />
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
    // props:['category', 'childCategory'],
    data: () => {
      return {
         category: {
          //  name: '',
        //     metaDescription: '',
        // page_title: '',
        // metaKeywords: '',
        // addressUrl: '',
        // visibility: '',
        // parent_id: '',
        // items: [],
        // selectedCategory: [],
         },
       
        toggleCategory: false,
        items: [],
        showInfoEdit: false,
      }
    },
    // watch: {
    //   showInfoEdit: function () {
    //     setTimeout(() => {
    //       this.showInfoEdit = false
    //       this.$parent.$data.type = 2
    //     }, 3000)
    //   },
    //   selectedCategory: function(e) {
    //     this.editingCategory.parent_id = this.selectedCategory.id
    //   },
    //   items: function (val){
    //    this.selectedCategory = val.find(el => el.id === this.editingCategory.parent_id)
    //   },

    // },
    methods: {
      //       removeRequiredAttribute(){
      //   document.getElementById("description").required = false;
      //   document.getElementById('page_title').required = false;
      //   document.getElementById('metaDescription').required = false;
      //   document.getElementById('metaKeywords').required = false;
      //   document.getElementById('addressUrl').required = false;

      // },
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
      fetchCategory () {
        axios('/categories/' + this.$route.params.id).then(result => {
          this.category = result.data
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

       this.fetchCategory();

    
      // this.editingCategory = this.category;

      // if(this.childCategory){
      //   this.editingCategory = this.childCategory

      // }

    },
    //  beforeUpdate: function () {

    //     this.removeRequiredAttribute()

    // }
  }
</script>

<style scoped>
   
</style>