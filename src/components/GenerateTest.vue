<template>
  <q-card-section class="row items-center q-pb-none">
    <div class="text-h6">Nuevo exámen</div>
    <q-space />
    <q-btn icon="close" flat round dense v-close-popup />
  </q-card-section>

  <q-card-section class="q-py-lg">
    <q-input class="q-mb-md" filled v-model="testName" label="Nombre" />
    <div class="flex items-center">
      <span class="q-mr-md">Cantidad de preguntas:</span>
      <div class="flex items-center">
        <q-btn
          @click="decrementQuantity"
          flat
          round
          color="primary"
          icon="do_not_disturb_on"
        />
        <span class="q-mx-sm">{{ quantity }}</span>
        <q-btn
          @click="incrementQuantity"
          flat
          round
          color="primary"
          icon="add_circle"
        />
      </div>
    </div>
  </q-card-section>

  <q-card-actions align="right" class="text-primary">
    <q-btn flat label="Cancelar" v-close-popup />
    <q-btn flat label="Generar" @click="onGenerate" :loading="isLoading" />
  </q-card-actions>
</template>

<script lang="ts">
import { useTestStore } from 'src/stores/test-store';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'GenerateTestComponent',
  setup() {
    const store = useTestStore();
    const router = useRouter();
    const quantity = ref(1);
    const testName = ref('');

    return {
      isLoading: store.getIsLoading,
      testName,
      quantity,
      incrementQuantity() {
        if (quantity.value < 5) {
          quantity.value++;
        }
      },
      decrementQuantity() {
        if (quantity.value > 1) {
          quantity.value--;
        }
      },
      async onGenerate() {
        if (testName.value.length > 0) {
          await store.createTest(testName.value);
          store.setQuantityOfQuestions(quantity.value);
          testName.value = '';
          quantity.value = 1;
          store.changeModalState();
          router.push({
            name: 'tests-url',
            params: {
              url: store.test.url,
            },
          });
        }
      },
    };
  },
});
</script>
