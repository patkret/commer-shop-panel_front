<template>

 
      <!-- tutaj trzeba zrobić kolumny -->
   
        <form action="c-form"  @submit.prevent="updatePage">
 <div class="c-form__fieldset">
            <div class="c-form__field-wrapper">
              <custom-input :label="'Tytuł'" rules="required"  v-model="page.title" />
            </div>
            </div>
           <div class="c-form__fieldset"> 
           <div class="c-form__field-wrapper">
              <custom-input :label="'Słowa kluczowe'" rules="required"  v-model="page.keywords" />
            </div>
           </div>
            <div class="description__row ">
                <label>Opis</label>
                    
            </div>
             <editor v-model="page.description"></editor>
           <div class="description__row ">
            <label>Opis</label>
           </div> 
           <editor v-model="page.content"></editor>   
           
          <div class="h-center">
            <button type="submit" class="c-button c-form__button">
              <span>Zapisz</span>
            </button>
          </div>

        </form>

  



</template>

<script>
import editor from "@tinymce/tinymce-vue";

export default {
  name: "edit-page",
  components: {
    editor: editor
  },
  data: () => {
    return {
      page: {
        title: "",
        keywords: "",
        description: "",
        content: ""
      }
    };
  },

  methods: {
    updatePage() {
      this.$validator.validateAll().then(result => {
        if (result) {
          axios.put("/static-pages/" + this.page.id, this.page).then(() => {
            this.$router.push("/static-pages/list");
          });
        }
      });
    }
  },
  created: function() {
    axios("/static-pages/" + this.$route.params.item).then(result => {
      this.page = result.data;
    });
  }
};
</script>

<style scoped>

  .switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
  }

  .switch input {
    display: none;
  }

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
    height: 15px;
    width: 15px;
    left: 4px;
    bottom: 3px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked+.slider {
    background-color: #00DE01;
  }

  input:focus+.slider {
    box-shadow: 0 0 1px #00DE01;
  }

  input:checked+.slider:before {
    -webkit-transform: translateX(18px);
    -ms-transform: translateX(18px);
    transform: translateX(18px);
  }

  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }

  .flex-row {
    display: flex;
  }

  .c-form__field--text {
    margin: 5px 20px 0 0;
    
  }

.description__row {
  display: grid;
  grid-template-columns: 130px 1fr;
  grid-gap: 60px;
  margin: 0 0 25px 0;
}
.description__row label {
        font-weight: 700;
        font-size: 0.8rem;
        margin-top: 10px;
      
    }
</style>