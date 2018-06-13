<template>
    <div class="box">
    <div class="container">
        <!--<div class="row">-->
            <!--<div class="custom-input">-->
                <!--<h2>-->
                    <!--<transition name="slide">-->
                        <!--<span v-if="showCustLabel">Nazwa</span>-->
                    <!--</transition>-->

                    <!--<input type="text" placeholder="Nazwa" class="custom-input" v-model="name" />-->
                <!--</h2>-->

            <!--</div>-->
        <!--</div>-->

        <!--<div class="row">-->
            <!--<div :class="{'my-input': true, 'my-input is-validated': name.length > 2 }">-->
                <!--<transition name="slide-fade">-->
                <!--<span :class="{'label': true, 'label label__hidden': !showCustLabel}" v-if="showCustLabel.find(el => el === 'name')" >Nazwa</span>-->
                <!--</transition>-->
                <!--<input type="text" class="my-input__input" placeholder="Nazwa" v-model="name" @keyup="setLabel('name')"/>-->
            <!--</div>-->
        <!--</div>-->
        <!--<div class="row">-->
            <!--<div :class="{'my-input': true, 'my-input is-validated': city.length > 2 }">-->
                <!--<transition name="slide-fade">-->
                <!--<span :class="{'label': true, 'label label__hidden': !showCustLabel}" v-if="showCustLabel['city']" >Miasto</span>-->
                <!--</transition>-->
                <!--<input type="text" class="my-input__input" placeholder="Miasto" v-model="city" @keyup="setLabel('city')"/>-->
            <!--</div>-->
        <!--</div>-->
        <br>
        <br>
        <cust-inpt  v-model="name" :label="'Nazwa'" :rules="'required'" :minInputLength = "3" />


        <div class="custom-select" @click="showList = !showList">
            <div class="search-input">
                <!--<input type="text" class="select-input" placeholder="Wybierz producenta">-->
                <div class="badges-container">
                    <span v-if="selectedValues.length === 0" style="background-color: inherit"> Wybierz producenta</span>
                    <span v-if="selectedValues.length > 0 " v-for="value in selectedValues" class="badge">{{value}}</span>
                </div>
                <i class="fa fa-angle-down fa-lg arrow-down"></i>
            </div>
            <!--<div class="dropdown-menu" >-->
                <ul class="items-list" v-if="showList">
                    <li @click.stop="showList = true">
                       <label class="cust-check" ><input type="checkbox" v-model="selectedValues" :value="'Producent 1'"/>  Producent 1</label>
                    </li>
                    <li @click.stop="showList = true">
                       <label class="cust-check" ><input type="checkbox" v-model="selectedValues" :value="'Nowy'"/>  Nowy</label>
                    </li>
                    <li @click.stop="showList = true">
                       <label class="cust-check" ><input type="checkbox" v-model="selectedValues" :value="'Dla win'"/>  Dla win</label>
                    </li>
                    <li @click.stop="showList = true">
                       <label class="cust-check" ><input type="checkbox" v-model="selectedValues" :value="'Producent 4'"/>  Producent 4</label>
                    </li>
                    <li @click.stop="showList = true">
                       <label class="cust-check" ><input type="checkbox" v-model="selectedValues" :value="'Producent 5'"/>  Producent 5</label>
                    </li>
                    <li @click.stop="showList = true">
                       <label class="cust-check" ><input type="checkbox" v-model="selectedValues" :value="'Producent 6'"/>  Producent 6</label>
                    </li>

                </ul>
            <!--</div>-->
        </div>
    </div>
    </div>
</template>

