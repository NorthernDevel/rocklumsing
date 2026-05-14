export const useFormatter = () => {
  const useCurrency = (
    amount: number | Ref<number>,
    symbol: 'leading' | 'trailing' | 'none' = 'trailing'
  ) => {
    const currency = computed(() => {
      const formatter = new Intl.NumberFormat('th-TH', {
        style: 'currency',
        currency: 'THB',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })

      let formatted = formatter.format(isRef(amount) ? amount.value : amount)

      if (symbol === 'leading') return formatted

      if (formatted.includes('฿')) {
        if (symbol === 'none') return formatted.replace('฿', '')
        formatted = formatted.replace('฿', '') + '฿'
      }

      return formatted
    })

    return {
      currency,
    }
  }

  const useNumberWithComma = (amount: number | Ref<number>) => {
    const numberWithComma = computed(() => {
      const formatted = new Intl.NumberFormat().format(
        isRef(amount) ? amount.value : amount
      )
      return formatted
    })

    return {
      amount: numberWithComma,
    }
  }

    const useParseAmount = () => {
      const parseAmount = (input: string) => {
        // Remove all non-numeric characters except decimal point
        const cleanedValue = input.replace(/[^0-9.]/g, '')

        let amountNumber = parseFloat(cleanedValue)

        // ป้องกัน NaN
        if (Number.isNaN(amountNumber)) {
          amountNumber = 0
        }

        // ปัดเป็น 2 ตำแหน่ง
        const rounded = Math.round(amountNumber * 100) / 100

        return rounded
      }

      const formatAmount = (value: number) => {
        const { currency } = useCurrency(value, 'none')
        return currency.value || '0'
      }

      return {
        parseAmount,
        formatAmount,
      }
    }

  return {
    useCurrency,
    useNumberWithComma,
    useParseAmount,
  }
}
