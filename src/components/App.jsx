import React from "react";
import "../styles/index.css";

function getCombinations(arr, k) {
  let result = [];
  let n = arr.length;
  function combine(temp, start) {
    if (temp.length === k) {
      result.push(temp.slice());
      return;
    }
    for (let i = start; i < n; i++) {
      temp.push(arr[i]);
      combine(temp, i + 1);
      temp.pop();
    }
  }
  combine([], 0);
  return result;
}

function getPermutations(arr, k) {
  let result = [];
  let n = arr.length;
  function permute(temp) {
    if (temp.length === k) {
      result.push(temp.slice());
      return;
    }
    for (let i = 0; i < n; i++) {
      if (!temp.includes(arr[i])) {
        temp.push(arr[i]);
        permute(temp);
        temp.pop();
      }
    }
  }
  permute([]);
  return result;
}

const MODES = [
  {
    code: "comb",
    label: "Combinations",
  },
  {
    code: "perm",
    label: "Permutations",
  },
];

const NUMBER_OF_CHOICES = 6;

const App = () => {
  const [numArray, setNumArray] = React.useState(
    // Array(NUMBER_OF_CHOICES).fill(0)
    [1, 2, 3, 4, 5, 6]
  );

  const [possibleNumbers] = React.useState(() => {
    let temp = [];
    for (let i = 0; i < 46; i++) {
      temp.push(i);
    }
    return temp;
  });

  const classes = {
    unselectedMode: "bg-white text-black border-black opacity-40",
    selectedMode: "bg-black text-white",
  };

  const [currMode, setMode] = React.useState(MODES[0]);

  const [series, setSeries] = React.useState([]);

  const getSeries = () => {
    return currMode.code == "perm"
      ? getPermutations(numArray, NUMBER_OF_CHOICES)
      : getCombinations(numArray, NUMBER_OF_CHOICES);
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-evenly">
        {MODES.map((mode) => {
          return (
            <button
              key={mode.code}
              className={`border-r-white px-5 py-2 rounded-sm hover:text-opacity-70 flex-grow h-max w-max bg-black ${
                mode == currMode ? classes.selectedMode : classes.unselectedMode
              } h-15`}
              onClick={() => {
                setMode(mode);
              }}
            >
              {mode.label}

            </button>
          );
        })}
      </div>
      <h2>
        <span className="font-bold">Generating:</span>{" "}
        {
          MODES.find((mode) => {
            return mode.code == currMode.code;
          }).label
        }
      </h2>
      <div className="bg-red-700 text-white flex justify-evenly items-center py-3">
        {numArray.map((n, i) => {
          return (
            <div
              key={i}
              className="flex flex-col justify-center items-center gap-1"
            >
              <input
                type="tel"
                className="w-8 h-8 rounded-full text-black text-center"
                value={n}
                onChange={(nn) => {
                  if (
                    !possibleNumbers.includes(Number(nn.currentTarget.value)) ||
                    isNaN(nn.currentTarget.value)
                  )
                    return;
                  setNumArray((prev) => {
                    let temp = [...prev];
                    temp[i] = Number(nn.target.value);
                    return temp;
                  });
                }}
              />
              <button
                className="border border-white px-3 text-center rounded-md text-xs text-white"
                tabIndex={-1}
                onClick={() =>
                  setNumArray((prev) => {
                    let temp = [...prev];
                    temp.splice(i, 1);
                    return temp;
                  })
                }
              >
                No. {i} X
              </button>
            </div>
          );
        })}
        <button
          className="border-white border font-bold text-lg w-8 h-8 rounded-full text-center"
          onClick={() => setNumArray((prev) => [...prev, 0])}
        >
          +
        </button>
      </div>
      <div className="flex justify-center items-center flex-col">
        <h1 className="m-5 text-xl">Total Combinations: {series.length}</h1>
        <button
          className="rounded bg-red-800 text-white px-5 py-2 text-center m-5"
          onClick={() => setSeries(getSeries())}
        >
          CALCULATE{" "}
        </button>
        <button onClick={() => setSeries(() => [])}>CLEAR</button>
        <ul className="w-full flex flex-col justify-center items-center gap-10 my-5 transition-all">
          {series.map((n, index) => {
            return (
              <CombinationRow
                n={n}
                index={index}
                removeSelf={() =>
                  setSeries((arr) => {
                    let temp = [...arr];
                    temp.splice(index, 1);
                    return temp;
                  })
                }
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default App;

const CombinationRow = ({ n, index, removeSelf }) => {
  const [checked, setChecked] = React.useState(false);
  return (
    <>
      <li key={n} className="flex flex-row justify-around items-center w-1/2 transition-all">
        {n.map((num) => {
          return (
            <>
              <div
                className={`rounded-full w-7 h-7 text-center font-bold ${
                  index % 2 === 0
                    ? "border-2 border-black"
                    : "bg-black text-white"
                } ${checked ? "opacity-10" : ""}`}
              >
                {num}
              </div>
            </>
          );
        })}

        <button
          onClick={checked ? removeSelf : () => setChecked((c) => !c)}
          className="text-lg"
        >
          {checked ? "❌" : "✅"}
        </button>
        <button
          onClick={() => setChecked((c) => !c)}
          className={`${checked ? "" : "hidden"}`}
        >
          🔄
        </button>
      </li>
      <hr className="w-1/2"></hr>
    </>
  );
};
