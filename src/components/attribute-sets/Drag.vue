<template>
    <div>
        <li class="cat-item" :key="key" v-for="(el, key) in children">
            <label class="check-container">
                <p :class="{'label': true, 'label inactive': el.visibility == 0} ">
                    {{el.name}}
                </p>
                <input type="checkbox" v-model="selectedElement" :value="el.id">
                <span class="checkmark"></span>
            </label>
                <drag v-if="el.children" :children="el.children" :item="el"></drag>
        </li>
    </div>
</template>

<script>

  export default {
    name: "drag",
    props: ['children', 'item', 'category'],
    data () {
      return {
        items: [],
        categories: [],
        selectedMainCategories: [],
        selectedChildren: [],
        selectedElement: [],
        child: '',
      }
    },
    components: {

    },
    methods: {

    },
  }
</script>

<style scoped>
    .inactive {
        color: #B9B7B9;
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
    .cat-item {
        padding-left: 25px;
    }
</style>