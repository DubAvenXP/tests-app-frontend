<template>
  <section class="resolve">
    <div class="flex items-center q-mb-xl">
      <span class="text-h5">{{ titleTest }}</span>
    </div>
    <article
      v-for="(question, i) in test.questions"
      :key="question.id"
      class="flex column q-mb-lg"
    >
      <span class="text-h5">Pregunta {{ i + 1 }}</span>
      <span class="text-subtitle1">
        {{ question.description }}
      </span>
      <div class="answers q-pl-lg">
        <q-radio
          v-for="answer in question.answers"
          :key="answer.id"
          :val="answer.id"
          v-model="currentAnswers[i].id"
          :label="answer.description"
          class="q-mr-lg"
        />
      </div>
    </article>
    <div class="q-mt-lg flex justify-end">
      <q-btn label="Enviar" color="primary" @click="sendAnswers" />
    </div>
  </section>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { computed, defineComponent, ref } from 'vue';
import { useTestStore } from '../stores/test-store';

export default defineComponent({
  name: 'ExampleComponent',
  setup() {
    const store = useTestStore();
    const { notify } = useQuasar();
    const currentAnswers = ref([
      {
        id: null,
      },
      {
        id: null,
      },
      {
        id: null,
      },
      {
        id: null,
      },
      {
        id: null,
      },
    ]);
    return {
      test: computed(() => store.test),
      titleTest: computed(() => {
        return (
          store.test.name.charAt(0).toUpperCase() + store.test.name.slice(1)
        );
      }),
      currentAnswers,
      sendAnswers() {
        notify({
          message: 'Respuestas enviadas correctamente',
          type: 'positive',
          position: 'top',
        });

        currentAnswers.value = [
          {
            id: null,
          },
          {
            id: null,
          },
          {
            id: null,
          },
          {
            id: null,
          },
          {
            id: null,
          },
        ];

      },
    };
  },
});
</script>

<style lang="sass" scoped>
.resolve
  max-width: 800px
</style>
