<template>
    <div class="l-wrapper">
        <div style="width: 35%;">
            <!--<form class="c-form" @submit.prevent="saveClient">-->
                <div class="f-first-col">
                    <custom-input label="Imię" min-input-length="3" rules="" v-model="client.first_name" class="input__row"></custom-input>
                    <custom-input label="Nazwisko" min-input-length="3" rules="" v-model="client.last_name" class="input__row"></custom-input>
                    <div class="c-form__fieldset">
                        <div class="c-form__field-wrapper">
                            <custom-input label="Ulica" v-model="client.street" rules="" min-input-length="4" class="input__row"></custom-input>
                        </div>
                        <div class="c-form__field-wrapper c-form__field-wrapper--short">
                            <custom-input label="M" v-model="client.house_no" rules="" min-input-length="1" class="input__row"></custom-input>
                        </div>
                        <div class="c-form__field-wrapper c-form__field-wrapper--short">
                            <custom-input label="LOK" v-model="client.apartment_no" rules="" min-input-length="4" class="input__row"></custom-input>
                        </div>
                    </div>
                    <custom-input label="Miejsowość" v-model="client.city" rules="" min-input-length="3" class="input__row"></custom-input>

                    <div class="c-form__fieldset">
                        <div class="c-form__field-wrapper">
                            <custom-input label="Kod pocztowy" v-model="client.zip_code" rules="" min-input-length="4" class="input__row"></custom-input>
                        </div>
                        <div class="c-form__field-wrapper c-form__field-wrapper--short">

                        </div>
                        <div class="c-form__field-wrapper c-form__field-wrapper--short">

                        </div>
                    </div>
                    <custom-input label="Numer telefonu" v-model="client.phone_no" rules="" min-input-length="9" class="input__row"></custom-input>
                    <custom-input label="E-mail" v-model="client.email" rules="email" min-input-length="5" class="input__row"></custom-input>
                    <custom-input label="Firma" v-model="client.company" rules="" min-input-length="5" class="input__row"></custom-input>
                    <custom-input label="NIP" v-model="client.NIP" rules="" min-input-length="8"></custom-input>
                    <div class="search__results" v-if="nipCheckResults.length > 0">
                        <ul>
                            <li v-for="client in nipCheckResults" class="single__result" @click="selectClient(client)">
                                <p>{{client.company}}</p>
                                <p>NIP: {{client.NIP}}</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="">
                <label><input type="checkbox" v-model="ifShippingDetails">Użyj jako dane do wysyłki</label>
                </div>

                <!--<div class="f-second-col">-->
                    <!--<single-select :options="clients"></single-select>-->
                <!--</div>-->


            <!--</form>-->
        </div>
    </div>
</template>

<script>
  export default {
    name: 'client-main-info',
    data: () =>({
      nipCheckResults: [],
      ifShippingDetails: false,
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
      },
      ifShippingDetails(ifChecked){
        ifChecked ? setShippingDetails() : ''
      }
    },
    methods: {
      setShippingDetails() {
        let tempClient = JSON.stringify(JSON.parse(this.client))
        this.client.shippingDetails.first_name = tempClient.first_name;
        this.client.shippingDetails.last_name = tempClient.last_name;
        this.client.shippingDetails.city = tempClient.city;
        this.client.shippingDetails.street = tempClient.street;
        this.client.shippingDetails.house_no = tempClient.house_no;
        this.client.shippingDetails.apartment_no = tempClient.apartment_no;
        this.client.shippingDetails.zip_code = tempClient.zip_code;
      },
      selectClient(client) {
        client.shippingDetails = {
          first_name: '',
            last_name: '',
            company: '',
            city: '',
            zip_code: '',
            apartment_no: '',
            house_no: '',
        }
        this.client = client
      },
      // saveClient() {
      //   if(!this.client.shippingDetails.house_no){
      //     this.client.shippingDetails  = this.client
      //   }
      //   this.$validator.validateAll().then(result => {
      //     if(result){
      //       axios.post('clients', {
      //         client: this.client
      //       }).then(() => {
      //
      //       })
      //     }
      //   })
      //
      // }
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

    .input__row{
        margin-bottom: 20px;
    }
</style>
