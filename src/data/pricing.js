export const saleStatuses = { draft: '판매 준비', on_sale: '판매 중', paused: '판매 중지', closed: '판매 종료' }

export function effectivePrice(program) {
  if (!program || program.isFree) return 0
  const regular = Math.max(0, Number(program.regularPrice) || 0)
  const sale = Math.max(0, Number(program.salePrice) || 0)
  return sale > 0 && sale < regular ? sale : regular
}

export function formatPrice(value) {
  const amount = Math.max(0, Number(value) || 0)
  return amount === 0 ? '무료' : `${amount.toLocaleString('ko-KR')}원`
}

export function canPurchase(program) {
  return Boolean(program && !program.isFree && program.saleStatus === 'on_sale' && effectivePrice(program) > 0)
}
