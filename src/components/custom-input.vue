<template>

        <div :class="{'my-input': true, 'my-input is-validated': val > minInputLength,  'my-input not-validated': errors.has(label)}">
            <transition name="slide-fade">
                <span :class="{'label': true}" v-if="showCustLabel" >{{label}}</span>
            </transition>
            <input type="text" :class="{'my-input__input' : true, 'my-input__input red-label': errors.has(label)}" :name="label" :value="value" :placeholder="label" v-validate="{ rules }" @input="updateField($event.target.value)"/>
            <span class="not-valid__error" v-if="errors.has(label)">{{errors.first(label)}}</span>
        </div>

</template>

<script>
  export default {
    name: 'custom-input',
    inject: ['$validator'],
    props: ['label', 'rules', 'minInputLength', 'value'],
    data: () => ({
      showCustLabel: false,
    val: ''    
    }),

    methods:{
      updateField(field) {
        this.field = field

        if(field === ''){
          this.showCustLabel = false
        }
        else{
          this.showCustLabel = true
        }
        this.$emit('input', field)

      },
    },

    created: function() {
     this.val = (this.value).length
    }
  }
</script>

<style scoped>
    input:focus{
        outline: none;
    }
    .my-input{
        margin-bottom: 25px;
        /*margin-left: 15px;*/
        max-width: 700px;
        width: 100%;
        height: 38px;
        background-color: white;
        border: 1px solid #dddddd;
        position: relative;
    }

    .label{
        font-size: 110%;
        position: absolute;
        top: -9px;
        left: 10px;
        background-color: white;
        padding: 3px;
    }
    .is-validated{
        border-bottom: 1px solid #00dd00;
    }

    .not-validated{
        border-bottom: 1px solid red;
    }

    .red-label{
        color: red;
    }

    .not-valid__error{
        margin-top: 150px;
        color: red;
    }


    .my-input__input{
        height: 36px;
        max-width: 695px;
        width: 99%;
        font-size: 130%;
        border: transparent;
        padding-left: 10px;
        margin-bottom: 7px;
    }

    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active below version 2.1.8 */ {
        transform: translateY(10px);
        opacity: 0;
    }
</style>