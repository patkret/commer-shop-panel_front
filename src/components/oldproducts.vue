<template>
    <div>
        <div>
            <transition name="fade">
                <div class="info-bar" v-if="info === true">
                    <p>Akcja została wykonana!</p>
                </div>
            </transition>
            <h1 class="card-name">Lista Produktów</h1>
            <ul class="products-list">
                <li :class="{'products-list-item': true, 'products-list-item active-blue': type == 1}"
                    @click.prevent="changeComponent(1)">Wszystkie produkty
                </li>
                <li :class="{'products-list-item': true, 'products-list-item active-blue': type == 2}"
                    @click.prevent="changeComponent(2)">Wyróżnione produkty
                </li>
                <li :class="{'products-list-item': true, 'products-list-item active-blue': type == 3}"
                    @click.prevent="changeComponent(3)">Zaimportowane
                </li>
                <li :class="{'products-list-item': true, 'products-list-item active-blue': type == 4}"
                    @click.prevent="changeComponent(4)">Brak na magazynie
                </li>
                <li :class="{'products-list-item': true, 'products-list-item active-blue': type == 5}"
                    @click.prevent="changeComponent(5)">Szkice produktów
                </li>
                <li :class="{'products-list-item': true, 'products-list-item active-blue': type == 6}"
                    @click.prevent="changeComponent(6)">Produkty powiązane
                </li>
            </ul>
            <div class="component-container">
                <div v-if="type == 1" @singleProduct="editProduct">
                    <div class="products-container">
                        <h4 class="products-container-heading">Produkty</h4>
                        <div class="products-row">
                            <div class="filter-container">
                                <div class="filter-status">
                                    <label class="filter-label">Sortuj wg</label>
                                    <multiselect
                                            class="admin-select"
                                            v-model="selectedFilter"
                                            :allow-empty="false"
                                            :searchable="false"
                                            :selectedLabel="''"
                                            track-by="name"
                                            :options="filters"
                                            label="name"
                                            :deselectLabel="''"
                                            :selectLabel="''"
                                            :hideSelected="true"
                                            placeholder="Wybierz"/>
                                </div>
                            </div>
                            <div class="filter-button">
                                <button type="button" @click="showFilters = !showFilters">Filtrowanie</button>
                                <!--<button type="button" @click="clearFilters">wyczyść filtry</button>-->
                            </div>

                            <div class="search-container"></div>
                        </div>
                        <transition name="fade">
                            <div class="products-row" v-if="showFilters">
                                <div class="filter-container filters">
                                    <div class="filter-row">
                                        <label class="label-name">Cena</label>
                                        <input type="text" v-model="price_from" class="form-input" id="price-from"
                                               style="width: 100px" placeholder="Od">
                                        <label> - </label>
                                        <input type="text" v-model="price_to" class="form-input" id="price-to"
                                               style="width: 100px" placeholder="Do">
                                    </div>
                                    <div class="filter-row">
                                        <label class="label-name">Producent</label>
                                        <multiselect
                                                class="admin-select vendor-select"
                                                v-model="selectedVendor"
                                                :allow-empty="false"
                                                :searchable="false"
                                                :selectedLabel="''"
                                                track-by="name"
                                                :options="vendors"
                                                label="name"
                                                :deselectLabel="''"
                                                :selectLabel="''"
                                                :hideSelected="true"
                                                placeholder="Wybierz" style="margin-left: 10px"/>
                                    </div>
                                    <div class="filter-row">
                                        <label class="label-name">Kategoria główna</label>
                                        <multiselect
                                                class="admin-select vendor-select"
                                                v-model="selectedMainCategory"
                                                :allow-empty="false"
                                                :searchable="false"
                                                :selectedLabel="''"
                                                track-by="name"
                                                :options="categories"
                                                label="name"
                                                :deselectLabel="''"
                                                :selectLabel="''"
                                                :hideSelected="true"
                                                placeholder="Wybierz" style="margin-left: 10px"/>
                                    </div>
                                    <div class="filter-row">
                                        <label class="label-name">Widoczność</label>
                                        <div class="checkbox-square form-group">
                                            <input type="checkbox" id="visibility" class="visibility-hidden"
                                                   v-model="visibility">
                                            <label for="visibility" class="square"></label>
                                        </div>
                                    </div>
                                    <div class="filter-row">
                                        <button type="button" class="custom-button" @click="filter()">Filtruj</button>
                                    </div>
                                </div>
                            </div>
                        </transition>
                        <table class="products-table">
                            <thead class="table-heading">
                            <tr class="table-row">
                                <th class="col-1">
                                    <label class="check-container check-all">
                                        <input type="checkbox" @change="selectAll" v-model="selectedAll" :value="true">
                                        <span class="checkmark"></span>
                                    </label>
                                </th>
                                <th class="col-2">Obraz</th>
                                <th class="col-3">Kod Produktu</th>
                                <th class="col-4 text-left">Nazwa produktu</th>
                                <th class="col-5">Cena</th>
                                <th class="col-6">Akcja</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="table-row" v-for="(item,key) in items"
                                :class="{'attr-list-item': true, 'attr-list-item active': index === key}">
                                <td class="table-td col-1">
                                    <label class="check-container">
                                        <input type="checkbox" v-model="selectedProducts" :value="item">
                                        <span class="checkmark"></span>
                                    </label>
                                </td>
                                <td class="table-td col-2"><img class="ziemniak" src="../../assets/img/bottle.png"
                                                                alt=""></td>
                                <td class="table-td col-3">{{item.barcode}}</td>
                                <td class="table-td col-4 text-left">{{item.name}}</td>
                                <td class="table-td col-5">{{item.price}}</td>
                                <td class="table-td col-6">
                                    <div class="buttons-container">
                                        <button @click="showActions(key)"
                                                :class="{'more-button': true, 'more-button active': show === true && index === key}">
                                            <span class="dot"></span>
                                            <span class="dot"></span>
                                            <span class="dot"></span>
                                        </button>
                                        <div class="arrow-left" v-if="index === key && show === true">
                                            <div class="action-buttons">
                                                <button @click="deleteProduct(item)" class="delete">Usuń</button>
                                                <router-link :to="'/products/edit/' +item.id" tag="button" class="edit">
                                                    Edytuj
                                                </router-link>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div class="action-select-container">
                            <p class="action-select-p">Wybierz akcję</p>
                            <div class="action-select">
                                <multiselect
                                        class=" admin-select products-select"
                                        v-model="selectedAction"
                                        :allow-empty="false"
                                        :searchable="false"
                                        :selectedLabel="''"
                                        track-by="name"
                                        :options="actions"
                                        label="name"
                                        :deselectLabel="''"
                                        :selectLabel="''"
                                        :hideSelected="true"
                                        placeholder="Wybierz"/>
                                <button @click="performAction(selectedAction.id)"
                                        :class="{'use-button' : true, 'use-button disabled' : selectedProducts.length === 0}"
                                        :disabled="selectedProducts.length === 0">Wykonaj
                                </button>
                            </div>
                        </div>
                        <div class="paginator-container">
                            <!--<paginator></paginator>-->
                            <div class="pagination-buttons">
                                <!--<button type="button" class="icon-button" @click="changePage(1)"-->
                                <!--:disabled="current_page < 2"><i class="fa fa-chevron-left"></i><i-->
                                <!--class="fa fa-chevron-left"></i></button>-->
                                <!--<button type="button" class="icon-button" @click="changePage(current_page - 1)"-->
                                <!--:disabled=" current_page === 1 "><i class="fa fa-chevron-left"></i></button>-->
                                <!--<button class="page" @click="changePage(current_page -4)"-->
                                <!--v-if="current_page === last_page && current_page !== 1">{{current_page - 4}}-->
                                <!--</button>-->
                                <!--<button class="page" @click="changePage(current_page -3)"-->
                                <!--v-if="current_page === last_page - 1 || current_page === last_page && current_page !== 1">-->
                                <!--{{current_page - 3}}-->
                                <!--</button>-->
                                <!--<button class="page" @click="changePage(current_page -2)" v-if="current_page > 2 ">-->
                                <!--{{current_page - 2}}-->
                                <!--</button>-->
                                <!--<button class="page" @click="changePage(current_page -1)" v-if="current_page > 1">-->
                                <!--{{current_page - 1}}-->
                                <!--</button>-->
                                <template v-if="current_page > 1">
                                    <button class="page" @click="changePage(current_page - 3)"
                                            v-if="current_page > 3">{{current_page - 3 }}
                                    </button>
                                    <button class="page" @click="changePage(current_page - 2)"
                                            v-if="current_page > 2">{{current_page - 2 }}
                                    </button>
                                    <button class="page" @click="changePage(current_page - 1)"
                                    >{{current_page - 1 }}
                                    </button>
                                </template>

                                <button class="page active-page" disabled>{{current_page}}</button>
                                <template v-if="last_page > 1">
                                    <button class="page" @click="changePage(current_page + 1)"
                                            v-if="current_page + 1 <= last_page -1">{{current_page +1 }}
                                    </button>
                                    <button class="page" @click="changePage(current_page + 2)"
                                            v-if="current_page + 2 < last_page -1">{{current_page + 2}}
                                    </button>
                                    <button class="page" @click="changePage(current_page + 3)"
                                            v-if="current_page + 3 < last_page - 1 ">{{current_page + 3}}
                                    </button>
                                </template>

                                <!--<template v-if="current_page < last_page - 3">-->
                                <!--<span>.</span>-->
                                <!--<span>.</span>-->
                                <!--<span>.</span>-->
                                <!--<button class="page" @click="changePage(last_page)">{{last_page}}</button>-->
                                <!--</template>-->

                                <template v-if="last_page > 4 && current_page < last_page -1">
                                    <button class="page" disabled>...</button>

                                    <button class="page" @click="changePage(last_page)"
                                    >{{last_page}}
                                    </button>
                                </template>


                                <!--<button type="button" class="icon-button" :disabled="current_page === last_page"-->
                                <!--@click="changePage(current_page +1 )"><i class="fa fa-chevron-right"></i>-->
                                <!--</button>-->
                                <!--<button type="button" class="icon-button" :disabled="current_page === last_page"-->
                                <!--@click="changePage(last_page)"><i class="fa fa-chevron-right"></i><i-->
                                <!--class="fa fa-chevron-right"></i></button>-->
                            </div>
                        </div>
                    </div>
                </div>
                <highlited-products v-if="type == 2"></highlited-products>
                <imported-products v-if="type == 3"></imported-products>
                <sketch-products v-if="type == 5"></sketch-products>

                <modal name="visibility"
                       width="800px">
                    <div class="modal-form">
                        <div class="modal-header">
                            <h2>Zmień widoczność dla wybranych produktów</h2>
                        </div>

                        <div class="modal-body">
                            <label>Widoczność</label>
                            <div class="checkbox-square form-group">
                                <input type="checkbox" id="attr-visibility" class="visibility-hidden"
                                       v-model="visibility">
                                <label for="attr-visibility" class="square"></label>
                            </div>
                        </div>
                        <button type="button" class="custom-button" @click="saveVisbility">ZAPISZ</button>
                    </div>
                </modal>

                <modal name="mainCategory"
                       width="800px" height="500px">
                    <div class="modal-form">
                        <div class="modal-header">
                            <h2>Zmień kategorię główną dla produktów</h2>
                        </div>

                        <div class="modal-body">
                            <label>Kategoria główna</label>
                            <multiselect
                                    class="shop-select product-categories-select"
                                    v-model="selectedMainCategory"
                                    :options="categories"
                                    :multiple="false"
                                    :close-on-select="true"
                                    :clear-on-select="false"
                                    :hide-selected="true"
                                    label="name"
                                    track-by="name"
                                    :selectLabel="''"
                                    :deselectLabel="''"
                                    placeholder="Wybierz"
                            >
                            </multiselect>
                        </div>
                        <button type="button" class="custom-button" @click="saveMainCategory" style="margin-top: 150px">
                            ZAPISZ
                        </button>
                    </div>
                </modal>
                <modal name="vendor"
                       width="800px" height="500px">
                    <div class="modal-form">
                        <div class="modal-header">
                            <h2>Zmień producenta dla produktów</h2>
                        </div>

                        <div class="modal-body">
                            <label>Producent</label>
                            <multiselect
                                    class="shop-select product-categories-select"
                                    v-model="selectedVendor"
                                    :options="vendors"
                                    :multiple="false"
                                    :close-on-select="true"
                                    :clear-on-select="false"
                                    :hide-selected="true"
                                    label="name"
                                    track-by="name"
                                    :selectLabel="''"
                                    :deselectLabel="''"
                                    placeholder="Wybierz"
                            >
                            </multiselect>
                        </div>
                        <button type="button" class="custom-button" @click="saveVendor" style="margin-top: 150px">
                            ZAPISZ
                        </button>
                    </div>
                </modal>
                <modal name="price"
                       width="800px" height="600px">
                    <div class="modal-form">
                        <div class="modal-header">
                            <h2>Zmień cenę dla produktów</h2>
                        </div>

                        <div class="modal-body row">
                            <label>Cena</label>
                            <multiselect
                                    class="admin-select price-select"
                                    v-model="selectedPriceOption"
                                    :options="priceOptions"
                                    :searchable="false"
                                    :multiple="false"
                                    :close-on-select="true"
                                    :clear-on-select="false"
                                    :hide-selected="true"
                                    label="name"
                                    track-by="name"
                                    :selectLabel="''"
                                    :deselectLabel="''"
                                    placeholder="Wybierz"
                                    style="margin-left: 40px"
                            >
                            </multiselect>
                            <input type="text" class="products-input" v-model="priceValue"/>
                            <multiselect
                                    class="admin-select price-select"
                                    v-model="selectedCurr"
                                    :options="currOptions"
                                    :searchable="false"
                                    :multiple="false"
                                    :close-on-select="true"
                                    :clear-on-select="false"
                                    :hide-selected="true"
                                    label="name"
                                    track-by="name"
                                    :selectLabel="''"
                                    :deselectLabel="''"
                                    placeholder="Wybierz"
                                    style="margin-left: 40px;"
                            >
                            </multiselect>
                        </div>
                        <button type="button" class="custom-button" @click="savePrice" style="margin-top: 50px">
                            ZAPISZ
                        </button>
                    </div>
                </modal>
                <modal name="addToStock" height="400px">
                    <form action="" @submit.prevent="addToStock" class="stock-cont">
                        <div class="form-row header">
                            <label class="form-label col-1"></label>
                            <h3 class="stock-name">Dodaj stan magazynowy</h3>
                        </div>
                        <div class="form-row">
                            <label class="form-label column-1">Ilość</label>
                            <div class="form-data column-2">
                                <input v-model="quantity" v-validate="'required|numeric'"
                                       :class="{'input': true, 'is-danger input-border': errors.has('quantity') }"
                                       class="form-input "
                                       type="text" name="quantity" placeholder="szt">
                                <span v-show="errors.has('quantity')" class="help is-danger">{{ errors.first('quantity') }}</span>
                            </div>
                        </div>
                        <div class="form-row">
                            <label class="form-label column-1">Cena (netto)</label>
                            <div class="form-data column-2" style="width: 150px">
                                <input v-model="price_zl" v-validate="'required|numeric'"
                                       :class="{'input': true, 'is-danger input-border': errors.has('price_zl') }"
                                       class="form-input "
                                       type="text" name="price_zl" placeholder="zł">
                                <span v-show="errors.has('price_zl')" class="help is-danger">{{ errors.first('price_zl') }}</span>
                            </div>
                            <div class="form-data column-3">
                                <input v-model="price_gr" v-validate="'numeric|max_value:99'"
                                       :class="{'input': true, 'is-danger input-border': errors.has('price') }"
                                       class="form-input "
                                       type="text" name="price" placeholder="gr">
                                <span v-show="errors.has('price')"
                                      class="help is-danger">{{ errors.first('price') }}</span>
                                <p>.</p>
                            </div>
                        </div>
                        <div class="form-row column-2">
                            <button type="submit" class="custom-button col-2" style="margin-left: -320px">ZAPISZ
                            </button>
                        </div>
                    </form>
                </modal>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'oldproducts',
  }
</script>

<style scoped>

</style>