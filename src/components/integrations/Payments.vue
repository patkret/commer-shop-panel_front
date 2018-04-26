<template>
    <div class="items-container">
        <div class="single-item">
            <div class="item-logo">
                <img src="../../assets/img/logo-payu.jpg"/>
            </div>
            <div class="integr-desc">
                <p>Integracja systemu płatności PayU</p>
            </div>
            <div class="button-container">
                <button type="button" class="custom-button">Zintegruj PayU</button>
            </div>

        </div>
    </div>
</template>

<script>
  export default {
    name: 'payments',
  }
</script>

<style scoped>
    * {
        font-family: 'Montserrat', sans-serif;

    }
    .items-container{
        display: inline-flex;
        margin-left: 20px;
    }

    .single-item{
        width: 240px;
        height: 400px;
        background-color: #ffffff;
        border-radius: 5px;
        -webkit-box-shadow: 5px 5px 5px 5px #eff1f4;
        box-shadow: 5px 5px 5px 5px #eff1f4;
        display: grid;
        grid-template-columns: 34px 172px 34px;
        grid-template-rows: 60px 80px 15px 105px 50px 65px 25px;
        grid-template-areas:
                ". . ."
                ". logo ."
                ". . ."
                ". integr-desc ."
                ". . ."
                ". cust-button ."
                ". . .";
    }

    .item-logo{
        grid-area: logo;
        justify-self: center;
        align-self: start;
    }

    .item-logo img{
        width: 172px;
        height: auto;
    }
    .button-container{
        grid-area: cust-button;
        background: linear-gradient(left, #21C8CC, #2596EC);
        border-radius: 5px;
        height: 42px;

    }
    .custom-button{
        width: 170px;
        margin: 1px;
    }
    .integr-desc{
        grid-area:integr-desc;
        text-align: center;
        align-content: start;
    }
    .integr-desc p{
        font-weight: 500;
    }
</style>