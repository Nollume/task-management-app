<template>
  <div>
    <Modal>
      <template v-if="store.modalStatus === StatusModals.TASK" #title
        >Add New Task</template
      >
      <template v-else-if="store.modalStatus === StatusModals.BOARD" #title
        >Add New Board</template
      >
      <template v-else-if="store.modalStatus === StatusModals.CARD" #title
        >Card title</template
      >
      <template v-else-if="store.modalStatus === StatusModals.COLUMN" #title
        >Add New Column</template
      >
      <template v-if="store.modalStatus === StatusModals.CARD" #description>
        <CardDescription />
      </template>

      <template v-if="store.modalStatus === StatusModals.TASK" #form>
        <TaskForm />
      </template>
      <template v-else-if="store.modalStatus === StatusModals.BOARD" #form>
        <BoardForm
      /></template>
      <template v-else-if="store.modalStatus === StatusModals.CARD" #form>
        <CardInfo /> </template
      ><template v-else-if="store.modalStatus === StatusModals.COLUMN" #form>
        <ColumnForm />
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { useBoardStore } from "@/stores/board";
import { StatusModals } from "~/interfaces";
const store = useBoardStore();
</script>

<style scoped></style>
