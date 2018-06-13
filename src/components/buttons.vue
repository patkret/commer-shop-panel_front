<template>
    <div>
        <!--SWITCH-->
        <label class="switch">
            <input type="checkbox">
            <span class="slider round"></span>
        </label>
        <!--NOWY CHECKBOX -->
        <label class="new-checkbox-container">
            <input class="new-input" type="checkbox">
            <span class="new-check"></span>
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

    .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
    }
    .switch input {display:none;}

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
    /*NEW CHECKBOX */
    .new-checkbox-container {
        display: block;
        position: relative;
        cursor: pointer;
        border: 1px solid #dde0e5;
        height: 20px;
        width: 20px;
        background-color: #ffffff;
        margin-left: 20px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .new-checkbox-container input{
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }
    .new-check {
        position: absolute;
        left: 0;
        top: 0;
        height: 16px;
        width: 20px;
        font-weight: 700;

    }
    .new-check::after {
        content: "";
        position: absolute;
        display: none;
    }

    .new-checkbox-container input:checked ~ .new-check::after {
        display: block;
    }
    .new-checkbox-container .new-check::after {
        content: 'V';
        left: 50%;
        font-size: 14px;
        font-weight: 700;
        top: 50%;
        transform: translate(-50%,-50%);
        height: 10px;
        width: 10px;
        border: solid #ffffff;
        font-weight: 700;
    }



</style>