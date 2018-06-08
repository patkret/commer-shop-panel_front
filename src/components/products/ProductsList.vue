<!--<template>-->
    <!--<div>-->
        <!--<div>-->
            <!--<transition name="fade">-->
                <!--<div class="info-bar" v-if="info === true">-->
                    <!--<p>Akcja została wykonana!</p>-->
                <!--</div>-->
            <!--</transition>-->
            <!--<h1 class="card-name">Lista Produktów</h1>-->
            <!--<ul class="products-list">-->
                <!--<li :class="{'products-list-item': true, 'products-list-item active-blue': type == 1}"-->
                    <!--@click.prevent="changeComponent(1)">Wszystkie produkty-->
                <!--</li>-->
                <!--<li :class="{'products-list-item': true, 'products-list-item active-blue': type == 2}"-->
                    <!--@click.prevent="changeComponent(2)">Wyróżnione produkty-->
                <!--</li>-->
                <!--<li :class="{'products-list-item': true, 'products-list-item active-blue': type == 3}"-->
                    <!--@click.prevent="changeComponent(3)">Zaimportowane-->
                <!--</li>-->
                <!--<li :class="{'products-list-item': true, 'products-list-item active-blue': type == 4}"-->
                    <!--@click.prevent="changeComponent(4)">Brak na magazynie-->
                <!--</li>-->
                <!--<li :class="{'products-list-item': true, 'products-list-item active-blue': type == 5}"-->
                    <!--@click.prevent="changeComponent(5)">Szkice produktów-->
                <!--</li>-->
                <!--<li :class="{'products-list-item': true, 'products-list-item active-blue': type == 6}"-->
                    <!--@click.prevent="changeComponent(6)">Produkty powiązane-->
                <!--</li>-->
            <!--</ul>-->
            <!--<div class="component-container">-->
                <!--<div v-if="type == 1" @singleProduct="editProduct">-->
                    <!--<div class="products-container">-->
                        <!--<h4 class="products-container-heading">Produkty</h4>-->
                        <!--<div class="products-row">-->
                            <!--<div class="filter-container">-->
                                <!--<div class="filter-status">-->
                                    <!--<label class="filter-label">Sortuj wg</label>-->
                                    <!--<multiselect-->
                                            <!--class="admin-select"-->
                                            <!--v-model="selectedFilter"-->
                                            <!--:allow-empty="false"-->
                                            <!--:searchable="false"-->
                                            <!--:selectedLabel="''"-->
                                            <!--track-by="name"-->
                                            <!--:options="filters"-->
                                            <!--label="name"-->
                                            <!--:deselectLabel="''"-->
                                            <!--:selectLabel="''"-->
                                            <!--:hideSelected="true"-->
                                            <!--placeholder="Wybierz"/>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--<div class="filter-button">-->
                                <!--<button type="button" @click="showFilters = !showFilters">Filtrowanie</button>-->
                                <!--&lt;!&ndash;<button type="button" @click="clearFilters">wyczyść filtry</button>&ndash;&gt;-->
                            <!--</div>-->

                            <!--<div class="search-container"></div>-->
                        <!--</div>-->
                        <!--<transition name="fade">-->
                            <!--<div class="products-row" v-if="showFilters">-->
                                <!--<div class="filter-container filters">-->
                                    <!--<div class="filter-row">-->
                                        <!--<label class="label-name">Cena</label>-->
                                        <!--<input type="text" v-model="price_from" class="form-input" id="price-from"-->
                                               <!--style="width: 100px" placeholder="Od">-->
                                        <!--<label> - </label>-->
                                        <!--<input type="text" v-model="price_to" class="form-input" id="price-to"-->
                                               <!--style="width: 100px" placeholder="Do">-->
                                    <!--</div>-->
                                    <!--<div class="filter-row">-->
                                        <!--<label class="label-name">Producent</label>-->
                                        <!--<multiselect-->
                                                <!--class="admin-select vendor-select"-->
                                                <!--v-model="selectedVendor"-->
                                                <!--:allow-empty="false"-->
                                                <!--:searchable="false"-->
                                                <!--:selectedLabel="''"-->
                                                <!--track-by="name"-->
                                                <!--:options="vendors"-->
                                                <!--label="name"-->
                                                <!--:deselectLabel="''"-->
                                                <!--:selectLabel="''"-->
                                                <!--:hideSelected="true"-->
                                                <!--placeholder="Wybierz" style="margin-left: 10px"/>-->
                                    <!--</div>-->
                                    <!--<div class="filter-row">-->
                                        <!--<label class="label-name">Kategoria główna</label>-->
                                        <!--<multiselect-->
                                                <!--class="admin-select vendor-select"-->
                                                <!--v-model="selectedMainCategory"-->
                                                <!--:allow-empty="false"-->
                                                <!--:searchable="false"-->
                                                <!--:selectedLabel="''"-->
                                                <!--track-by="name"-->
                                                <!--:options="categories"-->
                                                <!--label="name"-->
                                                <!--:deselectLabel="''"-->
                                                <!--:selectLabel="''"-->
                                                <!--:hideSelected="true"-->
                                                <!--placeholder="Wybierz" style="margin-left: 10px"/>-->
                                    <!--</div>-->
                                    <!--<div class="filter-row">-->
                                        <!--<label class="label-name">Widoczność</label>-->
                                        <!--<div class="checkbox-square form-group">-->
                                            <!--<input type="checkbox" id="visibility" class="visibility-hidden"-->
                                                   <!--v-model="visibility">-->
                                            <!--<label for="visibility" class="square"></label>-->
                                        <!--</div>-->
                                    <!--</div>-->
                                    <!--<div class="filter-row">-->
                                        <!--<button type="button" class="custom-button" @click="filter()">Filtruj</button>-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</transition>-->
                        <!--<table class="products-table">-->
                            <!--<thead class="table-heading">-->
                            <!--<tr class="table-row">-->
                                <!--<th class="col-1">-->
                                    <!--<label class="check-container check-all">-->
                                        <!--<input type="checkbox" @change="selectAll" v-model="selectedAll" :value="true">-->
                                        <!--<span class="checkmark"></span>-->
                                    <!--</label>-->
                                <!--</th>-->
                                <!--<th class="col-2">Obraz</th>-->
                                <!--<th class="col-3">Kod Produktu</th>-->
                                <!--<th class="col-4 text-left">Nazwa produktu</th>-->
                                <!--<th class="col-5">Cena</th>-->
                                <!--<th class="col-6">Akcja</th>-->
                            <!--</tr>-->
                            <!--</thead>-->
                            <!--<tbody>-->
                            <!--<tr class="table-row" v-for="(item,key) in items"-->
                                <!--:class="{'attr-list-item': true, 'attr-list-item active': index === key}">-->
                                <!--<td class="table-td col-1">-->
                                    <!--<label class="check-container">-->
                                        <!--<input type="checkbox" v-model="selectedProducts" :value="item">-->
                                        <!--<span class="checkmark"></span>-->
                                    <!--</label>-->
                                <!--</td>-->
                                <!--<td class="table-td col-2"><img class="ziemniak" src="../../assets/img/bottle.png"-->
                                                                <!--alt=""></td>-->
                                <!--<td class="table-td col-3">{{item.barcode}}</td>-->
                                <!--<td class="table-td col-4 text-left">{{item.name}}</td>-->
                                <!--<td class="table-td col-5">{{item.price}}</td>-->
                                <!--<td class="table-td col-6">-->
                                    <!--<div class="buttons-container">-->
                                        <!--<button @click="showActions(key)"-->
                                                <!--:class="{'more-button': true, 'more-button active': show === true && index === key}">-->
                                            <!--<span class="dot"></span>-->
                                            <!--<span class="dot"></span>-->
                                            <!--<span class="dot"></span>-->
                                        <!--</button>-->
                                        <!--<div class="arrow-left" v-if="index === key && show === true">-->
                                            <!--<div class="action-buttons">-->
                                                <!--<button @click="deleteProduct(item)" class="delete">Usuń</button>-->
                                                <!--<router-link :to="'/products/edit/' +item.id" tag="button" class="edit">-->
                                                    <!--Edytuj-->
                                                <!--</router-link>-->
                                            <!--</div>-->
                                        <!--</div>-->
                                    <!--</div>-->
                                <!--</td>-->
                            <!--</tr>-->
                            <!--</tbody>-->
                        <!--</table>-->
                        <!--<div class="action-select-container">-->
                            <!--<p class="action-select-p">Wybierz akcję</p>-->
                            <!--<div class="action-select">-->
                                <!--<multiselect-->
                                        <!--class=" admin-select products-select"-->
                                        <!--v-model="selectedAction"-->
                                        <!--:allow-empty="false"-->
                                        <!--:searchable="false"-->
                                        <!--:selectedLabel="''"-->
                                        <!--track-by="name"-->
                                        <!--:options="actions"-->
                                        <!--label="name"-->
                                        <!--:deselectLabel="''"-->
                                        <!--:selectLabel="''"-->
                                        <!--:hideSelected="true"-->
                                        <!--placeholder="Wybierz"/>-->
                                <!--<button @click="performAction(selectedAction.id)"-->
                                        <!--:class="{'use-button' : true, 'use-button disabled' : selectedProducts.length === 0}"-->
                                        <!--:disabled="selectedProducts.length === 0">Wykonaj-->
                                <!--</button>-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div class="paginator-container">-->
                            <!--&lt;!&ndash;<paginator></paginator>&ndash;&gt;-->
                            <!--<div class="pagination-buttons">-->
                                <!--&lt;!&ndash;<button type="button" class="icon-button" @click="changePage(1)"&ndash;&gt;-->
                                        <!--&lt;!&ndash;:disabled="current_page < 2"><i class="fa fa-chevron-left"></i><i&ndash;&gt;-->
                                        <!--&lt;!&ndash;class="fa fa-chevron-left"></i></button>&ndash;&gt;-->
                                <!--&lt;!&ndash;<button type="button" class="icon-button" @click="changePage(current_page - 1)"&ndash;&gt;-->
                                        <!--&lt;!&ndash;:disabled=" current_page === 1 "><i class="fa fa-chevron-left"></i></button>&ndash;&gt;-->
                                <!--&lt;!&ndash;<button class="page" @click="changePage(current_page -4)"&ndash;&gt;-->
                                        <!--&lt;!&ndash;v-if="current_page === last_page && current_page !== 1">{{current_page - 4}}&ndash;&gt;-->
                                <!--&lt;!&ndash;</button>&ndash;&gt;-->
                                <!--&lt;!&ndash;<button class="page" @click="changePage(current_page -3)"&ndash;&gt;-->
                                        <!--&lt;!&ndash;v-if="current_page === last_page - 1 || current_page === last_page && current_page !== 1">&ndash;&gt;-->
                                    <!--&lt;!&ndash;{{current_page - 3}}&ndash;&gt;-->
                                <!--&lt;!&ndash;</button>&ndash;&gt;-->
                                <!--&lt;!&ndash;<button class="page" @click="changePage(current_page -2)" v-if="current_page > 2 ">&ndash;&gt;-->
                                    <!--&lt;!&ndash;{{current_page - 2}}&ndash;&gt;-->
                                <!--&lt;!&ndash;</button>&ndash;&gt;-->
                                <!--&lt;!&ndash;<button class="page" @click="changePage(current_page -1)" v-if="current_page > 1">&ndash;&gt;-->
                                    <!--&lt;!&ndash;{{current_page - 1}}&ndash;&gt;-->
                                <!--&lt;!&ndash;</button>&ndash;&gt;-->
                                <!--<template v-if="current_page > 1">-->
                                    <!--<button class="page" @click="changePage(current_page - 3)"-->
                                            <!--v-if="current_page > 3">{{current_page - 3 }}-->
                                    <!--</button>-->
                                    <!--<button class="page" @click="changePage(current_page - 2)"-->
                                    <!--v-if="current_page > 2">{{current_page - 2 }}-->
                                    <!--</button>-->
                                    <!--<button class="page" @click="changePage(current_page - 1)"-->
                                            <!--&gt;{{current_page - 1 }}-->
                                    <!--</button>-->
                                <!--</template>-->

                                <!--<button class="page active-page" disabled>{{current_page}}</button>-->
                                <!--<template v-if="last_page > 1">-->
                                    <!--<button class="page" @click="changePage(current_page + 1)"-->
                                            <!--v-if="current_page + 1 <= last_page -1">{{current_page +1 }}-->
                                    <!--</button>-->
                                    <!--<button class="page" @click="changePage(current_page + 2)"-->
                                    <!--v-if="current_page + 2 < last_page -1">{{current_page + 2}}-->
                                    <!--</button>-->
                                    <!--<button class="page" @click="changePage(current_page + 3)"-->
                                            <!--v-if="current_page + 3 < last_page - 1 ">{{current_page + 3}}-->
                                    <!--</button>-->
                                <!--</template>-->

                                <!--&lt;!&ndash;<template v-if="current_page < last_page - 3">&ndash;&gt;-->
                                    <!--&lt;!&ndash;<span>.</span>&ndash;&gt;-->
                                    <!--&lt;!&ndash;<span>.</span>&ndash;&gt;-->
                                    <!--&lt;!&ndash;<span>.</span>&ndash;&gt;-->
                                    <!--&lt;!&ndash;<button class="page" @click="changePage(last_page)">{{last_page}}</button>&ndash;&gt;-->
                                <!--&lt;!&ndash;</template>&ndash;&gt;-->

                                <!--<template v-if="last_page > 4 && current_page < last_page -1">-->
                                <!--<button class="page" disabled>...</button>-->

                                <!--<button class="page" @click="changePage(last_page)"-->
                                        <!--&gt;{{last_page}}-->
                                <!--</button>-->
                                <!--</template>-->


                                <!--&lt;!&ndash;<button type="button" class="icon-button" :disabled="current_page === last_page"&ndash;&gt;-->
                                        <!--&lt;!&ndash;@click="changePage(current_page +1 )"><i class="fa fa-chevron-right"></i>&ndash;&gt;-->
                                <!--&lt;!&ndash;</button>&ndash;&gt;-->
                                <!--&lt;!&ndash;<button type="button" class="icon-button" :disabled="current_page === last_page"&ndash;&gt;-->
                                        <!--&lt;!&ndash;@click="changePage(last_page)"><i class="fa fa-chevron-right"></i><i&ndash;&gt;-->
                                        <!--&lt;!&ndash;class="fa fa-chevron-right"></i></button>&ndash;&gt;-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<highlited-products v-if="type == 2"></highlited-products>-->
                <!--<imported-products v-if="type == 3"></imported-products>-->
                <!--<sketch-products v-if="type == 5"></sketch-products>-->

                <!--<modal name="visibility"-->
                       <!--width="800px">-->
                    <!--<div class="modal-form">-->
                        <!--<div class="modal-header">-->
                            <!--<h2>Zmień widoczność dla wybranych produktów</h2>-->
                        <!--</div>-->

                        <!--<div class="modal-body">-->
                            <!--<label>Widoczność</label>-->
                            <!--<div class="checkbox-square form-group">-->
                                <!--<input type="checkbox" id="attr-visibility" class="visibility-hidden"-->
                                       <!--v-model="visibility">-->
                                <!--<label for="attr-visibility" class="square"></label>-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<button type="button" class="custom-button" @click="saveVisbility">ZAPISZ</button>-->
                    <!--</div>-->
                <!--</modal>-->

                <!--<modal name="mainCategory"-->
                       <!--width="800px" height="500px">-->
                    <!--<div class="modal-form">-->
                        <!--<div class="modal-header">-->
                            <!--<h2>Zmień kategorię główną dla produktów</h2>-->
                        <!--</div>-->

                        <!--<div class="modal-body">-->
                            <!--<label>Kategoria główna</label>-->
                            <!--<multiselect-->
                                    <!--class="shop-select product-categories-select"-->
                                    <!--v-model="selectedMainCategory"-->
                                    <!--:options="categories"-->
                                    <!--:multiple="false"-->
                                    <!--:close-on-select="true"-->
                                    <!--:clear-on-select="false"-->
                                    <!--:hide-selected="true"-->
                                    <!--label="name"-->
                                    <!--track-by="name"-->
                                    <!--:selectLabel="''"-->
                                    <!--:deselectLabel="''"-->
                                    <!--placeholder="Wybierz"-->
                            <!--&gt;-->
                            <!--</multiselect>-->
                        <!--</div>-->
                        <!--<button type="button" class="custom-button" @click="saveMainCategory" style="margin-top: 150px">-->
                            <!--ZAPISZ-->
                        <!--</button>-->
                    <!--</div>-->
                <!--</modal>-->
                <!--<modal name="vendor"-->
                       <!--width="800px" height="500px">-->
                    <!--<div class="modal-form">-->
                        <!--<div class="modal-header">-->
                            <!--<h2>Zmień producenta dla produktów</h2>-->
                        <!--</div>-->

                        <!--<div class="modal-body">-->
                            <!--<label>Producent</label>-->
                            <!--<multiselect-->
                                    <!--class="shop-select product-categories-select"-->
                                    <!--v-model="selectedVendor"-->
                                    <!--:options="vendors"-->
                                    <!--:multiple="false"-->
                                    <!--:close-on-select="true"-->
                                    <!--:clear-on-select="false"-->
                                    <!--:hide-selected="true"-->
                                    <!--label="name"-->
                                    <!--track-by="name"-->
                                    <!--:selectLabel="''"-->
                                    <!--:deselectLabel="''"-->
                                    <!--placeholder="Wybierz"-->
                            <!--&gt;-->
                            <!--</multiselect>-->
                        <!--</div>-->
                        <!--<button type="button" class="custom-button" @click="saveVendor" style="margin-top: 150px">-->
                            <!--ZAPISZ-->
                        <!--</button>-->
                    <!--</div>-->
                <!--</modal>-->
                <!--<modal name="price"-->
                       <!--width="800px" height="600px">-->
                    <!--<div class="modal-form">-->
                        <!--<div class="modal-header">-->
                            <!--<h2>Zmień cenę dla produktów</h2>-->
                        <!--</div>-->

                        <!--<div class="modal-body row">-->
                            <!--<label>Cena</label>-->
                            <!--<multiselect-->
                                    <!--class="admin-select price-select"-->
                                    <!--v-model="selectedPriceOption"-->
                                    <!--:options="priceOptions"-->
                                    <!--:searchable="false"-->
                                    <!--:multiple="false"-->
                                    <!--:close-on-select="true"-->
                                    <!--:clear-on-select="false"-->
                                    <!--:hide-selected="true"-->
                                    <!--label="name"-->
                                    <!--track-by="name"-->
                                    <!--:selectLabel="''"-->
                                    <!--:deselectLabel="''"-->
                                    <!--placeholder="Wybierz"-->
                                    <!--style="margin-left: 40px"-->
                            <!--&gt;-->
                            <!--</multiselect>-->
                            <!--<input type="text" class="products-input" v-model="priceValue"/>-->
                            <!--<multiselect-->
                                    <!--class="admin-select price-select"-->
                                    <!--v-model="selectedCurr"-->
                                    <!--:options="currOptions"-->
                                    <!--:searchable="false"-->
                                    <!--:multiple="false"-->
                                    <!--:close-on-select="true"-->
                                    <!--:clear-on-select="false"-->
                                    <!--:hide-selected="true"-->
                                    <!--label="name"-->
                                    <!--track-by="name"-->
                                    <!--:selectLabel="''"-->
                                    <!--:deselectLabel="''"-->
                                    <!--placeholder="Wybierz"-->
                                    <!--style="margin-left: 40px;"-->
                            <!--&gt;-->
                            <!--</multiselect>-->
                        <!--</div>-->
                        <!--<button type="button" class="custom-button" @click="savePrice" style="margin-top: 50px">-->
                            <!--ZAPISZ-->
                        <!--</button>-->
                    <!--</div>-->
                <!--</modal>-->
                <!--<modal name="addToStock" height="400px">-->
                    <!--<form action="" @submit.prevent="addToStock" class="stock-cont">-->
                        <!--<div class="form-row header">-->
                            <!--<label class="form-label col-1"></label>-->
                            <!--<h3 class="stock-name">Dodaj stan magazynowy</h3>-->
                        <!--</div>-->
                        <!--<div class="form-row">-->
                            <!--<label class="form-label column-1">Ilość</label>-->
                            <!--<div class="form-data column-2">-->
                                <!--<input v-model="quantity" v-validate="'required|numeric'"-->
                                       <!--:class="{'input': true, 'is-danger input-border': errors.has('quantity') }"-->
                                       <!--class="form-input "-->
                                       <!--type="text" name="quantity" placeholder="szt">-->
                                <!--<span v-show="errors.has('quantity')" class="help is-danger">{{ errors.first('quantity') }}</span>-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div class="form-row">-->
                            <!--<label class="form-label column-1">Cena (netto)</label>-->
                            <!--<div class="form-data column-2" style="width: 150px">-->
                                <!--<input v-model="price_zl" v-validate="'required|numeric'"-->
                                       <!--:class="{'input': true, 'is-danger input-border': errors.has('price_zl') }"-->
                                       <!--class="form-input "-->
                                       <!--type="text" name="price_zl" placeholder="zł">-->
                                <!--<span v-show="errors.has('price_zl')" class="help is-danger">{{ errors.first('price_zl') }}</span>-->
                            <!--</div>-->
                            <!--<div class="form-data column-3">-->
                                <!--<input v-model="price_gr" v-validate="'numeric|max_value:99'"-->
                                       <!--:class="{'input': true, 'is-danger input-border': errors.has('price') }"-->
                                       <!--class="form-input "-->
                                       <!--type="text" name="price" placeholder="gr">-->
                                <!--<span v-show="errors.has('price')"-->
                                      <!--class="help is-danger">{{ errors.first('price') }}</span>-->
                                <!--<p>.</p>-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div class="form-row column-2">-->
                            <!--<button type="submit" class="custom-button col-2" style="margin-left: -320px">ZAPISZ-->
                            <!--</button>-->
                        <!--</div>-->
                    <!--</form>-->
                <!--</modal>-->
            <!--</div>-->
        <!--</div>-->
    <!--</div>-->
