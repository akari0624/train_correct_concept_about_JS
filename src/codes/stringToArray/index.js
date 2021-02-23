const ACCESSOR_OPERATOR = '.'

export const strToArray = (accessPathStr) => {

  const arr = []
  let copiedPath = accessPathStr
  while(copiedPath.indexOf(ACCESSOR_OPERATOR) > -1){
    const accIdx = copiedPath.indexOf(ACCESSOR_OPERATOR)
    arr.push(copiedPath.substring(0, accIdx))
    copiedPath = copiedPath.substring(accIdx + 1, copiedPath.length)
  }
  // 最後一段
  arr.push(copiedPath)
  return arr

}