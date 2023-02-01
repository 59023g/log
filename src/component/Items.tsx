
import Item from "./Item"

export default ({items, i}) => {
  console.log(items)
  const cool = items.map((s, i) => {
    return s.items
  })
  console.log(cool)
  const renderDate = (date: Date) => {
      // ${("" + (date.getMonth() + 1)).padStart(2, '0')}-${date.getDate()}
    return `
      ${date.getHours()}:${("" + (date.getMinutes())).padStart(2, '0')}
      `
  }

  return (
    <div>
      {cool.map((asdf, index) => {
        return (
          <div className="df mt4">
            <div className="date mr4">
              { renderDate(new Date(items[index].created_at)) }
            </div>
            { asdf.map(subItems =>  <Item item={subItems}/>) }
              
  

          </div>
        );
      })}
    </div>
  )
}