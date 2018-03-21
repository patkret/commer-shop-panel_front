<template>
    <div>
        <h1 class="card-name">Kategorie</h1>
        <div class="categories-container">
            <div class="categories-list">
                <div class="list-container">
                    <ul :list="items" >
                        <li v-for="item in items">{{item.id}}. {{item.name}}</li>
                    </ul>
                </div>
            </div>
            <div class="categories-details">
                <form action="">
                    <div class="form-row">
                        <label class="categories-form-label" for="">Dodaj kategorie</label>
                        <input class="form-input categories-form-field" type="text">
                    </div>
                    <div class="form-row">
                        <label for="" class="categories-form-label">Przypisz do</label>
                        <multiselect
                                class="shop-select categories-form-field"
                                v-model="value"
                                :options="options"
                                :allow-empty="false"
                                :searchable="false"
                                :selectedLabel="''"
                                track-by="name"
                                label="name"
                                id="ms-1"
                                :deselectLabel="''"
                                :selectLabel="''"
                                :hideSelected="true"
                                placeholder="Wybierz"></multiselect>
                    </div>
                    <div class="form-row">
                        <label class="categories-form-label" for="">Aktywność</label>
                        <div class="checkbox-square form-group">
                            <input class="visibility-hidden" type="checkbox" id="checkbox">
                            <label for="checkbox" class="square"></label>
                        </div>
                    </div>
                    <div class="form-row">
                        <label class="categories-form-label" for="">Opis produktu</label>
                        <textarea class="categories-form-field categories-form-textarea" name="" id="" cols="30" rows="20"></textarea>
                    </div>
                    <div class="form-row">
                        <label class="categories-form-label" for="">Tytuł strony</label>
                        <input class="form-input categories-form-field" type="text">
                        <div class="categories-help-container">
                            <div class="categories-form-help"></div>
                            <div class="categories-form-cloud"><p>Pomocny Krzysztof</p></div>
                        </div>
                    </div>
                    <div class="form-row">
                        <label class="categories-form-label" for="">Meta description</label>
                        <input class="form-input categories-form-field" type="text">
                        <div class="categories-help-container">
                            <div class="categories-form-help"></div>
                            <div class="categories-form-cloud"><p>Pomocny Krzysztof</p></div>
                        </div>
                    </div>
                    <div class="form-row">
                        <label class="categories-form-label" for="">Meta Keywords</label>
                        <input class="form-input categories-form-field" type="text">
                        <div class="categories-help-container">
                            <div class="categories-form-help"></div>
                            <div class="categories-form-cloud"><p>Pomocny Krzysztof</p></div>
                        </div>
                    </div>
                    <div class="form-row">
                        <label class="categories-form-label" for="">Url</label>
                        <input class="form-input categories-form-field" type="text">
                        <div class="categories-help-container">
                            <div class="categories-form-help"></div>
                            <div class="categories-form-cloud"><p>Pomocny Krzysztof</p></div>
                        </div>
                    </div>
                    <button type="submit" class="custom-button">Zapisz</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "Categories",
    data () {
      return {
        items: [],
        options: [
          {id: 1, name: 'SHOP 1'},
          {id: 2, name: 'SHOP 2'},
          {id: 3, name: 'SHOP 3'},
          {id: 4, name: 'SHOP 4'},
        ],
        value: ''
      }
    },
    methods: {

    },
    created: function () {
      axios('categories')
      .then(result => this.items = result.data)
    }
  }
</script>

<style scoped>
    .categories-container {
        display: grid;
        grid-template-columns: 390px 520px 1fr;
        grid-template-areas: 'categories-list categories-details' ;
    }
    .categories-list {
        grid-area: categories-list;
    }
    .categories-details {
        grid-area: categories-details;
        margin-top: 40px;
    }
    .list-container {
        margin: 35px 50px 0 50px;
        border: 1px solid #f2f4f7;
        border-radius: 10px;
        background-color: #ffffff;
        padding: 30px;
    }
    .form-row {
        display: grid;
        margin: 10px 0;
        grid-template-areas: 'categories-form-label categories-form-field categories-help-container';
        grid-template-columns: 130px 520px 1fr;
    }
    .categories-form-label {
        grid-area: categories-form-label;
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
        border-radius: 10px;
        height: 35px;
        line-height: 35px;
        padding-left: 10px;
        border:none;
        font-size: 12px;
        font-weight: 700;
    }
    .categories-form-field {
        grid-area: categories-form-field;
    }
    .categories-help-container {
        grid-area: categories-help-container
    }
    .categories-form-textarea {
        resize: none;
        height: 250px;
        margin-left: 10px;
        padding: 10px 0 0 10px;
        border: none;
        border-radius: 10px;
        font-size: 12px;
        font-weight: 700;
    }
    .shop-select {
        width: auto;
        margin-left: 10px;
    }
    .categories-help-container {
        display: flex;
    }
    .categories-form-help {
        height: 25px;
        width: 30px;
        border-radius: 5px;
        margin: 5px 0 0 10px;
        background: #30c8c9 url('../../assets/img/icons/question-mark.png') no-repeat center center;
    }
    .categories-form-cloud {
        display: none;
        background: #30c8c9;
        width: 120px;
        height: 35px;
        margin-left:  10px;
        font-size: 10px;
        text-align: center;
        color: #ffffff;
        border-radius: 5px;
        transition: 1s;
        position: relative;
    }
    .categories-form-cloud:before {
        right: 100%;
        top: calc(50% - 6px);
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        border-right-color: #30c8c9;
        border-width: 6px;
    }
    .categories-form-help:hover ~ .categories-form-cloud {
        display: block;
        transition: 1s;
    }
    .categories-form-help:hover ~ .categories-form-cloud::before {
        display: block;
    }
</style>