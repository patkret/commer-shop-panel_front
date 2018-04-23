<template>
        <form action="" @submit.prevent="addToStock" class="stock-cont">
            <div class="form-row header">
                <label class="form-label col-1"></label>
                <h3 class="stock-name">Dodaj do: {{stock.name}}</h3>
                <button type="text" class="return-button" @click="returnToList">wróć do listy</button>
            </div>
            <div class="form-row">
                <label class="form-label col-1">Ilość</label>
                <div class="form-data col-2">
                    <input v-model="quantity" v-validate="'required|numeric'"
                           :class="{'input': true, 'is-danger input-border': errors.has('quantity') }" class="form-input "
                           type="text" name="quantity">
                    <span v-show="errors.has('quantity')" class="help is-danger">{{ errors.first('quantity') }}</span>
                </div>
            </div>
            <div class="form-row">
                <label class="form-label col-1">Cena (netto)</label>
                <div class="form-data col-2">
                    <input v-model="warehouse_item.price" v-validate="'required|numeric'"
                           :class="{'input': true, 'is-danger input-border': errors.has('price') }" class="form-input "
                           type="text" name="price">
                    <span v-show="errors.has('price')" class="help is-danger">{{ errors.first('price') }}</span>
                </div>
            </div>
            <div class="form-row col-2">
                <button type="submit" class="custom-button col-2">ZAPISZ</button>
            </div>
        </form>
</template>

<script>
  export default {
    name: 'add-to-stock',
    props: ['stock'],
    data: () => ({
      warehouse_item: {
        warehouse_id: '',
        price: '',
        group_id: ''
      },
      quantity: ''

    }),

    methods: {
      addToStock(){
        axios.post('warehouse-items', {
          warehouse_item: this.warehouse_item,
          quantity: this.quantity
        }).then(() => {
          this.$parent.$data.type = 1
        })
      },

      returnToList(){
        this.$parent.$data.type = 1
      }
    },

    created: function () {
      this.warehouse_item.warehouse_id = this.stock.id
      axios('last-group-id').then(result => {
        this.warehouse_item.group_id = result.data + 1
      })
    }
  }
</script>

<style scoped>
.stock-name{
    margin-left: -85px;
}

.stock-cont{
    margin-left: 55px;
}

.form-row {
    display: grid;
    margin: 20px 0;
    grid-template-areas: 'col-1 col-2';
    grid-template-columns: 130px 520px;
}

.col-1 {
    grid-area: col-1;
}

.col-2 {
    grid-area: col-2;
}
.form-data {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}

.form-label {
    font-weight: 700;
    margin-top: 10px;
    margin-right: 15px;
    font-size: 12px;
    text-align: right;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.form-input {
    background-color: #ffffff;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 5px;
    height: 35px;
    line-height: 35px;
    padding-left: 10px;
    border: none;
    font-size: 12px;
    font-weight: 700;
    width: 40%;
}

.input-border {
    border: 2px solid red;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}

.form-data span {
    background-color: red;
    border-radius: 5px;
    color: #fff;
    padding: 10px 0 10px 14px;
    font-size: 12px;
    font-weight: 700;
    margin-left: 10px;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    width: 40%;
}

    .header{
        display: inline-flex;
        margin-left: 155px;
    }

    .return-button{
        background: none;
        border: none;
        color: #2595ec;
        text-decoration: underline;
        font-size: 80%;
        margin-left: 50px;
    }
</style>