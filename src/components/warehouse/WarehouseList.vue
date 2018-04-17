
<template>
    <div class="products-container">
        <h4 class="products-container-heading">Produkty w magazynie</h4>
        <div class="products-row">
            <div class="filter-container">
                <div class="filter-status">
                    <label class="action-select-p">Filtruj</label>
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
                            placeholder="Wybierz"></multiselect>
                </div>
            </div>
            <div class="search-container"></div>
        </div>
        <table class="products-table">
            <thead class="table-heading">
            <tr class="table-row">
                <th class="col-1"></th>
                <th class="col-2">Obraz</th>
                <th class="col-3">Ilość</th>
                <th class="col-4 text-left">Nazwa produktu</th>
                <th class="col-5">Cena wejściowa</th>
                <th class="col-6">Akcja</th>
            </tr>
            </thead>
            <tbody>
            <tr class="table-row" v-for="(item,key) in items" :class="{'attr-list-item': true, 'attr-list-item active': index === key}">
                <td class="col-1">
                    <label class="check-container">
                        <input type="checkbox" v-model="selectedProduct" :value="item">
                        <span class="checkmark"></span>
                    </label>
                </td>
                <td class="col-2">{{item.name}}</td>
                <td class="col-3">{{item.name}}</td>
                <td class="col-4 text-left">{{item.name}}</td>
                <td class="col-5">{{item.name}}</td>
                <td class="col-6">
                    <div class="buttons-container">
                        <button @click="showActions(key)" :class="{'more-button': true, 'more-button active': show === true && index === key}">
                            <span class="dot"></span>
                            <span class="dot"></span>
                            <span class="dot"></span>
                        </button>
                        <div class="arrow-left"  v-if="index === key && show === true">
                            <div class="action-buttons">
                                <button @click="deleteVariant(item)" class="delete">Usuń</button>
                                <button @click="editVariant(item)" class="edit">Edytuj</button>
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
                        placeholder="Wybierz"></multiselect>
                <button class="use-button">Wykonaj</button>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "warehouse-list",
    data () {
      return {
        options: [],
        actions: [
          {
            id: 0,
            name: 'Zaznacz wszystkie',
          },
          {
            id: 1,
            name: 'Usuń zaznaczone',
          },
        ],
      }
    },
    methods: {

    }
  }
</script>

<style scoped>

</style>