<!--</template>-->



<template>
    <div class="l-main__main">
        <header class="l-main__header">

            <div class="c-breadcrumb">
                        <span class="c-breadcrumb__item">
                            <a href="">Asortyment</a>
                        </span>
            </div>

            <div class="c-tabs">
                <ul class="c-tabs__nav">
                    <li class="c-tabs__nav-item" v-for="tab in tabs">
                        <a href="">{{tab.name}}</a>
                    </li>
                    <!--<li class="c-tabs__nav-item">-->
                        <!--<a href="">Logi</a>-->
                    <!--</li>-->
                </ul>
            </div>

        </header>

        <section class="l-main__content" style="padding: 0">

            <div class="l-table-filters">
                <div class="l-table-filters__left">
                    <div class="c-dropdown js-dropdown">
                                <span class="c-dropdown__name">
                                    Wybierz działanie
                                    <span class="c-arrow-down"></span>
                                </span>

                        <ul class="c-dropdown__menu">
                            <li class="c-dropdown__menu-item">
                                <a href="">
                                    Cena
                                    <span class="c-arrow-down"></span>
                                </a>
                            </li>
                            <li class="c-dropdown__menu-item is-active">
                                <a href="">
                                    Kto przygotował
                                    <span class="c-arrow-down"></span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div class="c-dropdown js-dropdown">
                                <span class="c-dropdown__name">
                                    Filtrowanie
                                    <span class="c-arrow-down"></span>
                                </span>

                        <ul class="c-dropdown__menu">
                            <li class="c-dropdown__menu-item">
                                <a href="">
                                    Cena
                                    <span class="c-arrow-down"></span>
                                </a>
                            </li>
                            <li class="c-dropdown__menu-item is-active">
                                <a href="">
                                    Kto przygotował
                                    <span class="c-arrow-down"></span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="l-table-filters__right">
                    <div class="c-search-filter">
                        <input type="text" class="c-search-filter__field" placeholder="Szukaj na liście ofert">
                    </div>

                    <div class="c-dropdown js-dropdown">
                                <span class="c-dropdown__name">
                                    Filtrowanie
                                    <span class="c-arrow-down"></span>
                                </span>

                        <ul class="c-dropdown__menu">
                            <li class="c-dropdown__menu-item">
                                <a href="">
                                    Cena
                                    <span class="c-arrow-down"></span>
                                </a>
                            </li>
                            <li class="c-dropdown__menu-item is-active">
                                <a href="">
                                    Kto przygotował
                                    <span class="c-arrow-down"></span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="c-table">
                <table>
                    <thead>
                    <tr>
                        <th>
                            <input type="checkbox">
                        </th>
                        <th></th>
                        <th>Kod produktu</th>
                        <th>Nazwa produktu</th>
                        <th>Producent</th>
                        <th>Stan magazynowy</th>
                        <th>Cena zakupu brutto</th>
                        <th>Cena sprzedaży brutto</th>
                        <th>Aktywność</th>
                        <th>Akcja</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(product,key) in items">
                        <td data-th="Wybierz">
                            <input type="checkbox">
                        </td>
                        <td data-th="Zdjecie" class="product--photo">
                            <img :src="wine"/>
                        </td>
                        <td data-th="Kod">{{product.symbol}}</td>
                        <td data-th="Nazwa">
                            {{product.name}}
                        </td>
                        <td data-th="Producent">
                            aaa
                        </td>
                        <td data-th="Stan magazynowy">
                            {{product.stock_count}}
                        </td>
                        <td data-th="Cena zakupu">
                            15222
                        </td>
                        <td data-th="Cena sprzedaży">
                            {{product.price}}
                        </td>
                        <td data-th="Aktywność">
                            <p v-if="product.visibility === 1">Tak</p>
                            <p v-if="product.visibility === 0">Nie</p>
                        </td>

                        <td data-th="Akcja" class="h-relative">
                                        <span class="c-actions-button js-actions-button" @click="showActions(key)">
                                            <i></i>
                                        </span>
                            <div :class="{'c-actions js-actions': true, 'c-actions js-actions is-active': index === key}">
                                <div class="c-actions__row">
                                    <a href="" class="c-actions__item" @click="deleteProduct(product)">Usuń</a>
                                    <a href="" class="c-actions__item">Edytuj</a>
                                    <a href="" class="c-actions__item">Duplikuj</a>
                                    <a href="" class="c-actions__item">Szczegóły</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <div class="c-pagination">
                    <div class="c-pagination__list">
                        <span class="c-pagination__item is-active">1</span>
                        <a href="" class="c-pagination__item">2</a>
                        <a href="" class="c-pagination__item">3</a>
                        <a href="" class="c-pagination__item">4</a>
                        <span class="c-pagination__item">...</span>
                        <a href="" class="c-pagination__item">25</a>
                    </div>
                </div>
            </div>

        </section>

    </div>

