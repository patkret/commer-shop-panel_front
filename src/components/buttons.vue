<template>
    <div>
        <!--SWITCH-->
        <label class="switch">
            <input type="checkbox">
            <span class="slider round"></span>
        </label>

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
    /*SWITCh*/

    /* The switch - the box around the slider */
    .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
    }

    /* Hide default HTML checkbox */
    .switch input {display:none;}

    /* The slider */
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
    }

    input:checked + .slider {
        background-color: #00DE01;
    }

    input:focus + .slider {
        box-shadow: 0 0 1px #00DE01;
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }

    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
        border-radius: 50%;
    }
</style>