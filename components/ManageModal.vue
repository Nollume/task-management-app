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
        ><span class="sm:hidden">
          {{ validateStr(store.currentCard?.taskTitle, 12) }} </span
        ><span class="hidden sm:inline">
          {{ validateStr(store.currentCard?.taskTitle, 33) }}
        </span></template
      >
      <template v-else-if="store.modalStatus === StatusModals.COLUMN" #title
        >Add New Column</template
      >
      <template
        v-else-if="store.modalStatus === StatusModals.REMOVECOLUMN"
        #title
        >Remove Column</template
      >
      <template
        v-else-if="store.modalStatus === StatusModals.REMOVEBOARD"
        #title
        >Remove Board</template
      >
      <template v-else-if="store.modalStatus === StatusModals.EDITBOARD" #title
        >Edit Board Title</template
      >
      <template v-if="store.modalStatus === StatusModals.CARD" #description>
        <CardDescription />
      </template>
      <template
        v-if="store.modalStatus === StatusModals.REMOVECOLUMN"
        #description
      >
        <ColumnRemove />
      </template>
      <template
        v-if="store.modalStatus === StatusModals.REMOVEBOARD"
        #description
      >
        <BoardRemove />
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
      <template v-else-if="store.modalStatus === StatusModals.EDITBOARD" #form>
        <BoardEdit />
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { useBoardStore } from "@/stores/board";
import { StatusModals } from "~/interfaces";
import { validateStr } from "@/helpers/helper";
const store = useBoardStore();
</script>

<style scoped></style>
