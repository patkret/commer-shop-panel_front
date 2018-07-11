<template>
    <div class="l-wrapper f-center">
        <div style="width: 100%;" class="f-content">
            <form action="" class="c-form" @submit.prevent="saveDescriptionTemplate">
                <div class="c-form__row-wrapper">
                    <div class="c-form__row-content">
                        <div class="c-form__fieldset">
                            <div class="c-form__field-wrapper">
                                <custom-input :label="'Nazwa'" rules="required" :minInputLength="3" v-model="descriptionTemplate.name"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="c-form__row-wrapper">
                    <div class="c-form__row-content">
                        <div class="c-form__fieldset">
                            <div class="c-form__field-wrapper">
                                <editor v-model="descriptionTemplate.description"></editor>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="h-center">
                    <button type="submit" class="c-button c-form__button">
                        <span>Zapisz</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'description-template',
    data: () => ({
      descriptionTemplate: {
        name: '',
        description: ''
      }
    }),
    methods: {
      saveDescriptionTemplate() {
        console.log(this.descriptionTemplate)
        this.$validator.validateAll().then(result => {
          if(result){
            if(!this.$route.params){
              axios.put(`description-templates/${this.$route.params.id}`, {
                description_template: this.descriptionTemplate
              }).then(() => {
                this.$router.push('/description-templates/list')
              })
            }
            else{
              axios.post('description-templates', {
                description_template:  this.descriptionTemplate
              }).then(() => {
                this.$router.push('/description-templates/list')
              })
            }
          }
        })
      },

      getTemplateToEdit() {
        if(!this.$route.params){
          axios(`description-templates/${this.$route.params.id}`).then(result => {
            this.descriptionTemplate = result.data
          })
        }
      }
    },
    created() {
      this.getTemplateToEdit();
    }
  }
</script>

<style scoped>
    .f-center{
        grid-template-columns: 20% 1fr 20%;
        justify-content: center;
    }
    .c-form__field-wrapper{
        padding-bottom: 30px;
    }
</style>