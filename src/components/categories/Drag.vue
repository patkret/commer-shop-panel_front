<template>
    <draggable :element="'ul'" :list="children" class="dragArea list-group" :options="{group:{ name:'g1'}}">
        <li :key="key" v-for="(el, key) in children" class="drag-undercategory">
            {{el.name}}
        </li>
    </draggable>
</template>

<script>
    import draggable from 'vuedraggable'
  export default {
    name: "drag",
    props: ['children', 'item'],
    components: {
      draggable
    },
    methods: {


    },

  }
</script>

<style scoped>
.drag-undercategory {
    margin: 10px 0;
}
</style>