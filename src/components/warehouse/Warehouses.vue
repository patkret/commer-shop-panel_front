<template>
            <div id="main-content-with-side-menu">
                <h1 class="card-name">Magazyny</h1>
                <div class="side-menu-container">
                    <div id="side-menu">
                        <div class="side-button">
                            <p>Dodaj magazyn</p>
                        </div>
                        <router-link :to="'/warehouses/list'" tag="button" class="edit">Edytuj</router-link>
                        <!--<div class="side-button" v-if="type == 3"-->
                        <!--:class="{'side-menu-item' : true, 'side-menu-item active': type == 3}">-->
                        <!--<p>Edycja producenta</p>-->
                        <!--</div>-->
                    </div>
                </div>
                <div class="component-container">
                    <router-view></router-view>
                </div>
            </div>
</template>

<script>


  export default {
    name: "warehouses",
    data: () => ({}),
    methods: {}
  }
</script>
<style scoped>
    .active {
        background-color: #F4F4F9;
        border-radius: 5px;
    }

</style>