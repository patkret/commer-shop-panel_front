<template>
    <div class="l-wrapper">
        <div style="width: 100%;">
            <div class="c-form">
                <div class="f-first-col">
                    <!--<select v-if="client.shipping_details" v-model="client.shippingDetails">-->
                    <!--<option>Wybierz dane do wysyłki</option>-->
                    <!--<option v-for="item in client.shipping_details" :value="item" >-->
                    <!--<p v-if="!item.company">{{item.company}}</p>-->
                    <!--<p v-else>{{item.first_name + ' ' + item.last_name}}</p>-->
                    <!--</option>-->
                    <!--</select>-->
                    <custom-input label="Imię" min-input-length="3" rules="" v-model="client.shippingDetails.first_name"></custom-input>
                    <custom-input label="Nazwisko" min-input-length="3" rules="" v-model="client.shippingDetails.last_name"></custom-input>
                    <div class="c-form__fieldset">
                        <div class="c-form__field-wrapper">
                            <custom-input label="Ulica" v-model="client.shippingDetails.street" rules="" min-input-length="4"></custom-input>
                        </div>
                        <div class="c-form__field-wrapper c-form__field-wrapper--short">
                            <custom-input label="M" v-model="client.shippingDetails.house_no" rules="" min-input-length="1"></custom-input>
                        </div>
                        <div class="c-form__field-wrapper c-form__field-wrapper--short">
                            <custom-input label="LOK" v-model="client.shippingDetails.apartment_no" rules="" min-input-length="4"></custom-input>
                        </div>
                    </div>
                    <custom-input label="Miejsowość" v-model="client.shippingDetails.city" rules="" min-input-length="3"></custom-input>

                    <div class="c-form__fieldset">
                        <div class="c-form__field-wrapper">
                            <custom-input label="Kod pocztowy" v-model="client.shippingDetails.zip_code" rules="" min-input-length="4"></custom-input>
                        </div>
                        <div class="c-form__field-wrapper c-form__field-wrapper--short">

                        </div>
                        <div class="c-form__field-wrapper c-form__field-wrapper--short">

                        </div>
                    </div>
                    <custom-input label="Firma" v-model="client.shippingDetails.company" rules="" min-input-length="5"></custom-input>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'client-shipping-details',
    data: () =>({
      nipCheckResults: []
    }),
    computed: {
      client: {
        get() {
          return this.$store.getters.getClient
        },
        set(client) {
          this.$store.commit('setClient', client)
        }
      }
    },
    watch: {
      'client.NIP'(nip){
        if(nip.length > 5){
          axios.post('check-nip', {
            nipToCheck: nip
          }).then(result => {
            this.nipCheckResults = result.data
          })
        }
        else if(nip.length === 0){
          this.nipCheckResults = []
        }
      }
    },
    methods: {
      selectClient(client) {
        this.client = client
      },
      saveClient() {

      }
    },
    created(){
      // console.log(this.client.shipping_details)
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
    .search__results{
        border: 1px solid #dddddd;
        border-top: none;
        margin-top: -12px;
    }
    .single__result{
        font-size: 0.8rem;
        height: 45px;
        display: grid;
        grid-template-columns: 5fr 2fr;
        padding: 15px 0 15px 15px;
        cursor: pointer;
    }
    .single__result:hover{
        background-color: #F5F7FA;
    }
</style>