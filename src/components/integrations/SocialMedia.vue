<template>
    <div class="items-container">
        <div class="single-item">
            <div class="item-logo round">
                <img src="../../assets/img/logo-fb.png" />
            </div>
            <div class="integr-desc">
                <p>Integracja serwisu społecznościowego Facebook</p>
            </div>
            <div class="button-container">
                <button type="button" class="custom-button">Zintegruj Facebook</button>
            </div>

        </div>
        <div class="single-item">
            <div class="item-logo round">
                <img src="../../assets/img/logo-instagram.jpg" />
            </div>
            <div class="integr-desc">
                <p>Integracja serwisu społecznościowego Instagram</p>
            </div>
            <div class="button-container">
                <button type="button" class="custom-button">Zintegruj Instagram</button>
            </div>
        </div>

        <div class="single-item">
            <div class="item-logo round">
                <img src="../../assets/img/logo-pinterest.jpg"/>
            </div>
            <div class="integr-desc">
                <p>Integracja serwisu społecznościowego Pinterest</p>
            </div>
            <div class="button-container">
                <button type="button" class="custom-button">Zintegruj Pinterest</button>
            </div>
        </div>
        <div class="single-item">
            <div class="item-logo round">
                <img src="../../assets/img/logo-linkedin.png"/>
            </div>
            <div class="integr-desc">
                <p>Integracja serwisu społecznościowego LinkedIn</p>
            </div>
            <div class="button-container">
                <button type="button" class="custom-button">Zintegruj LinkedIn</button>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'marketing',
  }
</script>

<style scoped>
    * {
        font-family: 'Montserrat', sans-serif;

    }
    .items-container{
        display: inline-flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-left: 20px;
        max-width: 80vw;
    }

    .single-item{
        width: 240px;
        height: 400px;
        margin: 0 30px 30px 0;
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

     .rectangular img{
        width: 172px;
        height: auto;
    }
    .round img{
        width: 60px;
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