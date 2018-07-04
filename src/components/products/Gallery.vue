<template>
    <div class="l-wrapper">
        <div style="width: 50%;">
            <form action="" class="c-form">
                <vue2-dropzone id="gallery" :options="dropzoneOptions" class="main-photo" @vdropzone-file-added="upl($event)"></vue2-dropzone>
                <div class="main-image__name">
                    <span>Zdjęcie główne</span>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
  import env from '../../env'
  export default {
    name: 'gallery',
    data() {
      return {
        photo: '',
        dropzoneOptions: {
          url: env.API_URL + 'products',
          autoProcessQueue: false,
          thumbnailWidth: 295,
          thumbnailHeight: 295,
          maxFilesize: 0.5,
          maxFiles: 1,
          headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
          dictDefaultMessage: 'Upuść lub wybierz plik',
          addRemoveLinks: true,
          dictCancelUpload: 'Usuń',
          dictMaxFilesExceeded: 'Możesz wybrać tylko jeden plik',
          dictRemoveFile: 'Usuń',
          acceptedFiles: 'image/*'
        },
      }
    },
    methods: {
      upl(file){
        console.log(file)
      },
      uploadError() {

      }
    }
  }
</script>

<style scoped>
.main-photo{
    width: 330px;
    height: 330px;
}
.dropzone .dz-preview{
    margin: 0;
    padding: 0;
}
.dropzone{
    padding: 0px;
    margin-bottom: 25px;
}
.main-image__name{
    font-size: 0.9rem;
    font-weight: 500;
    width: 330px;
    display: flex;
    flex-direction: row;
    justify-content: center;

}

</style>