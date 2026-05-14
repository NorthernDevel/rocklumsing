<template>
  <div class="flex flex-col items-center justify-center w-full">
    <h3 class="text-2xl mb-4">{{ $t('prompt_pay_information') }}</h3>
    <UForm
      class="mt-2 w-72 sm:w-84"
      :state="state"
      :schema="updatePromptPaySchema"
      ref="form"
      @submit.prevent="onSubmit"
      :validate-on="['submit']"
    >
      <AppFormGroup
        :label="$t('cashier_name_en')"
        :required="true"
        name="firstNameEn"
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
          v-model="state.firstNameEn"
          :readonly="isCompleted"
        />
      </AppFormGroup>

      <AppFormGroup
        :label="$t('cashier_surname_en')"
        :required="true"
        name="lastNameEn"
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
          v-model="state.lastNameEn"
          :readonly="isCompleted"
        />
      </AppFormGroup>

      <AppFormGroup
        :label="$t('cashier_prompt_pay')"
        :required="true"
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
          :autofocus="isCompleted"
          :autofocus-delay="2000"
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
import type { RequestUpdatePromptpay } from '~/models/information.model'

const navStore = useNavStore()
const popupStore = usePopupStore()
const { t } = useI18n()

const emit = defineEmits(['complete'])

const form = ref()
const isLoading = ref(false)
const isCompleted = ref(false)

const initialState: RequestUpdatePromptpay = {
  firstNameEn: undefined,
  lastNameEn: undefined,
  promptPayID: undefined,
}

const state = ref({
  ...initialState,
})

const updatePromptPaySchema = z.object({
  firstNameEn: z
    .string({ required_error: t('cashier_enter_name_en') })
    .trim()
    .min(1, { message: t('cashier_enter_name_en') })
    .regex(/^[A-Za-z\s'-]+$/, {
      message: t('cashier_english_letters_only'),
    }),
  lastNameEn: z
    .string({ required_error: t('cashier_enter_surname_en') })
    .trim()
    .min(1, { message: t('cashier_enter_name_en') })
    .regex(/^[A-Za-z\s'-]+$/, {
      message: t('cashier_english_letters_only'),
    }),
  promptPayID: z
    .string({ required_error: t('cashier_prompt_pay_incorrect') })
    .trim()
    .min(9, {
      message: t('cashier_prompt_pay_incorrect'),
    })
    .max(20, { message: t('cashier_prompt_pay_incorrect') })
    .refine((accountNo) => /^\d+$/.test(accountNo), {
      message: t('cashier_prompt_pay_numeric_only'),
    }),
})

const getInformation = async () => {
  try {
    isLoading.value = true
    const { status, data, message } = await useInformation()
    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      if (data) {
        const { firstNameEN, lastNameEN } = data
        isCompleted.value = !!firstNameEN && !!lastNameEN
        state.value.firstNameEn = firstNameEN
        state.value.lastNameEn = lastNameEN
      }
    }
  } catch (e) {
    popupStore.toastError({ message: (e as Error).message })
    console.error((e as Error).message)
  } finally {
    isLoading.value = false
  }
}

const onSubmit = async () => {
  if (form.value.errors.length) return

  try {
    isLoading.value = true
    const { status, message } = await useUpdatePromptpay(state.value)
    if (!status) {
      popupStore.alertError({ message: message })
    } else {
      popupStore.alertSuccess({
        title: t('successfull'),
        onConfirm: () => navStore.selectedMenu('profile'),
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

onMounted(() => getInformation())

onBeforeUnmount(() => {
  resetForm()
})
</script>
