<template>
  <span>
    <span class="cd-number-prefix" v-html="numberInfo.prefix" />
    <span class="cd-number-output">{{ separate ? BnFormatAndSeparate(output, decimals, rounding, separator) : BnFormat(output, decimals, rounding) }}</span>
    <span class="cd-number-suffix" v-html="numberInfo.suffix" />
  </span>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { EasingFunction } from "@vueuse/core";
import { computed, watch, reactive } from "vue";
import { TransitionPresets, useTransition } from "@vueuse/core";
import { Decimal } from "decimal.js";
import { BnFormat, BnFormatAndSeparate, BnToNumber } from "../libs";

defineOptions({
  name: "CdNumber"
});

const props = defineProps({
  // start number
  start: {
    type: Number,
    default: 0
  },
  end: [Number, String, Decimal, Array, undefined] as PropType<any | [any, string?, string?] | undefined>,
  decimals: {
    type: [Number, undefined] as PropType<number | undefined>,
    default: undefined
  },
  rounding: {
    type: [Number, String, undefined] as PropType<number | string | undefined>,
    default: undefined
  },
  separate: {
    type: Boolean,
    default: true
  },
  separator: {
    type: String,
    default: undefined
  },
  delay: { type: Number, default: 0 },
  disabled: { type: Boolean, default: false },
  duration: { type: Number, default: 1500 },
  transition: {
    type: [Function, String] as PropType<EasingFunction | keyof typeof TransitionPresets>,
    default: "easeOutExpo"
  }
});

const emit = defineEmits<{
  (e: "finished"): void;
  (e: "started"): void;
}>();

const numberInfo = reactive({
  number: props.start,
  prefix: "",
  suffix: ""
});

/**
 * https://vueuse.org/core/useTransition/
 */
const output = useTransition(
  computed(() => numberInfo.number),
  {
    delay: computed(() => props.delay),
    disabled: computed(() => props.disabled),
    duration: computed(() => props.duration),
    onFinished: () => emit("finished"),
    onStarted: () => emit("started"),
    transition: computed(() => (typeof props.transition === "string" ? TransitionPresets[props.transition] : props.transition))
  }
);

const getFormatValue = (value: any) => {
  if (typeof value === "undefined") {
    return "0";
  }
  if (typeof value === "string" || value instanceof Decimal) {
    return BnToNumber(value);
  }
  if (typeof value === "number") {
    return value;
  }
  return value;
};

const getFormatInfo = (value: number | string | Decimal | [any, string?, string?] | undefined) => {
  if (typeof value === "undefined") {
    return {
      prefix: "",
      number: "0",
      suffix: ""
    };
  }
  if (typeof value === "number") {
    return {
      number: value,
      prefix: "",
      suffix: ""
    };
  }
  if (typeof value === "string" || value instanceof Decimal) {
    return {
      number: BnToNumber(value),
      prefix: "",
      suffix: ""
    };
  }
  return {
    number: getFormatValue(value[0]),
    prefix: value[1] ?? "",
    suffix: value[2] ?? ""
  };
};

watch(
  () => props.end,
  end => {
    Object.assign(numberInfo, getFormatInfo(end ?? props.start));
  },
  { immediate: true, deep: true }
);
</script>
