



const style = {
    // fontFamily: sourceCode.style.fontFamily,
    // fontSize: sourceCode.style.fontSize,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    fontSize: 28
}

export default function Card({children}) {
    return (
      <div style={style}>
        {children}
      </div>
    );
  }