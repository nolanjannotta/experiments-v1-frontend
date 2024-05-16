/** @jsxImportSource frog/jsx */
import { Button, Frog, TextInput } from 'frog'
import { handle } from 'frog/next'


const app = new Frog({ 
  basePath: '/TestFrame',
})
 
app.frame("/", (c) => {
    return c.res({
      action: "/result",
      image: (
        <div
          style={{
            alignItems: "center",
            background: "black",
            backgroundSize: "100% 100%",
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            height: "100%",
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: 60,
              fontStyle: "normal",
              letterSpacing: "-0.025em",
              lineHeight: 1.4,
              marginTop: 30,
              padding: "0 120px",
              whiteSpace: "pre-wrap",
            }}
          >
            Choose your weapon
          </div>
        </div>
      ),
      intents: [
        <Button value="rock">Rock</Button>,
        <Button value="paper">Paper</Button>,
        <Button value="scissors">Scissors</Button>,
      ],
    });
  });