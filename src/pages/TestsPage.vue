<template>
  <q-page class="q-pa-md">
    <div class="header flex items-center justify-between">
      <span class="text-h4">Mis exámenes</span>
      <q-btn
        color="primary"
        icon="add_circle"
        label="Nuevo examen"
        @click="showModal"
      />
    </div>
    <q-separator class="q-mt-sm q-mb-lg" />
    <table-component :rows="tests"></table-component>
  </q-page>
  <modal-component></modal-component>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, computed } from 'vue';
import { useTestStore } from 'src/stores/test-store';
export default defineComponent({
  name: 'IndexPage',
  components: {
    modalComponent: defineAsyncComponent(
      () => import('src/components/Modal.vue')
    ),
    tableComponent: defineAsyncComponent(
      () => import('src/components/TestsTable.vue')
    ),
  },
  setup() {
    const store = useTestStore();
    store.fetchTests();
    return {
      showModal: () => {
        store.changeModalState();
      },
      tests: computed(() => store.tests),
    };
  },
});
</script>
