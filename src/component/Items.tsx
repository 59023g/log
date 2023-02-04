
import Item from "./Item"
import {parseItem} from "../utils"

export default ({items, i}) => {

  const renderDate = (date: Date) => {
      // ${("" + (date.getMonth() + 1)).padStart(2, '0')}-${date.getDate()}
    return `
      ${date.getHours()}:${("" + (date.getMinutes())).padStart(2, '0')}
      `
  }

  return (
    <div>
      {items.map((item, index) => {
        return (
          <div className="df mt4">
            <div className="date mr4">
              { renderDate(new Date(items[index].created_at)) }
            </div>
            {item.entry}
            <Item item={parseItem(item.entry)} i={index}/>
          </div>
        );
      })}
    </div>
  )
}