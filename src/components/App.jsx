import React from "react";

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

const App = () => {
  const [numArray, setNumArray] = React.useState([1, 6, 8, 25, 23,7, 27,11]);

  const series = React.useMemo(() => {
    return getCombinations(numArray, 6);
  }, [numArray]);

  return (
    <div>
      Hello
      <h1>{series.length}</h1>
      <ul>

      {series.map((n) => 
        <li key={n}>{JSON.stringify(n)}</li>
      )}
      </ul>
    </div>
  );
};

export default App;
