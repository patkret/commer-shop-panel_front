<template>
    <div class="l-wrapper f-center">
        <div style="width: 100%;" class="f-content">
            <form action="" class="c-form form-grid" @submit.prevent="addToStock">
                <div class="c-form__fieldset form__first-row">
                    <div class="c-form__field-wrapper double-column">
                        <div class="c-column__one">
                            <custom-input :label="'Cena zl'" rules="required|numeric" min-input-length="1"
                                          v-model="price_zl"/>
                        </div>
                        <span class="price__dot">.</span>
                        <div class="c-column__two">
                            <custom-input :label="'Cena gr'" rules="numeric|max_value:99" min-input-length="0"
                                          v-model="price_gr"/>
                        </div>
                    </div>
                </div>
                <div class="c-form__fieldset form__second-row">
                    <div class="c-form__field-wrapper form--second-row__input">
                        <custom-input :label="'Ilość'" rules="required|numeric" min-input-length="1"
                                      v-model="quantity"/>
                    </div>
                </div>
                <div class="h-center">
                    <button type="submit" class="c-button c-form__button">
                        <span>Zapisz</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'add-to-stock',
    data: () => ({
      warehouse_item: {
        warehouse_id: '',
        price: '',
        group_id: '',
        added_at: '',
      },
      quantity: '',
      price_zl: '',
      price_gr: '',
    }),

    watch: {
      price_zl: function (val) {
        this.warehouse_item.price = val
      },
    },

    methods: {
      addToStock () {

        if (this.price_gr == '') {
          this.warehouse_item.price = this.price_zl + '.' + '00'
        }
        else {
          this.warehouse_item.price = this.price_zl + '.' + this.price_gr
        }
        let date = new Date() + ''
        const date_arr = date.split(' ')
        this.warehouse_item.added_at = date_arr[2] + ' ' + date_arr [1] + ' ' + date_arr[3] + ' ' + date_arr[4]

        this.$validator.validateAll().then((result) => {
          console.log(this.warehouse_item)
          if (result) {
            axios.post('warehouse-items', {
              warehouse_item: this.warehouse_item,
              quantity: this.quantity,
            }).then(() => {
              this.$router.push('/stock/items/' + this.warehouse_item.warehouse_id)
            })
          }
        })
      },
    },

    created: function () {
      this.warehouse_item.warehouse_id = this.$route.params.item
      axios('last-group-id').then(result => {
        this.warehouse_item.group_id = result.data + 1
      })

    },
  }
</script>


<style scoped>
    .form-grid {
        display: grid;
        grid-template-rows: 1fr 1fr;
        grid-template-areas: "first-row" "second-row";

    }

    .c-column__one {
        grid-area: one;
    }

    .c-column__two {
        grid-area: two;
    }

    .form__first-row {
        grid-area: first-row;
    }

    .form__second-row {
        grid-area: second-row;
        display: grid;
        grid-template-columns: 1fr 3fr 20px 3fr 1fr;
        grid-template-areas: ". input input input .";
    }

    .form--second-row__input {
        grid-area: input;
    }

    .double-column {
        display: grid;
        grid-template-columns: 1fr 3fr 20px 3fr 1fr;
        grid-template-areas: " . one dot two ."
    }

    .price__dot {
        height: 30px;
        grid-area: dot;
        font-size: 200%;
        justify-content: center;
        justify-self: center;
        align-self: center;
    }
</style>
