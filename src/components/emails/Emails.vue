<template>
     <div class="l-main__main">
        <header class="l-main__header component__header">

            <div class="c-breadcrumb">
                        <span class="c-breadcrumb__item">
                            Emaile
                        </span>
            </div>
            <div class="main-header__button" >
                <router-link to="/emails/add" class="c-form__button c-button" v-if="$route.path !== '/emails/add'">
                    <span>Stwórz emaila</span>
                </router-link>
                <router-link to="/emails/list" class="c-form__button c-button" v-if="$route.path !== '/emails/list'">
                    <span>Lista emaili</span>
                </router-link>
            </div>
        </header>

        <section class="l-main__content" style="padding: 0">
            <router-view></router-view>
        </section>

    </div>
</template>

<script>

  export default {
    name: "emails",
    data: () => ({

      emails: ''
    }),
    methods:{
    }
  }
</script>

<style scoped>
    .active{
        background-color: #F4F4F9;
        border-radius: 5px;
    }

</style>