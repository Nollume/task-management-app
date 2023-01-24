<template>
  <main
    class="flex-1 flex relative items-start justify-start bg-slate-300 dark:bg-gray-900 z-20 overflow-y-auto"
  >
    <BoardCreate
      class="absolute inset-4 text-2xl whitespace-nowrap rounded-xl bg-slate-200/40 dark:bg-gray-800/40"
      v-if="!boards.length"
    />
    <template v-else>
      <div
        class="flex flex-col gap-2 items-center justify-center absolute inset-4 text-2xl whitespace-nowrap rounded-xl bg-slate-200/40 dark:bg-gray-800/40"
        v-if="!currentBoard?.tasks?.length"
      >
        <p>The board has no tasks!</p>
        <TaskAdd class="mr-auto" />
      </div>
      <div
        v-else
        class="h-full w-full flex gap-4 overflow-x-auto p-4 scroll-pl-4 snap-mandatory snap-x md:px-6 md:gap-6 md:scroll-pl-6"
      >
        <section
          class="min-w-[75%] snap-start md:min-w-[60%] lg:min-w-[40%] xl:min-w-[35%] 2xl:min-w-[30%]"
          v-for="(column, index) in currentBoard.columns"
          :key="column.statusTitle"
        >
          <ColumnCol
            :column="column"
            :index="index"
            :tasksLength="tasksLength"
          />
          <TransitionGroup
            tag="ul"
            name="fade"
            class="flex flex-col gap-2 pb-4 md:gap-4 relative"
          >
            <template v-for="task in currentBoard.tasks" :key="task.taskId">
              <li
                v-if="task.status === column.statusTitle"
                @click="CardOpenModal(task.taskId)"
                class="bg-slate-200 dark:bg-gray-800 p-4 shadow-sm rounded-xl cursor-pointer border-2 border-gray-900/10 dark:border-neutral-200/10 hover:border-indigo-500 hover:dark:border-indigo-500"
              >
                <h5
                  class="pb-2 border-b border-gray-900/10 dark:border-neutral-200/10 capitalize truncate"
                >
                  {{ task.taskTitle }}
                </h5>

                <p
                  v-if="task.subtasks.length > 1"
                  class="text-sm pt-2 opacity-75"
                >
                  {{ completeSubtasks(task.subtasks) }} of
                  {{ task.subtasks.length }} subtasks
                </p>
                <p
                  v-else-if="task.subtasks.length === 1"
                  class="text-sm pt-2 opacity-75"
                >
                  {{ completeSubtasks(task.subtasks) }} of 1 subtask
                </p>
                <p v-else class="text-sm pt-2 opacity-75">No subtasks</p>
              </li>
            </template>
            <li
              v-if="tasksLength(column.statusTitle) === 0"
              class="p-4 absolute top-0 left-0"
            >
              You don't have any
              <span class="uppercase">"{{ column.statusTitle }}"</span> tasks
            </li>
          </TransitionGroup>
        </section>
        <ColumnAdd />
      </div>
    </template>
  </main>
</template>

<script setup lang="ts">
import { StatusModals, subtask } from "@/interfaces";
import { storeToRefs } from "pinia";
import { useBoardStore } from "~/stores/board";

const store = useBoardStore();
const { boards, currentBoard, currentCardId, modalStatus } = storeToRefs(store);

const tasksLength = (columnStatus: string) => {
  const taskLength = currentBoard.value?.tasks.filter(
    (t) => t.status === columnStatus
  );

  return taskLength?.length;
};

const completeSubtasks = (subtasks: subtask[]) => {
  return subtasks.filter((task) => task.done).length;
};

const CardOpenModal = (id: number) => {
  store.openModalFn();
  modalStatus.value = StatusModals.CARD;

  currentCardId.value = id;
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  scale: 0.8;
}
</style>
