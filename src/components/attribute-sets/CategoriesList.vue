<template>
    <div id="side-menu">
        <ul class="all-categories">
            <li v-for="category in categories" class="cat-item">
                <label class="check-container">
                    <p :class="{'label': true, 'label inactive': category.visibility == 0} ">
                        {{category.name}}
                    </p>
                    <input type="checkbox" v-model="selectedMainCategories" :value="category.id">
                    <span class="checkmark"></span>
                </label>
                <ul class="category-list">
                    <li class="cat-item" v-for="child in category.children">
                        <label class="check-container">
                            <p :class="{'label': true, 'label inactive': child.visibility == 0}">{{child.name}}</p>
                            <input type="checkbox" v-model="selectedChildren" :value="child.id">
                            <span class="checkmark"></span>
                        </label>
                        <drag v-if="child.children" :children="child.children" :child="child"></drag>
                    </li>
                </ul>

            </li>
        </ul>
    </div>
</template>

<script>
    import drag from './Drag'
  export default {
    components: {
      drag,
    },
    name: 'categories-list',
    props: ['attributeMainCategories', 'attributeChildren'],
    data: () => ({
      categories: [],
      selectedMainCategories: [],
      selectedChildren: [],
      selectedElement: [],
    }),

    watch: {
      selectedMainCategories: function () {
        this.$emit('mainCategories', this.selectedMainCategories)
      },
      selectedChildren: function () {
        this.$emit('children', this.selectedChildren)
      },
      attributeChildren: function (e) {
        this.selectedChildren = e
      }
    },

    created: function () {
      axios('categories').then(result => {
        this.categories = result.data
      })
      if (this.attributeMainCategories != null) {
        this.selectedMainCategories = this.attributeMainCategories
      }
    },
  }

</script>

<style scoped>
    #side-menu {
        width: 50%;
        margin-left: -5px;
    }
    .all-categories {
        margin-top: 20px;
    }
    .inactive {
        color: #B9B7B9;
    }
    .category-list {
        padding-left: 0px;
    }
    .cat-item {
        padding-left: 25px;
    }
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
</style>