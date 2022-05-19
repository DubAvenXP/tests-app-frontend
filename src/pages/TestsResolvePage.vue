<template>
  <q-page class="q-pa-md">
    <div class="header flex items-center justify-between">
      <span class="text-h4">Responder Examen</span>
    </div>
    <q-separator class="q-mt-sm q-mb-lg" />
      <resolve-questions></resolve-questions>
  </q-page>
</template>

<script lang="ts">
import { useTestStore } from 'src/stores/test-store';
import { computed, defineAsyncComponent, defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'IndexPage',
  components: {
    resolveQuestions: defineAsyncComponent(
      () => import('src/components/ResolveQuestions.vue')
    ),
  },
  setup() {
    const route = useRoute();
    const store = useTestStore();
    const url = route.params.url;

    store.fetchTestByURL(url as string);

    return {
      titleTest: computed(() => {
        return (
          store.test.name.charAt(0).toUpperCase() + store.test.name.slice(1)
        );
      }),
    };
  },
});
</script>
