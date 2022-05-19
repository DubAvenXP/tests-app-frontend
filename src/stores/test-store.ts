import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { Question, Test } from 'src/interfaces';

export type TestState = {
  tests: Test[];
  test: Test;
  questions: Question[];
  isLoading: boolean;
  showModal: boolean;
  quantityOfQuestions: number;
};

export const useTestStore = defineStore('counter', {
  state: () =>
    ({
      tests: [],
      test: {} as Test,
      questions: [],
      isLoading: false,
      showModal: false,
      quantityOfQuestions: 1,
    } as TestState),
  getters: {
    getIsLoading: (state) => state.isLoading,
  },
  actions: {
    async fetchTests() {
      this.isLoading = true;
      const { data } = await api.get<Test[]>('/tests');
      this.tests = data;
      this.isLoading = false;
    },
    async fetchTestByURL(url: string) {
      this.isLoading = true;
      const { data } = await api.get<Test>(`/tests/${url}`);
      this.test = data;
      this.isLoading = false;
    },
    async createTest(name: string) {
      this.isLoading = true;
      const { data } = await api.post<Test>('/tests', { name });
      this.test = data;
      this.isLoading = false;
      this.fetchTests();
    },
    async deleteTest(id: string) {
      this.isLoading = true;
      await api.delete(`/tests/${id}`);
      this.isLoading = false;
      this.fetchTests();
    },
    async createQuestions(questions: Question[]) {
      this.isLoading = true;
      await api.post<Question[]>('/questions', { questions });
      this.isLoading = false;
    },
    changeModalState() {
      this.showModal = !this.showModal;
    },
    setQuantityOfQuestions(quantity: number) {
      this.quantityOfQuestions = quantity;
    }
  },
});
