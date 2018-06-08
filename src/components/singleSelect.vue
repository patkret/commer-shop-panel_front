<template>
    <div class="component-container">
        <div class="component__select">
            <span class="component__select--name">Magazyn</span>
            <span class="c-arrow-down"></span>
        </div>
        <ul class="component__select-options" v-if="showOptions">
            <li class="select--option" v-for="option in options">
                <span>{{option.name}}</span>
            </li>
            <!--<li class="select&#45;&#45;option">-->
                <!--<span>dddd</span>-->
            <!--</li><li class="select&#45;&#45;option">-->
                <!--<span>dddd</span>-->
            <!--</li><li class="select&#45;&#45;option">-->
                <!--<span>dddd</span>-->
            <!--</li><li class="select&#45;&#45;option">-->
                <!--<span>dddd</span>-->
            <!--</li><li class="select&#45;&#45;option">-->
                <!--<span>dddd</span>-->
            <!--</li><li class="select&#45;&#45;option">-->
                <!--<span>dddd</span>-->
            <!--</li>-->
        </ul>
    </div>
</template>

<script>
  export default {
    name: 'single-select',
    props: ['options', 'name', 'showOptions'],
  }
</script>

<style scoped>
    .component__select {
        height: 38px;
        background-color: #F5F7FA;
        border: 1px solid #dddddd;
        line-height: 38px;
        display: grid;
        grid-template-columns: 450px 30px 20px;
    }

    .component__select--name {
        font-size: 0.8rem;
        padding: 0 0 0 25px;
    }

    .c-arrow-down{
        justify-self: end;
    }

    .component__select-options{
        max-height: 180px;
        border: 1px solid #dddddd;
        border-top: none;
        overflow: auto;
        position: absolute;
        z-index: 1500;
        width: 100%;
    }

    .select--option{
        height: 35px;
        display: grid;
        align-content: center;
        padding: 0 0 0 25px;
        background-color: #f5f5fa;
        border-bottom: 1px solid #dddddd;
    }

    .select--option:last-child{
        border-bottom: none;
    }

    .select--option:nth-child(2n){
        background-color: #ffffff;
    }
</style>