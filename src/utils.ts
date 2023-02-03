// parse the text so it follows this rule (qty & value), (qty & value)
import config from "../config"

const {itemSplit, qtyValSplit} = config
export const parseItem = (itemString: string) => {
  if(!itemString.length) return []
  const itemArr = itemString.split(itemSplit)
  const finalArr = itemArr.map((item) => {
      return item.split(qtyValSplit).map((split) => {
        return split.trim()
      })
    })

  // drop empty arr at end if exists
  if(!finalArr[finalArr.length - 1][0].length) {
    return finalArr.splice(0, finalArr.length - 1 )
  }
  return finalArr
}
