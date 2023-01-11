<template>
  <div>
    <svg class="h-7 w-7 -rotate-90">
      <circle
        cx="50%"
        cy="50%"
        r="10"
        class="underlay stroke-gray-900/10 dark:stroke-neutral-200/10"
      ></circle>
      <circle
        ref="progress"
        cx="50%"
        cy="50%"
        r="10"
        class="progress stroke-indigo-500"
        :class="{
          'stroke-amber-600': titleLength > warning && titleLength < danger,
          'stroke-red-600': titleLength >= danger,
          tragedy: store.maxTitleLength === titleLength,
        }"
        :style="{
          strokeDashoffset: pathLenght,
          strokeDasharray: pathLenght,
        }"
      ></circle>
    </svg>
    <span
      class="text-xs absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2"
      >{{ store.maxTitleLength - titleLength }}</span
    >
  </div>
</template>

<script setup lang="ts">
import { useBoardStore } from "@/stores/board";
const store = useBoardStore();
const progress = ref<SVGGeometryElement>(null!);

const props = defineProps<{ titleLength: number }>();

const pathLenght = ref<number>();

const warning = ref<number>(Math.floor(store.maxTitleLength * (3 / 4)));
const danger = ref<number>(Math.floor(store.maxTitleLength * (3.8 / 4)));

const animateCircle = () => {
  const percent = props.titleLength / store.maxTitleLength;
  if (props.titleLength <= store.maxTitleLength) {
    const newOffset = pathLenght.value! - pathLenght.value! * percent;
    const stringOffset = newOffset.toString();
    progress.value.style.strokeDashoffset = stringOffset;
  } else {
    progress.value.style.strokeDashoffset = "0";
  }
};

const emit = defineEmits(["animateCircle"]);

onMounted(async () => {
  emit("animateCircle", animateCircle);
  await nextTick(() => {
    pathLenght.value = progress.value.getTotalLength();
  });
  animateCircle();
});
</script>

<style scoped></style>
