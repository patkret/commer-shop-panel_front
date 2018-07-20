  <template>
      <main class="component__container">
        <transition name="fade">
            <div class="err-info" v-if="errorInfo">
                <p v-for="message in messages" v-show="message.show">{{message.text}}</p>
            </div>
        </transition>
        <form @submit.prevent="saveProduct">
          <header class="l-main__header">
              <div class="c-breadcrumb">
                  <span class="c-breadcrumb__item">
                      <a href="">Dodaj produkt</a>
                  </span>
              </div>

              <div class="c-tabs">
                  <ul class="c-tabs__nav">
                      <li v-for="item in items"
                          :class="{'c-tabs__nav-item':true , 'c-tabs__nav-item is-active': currentRoute ===  item.path}" @click="currentRoute = item.path">
                          <router-link :to="item.path">{{item.name}}</router-link>
                      </li>
                  </ul>
              </div>

          </header>
          <section class="c-main">
              <router-view></router-view>
          </section>
          <div class="h-center">
              <button type="submit" class="c-button c-form__button">
                  <span>Zapisz</span>
              </button>
          </div>
        </form>
      </main>

  </template>

  <script>

    export default {
      name: 'products',
      computed: {
        product() {
          return this.$store.getters.getProduct
        },
        relatedProductsIds () {
          return this.$store.getters.getSelectedProductsIds
        },
        vatRates () {
          return this.$store.getters.getVatRates
        },
        stocks () {
          return this.$store.getters.getStocks
        },
        vendors () {
          return this.$store.getters.getVendors
        },
        categories () {
          return this.$store.getters.getCategories
        },
      },
      data: () => ({
        currentRoute: '',
        items: [
          {name: 'Dane podstawowe', path: 'main-info'},
          {name: 'Dane dodatkowe', path: 'additional-info'},
          {name: 'Opisy', path: 'descriptions'},
          {name: 'SEO', path: 'seo'},
          {name: 'Galeria', path: 'gallery'},
          {name: 'Zestaw wariantów', path: 'variant-sets'},
          {name: 'Zestawy atrybutów', path: 'attribute-sets'},
          {name: 'Produkty powiązane', path: 'related-products'},
          {name: 'Lista produktów', path: 'select-related-products'},
        ],

        warningInfo: false,
        errorInfo: false,
        tempProduct: {},
        messages: [
          {
            show: false,
            text: 'Wybierz kategorię główną!',
          },
          {
            show: false,
            text: 'Wybierz stawkę VAT!',
          },
          {
            show: false,
            text: 'Wybierz magazyn!',
          },
          {
            show: false,
            text: 'Wybierz producenta!',
          },
          {
            show: false,
            text: 'Uzupełnij kod produktu!',
          },
        ],
      }),
      watch: {
        '$route' (to, fro) {
          if(to.name === 'MainInfo' && fro.name === 'MainInfoEdit'){
            this.$store.commit('clearProduct')
          }
        },
        'product.barcode'(val) {
          if(val.length > 0){
            this.messages[4].show = false
          }
        }
      },
      methods: {
        getCurrentRoute () {
          this.currentRoute = this.$route.path

          if(Object.keys(this.$route.params).length !== 0){
            this.currentRoute = this.currentRoute.split('/')[3]
          }
          else{
            this.currentRoute = this.currentRoute.split('/')[2]
          }
        },
        fetchData() {
          this.$store.dispatch('fetchRates')
          this.$store.dispatch('fetchStocks')
          this.$store.dispatch('fetchVendors')
          this.$store.dispatch('fetchCategories')
          this.$store.dispatch('fetchVariantSets')
          if(Object.keys(this.$route.params).length !== 0){
            this.$store.dispatch('fetchProduct', this.$route.params.id)
          }
        },
        setVariantSetValues () {
          this.tempProduct.variantSets = this.$store.state.products.selectedVariantSet
          if (!!this.tempProduct.variantSets) {
            this.tempProduct.variantSets.selectedVariants = this.$store.state.products.selectedVariants
          }
        },
        setAttributeSets () {
          this.tempProduct.attributeSets = this.$store.state.products.selectedAttributeSets
        },
        validateSelects () {

          this.messages[0].show = this.product.main_category ? false : true
          this.messages[1].show = this.product.vat_rate ? false : true
          this.messages[2].show = this.product.stock ? false : true
          this.messages[3].show = this.product.vendor ? false : true
          this.showErrorInfo()
        },
        showErrorInfo () {
          if (this.messages.find(el => el.show == true)) {
            this.errorInfo = true
            setTimeout(() => {
              this.errorInfo = false
            }, 3000)
          }
        },

          async saveProduct () {

          this.tempProduct = JSON.parse(JSON.stringify(this.product));
          this.setVariantSetValues()
          this.setAttributeSets()
          this.validateSelects()

          this.$validator.validateAll().then((result) => {
            if (result && this.errorInfo === false) {
                console.log(this.product.barcode.length)
                console.log(typeof (this.product.barcode))
              if(this.product.barcode){
                this.tempProduct.main_category = this.product.main_category.id
                this.tempProduct.vendor = this.product.vendor.id
                this.tempProduct.vat_rate = this.product.vat_rate.id
                this.tempProduct.stock = this.product.stock.id
                this.tempProduct.attributeSets = JSON.stringify(this.tempProduct.attributeSets)
                this.tempProduct.variantSets = JSON.stringify(this.tempProduct.variantSets)
                this.tempProduct.relatedProducts = this.relatedProductsIds
                this.tempProduct.weight_unit = this.product.weight_unit.id
                if(this.product.description_template){
                  this.tempProduct.description_template_id = this.product.description_template.id
                }
                if(!!this.$route.params.id){
                  console.log(this.tempProduct)
                  axios.put('/products/' + this.product.id, {
                      product: this.tempProduct,
                  //     categories: this.categories,
                    }).then(() => {
                      // this.$router.push('/products/list')
                      // this.$store.commit('clearProduct')
                      // this.$store.commit('clearState')
                    })
                }
                else{
                  axios.post('/products', {
                    product: this.tempProduct,
                  }).then(() => {
                    this.$router.push('/products/list')
                    this.$store.commit('clearProduct')
                    this.$store.commit('clearState')
                  })
                }

              }
              else{
                console.log('else')
                this.$router.replace('additional-info')
                this.currentRoute = 'additional-info'
                this.messages[4].show = true
                this.showErrorInfo()
              }


              // if (this.product.id > 0) {
              //   axios.put('/products/' + this.product.id, {
              //     product: this.product,
              //     categories: this.categories,
              //   }).then(() => {
              //     this.$router.push('/products')
              //     this.$store.commit('clearProduct')
              //     this.$store.commit('clearSets')
              //     this.$store.state.selectedRate = ''
              //     this.$store.state.selectedVendor = ''
              //     this.$store.state.selectedStock = ''
              //   })
              // } else {
              //

            }
            else{
              this.$router.replace('main-info')
              this.currentRoute = 'main-info'
            }
          })
        },
      },
      created: function () {
        this.getCurrentRoute()
        this.fetchData()
      },
      destroyed() {
        this.$store.commit('clearProduct')
        this.$store.commit('clearState')
      }
    }
  </script>

  <style scoped>

      .err-info {
          position: absolute;
          font-size: 0.9rem;
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          top: 100px;
          left: 350px;
          width: 79vw;
          background-color: red;
          color: #ffffff;
          padding: 20px;
          border-radius: 3px;
      }

      .err-info p {
          padding: 5px 0;
      }
  </style>
