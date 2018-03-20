<template>
    <div>
        <p>Checkbox</p>
        <div class="checkbox-square form-group">
            <input type="checkbox" id="checkbox" v-model="visibility">
            <label for="checkbox" class="square"></label>
        </div>

        <p>Button</p>
        <button class="custom-button">ZAPISZ</button>

        <p>Select</p>
        <multiselect
                class="shop-select"
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
</template>

<script>
  export default {
    name: 'buttons',
    data: () => ({
      visibility: 1,
      options: [
        {id: 1, name: 'SHOP 1'},
        {id: 2, name: 'SHOP 2'},
        {id: 3, name: 'SHOP 3'},
        {id: 4, name: 'SHOP 4'},
      ],
      value: ''
    })
  }
</script>

<style scoped>

</style>