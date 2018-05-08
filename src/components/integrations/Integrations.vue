<template>
    <div id="main-content-with-side-menu">
        <h1 class="card-name">Integracje</h1>
        <div class="side-menu-container">
            <div id="side-menu">
                <div class="side-button" :class="{'side-menu-item': true, 'side-menu-item active': type === 1}"
                     @click.prevent="changeComponent(1)">
                    <p>Kurierzy</p>
                </div>
                <div class="side-button" :class="{'side-menu-item' : true, 'side-menu-item active': type === 2}"
                     @click.prevent="changeComponent(2)">
                    <p>Płatności</p>
                </div>
                <div class="side-button" :class="{'side-menu-item' : true, 'side-menu-item active': type === 3}"
                     @click.prevent="changeComponent(3)">
                    <p>Marketing</p>
                </div>
                <div class="side-button" :class="{'side-menu-item' : true, 'side-menu-item active': type === 4}"
                     @click.prevent="changeComponent(4)">
                    <p>Social Media</p>
                </div>
                <!--<div class="side-button" :class="{'side-menu-item' : true, 'side-menu-item active': type === 5}"-->
                     <!--@click.prevent="changeComponent(5)">-->
                    <!--<p>Inne</p>-->
                <!--</div>-->
            </div>
        </div>
        <div class="component-container">
            <transition name="slide-fade">
            <couriers v-if="type === 1"/>
            </transition>
            <transition name="slide-fade">
            <payments v-if="type === 2"/>
            </transition>
            <transition name="slide-fade">
            <marketing v-if="type === 3"/>
            </transition>
            <transition name="slide-fade">
            <social-media v-if="type === 4"/>
            </transition>
        </div>
    </div>
</template>

<script>
  import Couriers from './Couriers'
  import Payments from './Payments'
  import Marketing from './Marketing'
  import SocialMedia from './SocialMedia'

  export default {
    components: {
      Marketing,
      Payments,
      Couriers,
      SocialMedia,
    },
    name: 'integrations',
    data: () => ({
      type: 1,
    }),

    methods: {
      changeComponent (type) {
        this.type = type
      },
    },
  }
</script>

<style scoped>
    .component-container {
        margin-left: 20px;
    }

    .active {
        background-color: #F4F4F9;
        border-radius: 5px;
    }

    .slide-fade-enter-active {
        transition: all .5s ease;
        transform: translateY(-10px) ;
    }
    .slide-fade-leave-active {
        transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        {
        transform: translateY(10px);
        /*opacity: 0;*/
    }


</style>