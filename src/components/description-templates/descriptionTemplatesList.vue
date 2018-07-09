<template>
    <div>
        <div class="c-table">
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nazwa</th>
                    <th>Akcja</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(template, key) in templates">
                    <td data-th="ID">{{template.id}}</td>
                    <td data-th="Nazwa">{{template.name}}</td>
                    <td data-th="Akcja" class="h-relative">
                                        <span class="c-actions-button js-actions-button" @click="showActions(key)">
                                            <i></i>
                                        </span>
                        <div :class="{'c-actions js-actions': true , 'c-actions js-actions is-active': index === key}">
                            <div class="c-actions__row">
                                <button class="c-actions__item" @click="deleteTemplate(template, key)">Usuń</button>
                                <router-link :to="'edit/' + template.id" class="c-actions__item" tag="button">Edytuj</router-link>
                            </div>
                        </div>
                    </td>
                </tr>

                </tbody>
            </table>

            <div class="c-pagination">
            </div>
        </div>
    </div>


</template>

<script>
  export default {
    name: 'description-templates-list',
    data: () => ({
      templates: [],
      index: ''
    }),
    methods: {
      fetchDescriptionTemplates() {
        axios('description-templates').then(result => {
          this.templates = result.data
          console.log(result.data)
        })
      },
      showActions (key) {
        if(this.index === key){
          this.show = false
          this.index = ''
        }
        else{
          this.show = true
          this.index = key
        }
      },

      deleteTemplate (item, index) {
        this.$swal({
          title: 'Czy chcesz usunąć szablon',
          text: 'Ta akcja nieodwracalnie usunie szablon',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          cancelButtonText: 'Anuluj',
          confirmButtonText: 'Usuń',
        }).then((result) => {
            if (result.value) {

              this.templates.splice(index, 1)
              axios.delete('description-templates/' + item.id).then(
                result => {
                })
              this.$swal({
                title: 'Usunięto!',
                text: 'Szablon został usunięty',
                type: 'success',
                confirmButtonText: 'OK',
              })
            } else {
              this.$swal('Anulowane', 'Szablon nie został usunięty.', 'info')
            }
          },
          dismiss => {
          }).catch(this.$swal.noop)
      },
    },
    created() {
      this.fetchDescriptionTemplates()
    }
  }
</script>

<style scoped>
    .c-table table th:first-child, .c-table table td:first-child {
        width: 15px;
        text-align: left;
    }

    .c-table table th:nth-child(2), .c-table table td:nth-child(2) {
        width: 85%;
        text-align: left;
    }

</style>