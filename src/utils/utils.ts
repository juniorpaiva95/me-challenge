/**
 * Formata o valor de acordo com a moeda e a localidade
 * @param currency - A moeda a ser usada
 * @param price - O valor a ser formatado
 * @param locale - A localidade a ser usada
 * @returns O valor formatado
 */
export const formatCurrency = (
  currency: string = 'USD',
  price: number = 0,
  locale: string = 'en-US',
) => {
  return Intl.NumberFormat(locale, { style: 'currency', currency }).format(price)
}
