<template>
  <q-page class="q-pa-md">
    <div class="header flex items-center justify-between">
      <span class="text-h4">Crear preguntas</span>
      <div class="flex items-center">
        <span class="q-mx-sm text-h5">Cantidad:</span>
        <q-btn
          @click="decrementQuantity"
          color="primary"
          size="15px"
          flat
          round
          padding="5px"
          icon="do_not_disturb_on"
        />
        <span class="q-mx-sm text-h5">{{ quantity }}</span>
        <q-btn
          @click="incrementQuantity"
          color="primary"
          size="15px"
          flat
          round
          padding="5px"
          icon="add_circle"
        />
      </div>
    </div>
    <q-separator class="q-mt-sm q-mb-lg" />
    <generate-questions></generate-questions>
  </q-page>
</template>

<script lang="ts">
import { computed } from '@vue/reactivity';
import { defineAsyncComponent, defineComponent } from 'vue';
import { useTestStore } from 'src/stores/test-store';
export default defineComponent({
  name: 'IndexPage',
  components: {
    generateQuestions: defineAsyncComponent(
      () => import('src/components/GenerateQuestions.vue')
    ),
  },
  setup() {
    const store = useTestStore();
    return {
      quantity: computed(() => store.quantityOfQuestions),
      decrementQuantity() {
        if (store.quantityOfQuestions > 1) {
          store.quantityOfQuestions--;
        }
      },
      incrementQuantity() {
        if (store.quantityOfQuestions < 5) {
          store.quantityOfQuestions++;
        }
      },
    };
  },
});
</script>
