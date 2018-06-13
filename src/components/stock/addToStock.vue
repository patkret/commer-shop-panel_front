<template>
    <div class="l-wrapper f-center">
        <div style="width: 100%;" class="f-content">
            <form action="" class="c-form" @submit.prevent="addToStock">

                <div class="c-form__fieldset">
                    <div class="c-form__field-wrapper double-column">
                        <div class="c-column__one">
                            <custom-input :label="'Cena zl'" rules="required|numeric" min-input-length="1" v-model="price_zl" />
                        </div>
                        <span class="price__dot">.</span>
                        <div class="c-column__two">
                            <custom-input :label="'Cena gr'" rules="numeric|max_value:99" min-input-length="0" v-model="price_zl"/>
                        </div>
                    </div>
                </div>
                <div class="c-form__fieldset c-form_row">
                    <div class="c-form__field-wrapper">
                        <custom-input :label="'Ilość'" rules="required|numeric" min-input-length="1" v-model="warehouse_item.quantity"/>
                    </div>
                </div>

                <!--<div class="c-form__fieldset">-->
                <!--<div class="c-form__field-wrapper">-->
                <!--<custom-input :label="'Test'" rules="" min-input-length="2" v-model="test"/>-->
                <!--</div>-->
                <!--</div>-->
                <div class="h-center">
                    <button type="submit" class="c-button c-form__button">
                        <span>Zapisz</span>
                    </button>
                </div>

            </form>

        </div>
    </div>
        <!--<div class="form-row header">-->
            <!--<label class="form-label col-1"></label>-->
            <!--&lt;!&ndash;<h3 class="stock-name">Dodaj do: {{stock.name}}</h3>&ndash;&gt;-->
            <!--<button type="text" class="return-button" @click="returnToList">wróć do listy</button>-->
        <!--</div>-->
        <!--<div class="form-row">-->
            <!--<label class="form-label col-1">Ilość</label>-->
            <!--<div class="form-data col-2">-->
                <!--<input v-model="quantity" v-validate="'required|numeric'"-->
                       <!--:class="{'input': true, 'is-danger input-border': errors.has('quantity') }" class="form-input "-->
                       <!--type="text" name="quantity" placeholder="szt">-->
                <!--<span v-show="errors.has('quantity')" class="help is-danger">{{ errors.first('quantity') }}</span>-->
            <!--</div>-->
        <!--</div>-->
        <!--<div class="form-row">-->
            <!--<label class="form-label col-1">Cena (netto)</label>-->
            <!--<div class="form-data col-2" style="width: 150px">-->
                <!--<input v-model="price_zl" v-validate="'required|numeric'"-->
                       <!--:class="{'input': true, 'is-danger input-border': errors.has('price_zl') }" class="form-input "-->
                       <!--type="text" name="price_zl" placeholder="zł">-->
                <!--<span v-show="errors.has('price_zl')" class="help is-danger">{{ errors.first('price_zl') }}</span>-->
            <!--</div>-->
            <!--<div class="form-data col-3">-->
                <!--<input v-model="price_gr" v-validate="'numeric|max_value:99'"-->
                       <!--:class="{'input': true, 'is-danger input-border': errors.has('price') }" class="form-input "-->
                       <!--type="text" name="price" placeholder="gr">-->
                <!--<span v-show="errors.has('price')" class="help is-danger">{{ errors.first('price') }}</span>-->
                <!--<p>.</p>-->
            <!--</div>-->
        <!--</div>-->
        <!--<div class="form-row col-2">-->
            <!--<button type="submit" class="custom-button col-2">ZAPISZ</button>-->
        <!--</div>-->
    <!--</form>-->
</template>

