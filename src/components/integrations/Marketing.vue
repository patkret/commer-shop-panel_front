<template>
    <div class="items-container">
        <div class="single-item">
            <div class="item-logo round">
                <img src="../../assets/img/logo-freshmail.jpg" />
            </div>
            <div class="integr-desc">
                <p>Integracja systemu e-mail marketingu Freshmail</p>
            </div>
            <div class="button-container">
                <button type="button" class="custom-button">Zintegruj Freshmail</button>
            </div>

        </div>
        <div class="single-item">
            <div class="item-logo rectangular">
                <img src="../../assets/img/logo-googlemerchant.png" />
            </div>
            <div class="integr-desc">
                <p>Integracja z GoogleMerchant</p>
            </div>
            <div class="button-container">
                <button type="button" class="custom-button">Zintegruj Google Merchant</button>
            </div>
        </div>

        <div class="single-item">
            <div class="item-logo rectangular">
                <img src="../../assets/img/logo-google-analytics.png"/>
            </div>
            <div class="integr-desc">
                <p>Integracja z Google Analytics</p>
            </div>
            <div class="button-container">
                <button type="button" class="custom-button">Zintegruj Google Analytics</button>
            </div>
        </div>
        <div class="single-item">
            <div class="item-logo rectangular" style="align-self: center">
                <img src="../../assets/img/logo-smsapi.png"/>
            </div>
            <div class="integr-desc">
                <p>Integracja z systemem SMS API</p>
            </div>
            <div class="button-container">
                <button type="button" class="custom-button">Zintegruj SMS API</button>
            </div>
        </div>
        <div class="single-item">
            <div class="item-logo rectangular" style="align-self: center">
                <img src="../../assets/img/logo-ibiznes.jpg"/>
            </div>
            <div class="integr-desc">
                <p>Integracja z systemem Faktura iBiznes</p>
            </div>
            <div class="button-container">
                <button type="button" class="custom-button">Zintegruj Faktura iBiznes</button>
            </div>
        </div>
        <div class="single-item">
            <div class="item-logo rectangular" style="align-self: center">
                <img src="../../assets/img/logo-allegro.jpg"/>
            </div>
            <div class="integr-desc">
                <p>Integracja z serwisem Allegro</p>
            </div>
            <div class="button-container">
                <button type="button" class="custom-button">Zintegruj Allegro</button>
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
        width: 80px;
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