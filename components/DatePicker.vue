<script setup lang="ts">
import { DatePicker as VCalendarDatePicker } from 'v-calendar'
import type {
  DatePickerDate,
  DatePickerRangeObject,
} from 'v-calendar/dist/types/src/use/datePicker.js'
import 'v-calendar/dist/style.css'

const props = defineProps({
  modelValue: {
    type: [Date, Object] as PropType<
      DatePickerDate | DatePickerRangeObject | null
    >,
    default: null,
  },
  isDateRangePicker: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:model-value', 'close'])

const date = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:model-value', value)
    emit('close')
  },
})

const attrs = {
  transparent: true,
  borderless: true,
  color: 'rock',
  'is-dark': { selector: 'html', darkClass: 'dark' },
  'first-day-of-week': 2,
}
</script>

<template>
  <VCalendarDatePicker v-if="!props.isDateRangePicker" v-model="date" v-bind="{ ...attrs, ...$attrs }" @dayclick="
      (_, event) => {
        event.target.blur();
      }
    " />
  <VCalendarDatePicker
    v-if="props.isDateRangePicker"
    v-model.range="date"
    :columns="2"
    v-bind="{ ...attrs, ...$attrs }"
    @dayclick="
      (_, event) => {
        event.target.blur();
      }
    " />
</template>

<style>
:root {
  --vc-gray-50: rgb(var(--color-gray-50));
  --vc-gray-100: rgb(var(--color-gray-100));
  --vc-gray-200: rgb(var(--color-gray-200));
  --vc-gray-300: rgb(var(--color-gray-300));
  --vc-gray-400: rgb(var(--color-gray-400));
  --vc-gray-500: rgb(var(--color-gray-500));
  --vc-gray-600: rgb(var(--color-gray-600));
  --vc-gray-700: rgb(var(--color-gray-700));
  --vc-gray-800: rgb(var(--color-gray-800));
  --vc-gray-900: rgb(var(--color-gray-900));
}

.vc-rock {
  --vc-accent-50: 229, 242, 255;
  --vc-accent-100: 191, 231, 255;
  --vc-accent-200: 125, 211, 252;
  --vc-accent-300: 56, 199, 255;
  --vc-accent-400: 0, 108, 255;
  --vc-accent-500: 0, 108, 255;
  --vc-accent-600: 0, 72, 210;
  --vc-accent-700: 0, 24, 168;
  --vc-accent-800: 120, 0, 0;
  --vc-accent-900: 5, 5, 7;
}
</style>
