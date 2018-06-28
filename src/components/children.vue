<template>
    <div class="children-elements">
    <li class="single__child" :key="key" v-for="(el, key) in children">

                <label class="option-label"> <input type="checkbox" :value="option"/> {{el.name}}</label>

        <div class="line"></div>
        <children v-if="el.children" :children="el.children"/>
    </li>
</div>
</template>

<script>
  export default {
    name: 'children',
    props: ['children'],
    data: () => ({
      selectedElements: []
    })
  }
</script>

<style scoped>
    .single__child{
        position: relative;
        margin-left: 20px;
    }

    .line{
        position: absolute;
        background-color: #dddddd;
        width: 139%;
        height: 1px;
        left: -250px;
    }
    .label{
        margin-left: 25px;
    }

</style>