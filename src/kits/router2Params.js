/**
 * 路由字符串，转换为对象
 * @param {*} strRouter 完整路由+参数字符串
 * @returns 拆分路由+参数
 */
export default function router2Params(strRouter) {
  const strRouterTmp = strRouter || ''
  let strResultPath = strRouterTmp
  const objResultParam = {}

  const nIndexPath = strRouterTmp.indexOf('?')
  if (nIndexPath >= 0) {
    strResultPath = strRouterTmp.substring(0, nIndexPath)
    const strParam = strRouterTmp.slice(nIndexPath + 1)
    const arrParam = strParam.split('&')

    arrParam.forEach((strItem) => {
      const nIndexParam = strItem.indexOf('=')
      if (nIndexParam >= 0) {
        const strParamKey = strItem.substring(0, nIndexParam)
        const strParamValue = strItem.slice(nIndexParam + 1)
        objResultParam[strParamKey] = strParamValue
      }
    })
  }

  return {
    path: strResultPath,
    params: objResultParam
  }
}
