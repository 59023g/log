


export default ({item, i}) => {
  return (
    <div className="item-container" key={i}>
    { item.length === 1 ? 
      <div className="item-val">{item[0]}</div> :
      <div className="df">
        <div className="item-qty">{item[0]}</div>
        <div className="item-val">{item[1]}</div>
      </div>
    }
    </div>
  )
}