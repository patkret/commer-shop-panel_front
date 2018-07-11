<template>
    <div class="l-main__main">
        <section class="l-main__content">

            <div class="l-table-filters">
                <div class="l-table-filters__left">
                    <!--<single-select :options="actionOptions" placeholder="Wybierz działanie" class="header__select"></single-select>-->
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
                        <th>ID</th>
                        <th>Data</th>
                        <th>Klient</th>
                        <th>Kwota</th>
                        <th>Rodzaj</th>
                        <th>Status</th>
                        <th>Akcja</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td data-th="Wybierz">
                            <input type="checkbox">
                        </td>
                        <td data-th="ID">26091</td>
                        <td data-th="Data">14.04.2018</td>
                        <td data-th="Klient">esstet, Daniel Ptasiński</td>
                        <td data-th="Kwota">
                            <span class="h-text-red">425&nbsp;PLN</span>
                        </td>
                        <td data-th="Rodzaj">
                            <img src="images/types/allegro.png" alt="">
                        </td>
                        <td data-th="Status">
                            <span class="c-badge c-badge--1">Nowe</span>
                        </td>
                        <td data-th="Akcja" class="h-relative">
                                        <span class="c-actions-button js-actions-button">
                                            <i></i>
                                        </span>
                            <div class="c-actions js-actions">
                                <div class="c-actions__row">
                                    <a href="" class="c-actions__item">Usuń</a>
                                    <a href="" class="c-actions__item">Edytuj</a>
                                    <a href="" class="c-actions__item">Duplikuj</a>
                                    <a href="" class="c-actions__item">Szczegóły</a>
                                </div>
                                <div class="c-actions__row">
                                    <a href="" class="c-actions__item">Utwórz list przewozowy</a>
                                </div>
                                <div class="c-actions__row">
                                    <a href="" class="c-actions__item">Zamówienie w PDF</a>
                                </div>
                                <div class="c-actions__row">
                                    <a href="" class="c-actions__item">Potwierdzenie odbioru w PDF</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td data-th="Wybierz">
                            <input type="checkbox">
                        </td>
                        <td data-th="ID">26091</td>
                        <td data-th="Data">14.04.2018</td>
                        <td data-th="Klient">esstet, Daniel Ptasiński</td>
                        <td data-th="Kwota">
                            <span class="h-text-red">132,23&nbsp;PLN</span>
                        </td>
                        <td data-th="Rodzaj">
                            <img src="images/types/allegro.png" alt="">
                        </td>
                        <td data-th="Status">
                            <span class="c-badge c-badge--4">Reklamowane</span>
                        </td>
                        <td data-th="Akcja" class="h-relative">
                                        <span class="c-actions-button js-actions-button">
                                            <i></i>
                                        </span>
                            <div class="c-actions js-actions">
                                <div class="c-actions__row">
                                    <a href="" class="c-actions__item">Usuń</a>
                                    <a href="" class="c-actions__item">Edytuj</a>
                                    <a href="" class="c-actions__item">Duplikuj</a>
                                    <a href="" class="c-actions__item">Szczegóły</a>
                                </div>
                                <div class="c-actions__row">
                                    <a href="" class="c-actions__item">Utwórz list przewozowy</a>
                                </div>
                                <div class="c-actions__row">
                                    <a href="" class="c-actions__item">Zamówienie w PDF</a>
                                </div>
                                <div class="c-actions__row">
                                    <a href="" class="c-actions__item">Potwierdzenie odbioru w PDF</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td data-th="Wybierz">
                            <input type="checkbox">
                        </td>
                        <td data-th="ID">26091</td>
                        <td data-th="Data">14.04.2018</td>
                        <td data-th="Klient">esstet, Daniel Ptasiński</td>
                        <td data-th="Kwota">
                            <span class="h-text-green">350,04&nbsp;PLN</span>
                        </td>
                        <td data-th="Rodzaj">
                            <img src="images/types/allegro.png" alt="">
                        </td>
                        <td data-th="Status">
                            <span class="c-badge c-badge--2">Anulowane</span>
                        </td>
                        <td data-th="Akcja" class="h-relative">
                                        <span class="c-actions-button js-actions-button">
                                            <i></i>
                                        </span>
                            <div class="c-actions js-actions">
                                <div class="c-actions__row">
                                    <a href="" class="c-actions__item">Usuń</a>
                                    <a href="" class="c-actions__item">Edytuj</a>
                                    <a href="" class="c-actions__item">Duplikuj</a>
                                    <a href="" class="c-actions__item">Szczegóły</a>
                                </div>
                                <div class="c-actions__row">
                                    <a href="" class="c-actions__item">Utwórz list przewozowy</a>
                                </div>
                                <div class="c-actions__row">
                                    <a href="" class="c-actions__item">Zamówienie w PDF</a>
                                </div>
                                <div class="c-actions__row">
                                    <a href="" class="c-actions__item">Potwierdzenie odbioru w PDF</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td data-th="Wybierz">
                            <input type="checkbox">
                        </td>
                        <td data-th="ID">26091</td>
                        <td data-th="Data">14.04.2018</td>
                        <td data-th="Klient">esstet, Daniel Ptasiński</td>
                        <td data-th="Kwota">
                            <span class="h-text-green">513&nbsp;PLN</span>
                        </td>
                        <td data-th="Rodzaj">
                            <img src="images/types/allegro.png" alt="">
                        </td>
                        <td data-th="Status">
                            <span class="c-badge c-badge--3">Oczekuje na dostawę</span>
                        </td>
                        <td data-th="Akcja" class="h-relative">
                                        <span class="c-actions-button js-actions-button">
                                            <i></i>
                                        </span>
                            <div class="c-actions js-actions">
                                <div class="c-actions__row">
                                    <a href="" class="c-actions__item">Usuń</a>
                                    <a href="" class="c-actions__item">Edytuj</a>
                                    <a href="" class="c-actions__item">Duplikuj</a>
                                    <a href="" class="c-actions__item">Szczegóły</a>
                                </div>
                                <div class="c-actions__row">
                                    <a href="" class="c-actions__item">Utwórz list przewozowy</a>
                                </div>
                                <div class="c-actions__row">
                                    <a href="" class="c-actions__item">Zamówienie w PDF</a>
                                </div>
                                <div class="c-actions__row">
                                    <a href="" class="c-actions__item">Potwierdzenie odbioru w PDF</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td data-th="Wybierz">
                            <input type="checkbox">
                        </td>
                        <td data-th="ID">26091</td>
                        <td data-th="Data">14.04.2018</td>
                        <td data-th="Klient">esstet, Daniel Ptasiński</td>
                        <td data-th="Kwota">
                            <span class="h-text-red">123&nbsp;PLN</span>
                        </td>
                        <td data-th="Rodzaj">
                            <img src="images/types/allegro.png" alt="">
                        </td>
                        <td data-th="Status">
                            <span class="c-badge c-badge--5">Odrzucone</span>
                        </td>
                        <td data-th="Akcja" class="h-relative">
                                        <span class="c-actions-button js-actions-button">
                                            <i></i>
                                        </span>
                            <div class="c-actions js-actions">
                                <div class="c-actions__row">
                                    <a href="" class="c-actions__item">Usuń</a>
                                    <a href="" class="c-actions__item">Edytuj</a>
                                    <a href="" class="c-actions__item">Duplikuj</a>
                                    <a href="" class="c-actions__item">Szczegóły</a>
                                </div>
                                <div class="c-actions__row">
                                    <a href="" class="c-actions__item">Utwórz list przewozowy</a>
                                </div>
                                <div class="c-actions__row">
                                    <a href="" class="c-actions__item">Zamówienie w PDF</a>
                                </div>
                                <div class="c-actions__row">
                                    <a href="" class="c-actions__item">Potwierdzenie odbioru w PDF</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td data-th="Wybierz">
                            <input type="checkbox">
                        </td>
                        <td data-th="ID">26091</td>
                        <td data-th="Data">14.04.2018</td>
                        <td data-th="Klient">esstet, Daniel Ptasiński</td>
                        <td data-th="Kwota">
                            <span class="h-text-red">342,45&nbsp;PLN</span>
                        </td>
                        <td data-th="Rodzaj">
                            <img src="images/types/allegro.png" alt="">
                        </td>
                        <td data-th="Status">
                            <span class="c-badge c-badge--6">Zwrócone</span>
                        </td>
                        <td data-th="Akcja" class="h-relative">
                                        <span class="c-actions-button js-actions-button">
                                            <i></i>
                                        </span>
                            <div class="c-actions js-actions">
                                <div class="c-actions__row">
                                    <a href="" class="c-actions__item">Usuń</a>
                                    <a href="" class="c-actions__item">Edytuj</a>
                                    <a href="" class="c-actions__item">Duplikuj</a>
                                    <a href="" class="c-actions__item">Szczegóły</a>
                                </div>
                                <div class="c-actions__row">
                                    <a href="" class="c-actions__item">Utwórz list przewozowy</a>
                                </div>
                                <div class="c-actions__row">
                                    <a href="" class="c-actions__item">Zamówienie w PDF</a>
                                </div>
                                <div class="c-actions__row">
                                    <a href="" class="c-actions__item">Potwierdzenie odbioru w PDF</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td data-th="Wybierz">
                            <input type="checkbox">
                        </td>
                        <td data-th="ID">26091</td>
                        <td data-th="Data">14.04.2018</td>
                        <td data-th="Klient">esstet, Daniel Ptasiński</td>
                        <td data-th="Kwota">
                            <span class="h-text-red">762,11&nbsp;PLN</span>
                        </td>
                        <td data-th="Rodzaj">
                            <img src="images/types/allegro.png" alt="">
                        </td>
                        <td data-th="Status">
                            <span class="c-badge c-badge--7">Zrealizowane</span>
                        </td>
                        <td data-th="Akcja" class="h-relative">
                                        <span class="c-actions-button js-actions-button">
                                            <i></i>
                                        </span>
                            <div class="c-actions js-actions">
                                <div class="c-actions__row">
                                    <a href="" class="c-actions__item">Usuń</a>
                                    <a href="" class="c-actions__item">Edytuj</a>
                                    <a href="" class="c-actions__item">Duplikuj</a>
                                    <a href="" class="c-actions__item">Szczegóły</a>
                                </div>
                                <div class="c-actions__row">
                                    <a href="" class="c-actions__item">Utwórz list przewozowy</a>
                                </div>
                                <div class="c-actions__row">
                                    <a href="" class="c-actions__item">Zamówienie w PDF</a>
                                </div>
                                <div class="c-actions__row">
                                    <a href="" class="c-actions__item">Potwierdzenie odbioru w PDF</a>
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
  export default {
    name: 'orders-list',
    data: () => ({
      actionOptions: [
        {name: 'Usuń zaznaczone'}
      ]
    })
  }
</script>

<style scoped>
.l-main__content{
    padding: 0;
}
</style>