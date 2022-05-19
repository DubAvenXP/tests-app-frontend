<template>
  <q-table
    :rows-per-page-options="[10, 25, 50, 100]"
    :rows="rows"
    :columns="columns"
    row-key="url"
  >
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <div>
          <q-btn
            round
            color="primary"
            icon="delete"
            @click="showConfirm(props.row)"
          >
          </q-btn>
          <q-btn class="q-ml-sm" round color="primary" icon="visibility" @click="redirectToTest(props.row.url)"></q-btn>
        </div>
      </q-td>
    </template>
  </q-table>
  <q-dialog v-model="confirmModal">
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="report" color="primary" text-color="white" />
        <span class="q-ml-sm"
          >¿Estas seguro que deseas eliminar este examen?</span
        >
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="primary" v-close-popup />
        <q-btn
          flat
          @click="onDelete"
          label="Eliminar"
          color="primary"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { Test } from 'src/interfaces';
import { useTestStore } from 'src/stores/test-store';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'TestsTableComponent',
  props: {
    rows: {
      type: Array,
      required: true,
    },
  },

  setup() {
    const router = useRouter();
    const store = useTestStore();
    const confirmModal = ref(false);
    const { notify } = useQuasar();
    const columns = [
      {
        name: 'name',
        label: 'Nombre',
        align: 'left',
        field: 'name',
        sortable: false,
      },
      {
        name: 'url',
        label: 'URL',
        align: 'left',
        field: 'url',
        format: (url: string) => `https://technical-test-adubon.netlify.app/#/tests/resolve/${url}`,
        sortable: false,
      },
      {
        name: 'createdAt',
        label: 'Creado',
        align: 'left',
        field: 'createdAt',
        sortable: false,
        format: (value: string) => {
          return new Date(value).toLocaleString();
        },
      },
      {
        name: 'actions',
        align: 'center',
        label: 'Acciones',
        sortable: false,
      },
    ];

    return {
      columns,
      confirmModal,
      onDelete() {
        store.deleteTest(store.test.id);
        notify({
          message: 'Examen eliminado',
          type: 'positive',
          position: 'top',
        });
      },
      showConfirm(row: Test) {
        confirmModal.value = true;
        store.test = row;
      },
      redirectToTest(url: string) {
        router.push({
          name: 'tests-resolve-url',
          params: {
            url,
          },
        })
      },
    };
  },
});
</script>
<style lang="sass" scoped>
.q-table tbody td
    font-size: 15px

</style>
