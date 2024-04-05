export default function Card({ children }
    ) {
    return (
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          fontSize: 28,
        }}
      >
        {children}
      </div>
    );
  }