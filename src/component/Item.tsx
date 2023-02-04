import { IItem } from "../types"

export default (
  {entry, i}: {entry: IItem["entry"], i: any}) => {
  return (
    <div className="item-container" key={i} data-id={i}>
    { entry.length === 1 ? 
      <div className="item-val">{entry[0]}</div> :
      <div className="df">
        <div className="item-qty">{entry[0]}</div>
        <div className="item-val">{entry[1]}</div>
      </div>
    }
    </div>
  )
}