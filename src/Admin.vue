<template>

    <div class="l-container">

        <header class="l-header c-header">

            <div class="c-logo">
                <a href="/" class="c-logo__link">
                    <img src="./assets/images/ecommer.svg" alt="ecommer.pl">
                </a>
            </div>

            <div class="l-header__top">

                <section class="l-search c-search">
                    <form action="#">
                        <input type="text" class="c-search__field" placeholder="Szukaj...">
                    </form>
                </section>

                <section class="l-notifications c-notifications">
                    <span class="c-notifications__icon">
                        <span class="c-notifications__badge">24</span>
                    </span>
                </section>

                <section class="l-account c-account js-account">
                    <div class="c-account__info">
                        <img :src="avatar" alt="" class="c-account__avatar">
                        <p class="c-account__name">Daniel Ptasiński</p>
                        <span class="c-arrow-down"></span>
                    </div>

                    <ul class="c-account__menu">
                        <li class="c-account__menu-item">
                            <a href="" class="c-account__menu-link is-active">Twoje konto</a>
                        </li>
                        <li class="c-account__menu-item">
                            <a href="" class="c-account__menu-link">Pomoc</a>
                        </li>
                        <li class="c-account__menu-item">
                            <a href="" class="c-account__menu-link">Płatności</a>
                        </li>
                        <li class="c-account__menu-item">
                            <a href="" class="c-account__menu-link">Wyloguj</a>
                        </li>
                    </ul>
                </section>

            </div>

        </header>

        <main class="l-main">

            <aside class="l-main__aside">

                <nav class="c-nav">
                    <ul class="c-nav__list">
                        <li class="c-nav__item" v-for="(item,index) in items" @click="collapseItem(index)">
                            <router-link :to="item.path" class="c-nav__link">
                                <img :src="item.icon" alt="">
                                <span>{{item.text}}</span>
                            </router-link>

                            <ul :class="{'c-nav__submenu js-nav__submenu':true , 'is-opened': collapsedItem === index}" >

                                    <li class="c-nav__submenu-item" v-for="child in item.children" @click.stop="colapsedItem = index">
                                        <router-link  :to="child.path" class="c-nav__submenu-link" >
                                        {{child.text}}
                                        </router-link>
                                    </li>
                            </ul>
                        </li>
                        <!--<li class="c-nav__item">-->
                            <!--<a href="#" class="c-nav__link is-active has-submenu js-nav__link">-->
                                <!--<img src="./assets/images/nav/sprzedaz.svg" alt="">-->
                                <!--<span>Sprzedaż</span>-->
                            <!--</a>-->
                            <!--<ul class="c-nav__submenu js-nav__submenu">-->
                                <!--<li class="c-nav__submenu-item">-->
                                    <!--<a href="" class="c-nav__submenu-link is-active">Lista zamówień</a>-->
                                <!--</li>-->
                                <!--<li class="c-nav__submenu-item">-->
                                    <!--<a href="" class="c-nav__submenu-link">Dodaj zamówienie</a>-->
                                <!--</li>-->
                            <!--</ul>-->
                        <!--</li>-->
                    </ul>
                </nav>

            </aside>

            <div class="l-main__main">

                <!--<header class="l-main__header">-->

                    <!--<div class="c-breadcrumb">-->
                        <!--<span class="c-breadcrumb__item">-->
                            <!--<a href="">Administracja</a>-->
                        <!--</span>-->
                        <!--<span class="c-breadcrumb__item">Daniel Ptasiński</span>-->
                    <!--</div>-->

                    <!--<div class="c-tabs">-->
                        <!--<ul class="c-tabs__nav">-->
                            <!--<li class="c-tabs__nav-item is-active">-->
                                <!--<a href="">Logowania</a>-->
                            <!--</li>-->
                            <!--<li class="c-tabs__nav-item">-->
                                <!--<a href="">Logi</a>-->
                            <!--</li>-->
                        <!--</ul>-->
                    <!--</div>-->

                <!--</header>-->

                <section class="l-main__content" >
                    <router-view></router-view>
                </section>

            </div>

        </main>
    
    </div>

    <!--<div id="main">-->
        <!--<div class="top-nav-left">-->
            <!--<a class="nav-left-a" href="#top-nav"><img class="nav-logo" src="./assets/img/icons/logo.svg" alt=""></a>-->
        <!--</div>-->
        <!--<div class="top-nav-right">-->
            <!--<div class="top-nav-center">-->
                <!--<div class="nav-input-container">-->
                    <!--<img src="./assets/img/icons/search.svg" class="top-icon">-->
                    <!--<input class="nav-input" type="text" name="name" placeholder="szukaj..." v-model="search">-->
                <!--</div>-->

                <!--<div class="nav-shop">-->
                    <!--<div class="shop-bell">-->
                        <!--<svg class="bell-icon" height="25px" width="25px" x="30px" enable-background="new 0 0 512.001 512.001" version="1.1" viewBox="0 0 512.001 512.001" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">-->
		<!--<path d="m504.45 365.9c-60.22-60.237-69.282-90.462-69.282-186.7 0-98.97-80.213-179.2-179.17-179.2s-179.17 80.231-179.17 179.2c0 51.891-1.382 71.262-8.525 95.044-8.883 29.628-27.119 57.993-60.766 91.657-16.119 16.128-4.701 43.699 18.1 43.699h142.05l-1.289 12.8c0 49.485 40.107 89.6 89.583 89.6s89.583-40.115 89.583-89.6l-1.289-12.8h142.06c22.81 0 34.228-27.571 18.1-43.699zm-248.44 120.5c-35.337 0-63.991-28.663-63.991-64l1.289-12.8h125.39l1.306 12.8c-1e-3 35.337-28.656 64-63.993 64zm-230.36-102.4c76.783-76.8 76.783-128 76.783-204.8 0-84.821 68.753-153.6 153.57-153.6s153.57 68.779 153.57 153.6c0 76.8 0 128 76.783 204.8h-460.71z"/>-->
                        <!--</svg>-->
                    <!--</div>-->
                <!--</div>-->

            <!--</div>-->
            <!--<div class="search-bar" v-if="products.length > 0 || clients.length > 0">-->
                <!--<ul class="products-list">-->
                    <!--<li v-for="product in products">-->
                        <!--<p class="table-name">Produkt</p>-->
                        <!--<p class="list-item-name">{{product.name}}</p>-->
                        <!--<p class="item-price">{{product.price}} PLN</p>-->
                    <!--</li>-->
                <!--</ul>-->
                <!--<ul>-->
                    <!--<li v-for="client in clients">-->
                        <!--<p class="table-name">Klient</p>-->
                        <!--<p class="list-item-name">{{client.first_name}} {{client.last_name}}</p>-->
                        <!--&lt;!&ndash;{{client.email}}&ndash;&gt;-->
                    <!--</li>-->
                <!--</ul>-->
            <!--</div>-->

            <!--<div class="user-container">-->
                <!--<img class="user-photo" src="./assets/img/icons/user-face.png" alt="twarz uzytkownika">-->
                <!--<button @click="userMenu = !userMenu" class="user-button">Mietek Wczesniak</button>-->
                <!--<ul v-if="userMenu" class="user-menu">-->
                    <!--<li class="user-menu-item"><a class="user-menu-a" href="">Ustawienia konta</a></li>-->
                    <!--<li class="user-menu-item"><a class="user-menu-a" href="">Rozliczenia</a></li>-->
                    <!--<li class="user-menu-item"><a class="user-menu-a" href="">Pomoc</a></li>-->
                    <!--<li class="user-menu-item"><a class="user-menu-a" @click="logout()">Wyloguj</a></li>-->
                <!--</ul>-->
            <!--</div>-->
        <!--</div>-->
        <!--<div id="sidebar">-->
            <!--<ul class="sidebar-items">-->
                <!--<li v-for="(item,index) in items" @click="collapseItem(index, item)"-->
                    <!--:class="{'item': current_path != item.path, 'item-active': current_path === item.path }">-->
                    <!--<router-link :to="item.path">-->
                        <!--<img :src="item.icon" id="item-icon">-->
                        <!--<p class="item-name">{{item.text}}</p>-->

                        <!--<transition name="slide-fade">-->
                            <!--<ul class="child-items" v-if="openedItems[index]">-->
                                <!--<li v-for="child in item.children"-->
                                    <!--:class="{'child-item' : current_path != child.path, 'child-item child-active': current_path == child.path}"-->
                                    <!--@click.stop="selectChild">-->
                                    <!--<router-link :to="child.path">-->
                                        <!--<p class="child-name">{{child.text}}</p>-->
                                    <!--</router-link>-->
                                <!--</li>-->
                            <!--</ul>-->
                        <!--</transition>-->
                    <!--</router-link>-->
                <!--</li>-->

            <!--</ul>-->
        <!--</div>-->

