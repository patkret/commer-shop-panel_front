<template>
    <div id="main-content-with-side-menu">
        <h1 class="card-name">Atrybuty</h1>
        <div class="side-menu-container">
            <div id="side-menu">
                <div class="side-menu-item">
                    <p>Dodaj atrybut</p>
                </div>
                <div class="side-menu-item">
                    <p>Wszystkie atrybuty</p>
                </div>
            </div>
        </div>
        <div class="component-container">
            <attribute-set-form></attribute-set-form>
        </div>
    </div>
</template>

<script>
  import AttributeSetForm from './AttributeSetForm'
  export default {
    components: {
      AttributeSetForm
    },
    name: 'attribute-sets',
  }
</script>

<style scoped>

</style>