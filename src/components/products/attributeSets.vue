<template>
    <div class="items-list">
        <div class="items__info" v-if="!$store.state.products.product.main_category">
            <span>WYBIERZ KATEGORIĘ GŁÓWNĄ DLA PRODUKTU</span>
        </div>
        <div :class="{'items-list__item': true, 'item-active': selectedAttributeSets.includes(set)}" v-for="set in attributeSets">
            <div class="c-form__checkbox">
                <input type="checkbox" :id="set.id" :value="set" v-model="selectedAttributeSets" :checked="selectedAttributeSets.includes(set.id)">
                <label :for="set.id">
                    <span>{{set.name}}</span>
                </label>
            </div>
            <div class="line"></div>
            <div class="item__content" v-if="selectedAttributeSets.includes(set)">
                <div class="attributes-container">
                    <div class="single-attribute" v-for="attribute in set.attributes">
                        <span>{{attribute.name}}</span>
                        <div class="" v-if="attribute.type.type === 0">
                            <input type="text" v-model="attribute.defaultValue" class="attribute__input">
                        </div>
                        <div class="" v-if="attribute.type.type === 1">
                            <label class="check-container">
                                <input type="checkbox" v-model="attribute.checked">
                                <span class="checkmark"></span>
                            </label>
                        </div>
                        <div class="" v-if="attribute.type.type === 2">
                            <select  v-model="attribute.defaultValue" class="attribute__select">
                                <option v-for="option in attribute.selectOptions" :value="option">
                                    {{option.name}}
                                </option>
                            </select>
                        </div>

                    </div>
                </div>
                <div class="line"></div>
            </div>

        </div>
    </div>
</template>

<script>
  export default {
    name: 'attribute-sets',
    computed: {
      product: function () {
        return this.$store.getters.getProduct
      },
      attributeSets: function () {
        return this.$store.getters.getAttributeSets
      },
      selectedAttributeSets: {
        get: function () {
          return this.$store.getters.getselectedAttributeSets
        },
        set: function (value) {
          this.$store.commit('setSelectedAttributeSets', value)
        }
      }
    },

    methods: {
      fetchAttributeSets() {
        if(this.$store.state.products.product.main_category){
          this.$store.dispatch('fetchAttributeSets', this.$store.state.products.product.main_category.id)
        }
      },
      // toggleItem(id){
      //   if(this.selectedAttributeSets.includes(id)){
      //     let index = this.selectedAttributeSets.indexOf(id)
      //     this.selectedAttributeSets.splice(index, 1)
      //   }
      //   else{
      //     this.selectedAttributeSets.push(id)
      //   }
      // },
      // removeFromSets (set) {
      //   this.selectedSets.push(set)
      //   // let index = this.sets.indexOf(set)
      //   // this.sets.splice(index, 1)
      //
      // },
      // addToSets (item) {
      //   this.sets.unshift(item)
      //   let index = this.selectedSets.indexOf(item)
      //   this.selectedSets.splice(index, 1)
      // },
    },

    created: function () {
      if(this.$store.state.products.attributeSets.length == 0){
        this.fetchAttributeSets()
      }

      //
      // if(this.$store.state.product.main_category !== ''){
      //   this.$store.dispatch('getAttributeSets')
      // }

      // if (this.$store.state.sets.length === 0 && this.$store.state.product.attributeSets.length === 0) {
      //   this.$store.dispatch('getSets')
      // }
      // else if (this.$store.state.sets.length === 0 && this.$store.state.product.attributeSets.length !== 0) {
      //   this.$store.dispatch('getSets')
      // }
      // else {
      // }

    },

    beforeDestroy: function () {
      //
      // this.$store.commit('saveProductAttributes', this.selectedSets)
      // this.$store.commit('getSets', this.sets)
    },
  }
</script>

<style scoped>
    input:focus, select:focus{
        outline-width: 0;
    }
    .items-list__item {
        width: 80%;
        background-color: #ffffff;
    }

    .c-form__checkbox {
        margin-left: 25px;
    }

    .c-form__checkbox label span {
        font-weight: 700;
        font-size: 120%;
        margin-left: 20px;
        padding: 30px;
    }

    .item__content {
        background-color: #ffffff;
    }

    .line {
        width: 100%;
        height: 1px;
        background-color: #dddddd;
    }

    .item-active{
        background-color: #eef0f3;
    }
    .attributes-container{
        padding: 25px 0 25px 90px;
    }
    .single-attribute{
        height: 50px;
        /*border: 1px solid red;*/
        padding: 5px 0;
        display: grid;
        grid-template-columns: 1fr 3fr;
        align-items: center;
    }

    .single-attribute span{
        font-size: 0.8rem;
    }
    .attribute__input{
        height: 35px;
        padding-left: 10px;
        border: 1px solid #dddddd;
        width: 55%;
    }
    .attribute__select{
        height: 35px;
        padding-left: 10px;
        border: 1px solid #dddddd;
        width: 55%;
        background-color: #ffffff;
    }

    .items__info{
        width: 80%;
        height: 60vh;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2.5rem;
        color: #c5c5c5;
        opacity: 0.5;
    }






    .check-container {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 12px;
        cursor: pointer;
        font-size: 18px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .check-container p {
        padding-top: 3px;
    }

    .check-container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        left: 5px;
        top: 5px;
    }

    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 23px;
        width: 23px;
        background-color: #FFFFFF;
        border: 1px solid #DAD8DA;

    }

    .check-container:hover input ~ .checkmark {
        background-color: #ccc;
    }

    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    .check-container input:checked ~ .checkmark:after {
        display: block;
    }

    .check-container .checkmark:after {
        left: 8px;
        top: 3px;
        width: 5px;
        height: 10px;
        border: solid black;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
</style>