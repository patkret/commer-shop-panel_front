<template>
    <div id="main">
        <div class="top-nav-left">
            <a class="nav-left-a" href="#top-nav"><img class="nav-logo" src="./assets/img/icons/logo.svg" alt=""></a>
        </div>
        <div class="top-nav-right">
            <div class="top-nav-center">
                <div class="nav-input-container">
                    <img src="./assets/img/icons/search.svg" class="top-icon">
                    <input class="nav-input" type="text" name="name" placeholder="szukaj...">
                </div>
                <div class="nav-shop">
                    <div class="shop-bell">
                        <svg class="bell-icon" height="25px" width="25px" x="30px" enable-background="new 0 0 512.001 512.001" version="1.1" viewBox="0 0 512.001 512.001" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
		<path d="m504.45 365.9c-60.22-60.237-69.282-90.462-69.282-186.7 0-98.97-80.213-179.2-179.17-179.2s-179.17 80.231-179.17 179.2c0 51.891-1.382 71.262-8.525 95.044-8.883 29.628-27.119 57.993-60.766 91.657-16.119 16.128-4.701 43.699 18.1 43.699h142.05l-1.289 12.8c0 49.485 40.107 89.6 89.583 89.6s89.583-40.115 89.583-89.6l-1.289-12.8h142.06c22.81 0 34.228-27.571 18.1-43.699zm-248.44 120.5c-35.337 0-63.991-28.663-63.991-64l1.289-12.8h125.39l1.306 12.8c-1e-3 35.337-28.656 64-63.993 64zm-230.36-102.4c76.783-76.8 76.783-128 76.783-204.8 0-84.821 68.753-153.6 153.57-153.6s153.57 68.779 153.57 153.6c0 76.8 0 128 76.783 204.8h-460.71z"/>
                        </svg>
                    </div>
                </div>

            </div>

            <div class="user-container">
                <img class="user-photo" src="./assets/img/icons/user-face.png" alt="twarz uzytkownika">
                <button @click="userMenu = !userMenu" class="user-button">Mietek Wczesniak</button>
                <ul v-if="userMenu" class="user-menu">
                    <li class="user-menu-item"><a class="user-menu-a" href="">Ustawienia konta</a></li>
                    <li class="user-menu-item"><a class="user-menu-a" href="">Rozliczenia</a></li>
                    <li class="user-menu-item"><a class="user-menu-a" href="">Pomoc</a></li>
                    <li class="user-menu-item"><a class="user-menu-a" @click="logout()">Wyloguj</a></li>
                </ul>
            </div>
        </div>
        <div id="sidebar">
            <ul class="sidebar-items">
                <li v-for="(item,index) in items" @click="collapseItem(index, item)"
                    :class="{'item': current_path != item.path, 'item-active': current_path === item.path }">
                    <router-link :to="item.path">
                        <img :src="item.icon" id="item-icon">
                        <p class="item-name">{{item.text}}</p>

                        <transition name="slide-fade">
                            <ul class="child-items" v-if="openedItems[index]">
                                <li v-for="child in item.children" :class="{'child-item' : current_path != child.path, 'child-item child-active': current_path == child.path}"  @click.stop="selectChild">
                                    <router-link :to="child.path">
                                        <p class="child-name">{{child.text}}</p>
                                    </router-link>
                                </li>
                            </ul>
                        </transition>
                    </router-link>
                </li>

            </ul>
        </div>
        <div id="content">
            <router-view></router-view>
        </div>

    </div>
</template>


<script>
  import icons from './assets/icons'

  export default {

    name: 'admin',
    data () {
      return {
        openedItems: {},
        selectedSub: '',
        userMenu: false,
        current_path: '',
        item: '',
        items: [
          {icon: icons.dashboard, text: 'Dashboard', path: '/dashboard'},
          {icon: icons.orders, text: 'Sprzedaż', path: '#2'},
          {icon: icons.products, text: 'Produkty', path: '', children:
            [
              {text: 'Lista produktów', path: '/products'},
              {text: 'Dodaj produkt', path: '/product-add'},
              {text: 'Kategorie', path: '/categories'},
              {text: 'Zestawy atrybutów', path: '/attribute-sets'},
              {text: 'Zestawy wariantów', path: '/variants'},
              {text: 'Producenci', path: '/vendors'},
              {text: 'Stawki VAT', path: '/vat-rates'},
              {text:'Magazyn', path: '/stock'},
            ],
          },
          {icon: icons.clients, text: 'Klienci', path: ''},
          {icon: icons.marketing, text: 'Marketing', path: ''},
          {icon: icons.reports, text: 'Raporty', path: '/permission'},
          {icon: icons.settings, text: 'Ustawienia', path: '', children:
            [
              {text: 'Użytkownicy' , path: '/users'},
              {text: 'Konta' , path: '/Account'},
              {text: 'Sklepu' , path:''},
              {text: 'Styli' , path:''},
              {text: 'Płatności' , path:''},
              {text: 'Dostawy' , path:''},
              {text: 'Rozliczenia' , path:''},
            ],
          },
          {icon: icons.integrations, text: 'Integracje', path: '/buttons'},
        ],
        options: [
          {id: 1, name: 'SHOP 1'},
          {id: 2, name: 'SHOP 2'},
          {id: 3, name: 'SHOP 3'},
          {id: 4, name: 'SHOP 4'},
        ],

        value: '',
      }
    },

    methods: {
      collapseItem (index, item) {
        let thisRoute = this.$route.path
        this.current_path = thisRoute

        if (item.children != null) {
          this.openedItems[index] = !this.openedItems[index]
          this.$forceUpdate()
        }
        this.item = item;
      },

      selectChild(){
        let thisRoute = this.$route.path
        this.current_path = thisRoute
      },

      logout () {
        axios.post('logout').then(result => {
          localStorage.removeItem('token')
          this.$router.replace('/login')
        })
      },
    },

    created: function () {
      let curr_path = this.$route.path
      this.current_path = curr_path
    },
  }
</script>
