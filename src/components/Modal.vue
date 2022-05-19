<template>
  <q-dialog v-model="showModal">
    <q-card style="min-width: 550px">
      <generate-test></generate-test>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue';
import { useTestStore } from 'src/stores/test-store';
import { computed } from '@vue/reactivity';
export default defineComponent({
  name: 'ModalComponent',
  components: {
    generateTest: defineAsyncComponent(
      () => import('src/components/GenerateTest.vue')
    ),
  },
  setup() {
    const store = useTestStore();
    return {
      showModal: computed({
        get() {
          return store.showModal;
        },
        set() {
          store.changeModalState();
        },
      }),

    };
  },
});
</script>

<style lang="sass" scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button
  -webkit-appearance: none
  margin: 0
  display: none

input[type='number']
  -moz-appearance: textfield
</style>
