<template>

          
  <div class="c-table">
      <table>
        <thead>
          <tr>
            
            <th>Wybierz</th>
            <th>ID</th>
            <th>Tytuł</th>
            <th>Słowa kluczowe</th>
            <th>Opis</th>
            <th>Treść</th>
            <th>Akcja</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(page, key) in pages">
            <td><input type="checkbox"></td>
            <td data-th="ID">{{page.id}}</td>
            <td data-th="Tytuł">{{page.title}}</td>
            <td data-th="Słowa kluczowe">{{page.keywords}}</td>
            <td data-th="Opis">{{page.description}}</td>
            <td data-th="Treść">{{page.content}}</td>
            <td data-th="Akcja" class="h-relative">
              <span class="c-actions-button js-actions-button" @click="showActions(key)">
                <i></i>
              </span>
              <div :class="{'c-actions js-actions': true , 'c-actions js-actions is-active': index === key}">
                <div class="c-actions__row">
                  <button class="c-actions__item" @click="deletePage(page)">Usuń</button>
                  <router-link :to="'edit/' + page.id" class="c-actions__item">Edytuj</router-link>
                </div>
              </div>
            </td>
          </tr>

        </tbody>
      </table>

      <div class="c-pagination">
      </div>
    </div>
</template>
<script>
  export default {
    name: "pages-list",
    data () {
      return {
        pages: [],
        index: ''
      }
    },
    methods: {
        showActions(key){
            if (this.index === key) {
          this.show = false
          this.index = ''
        }
        else {
          this.show = true
          this.index = key
        }
        },
        deletePage(page){
            this.$swal({
          title: 'Czy chcesz usunąć stronę?',
          text: 'Ta akcja nieodwracalnie usunie stronę',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          cancelButtonText: 'Anuluj',
          confirmButtonText: 'Usuń',
        }).then((result) => {
            if(result.value) {
              let itemIndex = this.pages.map(x => x.id).indexOf(page.id)
              this.pages.splice(itemIndex, 1)
              axios.delete('static-pages/' + page.id).then(
                result => {
                  console.log(result)
                })
              this.$swal({
                title: 'Usunięto!',
                text: 'Strona została usunięta',
                type: 'success',
                confirmButtonText: 'OK'
              })
            } else {
              this.$swal('Anulowane', 'Strona nie została usunięta.', 'info')
            }
          },
          dismiss => {
          }).catch(this.$swal.noop)
        }
    },
      created: function () {
      axios('static-pages').
      then(result => {
        console.log(result.data)
        this.pages = result.data
      });
    }
    
  }
</script>

<style scoped>
    
    .c-table table th:first-child, .c-table table td:first-child {
        width: 15px;
        text-align: left;
    }

    .c-table table th:nth-child(2), .c-table table td:nth-child(2) {
        width: 15px;
        text-align: left;
    }

    .c-table table th:nth-child(3), .c-table table td:nth-child(3) {
        width: 70%;
        text-align: left;
    }

    .l-table-filters__right {
        border-right: 1px solid #dddddd;
    }
</style>