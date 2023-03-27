function Image({item, id, userclick}){
    const itemClass = item.stat ? " active " + item.stat : ""

    return (
        <div className={"image" + itemClass} onClick={() => userclick(id)} disabled={item.disable}>
            <img src={item.img} alt="" />
        </div>
    )
}

export default Image;