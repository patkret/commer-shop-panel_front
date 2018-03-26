<template>
    <div id="side-menu">
        <ul>
            <li v-for="category in categories" class="cat-item">
                <input type="checkbox" v-model="selectedMainCategories" :value="category.id">
                <label :class="{'label': true, 'label inactive': category.visibility == 0} ">{{category.name}}</label>
                <ul class="children">
                <li v-for="child in category.children">
                    <input type="checkbox" v-model="selectedChildren" :value="child.id">
                    <label :class="{'label': true, 'label inactive': child.visibility == 0}">{{child.name}}</label>
                </li>
            </ul>
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: 'categories-list',
    data: () => ({
      categories: [],
      selectedMainCategories: [],
      selectedChildren: [],
    }),

    watch: {
      selectedMainCategories: function () {
        this.$emit('mainCategories', this.selectedMainCategories)
      } ,
      selectedChildren: function () {
        this.$emit('children', this.selectedChildren)
      }
    },

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
   .cat-item li{
       margin-bottom: 15px;
       margin-left: -10px;
   }
   #side-menu li{
       margin-bottom: 15px;
   }

   .children{
       padding-top: 10px;
   }
   .inactive{
       color: #B9B7B9;
   }
   /*.cat-item input{*/
       /*visibility: hidden;*/
   /*}*/


    /*.cust-check{*/
        /*cursor: pointer;*/
        /*position: relative;*/
        /*width: 35px;*/
        /*height: 35px;*/
        /*top: 0;*/
        /*left: 0;*/
        /*background: #FFFFFF;*/
        /*border:1px solid #ddd;*/
        /*padding-right: 17px;*/
        /*border-radius: 3px;*/
    /*}*/

     /*.cust-check::after {*/
        /*opacity: 1;*/
        /*content: '';*/
        /*position: absolute;*/
        /*width: 9px;*/
        /*height: 5px;*/
        /*background: transparent;*/
        /*top: 3px;*/
        /*left: 3px;*/
        /*border: 3px solid #333;*/
        /*border-top: none;*/
        /*border-right: none;*/

        /*transform: rotate(-45deg);*/
    /*}*/
    /*.cat-item input[type=checkbox]:checked + .cust-check:after {*/
        /*opacity: 1;*/
    /*}*/


</style>