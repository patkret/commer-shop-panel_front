<template>
    <div class="component-container"  @click="showOptions = !showOptions">
        <div class="component__select">
            <transition name="slide-fade">
                <span class="label__selected" v-if="value">{{placeholder}}</span>
            </transition>
            <span class="component__select--name">{{value ? value.name : placeholder}}</span>
            <span class="c-arrow-down" v-if="!showOptions"></span>
            <span class="c-arrow-up" v-if="showOptions"></span>
        <transition name="slide-down">
        <ul class="component__select-options" v-if="showOptions" >
            <li :class="{'select--option': true, 'is-selected': value === option}" v-for="option in options" :value="option" @click.stop="selectOption(option)">
                 <input type="checkbox" :value="option"/><label class="option-label"> {{option.name}}</label>
            </li>
        </ul>
        </transition>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'single-select',
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
    .component-container{
        /*margin: 0 0 15px 0;*/
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
        z-index: 1000;
        font-weight: 800;
    }

    .c-arrow-down, .c-arrow-up{
        justify-self: center;
    }

    .component__select-options{
        max-height: 150px;
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
        display: none;
    }

    .select--option{
        height: 35px;
        display: grid;
        align-content: center;
        padding: 0 0 0 25px;
        background-color: #ffffff;
        border-bottom: 1px solid #dddddd;
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
    .label__selected{
        background-color: inherit;
        padding: 0 5px 0 5px;
        position: absolute;
        top: -8px;
        left: 10px;
        height: 15px;
        line-height: 15px;
        white-space: nowrap;
    }

    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
    {
        transform: translateY(10px);
        opacity: 0;
    }
</style>