<script>
  export default {
    name: 'add-to-stock',
    // props: ['stock'],
    data: () => ({
      warehouse_item: {
        warehouse_id: '',
        price: '',
        group_id: '',
        added_at: '',
      },
      quantity: '',
      price_zl: '',
      price_gr: ''
    }),

    watch: {
      price_zl: function (val) {
        this.warehouse_item.price = val
      }
    },

    methods: {
      addToStock () {
        if(this.price_gr == ''){
          this.warehouse_item.price = this.price_zl + '.' + '00'
        }
        else {
          this.warehouse_item.price = this.price_zl + '.' + this.price_gr
        }
        let date = new Date() + ''
        const date_arr = date.split(' ')
        this.warehouse_item.added_at = date_arr[2] + ' ' + date_arr [1] + ' ' + date_arr[3] + ' ' + date_arr[4]

        this.$validator.validateAll().then((result) => {

          if (result) {
            axios.post('warehouse-items', {
              warehouse_item: this.warehouse_item,
              quantity: this.quantity,
            }).then(() => {
              this.$parent.$data.type = 1
            })
          }
        })
      },

      returnToList () {
        this.$parent.$data.type = 1
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

<!--<style scoped>-->
    <!--.stock-name {-->
        <!--margin-left: -85px;-->
    <!--}-->

    <!--.stock-cont {-->
        <!--margin-left: 55px;-->
    <!--}-->

    <!--.form-row {-->
        <!--display: grid;-->
        <!--margin: 20px 0;-->
        <!--grid-template-areas: 'col-1 col-2 col-3';-->
        <!--grid-template-columns: 130px 320px;-->
    <!--}-->

    <!--.col-1 {-->
        <!--grid-area: col-1;-->
    <!--}-->

    <!--.col-2 {-->
        <!--grid-area: col-2;-->

    <!--}-->
    <!--.col-3{-->
        <!--grid-area: col-3;-->
        <!--width: 150px;-->
        <!--margin-left: -150px;-->
    <!--}-->

    <!--.col-3 p{-->
        <!--margin-top: -25px;-->
        <!--margin-left: 2px;-->
        <!--font-size: 150%;-->
        <!--width: 5px;-->
    <!--}-->

    <!--.form-data {-->
        <!--display: flex;-->
        <!--flex-direction: column;-->
        <!--flex-wrap: wrap;-->
    <!--}-->

    <!--.form-label {-->
        <!--font-weight: 700;-->
        <!--margin-top: 10px;-->
        <!--margin-right: 15px;-->
        <!--font-size: 12px;-->
        <!--text-align: right;-->
        <!--font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;-->
    <!--}-->

    <!--.form-input {-->
        <!--background-color: #ffffff;-->
        <!--margin-left: 10px;-->
        <!--margin-right: 10px;-->
        <!--border-radius: 5px;-->
        <!--height: 35px;-->
        <!--line-height: 35px;-->
        <!--padding-left: 10px;-->
        <!--border: none;-->
        <!--font-size: 12px;-->
        <!--font-weight: 700;-->
        <!--width: 100%;-->
    <!--}-->

    <!--.input-border {-->
        <!--border: 2px solid red;-->
        <!--border-bottom-left-radius: 0;-->
        <!--border-bottom-right-radius: 0;-->
    <!--}-->

    <!--.form-data span {-->
        <!--background-color: red;-->
        <!--border-radius: 5px;-->
        <!--color: #fff;-->
        <!--padding: 10px 0 10px 14px;-->
        <!--font-size: 12px;-->
        <!--font-weight: 700;-->
        <!--margin-left: 10px;-->
        <!--border-top-right-radius: 0;-->
        <!--border-top-left-radius: 0;-->
        <!--width: 100%;-->
    <!--}-->

    <!--.header {-->
        <!--display: inline-flex;-->
        <!--margin-left: 155px;-->
    <!--}-->

    <!--.return-button {-->
        <!--background: none;-->
        <!--border: none;-->
        <!--color: #2595ec;-->
        <!--text-decoration: underline;-->
        <!--font-size: 80%;-->
        <!--margin-left: 50px;-->
    <!--}-->

<!--</style>-->

<style scoped>
    .f-center{
        grid-template-columns: 17% 1fr 17%;
    }
    .double-column{
        display: grid;
        grid-template-columns:  1fr 1fr 20px 1fr 1fr ;
        grid-template-areas:
                " . one dot two ."
    }
    .c-column__one{
        grid-area: one;
    }
    .c-column__two{
        grid-area: two;
    }
    .price__dot{
        height: 30px;
        grid-area: dot;
        font-size: 200%;
        justify-content: center;
        justify-self: center;
        align-self: center;
    }
    .c-form_row{
        grid-area: full-row;
    }
    </style>
