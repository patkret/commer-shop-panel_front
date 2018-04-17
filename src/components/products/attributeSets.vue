<template>
    <div>
        <h3 class="header">Wybierz zestawy atrybutów dla produktu</h3>
        <ul>
            <li v-for="item in selectedSets">
                <label class="check-container">
                    <p class="label">
                        {{item.name}}
                    </p>
                    <input type="checkbox" v-model="selectedSets" :value="item" @click="addToSets(item)">
                    <span class="checkmark"></span>
                </label>
                <transition name="fade">
                    <div v-if="selectedSets.find(el => el === item)" class="attr-list">
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


            <li v-for="(set, index) in sets" class="cat-item">
                <label class="check-container">
                    <p class="label">
                        {{set.name}}
                    </p>
                    <input type="checkbox" v-model="selectedSets" :value="set" @click="removeFromSets(index)">
                    <span class="checkmark"></span>
                </label>
                <transition name="fade">
                    <div v-if="selectedSets.find(el => el === set)" class="attr-list">
                        <div v-for="attribute in set.attributes">
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
                                <div class="checkbox-square form-group attr-type" v-if="attribute.visibility === true">
                                    <input type="checkbox" id="checked" class="visibility-hidden"
                                           v-model="attribute.checked">
                                    <label for="checked" class="square"></label>
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
        </ul>
    </div>
</template>

<script>
  export default {
    name: 'attribute-sets',
    computed: {
      sets: function () {
        return this.$store.getters.sets
      },
    },
    data: () => ({
      selectedSets: [],

    }),

    methods: {
      removeFromSets (index) {
        this.sets.splice(index, 1)
      },

      addToSets (item) {
        axios('attribute-sets').then(result => {
          let sets = result.data
          for (let set of sets) {
            set.attributes = JSON.parse(set.attributes)
          }
          let set = sets.find(el => el.id === item.id)
          this.sets.unshift(set)
        })
      },
    },

    created: function () {

      if (this.$store.state.product.attributeSets != 0) {
        this.selectedSets = this.$store.getters.getProductAttributeSets
      }
      else {
        this.$store.dispatch('getSets')
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
        margin-top: -35px;
        margin-left: -25px;
    }

    .checkmark {
        position: absolute;
        top: 0;
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
        margin: 35px 0 0 35px;
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

    .header{
        margin-bottom: 20px;
    }
</style>