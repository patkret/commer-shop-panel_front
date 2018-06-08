<template>
    <div class="paginator">

            <button>{{current_page}}</button>

    </div>

</template>

<script>
  export default {
    props: ['current_page','last_page'],
    name: 'paginator',
    data: () => ({
      items: [
         '1',
         '2',
         '3',
         '4',
         '5',
         '6',
         '7',
      ]
    })
  }
</script>

<style scoped>
.paginator{
    display: inline-flex;
}

</style>