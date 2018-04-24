<template>

    <div class="dashboard">
        <div class="dashboard-header">
            <h2>Dashboard</h2>
        </div>
        <div class="dashboard-body">
            <p>Przychody ze sprzedaży</p>
            <!--<span>{{total_income}}</span>-->
            <p class="total-income">16 498, 00 PLN</p>
            <div class="dashboard-chart">
                <img src="../../assets/img/chart.png"/>
            </div>
            <div class="line"></div>
            <div class="dashboard-orders">
                <p>Ostatnie zamówienia</p>
                <table class="orders-table">
                    <thead class="table-head">
                    <tr>
                        <th>DATA</th>
                        <th>ID ZAMÓWIENIA</th>
                        <th>KLIENT</th>
                        <th>KWOTA</th>
                        <th>STATUS</th>
                        <th>AKCJA</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr :class="{'table-row': true, 'table-row active': index === 1}">
                        <td>25.05.2018</td>
                        <td>158754</td>
                        <td>JAN KOWALSKI</td>
                        <td>185.85 zł</td>
                        <td>
                            <span class="status status-new">NOWE</span>
                        </td>
                        <td>
                            <button type="button" class="action-button" @click="showActions(1)">
                                <span class="dot"></span>
                                <span class="dot"></span>
                                <span class="dot"></span>
                            </button>
                            <div class="actions" v-if="index === 1 && show === true">
                                <button type="button" class="single-action-button">
                                    Szczegóły
                                </button>
                                <button type="button" class="single-action-button">
                                    Edytuj
                                </button>
                                <button type="button" class="single-action-button">
                                    Usuń
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr :class="{'table-row': true, 'table-row active': index === 2}">
                        <td>23.05.2018</td>
                        <td>135847</td>
                        <td>ANNA KOWALSKA</td>
                        <td>258.49 zł</td>
                        <td>
                            <span class="status status-in-progress">W REALIZACJI</span></td>
                        <td>
                            <button type="button" class="action-button" @click="showActions(2)">
                                <span class="dot"></span>
                                <span class="dot"></span>
                                <span class="dot"></span>
                            </button>
                            <div class="actions" v-if="index === 2 && show === true">
                                <button type="button" class="single-action-button">
                                    Szczegóły
                                </button>
                                <button type="button" class="single-action-button">
                                    Edytuj
                                </button>
                                <button type="button" class="single-action-button">
                                    Usuń
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr :class="{'table-row': true, 'table-row active': index === 3}">
                        <td>22.05.2018</td>
                        <td>135478</td>
                        <td>MARCIN DROBNY</td>
                        <td>478.00 zł</td>
                        <td>
                            <span class="status status-completed">ZREALIZOWANE</span></td>
                        <td>
                            <button type="button" class="action-button" @click="showActions(3)">
                                <span class="dot"></span>
                                <span class="dot"></span>
                                <span class="dot"></span>
                            </button>
                            <div class="actions" v-if="index === 3 && show === true">
                                <button type="button" class="single-action-button">
                                    Szczegóły
                                </button>
                                <button type="button" class="single-action-button">
                                    Edytuj
                                </button>
                                <button type="button" class="single-action-button">
                                    Usuń
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr :class="{'table-row': true, 'table-row active': index === 4}">
                        <td>22.05.2018</td>
                        <td>256987</td>
                        <td>JANUSZ POLAK</td>
                        <td>25.55 zł</td>
                        <td><span class=" status status-cancelled">NIE ZREALIZOWANE</span></td>
                        <td>
                            <button type="button" class="action-button" @click="showActions(4)">
                                <span class="dot"></span>
                                <span class="dot"></span>
                                <span class="dot"></span>
                            </button>
                            <div class="actions" v-if="index === 4 && show === true">
                                <button type="button" class="single-action-button">
                                    Szczegóły
                                </button>
                                <button type="button" class="single-action-button">
                                    Edytuj
                                </button>
                                <button type="button" class="single-action-button">
                                    Usuń
                                </button>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="dashboard-statistics">
            <div class="single-stat col-1">
                <span class="stat-number">75</span>
                <span>Zamówień</span>
                <div class="small-chart">
                    <img src="../../assets/img/blue-stats.png"/>
                </div>
            </div>
            <div class="stat-divider"></div>
            <div class="single-stat">
                <span class="stat-number">52</span>
                <span>Klientów</span>
                <div class="small-chart">
                    <img src="../../assets/img/pink-stats.png"/>
                </div>
            </div>
            <div class="stat-divider"></div>
            <div class="single-stat">
                <span class="stat-number">{{numberOfProducts}}</span>
                <span>Produktów</span>
                <div class="small-chart">
                    <img src="../../assets/img/green-stats.png"/>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
  export default {
    name: 'dashboard',
    data: () => ({
      show: true,
      index: '',
      numberOfProducts: ''
    }),

    methods: {

      showActions (key) {
        if (this.index === key) {
          this.index = ''
          this.show = false
        }
        else {
          this.index = key
          this.show = true
        }
      },
    },

    created: function () {
      axios('/products-count').then(result => {
        this.numberOfProducts = result.data
      })
    }
  }
