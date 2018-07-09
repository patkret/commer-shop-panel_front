<template>

          
  <div class="c-table">
      <table>
        <thead>
          <tr>
            
           
            <th>ID</th>
            <th>Tytuł</th>
            <th>Treść</th>
            <th>Data do wysłania</th>
            <th>Aktywność</th>    
            <th>Akcja</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(email, key) in emails">
           
            <td>{{email.id}}</td>
            <td>{{email.title}}</td>
            <td>{{email.content}}</td>
            <td>{{email.shippingTime}}</td>
            <td>
              <div class="c-form__fieldset">
                <div class="c-form__switch">
                  <div class="c-form__switch-control">
                    <input type="checkbox" :id="email.id" v-model="email.active" @change="changeActive(email.id, email.active)">
                    <label :for="email.id"></label>
                  </div>
                </div>
              </div>
            </td>
            <td data-th="Akcja" class="h-relative">
              <span class="c-actions-button js-actions-button" @click="showActions(key)">
                <i></i>
              </span>
              <div :class="{'c-actions js-actions': true , 'c-actions js-actions is-active': index === key}">
                <div class="c-actions__row">
                  <button class="c-actions__item" @click="deleteEmail(email)">Usuń</button>
                  <router-link :to="'edit/' + email.id" class="c-actions__item">Edytuj</router-link>
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
    name: "emails-list",
    data () {
      return {
        emails: [],
        index: ''
      }
    },
    methods: {
       changeActive(id, active){
          console.log(id, active)
            axios.put('/emails/'+id+'/change-active').then(result => {
                console.log(result)
            })
        },
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
        deleteEmail(email){
            this.$swal({
          title: 'Czy chcesz usunąć emaila?',
          text: 'Ta akcja nieodwracalnie go usunie',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          cancelButtonText: 'Anuluj',
          confirmButtonText: 'Usuń',
        }).then((result) => {
            if(result.value) {
              let itemIndex = this.emails.map(x => x.id).indexOf(email.id)
              this.emails.splice(itemIndex, 1)
              axios.delete('emails/' + email.id).then(
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
      axios('emails').
      then(result => {
        console.log(result.data)
        this.emails = result.data
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
</style>