</template>
<script>
  import changeVisibility from './changeVisibibility'
  import Paginator from '../paginator'
  import icon from '../../assets/icons'

  export default {
    name: 'products-list',
    components: {
      Paginator,
      changeVisibility,
    },

    data () {
      return {
        wine: icon.wine,
        items: [],
        selectedProducts: [],
        buttons: [],
        index: '',
        show: false,
        type: 1,
        editingProduct: '',
        tabs: [
          {name: 'Wszystkie produkty', path: '/products'},
          {name: 'Szkice', path: ''},
          {name: 'Bilety', path: ''},
          {name: 'Zaimportowane', path: ''}
        ],
        filters: [
          {
            id: 0,
            name: 'Ostatnio dodane',
          },
          {
            id: 1,
            name: 'Od najniższa cena',
          },
          {
            id: 2,
            name: 'Od najwyższa cena',
          },
          {
            id: 3,
            name: 'Nazwa',
          },
        ],
        actions: [
          {
            id: 0,
            name: 'Usuń zaznaczone',
          },
          {
            id: 1,
            name: 'Zmiana producenta',
          },
          {
            id: 2,
            name: 'Zmiana widoczności',
          },
          {
            id: 3,
            name: 'Zmiana stanu magazynowego',
          },
          {
            id: 4,
            name: 'Zmiana kategorii głównej',
          },
          {
            id: 5,
            name: 'Zmiana ceny',
          },

        ],
        value: '',
        selectedFilter: '',
        selectedAction: '',
        showModal: false,
        visibility: null,
        selectedProductsIds: [],
        selectedAll: false,
        selectedMainCategory: '',
        main_category: '',
        categories: [],
        vendors: [],
        selectedVendor: '',
        vendor_id: '',
        priceOptions: [
          {
            id: 0,
            name: 'zwiększ o',
          },
          {
            id: 1,
            name: 'zmniejsz o',
          },
        ],
        currOptions: [
          {
            id: 0,
            name: '%',
          },
          {
            id: 1,
            name: 'zł',
          },
        ],
        selectedPriceOption: {
          id: 0,
          name: 'zwiększ o',
        },
        priceValue: '',
        selectedCurr: {
          id: 1,
          name: 'zł',
        },
        quantity: '',
        price_zl: '',
        price_gr: '',
        showFilters: false,
        price_from: '',
        price_to: '',
        current_page: '',
        last_page: '',
        info: false,
        filtered: false,
        orderBy: 'name',
        order: 'asc',
        rows: 5,
      }
    },
    watch: {
      selectedProducts: function (selected) {
        this.selectedProductsIds = selected.map(el => el.id)
      },
      selectedMainCategory: function (value) {
        this.main_category = value.id
      },
      selectedVendor: function (value, old) {
        this.vendor_id = value.id
      },
      selectedFilter: function (value) {
        if (value.id === 0) {
          this.orderBy = 'created_at'
          this.order = 'desc'
        }
        else if (value.id === 1) {
          this.orderBy = 'price'
          this.order = 'asc'
        }
        else if (value.id === 2) {
          this.orderBy = 'price'
          this.order = 'desc'
        }
        else {
          this.orderBy = 'name'
          this.order = 'asc'
        }

        axios('/products-filter/?order_by=' + this.orderBy + '&order=' + this.order + '&rows=' + this.rows + '&price_from=' + this.price_from + '&price_to=' + this.price_to + '&vendor=' + this.vendor_id + '&main_category=' +
          this.main_category + '&visibility=' + this.visibility).
          then(result => {
            this.items = result.data.data
            this.current_page = result.data.current_page
            this.last_page = result.data.last_page
          })

      },
    },
    methods: {
      showActions (key) {
        if (this.index === key) {
          this.show = false
          this.index = ''
        }
        else {
          this.show = true
          this.index = key
        }
      },
      selectAll () {
        if (this.selectedAll === false) {
          this.selectedProducts = []
          this.selectedProductsIds = []
        }
        else {
          this.selectedProducts = this.items
          this.selectedProductsIds = this.selectedProducts.filter(el => this.selectedProducts[el.id])
        }

      },
      deleteProduct (item) {
        this.$swal({
          title: 'Czy chcesz usunąć produkt',
          text: 'Ta akcja nieodwracalnie usunie produkt',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          cancelButtonText: 'Anuluj',
          confirmButtonText: 'Usuń',
        }).then((result) => {
            if (result.value) {
              let itemIndex = this.items.map(x => x.id).indexOf(item.id)
              this.items.splice(itemIndex, 1)
              axios.delete('products/' + item.id).then(
                result => {
                  console.log(result)
                })
              this.$swal({
                title: 'Usunięto!',
                text: 'Produkt został usunięty',
                type: 'success',
                confirmButtonText: 'OK',
              })
            } else {
              this.$swal('Anulowane', 'Produkt nie został usunięty.', 'info')
            }
          },
          dismiss => {
          }).catch(this.$swal.noop)
      },

      editProduct (item) {
        this.$emit('singleProduct', item)
      },
      changeComponent (type) {
        this.type = type
      },

      performAction (id) {
        if (id === 0) {
          this.$swal({
            title: 'Czy chcesz usunąć produkty',
            text: 'Ta akcja nieodwracalnie usunie zaznaczone produkty',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'Anuluj',
            confirmButtonText: 'Usuń',
          }).then((result) => {
              this.info = true
              if (result.value) {
                axios.delete('/products/delete-all/' + JSON.stringify(this.selectedProductsIds),
                ).then((result) => {
                  this.selectedProducts = []
                  setTimeout(() => {
                    this.info = false
                  }, 300)
                  axios('products').then(result =>
                    this.items = result.data.data)
                })

                this.$swal({
                  title: 'Usunięto!',
                  text: 'Produkty zostały usunięte',
                  type: 'success',
                  confirmButtonText: 'OK',
                })
              } else {
                this.$swal('Anulowane', 'Produkty nie zostały usunięte.', 'info')
              }
            },
            dismiss => {
            }).catch(this.$swal.noop)
        }
        else if (id === 1) {
          this.$modal.show('vendor')
        }
        else if (id === 2) {
          this.$modal.show('visibility')
        }
        else if (id === 3) {
          this.$modal.show('addToStock')
        }
        else if (id === 4) {
          this.$modal.show('mainCategory')
        }
        else {
          this.$modal.show('price')
        }
      },

      saveVisbility () {
        axios.put('/products/change-visibility', {
          visibility: ~~this.visibility,
          ids: this.selectedProductsIds,

        }).then(() => {
          this.$modal.hide('visibility')
          this.selectedAction = []

        })
      },
      saveMainCategory () {
        axios.put('products/change-main-category', {
          main_category: this.main_category,
          ids: this.selectedProductsIds,
        }).then(() => {
            this.$modal.hide('mainCategory')
            this.selectedAction = []
          },
        )
      },
      saveVendor () {
        axios.put('products/change-vendor', {
          ids: this.selectedProductsIds,
          vendor: this.vendor_id,
        }).then(() => {
          this.$modal.hide('vendor')
          this.selectedAction = []
        })
      },
      savePrice () {
        axios.put('products/change-price', {
          ids: this.selectedProductsIds,
          selectedPriceOption: this.selectedPriceOption,
          priceValue: this.priceValue,
          selectedCurr: this.selectedCurr,

        }).then(() => {
          axios('products').then(result => {
              this.items = result.data.data,
                this.selectedProducts = result.data
            },
          )
          this.priceValue = ''
          this.$modal.hide('price')
          this.selectedAction = ''
        })
      },
      addToStock () {
        if (this.price_gr == '') {
          this.price_gr = '00'
        }
        axios('products/add-to-stock', {
          quantity: this.quantity,
          ids: this.selectedProductsIds,
          price: this.price_zl + '.' + this.price_gr,
        }).then(() => {

        })
      },
      filter () {
        axios('/products-filter/?order_by=' + this.orderBy + '&order=' + this.order + '&rows=' + this.rows + '&price_from=' + this.price_from + '&price_to=' + this.price_to + '&vendor=' + this.vendor_id + '&main_category=' +
          this.main_category + '&visibility=' + this.visibility).
          then(result => {
            this.items = result.data.data
            this.current_page = result.data.current_page
            this.last_page = result.data.last_page
          })
        // this.filtered = true
        // axios.post('/products-filter', {
        //   price_from: this.price_from,
        //   price_to: this.price_to,
        //   vendor: this.vendor_id,
        //   category: this.main_category,
        //   visibility: this.visibility,
        // }).then(result => {
        //   this.items = result.data.data
        //   this.current_page = result.data.current_page
        //   this.last_page = result.data.last_page
        //   console.log(result.data)
        //
        // })
      },
      changePage (page) {
        console.log(page)
        this.current_page = page
        // if (this.filtered === true) {
        axios('/products-filter/?page=' + page + '&order_by=' + this.orderBy + '&order=' + this.order + '&rows=' + this.rows + '&price_from=' + this.price_from + '&price_to=' + this.price_to + '&vendor=' + this.vendor_id + '&main_category=' +
          this.main_category + '&visibility=' + this.visibility).
          then(result => {
            this.items = result.data.data
            this.current_page = result.data.current_page
            this.last_page = result.data.last_page
            console.log(result.data)
          })
        // }
        // else {
        //   axios('/products?page=' + page).then(result => {
        //     this.items = result.data.data
        //   })
        // }

      },

      clearFilters () {

      },
    },
    created: function () {

      axios('/products-filter/?order_by=' + this.orderBy + '&order=' + this.order + '&rows=' + this.rows + '&price_from=' + this.price_from + '&price_to=' + this.price_to + '&vendor=' + this.vendor_id + '&main_category=' +
        this.main_category + '&visibility=' + this.visibility).
        then(result => {

          this.items = result.data.data
          this.current_page = result.data.current_page
          this.last_page = result.data.last_page
          console.log(result.data)
        })



      // axios('products').then(result => {
      //   this.items = result.data.data
      //   this.current_page = result.data.current_page
      //   this.last_page = result.data.last_page
      // })

      axios('all-categories').then(result => {
        this.categories = result.data
      })

      axios('vendors').then(result => {
        this.vendors = result.data
      })

      axios('products-max-price').then(result => {
        this.price_from = 1
        this.price_to = result.data
      })

    },
  }
