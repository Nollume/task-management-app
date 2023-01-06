<template>
  <main
    class="flex-1 flex relative items-start justify-start bg-slate-300 dark:bg-gray-900 z-20"
  >
    <CreateNewBoard
      class="absolute inset-4 text-2xl whitespace-nowrap rounded-xl bg-slate-200/40 dark:bg-gray-800/40"
      v-if="!boards.length"
    />
    <template v-else>
      <div
        class="flex flex-col gap-2 items-center justify-center absolute inset-4 text-2xl whitespace-nowrap rounded-xl bg-slate-200/40 dark:bg-gray-800/40"
        v-if="!currentBoard?.tasks?.length"
      >
        <p>The board has no tasks!</p>
        <AddTask class="ml-0" />
      </div>
      <div
        v-else
        class="h-full w-full flex gap-4 overflow-x-scroll p-4 scroll-pl-4 snap-mandatory snap-x md:px-6 md:gap-6 md:scroll-pl-6"
      >
        <section
          class="min-w-[75%] snap-start md:min-w-[60%] lg:min-w-[40%] xl:min-w-[35%] 2xl:min-w-[30%]"
          v-for="column in currentBoard.columns"
          :key="column.statusTitle"
        >
          <div class="whitespace-nowrap flex items-center gap-2 pb-4">
            <div class="w-4 h-4 rounded-full" :class="column.badge"></div>
            <h4 class="uppercase">
              {{ column.statusTitle }} ({{ tasksLength(column.statusTitle) }})
            </h4>
          </div>
          <TransitionGroup tag="ul" name="fade" class="grid gap-2 md:gap-4">
            <template v-for="task in currentBoard.tasks" :key="task.taskId">
              <li
                v-if="task.status === column.statusTitle"
                @click="CardOpenModal"
                class="bg-slate-200 dark:bg-gray-800 p-4 rounded-xl shadow-lg"
              >
                <h5
                  class="pb-2 border-b border-gray-900/10 dark:border-neutral-200/10"
                >
                  {{ task.taskTitle }}
                </h5>
                <p
                  v-if="task.subtasks.length > 1"
                  class="text-sm pt-2 opacity-75"
                >
                  0 of {{ task.subtasks.length }} subtasks
                </p>
                <p
                  v-else-if="task.subtasks.length === 1"
                  class="text-sm pt-2 opacity-75"
                >
                  0 of 1 subtask
                </p>
                <p v-else class="text-sm pt-2 opacity-75">0 subtasks</p>
              </li>
            </template>
            <li
              v-if="tasksLength(column.statusTitle) === 0"
              class="p-4 text-center"
            >
              You don't have any {{ column.statusTitle }} tasks
            </li>
          </TransitionGroup>
        </section>
        <AddColumn />
      </div>
    </template>
  </main>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { StatusModals } from "~/interfaces";
import { useBoardStore } from "~/stores/board";
const store = useBoardStore();
const { boards, currentBoard } = storeToRefs(store);
const CardOpenModal = () => {
  store.openModal = true;
  store.modalStatus = StatusModals.CARD;
};

const tasksLength = (columnStatus: string) => {
  const taskLength = currentBoard.value?.tasks.filter(
    (t) => t.status === columnStatus
  );

  return taskLength?.length;
};
</script>

<style scoped></style>
