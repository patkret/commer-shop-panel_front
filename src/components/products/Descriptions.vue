<template>
    <div class="l-wrapper">
        <div style="width: 75%;">
            <form action="" class="c-form">
                <div class="description__row">
                    <label>Opis skrócony</label>
                    <editor v-model="product.shortDescription"></editor>
                </div>
                <div class="description__row">
                    <label>Opis podstawowy</label>
                    <editor v-model="product.longDescription"></editor>
                </div>
                <div class="description__row">
                    <label>Dodaj szablon</label>
                    <single-select placeholder="Szablon" :options="options" v-model="product.description_template"></single-select>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
  import editor from '@tinymce/tinymce-vue'

  export default {
    name: 'descriptions',
    components: {
      'editor': editor,
    },
    data: () => ({
      options: []
    }),
    computed: {
      product: function () {
        return this.$store.getters.getProduct
      },
    },
    methods: {
      fetchTemplates() {
        axios('description-templates').then(result => {
          this.options = result.data
        })
      }
    },
    created() {
      this.fetchTemplates();
    }
  }
</script>

<style scoped>
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