</script>
<style scoped>
    /*PRODUKTY */
    .products-list {
        display: flex;
        border-bottom: 1px solid #dde0e5;
        font-weight: 700;
        font-size: 12px;
        margin: 40px;
        padding-left: 0;
    }

    .products-list-item {
        padding: 20px;
        margin: 0 20px;
        cursor: pointer;
        color: #626364;
        font-weight: 700;
    }

    .products-list-item:first-child {
        margin-left: 0;
        padding-left: 0;
    }

    .active-blue {
        border-bottom: 2px solid #2596eb;
        color: #000000;
    }

    /*KONIEC PRODUKTÓW*/
    .products-container {
        background-color: #ffffff;
        font-size: 16px;
        font-weight: 500;
    }

    .attr-list-item {
        padding: 10px 0 10px 10px;
    }

    .products-select {
        width: 200px;
        align-self: center;
        height: 20px;
    }

    .action-select-container {
        display: flex;
        flex-direction: column;
        margin: 40px 0;
    }

    .action-select {
        display: flex;
        height: 40px;
    }

    .action-select-p {
        font-size: 12px;
        padding-left: 5px;
    }

    .use-button {
        margin: 10px 0 0 10px;
        align-self: center;
        background: linear-gradient(to right, #21c8cc, #2595ec);
        border: none;
        font-weight: 700;
        height: 40px;
        width: 130px;
        border-radius: 5px;
        color: #ffffff;
        font-size: 14px;
    }

    thead .table-row {
        display: grid;
        grid-template-columns: 35px 250px 250px 350px 250px 300px;
        grid-template-areas: 'col-1 col-2 col-3 col-4 col-5 col-6';
        text-align: center;
        padding: 20px 0 0 0;
        height: 20px;
        line-height: 20px;
    }

    thead .check-container {
        bottom: 40%;
        left: 35%;
    }

    .table-row {
        display: grid;
        grid-template-columns: 35px 250px 250px 350px 250px 300px;
        grid-template-areas: 'col-1 col-2 col-3 col-4 col-5 col-6';
        text-align: center;
        margin: 40px 0;
    }

    .table-td {
        height: 50px;
        line-height: 50px;
    }

    .col-1 {
        grid-area: col-1;
    }

    .col-2 {
        grid-area: col-2;
    }

    .col-3 {
        grid-area: col-3;
    }

    .col-4 {
        grid-area: col-4;
    }

    .col-5 {
        grid-area: col-5;
    }

    .col-6 {
        grid-area: col-6;
    }

    .table-heading {
        padding-top: 40px;
    }

    .table-row:first-of-type {
        margin-top: 10px;
    }

    .products-row {
        display: flex;
        justify-content: space-between;
    }

    .filter-container {
        display: flex;
    }

    .filter-status, .filter-keyword {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        font-size: 12px;
        font-weight: 700;
    }

    .filter-status {
        margin-right: 20px;
    }

    .products-input {
        background-color: #f5f7fa;
        border-radius: 5px;
        border: none;
        height: 40px;
        line-height: 40px;
        /*margin-top: 10px;*/
        padding-right: 60px;
        padding-left: 10px;
        font-weight: 700;
    }

    .admin-select {
        /*margin-top: 10px;*/
        font-size: 10px;
        border-radius: 5px;
    }

    .admin .multiselect__tags {
        background-color: #f5f7fa;
        border: none;
        width: 170px;
        margin-top: 1px;
        color: #000;
        border-radius: 5px;
    }

    .admin .multiselect__single {
        background-color: #f5f7fa;
        font-size: 12px;
        font-weight: 700;
    }

    .admin .multiselect__content-wrapper {
        border: 1px solid #f5f7fa;
        border-top: none;
        border-radius: 5px;
        width: 100%;
    }

    .action-select-container {
        padding-bottom: 30px;
    }

    /*ACTION BUTTONS*/
    .buttons-container {
        position: relative;
    }

    .more-button {
        height: 40px;
        border: none;
        color: #dde0e5;
        background-color: #ffffff;
    }

    .dot {
        height: 6px;
        width: 6px;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
    }

    .action-buttons {
        position: absolute;
        top: -22px;
        display: flex;
        border: 1px solid #dde0e5;
        border-radius: 5px;
        z-index: -1;
    }

    .action-buttons button {
        background-color: #ffffff;
        height: 40px;
        border-radius: 5px;
        border: none;
    }

    .action-buttons button:first-child {
        border-right: 1px solid #dde0e5;
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
    }

    .action-buttons button:last-child {
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
    }

    .action-buttons button:hover {
        cursor: pointer;
        background-color: #dde0e5;
    }

    .active {
        background-color: #F3F4F8;
        border-radius: 5px;
    }

    .arrow-left {
        position: absolute;
        width: 0;
        height: 0;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-left: 15px solid transparent;
        z-index: 20;
        top: 36%;
    }

    .table-row th {
        font-size: 14px;
        text-transform: uppercase;
    }

    /*CHECKBOX*/
    .check-container {
        display: block;
        position: relative;
        margin-top: 10px;
        padding-left: 35px;
        margin-bottom: 12px;
        cursor: pointer;
        font-size: 18px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .check-container p {
        padding-top: 3px;
    }

    .check-container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        margin-top: -35px;
    }

    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 23px;
        width: 23px;
        background-color: #FFFFFF;
        border: 1px solid #DAD8DA;
        border-radius: 5px;
    }

    .check-container:hover input ~ .checkmark {
        background-color: #ccc;
    }

    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    .check-container input:checked ~ .checkmark:after {
        display: block;
    }

    .check-container .checkmark:after {
        left: 8px;
        top: 3px;
        width: 5px;
        height: 10px;
        border: solid black;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    .action-select-p {
        font-size: 14px;
        font-weight: 700;
    }

    .text-left {
        text-align: left;
        padding-left: 30px;
        margin-bottom: 10px;
    }

    .filter-label {
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 10px;
    }

    .ziemniak {
        height: 62px;
        width: 62px;
    }

    .modal-form {

        display: flex;
        flex-direction: column;
    }

    .modal-body {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top: 50px;
        margin-left: -30px;
        align-items: center;
        font-size: 120%;
    }

    .modal-header {
        text-align: center;
        margin-top: 20px;
    }

    .custom-button {
        margin: 50px 0 0 40%;
        background: linear-gradient(to right, #21c8cc, #2595ec);
        color: white;
    }

    .v--modal-box .v--modal {
        background-color: #F6F7FB;

    }

    .v--modal-overlay {
        background-color: rgba(0, 0, 0, 0.6);
    }

    .modal-info {
        font-size: 130%;
        color: #2595ec;
        text-align: center;
        opacity: 0.5;
        vertical-align: middle;
        line-height: 130px;
    }

    .disabled {
        background: #DDE0E5;
        color: black;
    }

    .products-input {
        margin-left: 50px;
        width: 100px;
    }

    .products-input input {
        border: 1px solid lightcoral;
    }

    .stock-cont {
        margin-left: 55px;
    }

    .form-row {
        display: grid;
        margin: 20px 0;
        grid-template-areas: 'column-1 column-2 column-3';
        grid-template-columns: 130px 320px;
    }

    .column-1 {
        grid-area: column-1;
    }

    .column-2 {
        grid-area: column-2;

    }

    .column-3 {
        grid-area: column-3;
        width: 150px;
        margin-left: -150px;
    }

    .column-3 p {
        margin-top: -25px;
        margin-left: 2px;
        font-size: 150%;
        width: 5px;
    }

    .form-data {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    .form-label {
        font-weight: 700;
        margin-top: 10px;
        margin-right: 15px;
        font-size: 12px;
        text-align: right;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    }

    .form-input {
        background-color: #ffffff;
        margin-left: 10px;
        margin-right: 10px;
        border-radius: 5px;
        height: 35px;
        line-height: 35px;
        padding-left: 10px;
        border: none;
        font-size: 12px;
        font-weight: 700;
        width: 100%;
    }

    .input-border {
        border: 2px solid red;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    .form-data span {
        background-color: red;
        border-radius: 5px;
        color: #fff;
        padding: 10px 0 10px 14px;
        font-size: 12px;
        font-weight: 700;
        margin-left: 10px;
        border-top-right-radius: 0;
        border-top-left-radius: 0;
        width: 100%;
    }

    .header {
        display: inline-flex;
        margin-left: 130px;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .filters {
        height: 250px;
        width: 100%;
        margin: 45px 50px 45px 0;
        display: flex;
        flex-direction: column;
        border-radius: 5px;
    }

    .filter-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 15px;
    }

    .filter-row input {
        background-color: #F5F7FA;
    }

    .label-name {
        margin-right: 80px;
        width: 80px;
    }

    .square {
        margin-left: -3px;
    }

    .filter-button {
        background: linear-gradient(to right, #21c8cc, #2595ec);
        border-radius: 5px;
        margin-top: 25px;
        width: 128px;
        height: 42px;
    }

    .filter-button button {
        background-color: #FFFFFF;
        color: black;
        border: none;
        border-radius: 5px;
        width: 124px;
        height: 38px;
        margin: 2px 0 0 2px;

    }

    .info-bar {
        margin: 0 45px 0 45px;
        background-color: red;
    }

    /*PAGINATOR*/

    .paginator-container {
        margin-right: 45px;
        height: 45px;
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        grid-template-areas: ". pagination-buttons .";

    }

    .pagination-buttons {
        grid-area: pagination-buttons;
        justify-self: center;
    }

    .page {
        width: 40px;
        height: 40px;
        margin: 0 3px 0 3px;
        background: transparent;
        border: 1px solid #dddddd;
        font-size: 120%;
    }

    .icon-button {
        background-color: transparent;
        border: none;
    }

    .active-page{
        background: linear-gradient(to right, #21c8cc, #2595ec);
        border: none;
        color: white;
    }


</style>