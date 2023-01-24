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
        ><p v-if="store.currentCardId" class=" truncate">
          {{ store.currentCard?.taskTitle }}
        </p></template
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
        <CardDescription @send-description="description = $event" />
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
        <CardInfo :description="description" /> </template
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
const store = useBoardStore();

const description = ref<string>("");
</script>

<style scoped></style>
