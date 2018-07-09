<template>
  <div>
    <div class="l-wrapper f-center">

      <!-- tutaj trzeba zrobić kolumny -->
      <div style="width: 100%;" class="f-content">
        <form action="" class="c-form" @submit.prevent="saveVendor">

          <div class="c-form__fieldset">
            <div class="c-form__field-wrapper">
              <custom-input :label="'Nazwa'" rules="required" min-input-length="4" v-model="vendor.name" />
            </div>
          </div>
          <div class="c-form__fieldset">
            <div class="c-form__switch">
              <div class="c-form__switch-label">Aktywność</div>

              <div class="c-form__switch-control">
                <input type="checkbox" id="is_visible" v-model="vendor.is_visible">
                <label for="is_visible"></label>
              </div>
            </div>
          </div>
          <div class="c-form__fieldset" v-if="showMessage">
            <div class="err-info" >
              <span>{{errorMessage}}</span>
            </div>
          </div>
          <div class="c-form__fieldset dropzone__label">
            <span>Logo</span>
          </div>
          <div class="c-form__fieldset">
            <vue2-dropzone id="dropzone" :options="dropzoneOptions" @vdropzone-error="uploadError($event)" ref="vendorDrop"></vue2-dropzone>
          </div>

          <div class="h-center">
            <button type="submit" class="c-button c-form__button">
              <span>Zapisz</span>
            </button>
          </div>

        </form>

      </div>
    </div>

  </div>

</template>

<script>
  import env from '../../env'

  export default {
    name: "add-vendor",

    data() {
      return {
        showMessage: false,
        errorMessage: '',
        dropzoneOptions: {
          url: env.API_URL + 'vendors/check-logo',
          autoProcessQueue: false,
          thumbnailWidth: 150,
          thumbnailHeight: 150,
          maxFilesize: 0.5,
          maxFiles: 2,
          headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
          dictDefaultMessage: 'Upuść lub wybierz plik',
          addRemoveLinks: true,
          dictCancelUpload: 'Usuń',
          dictMaxFilesExceeded: 'Możesz wybrać tylko jeden plik',
          dictRemoveFile: 'Usuń',
          acceptedFiles: 'image/*'
        },
        vendor: {
          name: '',
          is_visible: '',
        }

      }
    },
    methods: {
      uploadError(event) {
        console.log(event)
      this.$refs.vendorDrop.removeFile(event)
        this.showErrorMessage()

      },
      showErrorMessage() {
        this.showMessage = true
        this.errorMessage = 'Sprawdź rozmiar lub typ swojego pliku'
        setTimeout(() => {
          this.showMessage = false
        }, 7000)
      },
      saveVendor() {
        this.vendor.logo = this.$refs.vendorDrop.getQueuedFiles()
        console.log(this.vendor)
        this.$validator.validateAll().then((result) => {
          if (result) {
            axios.post('/vendors', this.vendor).then(() => {
        
              this.$router.push('/vendors/list')
            })
          }
        });
      },
    },
    created(){
     // console.log(env)
    }
  }

</script>

<style scoped>
  /*SWITCh*/

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

  .err-info{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 15px;
    background-color: red;
    border-radius: 3px;
    color: white;
    font-size: 120%;
    width: 100%;
    height: 30px;
  }
  .dropzone__label{
    position: absolute;
    z-index: 2000;
    background-color: white;
    margin-left: 15px;
    margin-top: -5px;
    font-size: 120%;
  }

</style>
