<template>
    <div class="items-container">
        <div :class="{'single-item' : true, 'single-item integrated': integrated === true}">
            <div :class="{'item-logo' : true, 'item-logo opacity': integrated === true}">
                <img src="../../assets/img/logo-apaczka.png"/>
            </div>
            <div :class="{'integr-desc' : true, 'integr-desc opacity': integrated === true}">
                <p>Integracja z serwisem kurierskim Apaczka</p>
            </div>
            <div class="button-container" v-if="integrated === false">
                <button type="button" class="custom-button" @click="integrate()">Zintegruj Apaczka</button>
            </div>

            <transition name="bounce">
                <template v-if="integrated === true">
                    <div class="integrated-circle" >
                <span class="checkmark">
                    <div class="checkmark_circle"></div>
                    <div class="checkmark_stem"></div>
                    <div class="checkmark_kick"></div>
                </span>
                    </div>
                    <p class="integr-text">Zintegrowane</p>
                </template>
            </transition>



        </div>
    </div>
</template>

<script>
  export default {
    name: 'couriers',
    data: () => ({
      integrated: false,
    }),

    methods: {
      integrate: function () {
        this.integrated = true
      },
    },
  }
</script>

<style scoped>
    * {
        font-family: 'Montserrat', sans-serif;

    }

    .items-container {
        display: inline-flex;
        margin-left: 20px;
    }

    .single-item {
        width: 240px;
        height: 400px;
        background-color: #ffffff;
        border-radius: 5px;
        -webkit-box-shadow: 5px 5px 5px 5px #eff1f4;
        box-shadow: 5px 5px 5px 5px #eff1f4;
        display: grid;
        grid-template-columns: 34px 172px 34px;
        grid-template-rows: 60px 80px 15px 105px 50px 65px 25px;
        grid-template-areas: ". . ." ". logo ." ". . ." ". integr-desc ." ". . ." ". cust-button ." ". integr-text .";
    }

    .item-logo {
        grid-area: logo;
        justify-self: center;
        align-self: start;
    }

    .item-logo img {
        width: 172px;
        height: auto;
    }

    .button-container {
        grid-area: cust-button;
        background: linear-gradient(left, #21C8CC, #2596EC);
        border-radius: 5px;
        height: 42px;

    }

    .custom-button {
        width: 170px;
        margin: 1px;
    }

    .integr-desc {
        grid-area: integr-desc;
        text-align: center;
        align-content: start;
    }

    .integr-desc p {
        font-weight: 500;
    }

    .integrated {
        background-color: #F6F6FB;
    }

    .integrated-circle {

        grid-area: cust-button;
        background-color: #6BBA6A;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        justify-self: center;
        margin-top: -40px;
    }

    .checkmark {
        display:inline-block;
        width: 22px;
        height:22px;
        -ms-transform: rotate(45deg); /* IE 9 */
        -webkit-transform: rotate(45deg); /* Chrome, Safari, Opera */
        transform: rotate(45deg);
    }

    .checkmark_circle {
        position: absolute;
        width:24px;
        height:24px;
        background-color: #6BBA6A;
        border:1px solid white;
        border-radius:11px;
        left:24px;
        top:-3px;
    }

    .checkmark_stem {
        position: absolute;
        width:1px;
        height:14px;
        background-color:#fff;
        left:38px;
        top:2px;
    }

    .checkmark_kick {
        position: absolute;
        width:7px;
        height:1px;
        background-color:#fff;
        left:32px;
        top:15px;
    }

    .opacity{
        opacity: 0.5;
    }

    .integr-text{
        grid-area: integr-text;
        margin-top: -25px;
        margin-left: 30px;
    }

    p .integr-text{
        font-weight: 800;
    }

    .bounce-enter-active {
        animation: bounce-in .5s;
    }
    .bounce-leave-active {
        animation: bounce-in .5s reverse;
    }
    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.5);
        }
        100% {
            transform: scale(1);
        }
    }
</style>