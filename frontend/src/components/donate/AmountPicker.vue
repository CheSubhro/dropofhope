<script setup>
import { computed } from 'vue'
import { Check, IndianRupee } from 'lucide-vue-next'

const props = defineProps({
  amounts: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: Number,
    default: 500,
  },
})

const emit = defineEmits(['update:modelValue'])

const customAmount = computed(() => {
  return props.amounts.some((item) => item.value === props.modelValue)
    ? ''
    : String(props.modelValue || '')
})

const isCustom = computed(() => {
  return !props.amounts.some((item) => item.value === props.modelValue)
})

const selectAmount = (amount) => {
  emit('update:modelValue', amount)
}

const updateCustomAmount = (event) => {
  const value = event.target.value.replace(/[^\d]/g, '')

  emit('update:modelValue', value ? Number(value) : 0)
}
</script>

<template>
  <section>
    <div class="mb-5">
      <p class="text-sm font-semibold uppercase tracking-wider text-[#E80E0E]">
        Choose your contribution
      </p>

      <h2 class="mt-2 text-2xl font-bold text-gray-900">
        Select Donation Amount
      </h2>

      <p class="mt-2 text-sm leading-6 text-gray-500">
        Every contribution, big or small, helps us make a difference.
      </p>
    </div>

    <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
      <button
        v-for="amount in amounts"
        :key="amount.value"
        type="button"
        @click="selectAmount(amount.value)"
        class="relative rounded-xl border p-4 text-left transition"
        :class="
          modelValue === amount.value
            ? 'border-[#E80E0E] bg-[#E80E0E] text-white shadow-lg shadow-red-200'
            : 'border-gray-200 bg-white text-gray-900 hover:border-red-300 hover:bg-red-50'
        "
      >
        <Check
          v-if="modelValue === amount.value"
          class="absolute right-3 top-3"
          :size="16"
        />

        <span class="block text-xl font-bold">
          {{ amount.label }}
        </span>

        <span
          class="mt-2 block text-xs leading-5"
          :class="modelValue === amount.value ? 'text-red-100' : 'text-gray-500'"
        >
          {{ amount.description }}
        </span>
      </button>

      <button
        type="button"
        @click="selectAmount(0)"
        class="rounded-xl border p-4 text-left transition"
        :class="
          isCustom
            ? 'border-[#E80E0E] bg-[#E80E0E] text-white'
            : 'border-gray-200 bg-white text-gray-900 hover:border-red-300 hover:bg-red-50'
        "
      >
        <span class="block text-xl font-bold">Other</span>
        <span
          class="mt-2 block text-xs"
          :class="isCustom ? 'text-red-100' : 'text-gray-500'"
        >
          Enter your amount
        </span>
      </button>
    </div>

    <div v-if="isCustom" class="mt-4">
      <label class="mb-2 block text-sm font-semibold text-gray-700">
        Enter Custom Amount
      </label>

      <div class="flex items-center rounded-xl border border-gray-200 px-4 focus-within:border-[#E80E0E]">
        <IndianRupee :size="18" class="text-gray-400" />

        <input
          type="number"
          min="1"
          max="1000000"
          :value="customAmount"
          @input="updateCustomAmount"
          placeholder="Enter amount"
          class="w-full border-0 bg-transparent px-3 py-3 text-lg font-semibold outline-none focus:ring-0"
        />
      </div>
    </div>

    <p class="mt-4 text-xs text-gray-400">
      Your contribution is voluntary. Please verify the recipient details before making a payment.
    </p>
  </section>
</template>