<template>
  <div>
    <form class="c-form" @submit.prevent="updateEmail">
      <div class="l-wrapper-emails f-center">
        <div style="width: 100%;" class="f-content">
          <div class="c-form__fieldset">
            <div class="c-form__field-wrapper">
              <custom-input :label="'Tytuł'" rules="required" min-input-length="4" v-model="email.title" />
            </div>
          </div>
          <div class="description__row ">
            <label>Data do wysyłki</label>
          </div>
          <date-picker v-model="email.shippingTime" lang="en" type="datetime" format ="YYYY-MM-DD HH:mm:ss" confirm></date-picker>

        </div>
      </div>
      <div class="l-wrapper-emails">
        <div class="description__row ">
          <label>Opis</label>
        </div>
        <editor style="width: 100%" v-model="email.content">
        </editor>

      </div>

      <div class="l-wrapper-emails f-center">
        <div style="width: 100%;" class="f-content">

          <div></div>



          <div class="h-center">
            <button type="submit" class="c-button c-form__button">
              <span>Zapisz</span>
            </button>
          </div>
        </div>
      </div>
    </form>
    <seo-tags></seo-tags>
  </div>


  </template>

  <script>
  import DatePicker from 'vue2-datepicker'
  import moment from 'moment'
  import seoTags from '../misc/seoTags'
  export default {
    name: "edit-email",
    components: { DatePicker, seoTags },
    data: () => {
      return {
        email: {
          title: '',
          content: '',
          shippingTime: null,
          active: 0
        }
      };
    },

    methods: {
      updateEmail() {
        this.email.shippingTime = moment(this.email.shippingTime).format("YYYY-MM-DD HH:mm:ss" )
        this.$validator.validateAll().then(result => {
          if (result) {
            axios.put("/emails/" + this.email.id, this.email).then(() => {
              this.$router.push("/emails/list");
            });
          }
        });
      }
    },
    created: function() {
      axios("/emails/" + this.$route.params.item).then(result => {
        this.email = result.data;
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