</template>


<script>
  import icons from './assets/icons'

  export default {

    name: 'admin',
    data () {
      return {
        search: '',
        openedItems: {},
        selectedSub: '',
        userMenu: false,
        current_path: '',
        item: '',
        items: [
          {icon: icons.dashboard, text: 'Dashboard', path: '/dashboard'},
          {
            icon: icons.orders, text: 'Sprzedaż', path: '', children:
              [
                {text: 'Lista sprzedaży', path: '/'},
                {text: 'Dodaj zamówienie', path: '/order-add'},
                {text: 'Bilety', path: '/'},
                {text: 'Porzucone koszyki', path: '/'},
              ],
          },
          {
            icon: icons.offers, text: 'Oferty', path: '', children:
              [
                {text: 'Lista ofert', path: '/'},
                {text: 'Stwórz ofertę', path: '/'},
              ],
          },
          {
            icon: icons.products, text: 'Asortyment', path: '', children:
              [
                {text: 'Lista produktów', path: '/products/list'},
                {text: 'Dodaj produkt', path: '/product-add/main-info'},
                {text: 'Kategorie', path: '/categories/list'},
                {text: 'Zestawy atrybutów', path: '/attribute-sets/list'},
                {text: 'Producenci', path: '/vendors/list'},
                {text: 'Zestawy wariantów', path: '/variants'},
                {text: 'Stawki VAT', path: '/vat-rates/list'},
                {text: 'Szablony opisów', path: '/'},
                {text: 'Magazyn', path: '/stock/list'},
              ],
          },
          {
            icon: icons.clients, text: 'Klienci', path: '', children:
              [
                {text: 'Lista klientów', path: ''},
                {text: 'Dodaj klienta', path: ''},
                {text: 'Zgłoszenia hurtowników', path: ''},
              ],
          },
          {
            icon: icons.marketing, text: 'Marketing', path: '', children:
              [
                {text: 'Strony informacyjne', path: '/'},
                {text: 'Banery', path: '/'},
                {text: 'Rabaty', path: '/'},
                {text: 'Kody rabatowe', path: '/'},
              ],
          },

          {
            icon: icons.media, text: 'Media', path: '', children:
              [
                {text: 'Lista mediów', path: '/'},
                {text: 'Dodaj media', path: '/'},
              ],
          },
          {
            icon: icons.reports, text: 'Raporty', path: '/permission', children:
              [
                {text: 'Sprzedaż', path: ''},
                {text: 'Klienci', path: ''},
              ],

          },

          {
            icon: icons.settings, text: 'Ustawienia', path: '', children:
              [
                {text: 'Ogólne', path: ''},
                {text: 'Wygląd', path: ''},
                {text: 'Menu', path: ''},
                {text: 'Funkcjonowanie', path: ''},
                {text: 'Języki', path: ''},
                {text: 'Płatności', path: ''},
                {text: 'Domena', path: ''},
                {text: 'SMTP', path: ''},
                {text: 'Administratorzy', path: '/users'},
                {text: 'Edycja zaawansowana', path: '/logs'},
              ],
          },
          {
            icon: icons.integrations, text: 'Integracje', path: '/integrations', children:
              [
                {text: 'Lista integracji', path: '/'},
                {text: 'Indywidualne', path: '/'},
              ],
          },
          {
            icon: icons.data, text: 'Wymiana danych', path: '', children:
              [
                {text: 'Automatyczna', path: '/'},
                {text: 'Klienci', path: '/'},
                {text: 'Produkty', path: '/'},
                {text: 'META dane', path: '/'},
                {text: 'Plik XML', path: '/'},
              ],
          },
        ],
        options: [
          {id: 1, name: 'SHOP 1'},
          {id: 2, name: 'SHOP 2'},
          {id: 3, name: 'SHOP 3'},
          {id: 4, name: 'SHOP 4'},
        ],

        value: '',
        products: [],
        clients: [],
        collapsedItem: '',
        avatar: icons.avatar
      }
    },
    watch: {
      search: function (val) {
        if (val != '') {
          this.fetchItems()
        }
        else {
          this.products = []
          this.clients = []
        }
      },
      current_path: function () {
        this.products = []
        this.clients = []
        this.search = ''
      },
    },

    methods: {
      collapseItem (index) {
        let thisRoute = this.$route.path
        this.current_path = thisRoute

        // this.collapsedItem = index;

        this.collapsedItem === index ? this.collapsedItem = '' : this.collapsedItem = index

      },

      selectChild () {
        let thisRoute = this.$route.path
        this.current_path = thisRoute
      },

      logout () {
        axios.post('logout').then(result => {
          localStorage.removeItem('token')
          this.$router.replace('/login')
        })
      },

      fetchItems () {

        axios.post('panel-search', {
          search: this.search,
        }).then(result => {
          this.products = result.data['products']
          this.clients = result.data['clients']
        })

        // axios.post('products-search', {
        //   search: this.search
        // }).then(result => {
        //   this.products = result.data
        // })
        //
        // axios.post('clients-search', {
        //   search: this.search
        // }).then( result => {
        //   this.clients = result.data
        // })
      },
    },

    created: function () {
      let curr_path = this.$route.path
      this.current_path = curr_path
    },
  }
</script>

<style scoped>
    /*.search-bar {*/
        /*background-color: white;*/
        /*width: 100%;*/
        /*border-top: 2px solid #dddddd;*/
        /*z-index: 200;*/
    /*}*/

    /*.search-bar ul li {*/
        /*font-size: 120%;*/
        /*height: 55px;*/
        /*align-content: baseline;*/
        /*display: grid;*/
        /*grid-template-columns: 150px 1fr 50px 150px;*/
        /*grid-template-areas: "table-name item-name . item-price";*/
        /*border-bottom: 1px solid #dddddd;*/
        /*cursor: pointer;*/
    /*}*/

    /*.search-bar ul {*/
        /*padding: 0;*/
        /*margin: 0;*/
        /*border-right: 2px solid #dddddd;*/
    /*}*/

    /*.table-name {*/
        /*grid-area: table-name;*/
        /*margin-left: 30px;*/
        /*font-weight: 700;*/
    /*}*/

    /*.list-item-name {*/
        /*grid-area: item-name;*/
    /*}*/

    /*.item-price {*/
        /*grid-area: item-price;*/
    /*}*/
</style>
