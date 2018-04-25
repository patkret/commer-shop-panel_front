<template>
    <div>
        <h3 class="header" v-if="sets.length > 0">Wybierz zestawy atrybutów dla produktu</h3>
        <div class="info" v-if="sets.length == 0">
            <p>BRAK ZESTAWÓW ATRYBUTÓW</p>
        </div>
        <ul>
            <li v-for="item in selectedSets">
                <label class="check-container">
                    <div class="attr-header">
                        <p class="label">
                            {{item.name}}
                        </p>
                    </div>
                    <input type="checkbox" @click="addToSets(item)" :checked=true>
                    <span class="checkmark"></span>
                </label>
                <transition name="fade">
                    <div class="attr-list">
                        <div v-for="attribute in item.attributes">
                            <div v-if="attribute.type.type === 0" class="attr-list-row">
                                <label class="attr-label">
                                    {{attribute.name}}
                                </label>
                                <div class="attr-type">
                                    <input type="text" name="defValue" v-model="attribute.defaultValue"
                                           class="attr-input">
                                </div>
                            </div>
                            <div v-if="attribute.type.type === 1" class="attr-list-row">
                                <label class="attr-label">{{attribute.name}}</label>
                                <div class="checkbox-square form-group attr-type"
                                     v-if="attribute.visibility === true || 1">
                                    <input type="checkbox" id="def-checked" class="visibility-hidden"
                                           v-model="attribute.checked">
                                    <label for="def-checked" class="square"></label>
                                </div>
                            </div>
                            <div v-if="attribute.type.type === 2" class="attr-list-row">
                                <label class="attr-label">{{attribute.name}}</label>
                                <multiselect
                                        class="shop-select attr-type"
                                        v-model="attribute.defaultValue"
                                        :options="attribute.selectOptions"
                                        :allow-empty="false"
                                        :searchable="false"
                                        :selectedLabel="''"
                                        track-by="name"
                                        label="name"
                                        :deselectLabel="''"
                                        :selectLabel="''"
                                        :hideSelected="true"
                                        placeholder="Wybierz"></multiselect>
                            </div>

                        </div>
                    </div>
                </transition>
            </li>
            <li v-for="set in sets" class="cat-item">
                <label class="check-container">
                    <div class="attr-header">
                        <p class="label">
                            {{set.name}}
                        </p>
                    </div>
                    <input type="checkbox" @click="removeFromSets(set)" :checked="false">
                    <span class="checkmark"></span>
                </label>
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: 'attribute-sets',
    computed: {
      sets: {
        get: function () {
          if (this.$store.state.product.attributeSets.length !== 0) {
            return this.$store.getters.getNotSelectedSets
          }
          return this.$store.getters.sets
        },

        set: function (value) {
          this.$store.commit('getSets', value)

        },

      },

      selectedSets: {
        get: function () {
          return this.$store.getters.getProductAttributeSets
        },

        set: function (value) {
          this.$store.commit('saveProductAttributes', value)
        },
      },

    },

    methods: {
      removeFromSets (set) {
        this.selectedSets.push(set)
        // let index = this.sets.indexOf(set)
        // this.sets.splice(index, 1)

      },
      addToSets (item) {
        this.sets.unshift(item)
        let index = this.selectedSets.indexOf(item)
        this.selectedSets.splice(index, 1)
      },
    },

    created: function () {

      if (this.$store.state.sets.length === 0 && this.$store.state.product.attributeSets.length === 0) {
        this.$store.dispatch('getSets')
      }
      else if (this.$store.state.sets.length === 0 && this.$store.state.product.attributeSets.length !== 0) {
        this.$store.dispatch('getSets')
      }
      else {
      }

    },

    beforeDestroy: function () {

      this.$store.commit('saveProductAttributes', this.selectedSets)
      this.$store.commit('getSets', this.sets)
    },
  }
</script>

<style scoped>

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
        margin-top: -40px;
        margin-left: -30px;
    }

    .checkmark {
        position: absolute;
        top: 10px;
        left: 0;
        height: 23px;
        width: 23px;
        background-color: #FFFFFF;
        border: 1px solid #DAD8DA;
        border-radius: 5px;
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

    .attr-list {
        margin: 35px 0 0 80px;
    }

    .attr-list-row {
        display: grid;
        grid-template-columns: 15% 30px 80%;
        grid-template-areas: "attr-label . attr-type";
        margin-bottom: 25px;

    }

    .attr-label {
        grid-area: attr-label;
        align-self: center;
    }

    .attr-type {
        grid-area: attr-type;
    }

    .attr-input {
        padding: 15px;
        border: none;
        border-radius: 5px;
        width: 40%;
    }

    .checkbox-square {
        margin-left: -10px;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .header {
        margin-bottom: 20px;
    }

    .attr-header {
        background-color: white;
        border-radius: 5px;
        color: black;
        height: 45px;
        margin-bottom: 10px;
        margin-left: 40px;
        width: 80%;
        font-size: 120%;
        box-shadow: 0 0 4px #62637A;
    }

    .attr-header p {
        padding: 10px 0 0 15px;
    }

    .info{
        opacity: 0.1;
        font-weight: 900;
        font-size: 300%;
        box-shadow: #cccccc;
        margin: auto;
        width: 50%;
        margin-top: 17%;


    }

    .info  p{
        text-shadow: 2px 2px #2D2E2F;
        align-self: center;
        justify-self: center;
    }
</style>