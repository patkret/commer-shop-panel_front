<template>
    <div class="my-input">
        <transition name="slide-fade">
            <span :class="{'label': true}" v-if="showCustLabel">{{label}}</span>
        </transition>
        <textarea class="my-input__input" rows="10" :name="label" :value="value" :placeholder="label"
                  @input="updateField($event.target.value)"/>
    </div>
</template>

<script>
  export default {
    name: 'custom-input',
    props: ['label', 'minInputLength', 'value'],
    data: () => ({
      showCustLabel: false,
    }),
    watch: {
      value: function (val) {

        if (!val || 0 === val.length) {
          this.showCustLabel = false
        }
        else {
          this.showCustLabel = true
        }
      },
    },

    methods: {
      updateField (field) {
        if (!field || 0 === field.length) {
          this.showCustLabel = false
        }
        else {
          this.showCustLabel = true
        }
        this.$emit('input', field)
      },

      checkInputLength (value) {
        if (value != null && value.length > 0) {
          if (value.length >= this.minInputLength) {
            return true
          }
          else {
            return false
          }
        }
        else {return false}
      },
    },

    created: function () {
      if (!this.value || 0 === this.value.length) {
        this.showCustLabel = false
      }
      else {
        this.showCustLabel = true
      }
    },
  }
</script>

<style scoped>
    textarea {
        resize: none;
    }

    textarea:focus {
        outline: none;
    }

    .my-input {
        margin-bottom: 12px;
        max-width: 700px;
        width: 100%;
        height: auto;
        background-color: white;
        border: 1px solid #dddddd;
        position: relative;
    }

    .label {
        font-size: 110%;
        position: absolute;
        top: -9px;
        left: 10px;
        background-color: white;
        padding: 3px;
    }

    .my-input__input {
        height: auto;
        max-width: 695px;
        width: 99%;
        font-size: 130%;
        border: transparent;
        padding: 15px;
        margin-bottom: 7px;
    }

    .slide-fade-enter-active {
        transition: all .3s ease;
    }

    .slide-fade-leave-active {
        transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateY(10px);
        opacity: 0;
    }
</style>