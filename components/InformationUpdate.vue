<template>
  <div class="flex flex-col items-center justify-center w-full">
    <h3 class="text-xl mb-4">{{ $t('add_en_name') }}</h3>
    <div
      class="w-64 sm:w-72 border-2 border-gray-200 dark:border-gray-500 bg-gray-100 dark:bg-gray-800 rounded-lg p-2 mb-4"
    >
      <div class="flex flex-col items-center w-full">
        <div class="flex items-center gap-2 text-green-600 dark:text-green-500">
          <UIcon name="i-heroicons-exclamation-triangle" class="w-10 h-10" />
          <p class="text-sm">
            {{ $t('please_enter_en_name') }}
          </p>
        </div>
      </div>
    </div>
    <UForm
      class="mt-2 w-64 sm:w-72"
      :state="state"
      :schema="updateInformationSchema"
      ref="form"
      @submit.prevent="onSubmit"
      :validate-on="['submit']"
    >
      <AppFormGroup
        :label="$t('cashier_name_en')"
        :required="true"
        name="firstNameEN"
      >
        <UInput
          :ui="{
            color: {
              white: {
                outline: 'focus:ring-gray-500 dark:focus:ring-gray-400',
              },
            },
          }"
          icon="i-heroicons-user"
          type="text"
          size="lg"
          v-model="state.firstNameEN"
        />
      </AppFormGroup>

      <AppFormGroup
        :label="$t('cashier_surname_en')"
        :required="true"
        name="lastNameEN"
      >
        <UInput
          :ui="{
            color: {
              white: {
                outline: 'focus:ring-gray-500 dark:focus:ring-gray-400',
              },
            },
          }"
          icon="i-heroicons-user"
          type="text"
          size="lg"
          v-model="state.lastNameEN"
        />
      </AppFormGroup>

      <AppFormGroup
        :label="$t('cashier_prompt_pay')"
        :required="false"
        name="promptPayID"
      >
        <UInput
          :ui="{
            color: {
              white: {
                outline: 'focus:ring-gray-500 dark:focus:ring-gray-400',
              },
            },
          }"
          icon="i-heroicons-book-open"
          type="text"
          size="lg"
          inputmode="numeric"
          v-model="state.promptPayID"
          :placeholder="
            $t('cashier_prompt_pay') + ' ' + '(' + $t('cashier_optional') + ')'
          "
        />
      </AppFormGroup>

      <UButton
        type="submit"
        class="theme-primary-btn w-full h-12 justify-center text-lg mt-2 mb-4"
        :loading="isLoading"
        :disabled="isLoading"
        >{{ $t('btn_submit') }}</UButton
      >
    </UForm>
  </div>
</template>

<script lang="ts" setup>
import { z } from 'zod'
import type { RequestUpdateInformation } from '~/models/information.model'

const navStore = useNavStore()
const popupStore = usePopupStore()
const { t } = useI18n()

const props = defineProps({
  formProfile: { type: Boolean, default: false },
})
const emit = defineEmits(['complete'])

const form = ref()
const isLoading = ref(false)

const initialState: RequestUpdateInformation = {
  firstNameEN: undefined,
  lastNameEN: undefined,
  promptPayID: '',
}

const state = ref({
  ...initialState,
})

const updateInformationSchema = z.object({
  firstNameEN: z
    .string({ required_error: t('cashier_enter_name_en') })
    .trim()
    .min(1, { message: t('cashier_enter_name_en') })
    .regex(/^[A-Za-z\s'-]+$/, {
      message: t('cashier_english_letters_only'),
    }),
  lastNameEN: z
    .string({ required_error: t('cashier_enter_surname_en') })
    .trim()
    .min(1, { message: t('cashier_enter_name_en') })
    .regex(/^[A-Za-z\s'-]+$/, {
      message: t('cashier_english_letters_only'),
    }),
  promptPayID: z
    .string()
    .trim()
    .min(9, {
      message: t('cashier_prompt_pay_incorrect'),
    })
    .max(20, { message: t('cashier_prompt_pay_incorrect') })
    .refine((accountNo) => /^\d+$/.test(accountNo), {
      message: t('cashier_prompt_pay_numeric_only'),
    })
    .optional()
    .or(z.literal('')),
})

const onSubmit = async () => {
  if (form.value.errors.length) return
  try {
    isLoading.value = true
    const { status, message } = await useUpdateInformation(state.value)
    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      popupStore.alertSuccess({
        title: t('successfull'),
        onConfirm: () =>
          props.formProfile
            ? navStore.selectedMenu('profile')
            : emit('complete', true),
      })
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    isLoading.value = false
  }
}

const resetForm = () => {
  state.value = { ...initialState }
}

onBeforeUnmount(() => {
  resetForm()
})
</script>
