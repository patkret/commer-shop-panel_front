<template>
    <div class="l-wrapper">
        <div style="width: 100%;">
            <div class="c-form">
                <div class="f-first-col">
                    <div class="c-form__fieldset radio_buttons">
                        <div class="c-form__radio">
                            <input type="radio" id="id_radio_1" name="nazwa_radio">
                            <label for="id_radio_1">
                                <span>Paragon</span>
                            </label>
                        </div>
                        <div class="c-form__radio">
                            <input type="radio" id="id_radio_2" name="nazwa_radio">
                            <label for="id_radio_2">
                                <span>Faktura</span>
                            </label>
                        </div>
                    </div>
                    <custom-input label="Nazwa firmy" min-input-length="3" rules=""
                                  v-model="order.client.company"></custom-input>
                    <div class="button__row">
                            <custom-input label="NIP" v-model="order.client.street" rules=""
                                          min-input-length="4"></custom-input>
                            <button type="button" class="c-button c-form__button"><span>Pobierz GUS</span></button>

                    </div>
                    <custom-input label="NIP" min-input-length="3" rules=""
                                  v-model="order.client.last_name"></custom-input>
                    <div class="c-form__fieldset">
                        <div class="c-form__field-wrapper">
                            <custom-input label="Ulica" v-model="order.client.street" rules=""
                                          min-input-length="4"></custom-input>
                        </div>
                        <div class="c-form__field-wrapper c-form__field-wrapper--short">
                            <custom-input label="M" v-model="order.client.house_no" rules=""
                                          min-input-length="1"></custom-input>
                        </div>
                        <div class="c-form__field-wrapper c-form__field-wrapper--short">
                            <custom-input label="LOK" v-model="order.client.apartment_no" rules=""
                                          min-input-length="4"></custom-input>
                        </div>
                    </div>
                    <custom-input label="Miejsowość" v-model="order.client.city" rules=""
                                  min-input-length="3"></custom-input>

                    <div class="c-form__fieldset">
                        <div class="c-form__field-wrapper">
                            <custom-input label="Kod pocztowy" v-model="order.client.zip_code" rules=""
                                          min-input-length="4"></custom-input>
                        </div>
                        <div class="c-form__field-wrapper c-form__field-wrapper--short">

                        </div>
                        <div class="c-form__field-wrapper c-form__field-wrapper--short">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

  export default {
    name: 'client-info',
    computed: {
      order () {
        return this.$store.getters.getOrder
      },
      clients () {
        return this.$store.getters.getClients
      },
    },
    methods: {

    },
  }
</script>

<style scoped>
    .c-form__fieldset {
        margin-bottom: 5px;
    }

    .c-form {
        display: grid;
        grid-template-columns: 2fr 3fr;
        grid-gap: 70px;
    }

    .radio_buttons {
        padding-bottom: 10px;
    }
    .button__row{
        width: 130%;
        display: grid;
        grid-gap: 25px;
        grid-template-columns: 4fr 1fr;
    }
    .c-button{
        padding: 0;
    }
    .c-form__button{
        margin-top: 0;
    }

</style>