</script>

<style scoped>
    * {
        font-family: 'Montserrat', sans-serif;
        font-size: 110%;
    }

    .dashboard {
        margin: 45px 0 100px 45px;
    }

    .dashboard-header h2 {
        font-weight: normal;
        margin-bottom: 45px;
    }

    .dashboard-body {
        width: 90%;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 5px;
        -webkit-box-shadow: 5px 5px 5px 5px #eff1f4;
        box-shadow: 5px 5px 5px 5px #eff1f4;
    }

    .dashboard-body p {
        font-weight: 500;
        margin-left: 15px;
    }

    .total-income {
        font-size: 250%;
        margin: 0;
        font-weight: 700;

    }

    .dashboard-chart img {
        margin-top: 15px;
        width: 98%;
        margin-left: 10px;
    }

    .line {
        border-bottom: 1px solid #DDE0E5;
        width: 100%;
    }

    .dashboard-orders {
        margin-top: 45px;
        width: 100%;
    }

    .dashboard-orders table {
        font-size: 50%;
        margin-left: 15px;
        border-collapse: collapse;
    }

    .table-head {
        margin-bottom: 25px;
    }

    .table-head th {
        width: 20%;
        text-align: start;
    }

    .table-row {
        height: 55px;
        border-bottom: 1px solid #DDE0E5;

    }

    .active {
        background-color: #F3F4F8;
        border-radius: 5px;
    }

    .status {
        border-radius: 5px;
        padding: 4px 8px 4px 8px;
        color: white;
        font-weight: 600;
        word-break: keep-all;

    }

    .status-new {
        background-color: #585cd1;
    }

    .status-in-progress {
        background-color: #fb840a;
    }

    .status-completed {
        background-color: #6bba6a;
    }

    .status-cancelled {
        background-color: #f16b6a;
    }

    .dot {
        height: 7px;
        width: 7px;
        background-color: #ccc;
        border-radius: 50%;
        display: inline-block;
    }

    .action-button {
        background-color: transparent;
        border: none;
        position: static;
        /*margin-top: -10px;*/
        /*top: 74%;*/
    }

    .actions {
        width: 220px;
        height: 50px;
        background-color: #FFFFFF;
        display: inline-flex;
        position: relative;
        margin-left: -270px;
        border-radius: 5px;
    }

    .single-action-button {
        background-color: white;
        border: 1px solid #DDE0E5;
        border-radius: 5px;
    }

    .single-action-button:nth-child(1) {
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
        border-right: none;
    }

    .single-action-button:nth-child(2) {
        border-radius: 0;
        border-right: none;
    }

    .single-action-button:nth-child(3) {
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
    }

    .single-action-button:hover {
        background-color: #DDE0E5;
    }

    .table-head tr {
        height: 50px;
    }

    .orders-table {
        margin-bottom: 35px;
    }

    .dashboard-statistics {
        width: 92.5%;
        background-color: #ffffff;
        border-radius: 5px;
        -webkit-box-shadow: 5px 5px 5px 5px #eff1f4;
        box-shadow: 5px 5px 5px 5px #eff1f4;
        margin-top: 50px;
        margin-bottom: 100px;
        height: 250px;
        display: grid;
        grid-template-columns: 1fr 1px 1fr 1px 1fr;

    }

    .single-stat {
        justify-self: center;
        align-self: center;
        display: flex;
        flex-direction: column;
        margin-top: 10px;
    }

    .single-stat span{
        text-align: center;
    }

    .stat-number {
        font-size: 250%;

        margin-bottom: 10px;
    }

    .stat-divider{
        height: 250px;
        width: 1px;
        background-color: #DDE0E5;
    }
    .small-chart{
        margin-top: 15px;
    }
</style>