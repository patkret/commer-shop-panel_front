<template>
    <div id="main-content-with-side-menu">
        <h1 class="card-name">Atrybuty</h1>
        <div class="side-menu-container">
            <div id="side-menu">
                <div :class="{'side-menu-item': true, 'side-menu-item active': type == 1}" @click.prevent="changeComponent(1)">
                    <p>Dodaj atrybut</p>
                </div>
                <div :class="{'side-menu-item' : true, 'side-menu-item active': type == 2}" @click.prevent="changeComponent(2)">
                    <p>Wszystkie atrybuty</p>
                </div>
            </div>
        </div>
        <div class="component-container">
            <attribute-set-form v-if="type == 1"></attribute-set-form>
            <attribute-sets-list v-if="type == 2"></attribute-sets-list>
        </div>
    </div>
</template>

<script>
  import AttributeSetForm from './AttributeSetForm'
  import AttributeSetsList from './AttributeSetsList'
  export default {
    components: {
      AttributeSetsList,
      AttributeSetForm
    },
    name: 'attribute-sets',
    data: () => ({
      type: 2
    }),
    methods:{
      changeComponent(type){
        this.type = type
      }
    }
  }
</script>

<style scoped>
    .active{
        background-color: #F4F4F9;
        border-radius: 5px;
    }
</style>