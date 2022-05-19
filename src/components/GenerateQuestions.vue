<template>
  <section class="questions">
    <div class="flex column q-mb-lg">
      <span class="text-subtitle1 text-weight-regular">
        <span class="text-weight-medium"> URL: </span>
        {{ test.url }}
      </span>
      <span class="text-subtitle1 text-weight-regular">
        <span class="text-weight-medium"> Nombre del examen: </span>
        {{ test.name }}
      </span>
      <span class="text-subtitle1 text-weight-regular">
        <span class="text-weight-medium"> Fecha de creación: </span>
        {{ test.createdAt }}
      </span>
    </div>
    <form @submit.prevent="onSubmit">
      <div v-for="i in quantity" :key="i" class="question">
        <q-input
          class="q-mb-md"
          outlined
          v-model="questions[i].description"
          :label="`Pregunta ${i}`"
        />
        <div class="q-pl-lg">
          <div class="answer">
            <q-input
              outlined
              v-model="questions[i].answers[0].description"
              :label="`Respuesta 1`"
            />
            <q-checkbox
              keep-color
              v-model="questions[i].answers[0].isCorrect"
              label="Correcta"
              color="primary"
            />
          </div>
          <div class="answer">
            <q-input
              outlined
              v-model="questions[i].answers[1].description"
              :label="`Respuesta 2`"
            />
            <q-checkbox
              keep-color
              v-model="questions[i].answers[1].isCorrect"
              label="Correcta"
              color="primary"
            />
          </div>
          <div class="answer">
            <q-input
              outlined
              v-model="questions[i].answers[2].description"
              :label="`Respuesta 3`"
            />
            <q-checkbox
              keep-color
              v-model="questions[i].answers[2].isCorrect"
              label="Correcta"
              color="primary"
            />
          </div>
        </div>
      </div>
      <div class="flex q-mb-lg justify-end">
        <q-btn
          type="submit"
          color="primary"
          icon="add_circle"
          label="crear preguntas"
        />
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { Question } from 'src/interfaces';
import { useTestStore } from 'src/stores/test-store';
import { computed, defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'GenerateTestComponent',
  setup() {
    const store = useTestStore();
    const router = useRouter();
    const { notify } = useQuasar();
    const questions = ref([
      {
        description: '',
        testId: store.test.id,
        answers: [
          {
            description: '',
            isCorrect: false,
          },
          {
            description: '',
            isCorrect: false,
          },
          {
            description: '',
            isCorrect: false,
          },
        ],
      },
      {
        description: '',
        testId: store.test.id,
        answers: [
          {
            description: '',
            isCorrect: false,
          },
          {
            description: '',
            isCorrect: false,
          },
          {
            description: '',
            isCorrect: false,
          },
        ],
      },
      {
        description: '',
        testId: store.test.id,
        answers: [
          {
            description: '',
            isCorrect: false,
          },
          {
            description: '',
            isCorrect: false,
          },
          {
            description: '',
            isCorrect: false,
          },
        ],
      },
      {
        description: '',
        testId: store.test.id,
        answers: [
          {
            description: '',
            isCorrect: false,
          },
          {
            description: '',
            isCorrect: false,
          },
          {
            description: '',
            isCorrect: false,
          },
        ],
      },
      {
        description: '',
        testId: store.test.id,
        answers: [
          {
            description: '',
            isCorrect: false,
          },
          {
            description: '',
            isCorrect: false,
          },
          {
            description: '',
            isCorrect: false,
          },
        ],
      },
      {
        description: '',
        testId: store.test.id,
        answers: [
          {
            description: '',
            isCorrect: false,
          },
          {
            description: '',
            isCorrect: false,
          },
          {
            description: '',
            isCorrect: false,
          },
        ],
      },
    ] as Question[]);
    const validate = () => {
      const newQuestions = questions.value.filter(
        (question) => question.description.trim() !== ''
      );
      //validate questions
      if (newQuestions.length !== store.quantityOfQuestions) {
        notify({
          message: 'Debe ingresar todas las preguntas',
          color: 'negative',
          icon: 'warning',
          position: 'top',
        });
        return;
      }
      //validate answers
      if (
        newQuestions.some((question) =>
          question.answers.some((answer) => answer.description.trim() === '')
        )
      ) {
        notify({
          message: 'Debe ingresar todas las respuestas',
          color: 'negative',
          icon: 'warning',
          position: 'top',
        });
        return;
      }
      //validate correct answers
      const questionsWithCorrectAnswers = newQuestions.filter((question) =>
        question.answers.some((answer) => answer.isCorrect)
      );

      if (questionsWithCorrectAnswers.length !== store.quantityOfQuestions) {
        notify({
          message: 'Debe elegir una respuesta correcta para cada pregunta',
          color: 'negative',
          icon: 'warning',
          position: 'top',
        });
        return;
      }

      return newQuestions;
    };
    return {
      questions,
      test: computed(() => store.test),
      quantity: computed(() => store.quantityOfQuestions),
      async onSubmit() {
        const questionsToSave = validate();
        await store.createQuestions(questionsToSave as Question[]);
        router.push({ name: 'tests-resolve-url', params: { url: store.test.url } });
      },
    };
  },
});
</script>

<style lang="sass">
.questions
  max-width: 800px
.question
  margin-bottom: 50px

.answer
  height: 75px
  display: grid
  grid-template-columns: 1fr 100px
  grid-auto-rows: 75px
  align-items: center
  .q-input
    width: 100%
</style>
