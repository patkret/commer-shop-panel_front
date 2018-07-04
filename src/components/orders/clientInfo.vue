<template>
    <div class="l-wrapper">
        <div style="width: 100%;">
            <form class="c-form" @submit.prevent="saveOrder">
            <div class="f-first-col">
                <custom-input label="Imię" min-input-length="3" rules="" v-model="order.client.first_name"></custom-input>
                <custom-input label="Nazwisko" min-input-length="3" rules="" v-model="order.client.last_name"></custom-input>
                <div class="c-form__fieldset">
                    <div class="c-form__field-wrapper">
                        <custom-input label="Ulica" v-model="order.client.street" rules="" min-input-length="4"></custom-input>
                    </div>
                    <div class="c-form__field-wrapper c-form__field-wrapper--short">
                        <custom-input label="M" v-model="order.client.house_no" rules="" min-input-length="1"></custom-input>
                    </div>
                    <div class="c-form__field-wrapper c-form__field-wrapper--short">
                        <custom-input label="LOK" v-model="order.client.apartment_no" rules="" min-input-length="4"></custom-input>
                    </div>
                </div>
                <custom-input label="Miejsowość" v-model="order.client.city" rules="" min-input-length="3"></custom-input>

                <div class="c-form__fieldset">
                    <div class="c-form__field-wrapper">
                        <custom-input label="Kod pocztowy" v-model="order.client.zip_code" rules="" min-input-length="4"></custom-input>
                    </div>
                    <div class="c-form__field-wrapper c-form__field-wrapper--short">

                    </div>
                    <div class="c-form__field-wrapper c-form__field-wrapper--short">

                    </div>
                </div>
                <custom-input label="Numer telefonu" v-model="order.client.phone_no" rules="" min-input-length="9"></custom-input>
                <custom-input label="E-mail" v-model="order.client.email" rules="email" min-input-length="5"></custom-input>
                <custom-textarea label="Uwagi" v-model="order.notes"></custom-textarea>

                <div class="h-center">
                    <button type="submit" class="c-button c-form__button">
                        <span>Zapisz</span>
                    </button>
                </div>

            </div>
                <div class="f-second-col">
                    <single-select :options="clients"></single-select>
                </div>


            </form>
        </div>
    </div>
</template>

<script>

  export default {
    name: 'client-info',
    computed: {
      order() {
        return this.$store.getters.getOrder
      },
      clients() {
        return this.$store.getters.getClients
      }
    },
    methods: {
      saveOrder(){

      }
    }
  }
</script>

<style scoped>
.c-form__fieldset{
    margin-bottom: 5px;
}
.c-form{
    display: grid;
    grid-template-columns: 2fr 3fr;
    grid-gap: 70px;
}

</style>