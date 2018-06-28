<template>
        <div class="component-container"  @click="showOptions = !showOptions">
            <div class="component__select">
                <span class="component__select--name">{{value ? value.name : placeholder}}</span>
                <span class="c-arrow-down" v-if="!showOptions"></span>
                <span class="c-arrow-up" v-if="showOptions"></span>
                <transition name="slide-down">
                    <ul class="component__select-options" v-if="showOptions" >
                        <li :class="{'select--option': true, 'is-selected': value === option}" v-for="option in options" :value="option" @click.stop="selectOption(option)">
                            <label class="option-label"> <input type="checkbox" :value="option"/> {{option.name}}</label>
                            <div class="line"></div>
                            <children v-if="option.children" :children="option.children"></children>
                        </li>
                    </ul>
                </transition>
            </div>
        </div>
</template>

<script>
  import Children from './children'

  export default {
    components: {Children},
    name: 'nested-select',
    props: ['options', 'placeholder', 'value'],
    data: () => ({
      showOptions: false
    }),
    methods: {
      selectOption(option){
        this.showOptions = false
        this.$emit('input', option)
      }
    }
  }
</script>

<style scoped>
    .line{
        background-color: #dddddd;
        width: 100%;
        height: 1px;
        margin-left: 0;
    }
    .component-container{
        margin: 25px 0 25px 0;
    }
    .component__select {
        height: 38px;
        background-color: #ffffff;
        border: 1px solid #dddddd;
        line-height: 38px;
        display: grid;
        max-width: 700px;
        grid-template-columns: 10fr 1fr;
        width: 100%;
        position: relative;
        cursor: pointer;
    }

    .component__select--name {
        font-size: 0.8rem;
        padding: 0 0 0 15px;
    }

    .c-arrow-down, .c-arrow-up{
        justify-self: center;
    }

    .component__select-options{
        max-height: 300px;
        border: 1px solid #dddddd;
        border-top: none;
        overflow: auto;
        position: absolute;
        z-index: 1500;
        max-width: 700px;
        width: 100%;
        top: 38px;
        left: -1px;
        background-color: #ffffff;
        box-shadow: 0px 5px 5px #dddddd;

    }

    .component__select-options input{
        /*display: none;*/
    }

    .select--option{

        display: grid;
        align-content: center;
        /*padding: 0 0 0 25px;*/
        background-color: #ffffff;
        /*border-bottom: 1px solid #dddddd;*/
        max-width: 700px;
        cursor: pointer;
    }

    .select--option:last-child{
        border-bottom: none;
    }
    .is-selected{
        background-color: #f5f5fa;
    }

    .single-option{
        height: 55px;
        background-color: #2595ec;
        font-size: 0.8rem;
        border: 1px solid red;
    }
    .cust-sel{
        width: 200px;
        height: 38px;
        background-color: #f5f5fa;
        border: 1px solid #dddddd;
    }

    .option-label{
        cursor: pointer;
        padding-left: 10px;
    }

    .cust-sel:focus{
        outline-width: 0;
    }

    .select--option::-webkit-scrollbar-button{
        display: none;
    }

    .select--option::-webkit-scrollbar-thumb{
        color: #2595ec;
    }

    ::-webkit-scrollbar {
        width: 12px;
        background-color: #F6F7FB;
        border-left: 1px solid #dddddd;
    }

    ::-webkit-scrollbar-track {
        display: none;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #2595ec;
        height: 10px;
    }

    .slide-down-enter-active {
        transition: all .5s ease;
    }
    .slide-down-leave-active {
        transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-down-enter, .slide-down-leave-to
        /* .slide-fade-leave-active below version 2.1.8 */ {
        transform: translateY(-8px);
    }
</style>