<script>
    import custInpt from './custom-input'
  export default {
    name: 'custom-select',
    components: {
      custInpt
    },
    data: () => ({
      name: '',
      city: '',
      showCustLabel: [],
      showList: false,
      selectedValues: [],
      rules: [
        {name : 'required' , value: "required"}
      ]
    }),
    // watch: {
    //   name: function (val) {
    //     if(val !== ''){
    //       this.showCustLabel.push('name')
    //     }
    //     else{
    //       this.showCustLabel = false
    //     }
    //
    //   },
    //   selectedValues: function () {
    //
    //     this.showList = true;
    //   }
    // },

    methods: {
      setLabel(field){
        // console.log(field)
        if(this.showCustLabel.find(el => el === field)){
          console.log('elo')
        }
        else{
          console.log('nope')
          this.showCustLabel.push(field)
        }
        // this.showCustLabel.push(field)
        // if(val !== ''){
        //   this.showCustLabel.push('name')
        // }
        // else{
        //   this.showCustLabel = false
        // }
      },
      setName(input) {
        this.name = input
      }
    }
  }
</script>

<style scoped>

    .my-input{
        margin-bottom: 25px;
        margin-left: 15px;
        width: 400px;
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


    .my-input__input{
        height: 36px;
        width: 395px;
        font-size: 130%;
        border: transparent;
        padding-left: 10px;
    }
    .box{
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        margin: 50px 0 0 0;
    }

    .container{
        background-color: white;
        width: 90%;
        height: 500px;
        border-radius: 5px;
        box-shadow: 3px 3px 3px #dddddd;
    }
    .row{
        margin-left: 35px;
    }
    ::placeholder{
        opacity: 1;
        color: black;
    }

    h2 {
        width: 400px;
        border: 1px solid #dddddd;
        line-height:0.1em;
        margin:10px 0 20px;
        height: 45px;
        background-color: white;
    }
    h2 span {
        background: white;
        margin-left: 15px;
        padding: 0 10px;
        font-size: 110%;
    }

    .custom-input{
        border: none;
        width: 350px;
        position: relative;
        background-color: transparent;
        padding: 15px;
    }
    input:focus{
        outline: none;
    }


    /*.slide-fade-enter-active, .slide-fade-leave-active {*/
        /*transform: translateY(-150px);*/
        /*transition: opacity .3s;*/
    /*}*/
    /*.slide-fade-enter, .slide-fade-leave-to !* .fade-leave-active below version 2.1.8 *! {*/
        /*opacity: 0;*/
    /*}*/

    .search-input{
        /*margin-left: 50px;*/
        background-color: #F6F7FB;
        border: 1px solid #dddddd;
        width: 400px;
        min-height: 50px;
        /*height: 50px;*/
        /*direction:rtl;*/
        text-align:justify;

    }

    .arrow-down{
        background-color: inherit;
        margin: 18px 10px 0 25px;

    }

    .select-input{
        background-color: inherit;
        border: none;
        width: 325px;
        padding: 15px;
        height: auto;
    }

    .dropdown-menu{
        background-color: #F6F7FB;
        width: 400px;
        border: 1px solid #dddddd;

    }

    .items-list{
        width: 400px;
        padding: 0;
        margin: 0;
        max-height: 250px;
        overflow: auto;
        border: 1px solid #dddddd;
        border-top: none;
    }

    .items-list li{
        background-color: #F6F7FB;
        border-bottom: 1px solid #dddddd;
        height: 45px;
        padding: 20px 0 0 25px;
        font-size: 130%;
    }

    .items-list li:last-child{
        border-bottom: none;
    }

    .items-list::-webkit-scrollbar-button{
        display: none;
    }

    .items-list::-webkit-scrollbar-thumb{
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
        height: 65px;
    }

    .custom-select{
        width: 400px;
        padding: 0;
        margin: 0 0 0 50px;
        height: 250px;
    }

    .cust-check{
        background-color: inherit;
    }

    .badges-container{
        display: inline-flex;
        flex-direction: row;
        flex-wrap: wrap;
        background-color: inherit;
        width: 335px;
        margin: 15px 0 0 15px;
        max-width: 325px;
    }

    .badge{
        height: 25px;
        border-radius: 5px;
        background: linear-gradient(to right, #2595ec, #21c8cc);
        padding: 0 10px 0 10px;
        margin: 0 15px 10px 0;
        line-height: 25px;
    }

    .items-list li:hover{
        background-color: white;
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