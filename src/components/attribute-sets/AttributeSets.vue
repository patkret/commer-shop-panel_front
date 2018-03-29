<template>
    <div id="main-content-with-side-menu">
        <h1 class="card-name">Zestawy atrybutów</h1>
        <div class="side-menu-container">
            <div id="side-menu">
                <div class="side-button" :class="{'side-menu-item': true, 'side-menu-item active': type == 1}" @click.prevent="changeComponent(1)">
                    <p>Dodaj zestaw</p>
                </div>
                <div class="side-button" :class="{'side-menu-item' : true, 'side-menu-item active': type == 2}" @click.prevent="changeComponent(2)">
                    <p>Wszystkie zestawy</p>
                </div>
                <div class="side-button side-menu-item active"  v-if="type === 3">
                    <p>Edycja zestawu</p>
                </div>
            </div>
        </div>
        <div class="component-container">
            <attribute-set-form v-if="type == 1"></attribute-set-form>
            <attribute-sets-list v-if="type == 2" @attributeSet="getAttributeSet"></attribute-sets-list>
            <attribute-sets-edit v-if="type == 3" :attributeSet="attributeSet"></attribute-sets-edit>
        </div>
    </div>
</template>

<script>
  import AttributeSetForm from './AttributeSetForm'
  import AttributeSetsList from './AttributeSetsList'
  import AttributeSetsEdit from './AttributeSetsEdit'
  export default {

    components: {
      AttributeSetsEdit,
      AttributeSetsList,
      AttributeSetForm
    },
    name: 'attribute-sets',
    data: () => ({
      type: 2,
      attributeSet: '',
    }),
    methods:{
      changeComponent(type){
        this.type = type
      },
      getAttributeSet(attributeSet){
        this.attributeSet = attributeSet
        this.type = 3
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