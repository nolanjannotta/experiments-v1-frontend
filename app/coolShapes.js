const shapes = [<>&#10041;</>, <>&#10032;</>,<>&#10050;</>, <>&#10037;</>, <>&#9885;</>,
<>&#128960;</>,<>&#128980;</>,<>&#9661;</>,<>&#9653;</>,<>&#9674;</>,<>&#9711;</>,<>&#9724;</>,<>&#10687;</>,
<>&#8864;</>,<>&#8865;</>,<>&#8414;</>, <>&#9635;</>,<>&#9638;</>,<>&#9634;</>,<>&#9703;</>,<>&#9705;</>,<>&#9712;</>,<>&#10066;</>,
<>&#11195;</>,<>&#9187;</>,<>&#9677;</>,<>&#9683;</>,<>&#128710;</>,<>&#19930;</>,<>&#4962;</> ]


export const coolShape = () => shapes[Math.floor(Math.random() * shapes.length)]

export const coolShapes = (amount) => {
    const arr = []
    for (let i = 0; i < amount; i++) {
        arr.push(coolShape())
    }

    return arr
}