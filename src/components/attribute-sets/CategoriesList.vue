<template>
    <div id="side-menu">
        <ul>
            <li v-for="category in categories">{{category.name}}</li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: 'categories-list',
    data: () => ({
      categories: []
    }),
    created: function () {
      axios('categories').then(result => {
        this.categories = result.data
      })
    }
  }

</script>

<style scoped>
    #side-menu{
        width: 350px;
        margin-left: -5px;
    }
</style>