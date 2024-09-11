import { useEffect, useState } from "react";
import Box from "./Box";

function App() {

  const boxes = () => {
    const arr = [];
    for (let i = 1; i < 10; i++) {
      arr.push({ value: "", id: i, isFilled: false });
    }
    return arr;
  };
  const [game, setGame] = useState(() => boxes());
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState("");
  const [isGameOver, setIsGameOver] = useState(false)

  const onBoxClicking = (id) => {
    if (winner === ""){
      setGame((oldGame) =>
        oldGame.map((oldGameI) =>
          oldGameI.id === id && !oldGameI.isFilled
            ? { ...oldGameI, value: turn, isFilled: true }
            : oldGameI
        )
      );
      setTurn((oldTurn) => (oldTurn === "X" ? "O" : "X"));
    }
   
  };

  const checkingWinnner = (arr) => {
    const winningConditions = [
      [1, 2, 3],
      [4, 5, 6], 
      [7, 8, 9], 
      [1, 4, 7], 
      [2, 5, 8], 
      [3, 6, 9], 
      [1, 5, 9], 
      [3, 5, 7]
    ]

    // looping through all possible combinations
    for (let i=0; i < winningConditions.length; i++) {
      
      let [a, b, c] = winningConditions[i]

      if (arr.includes(a) && arr.includes(b) && arr.includes(c)) {
        return true
      }
    }
    return false
  }
  useEffect(() => {
    const xs = game.filter((gameInstance) => gameInstance.value === "X");
    const os = game.filter((gameInstance) => gameInstance.value === "O");
    const xsIds = xs.map((x) => x.id);
    const osIds = os.map((o) => o.id);

    setIsGameOver(game.filter((gameInstance) => gameInstance.isFilled).length === 9) 

    if (checkingWinnner(xsIds)) {
      setWinner("X")
    }
    else if (checkingWinnner(osIds)) {
      setWinner("O")
    }
    else {
      setWinner("")
    }
  }, [turn, game]);

  const boxElements = game.map((gameInstance) => (
    <Box
      key={gameInstance.id}
      value={gameInstance.value}
      id={gameInstance.id}
      isFilled={gameInstance.isFilled}
      onClick={onBoxClicking}
    />
  ));
  return (
    <main className="flex flex-col items-center justify-center font-mono min-h-screen">
      <h1 className="text-5xl text-purple-500 mb-5">Tic Tac Toe</h1>
      <h3 className="text-3xl text-purple-500 mb-3">
        Turn: <span className="font-bold text-purple-700">{turn}</span>
      </h3>
      {winner !== "" && (
        <h4 className="mb-2 font-extrabold text-2xl text-purple-500">
          {winner} is the Winner
        </h4>
      )}
      <div className="grid grid-cols-3 grid-rows-3 gap-2 border-4 border-purple-500 p-1">
        {boxElements}
      </div>
      {(winner || isGameOver) && (
        <button
          className="mt-7 rounded-xl bg-purple-500 text-white text-xl p-3 font-bold"
          onClick={() => setGame(boxes())}
        >
          Play Again
        </button>
      )}
    </main>
  );
}

export default App;
