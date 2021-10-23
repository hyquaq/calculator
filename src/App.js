import React, { useState } from "react";
import "./styles/app.scss";
import Screen from "./components/Screen";

function App() {
  const math = {
    "+": function (x, y) {
      return x + y;
    },
    "-": function (x, y) {
      return Number((x - y).toFixed(10));
    },
    x: function (x, y) {
      return x * y;
    },
    "/": function (x, y) {
      return x / y;
    },
    "%": function (x, y) {
      return x % y;
    },
  };
  const [currentValue, setCurrentValue] = useState(0);
  const [preValue, setPreValue] = useState(0);
  const [operator, setOperator] = useState("");
  const [isDot, setIsDot] = useState(false);

  function handleOperator(value) {
    operator === "" &&
      setOperator(() => {
        setPreValue(currentValue);
        setCurrentValue(0);
        return value;
      });
    operator !== "" && setOperator(value);

    setIsDot(false);
  }

  function handleCompute() {
    operator !== "" && setCurrentValue(math[operator](preValue, currentValue));

    operator !== "" && setPreValue(0);

    operator !== "" &&
      setOperator(() => {
        setIsDot(false);
        return "";
      });
  }

  function handleClick(e) {
    const valueButton = e.target.getAttribute("value");
    const isNumber = !isNaN(parseInt(valueButton));
    const isClearAll = valueButton === "C";
    const isClear = valueButton === "<-";
    const dot = valueButton === "." && !isDot;
    const isOperator = ["+", "-", "x", "/", "%"].indexOf(valueButton) !== -1;

    const isEqual = valueButton === "=";

    isEqual && operator !== "" && handleCompute();

    isNumber &&
      !isDot &&
      setCurrentValue((pre) => parseFloat(`${pre}${valueButton}`));

    isNumber &&
      isDot &&
      setCurrentValue((pre) => parseFloat(`${pre}.${valueButton}`));

    isClearAll &&
      setCurrentValue(() => {
        setOperator("");
        setPreValue(0);
        setIsDot(false);
        return 0;
      });

    isClear &&
      setCurrentValue((pre) =>
        currentValue >= 10 ? parseFloat(`${currentValue}`.slice(0, -1)) : 0
      );

    dot && setIsDot(true);

    isOperator && handleOperator(valueButton);

    console.log({ currentValue, preValue }, isDot);
  }

  return (
    <section className="container-fuild">
      <div className="row">
        <Screen value={currentValue} preValue={preValue} operator={operator} />
      </div>
      <div className="row number-pad">
        <div className="row">
          <span className="col" onClick={handleClick} value="C">
            C
          </span>
          <span className="col" onClick={handleClick} value="+/-">
            +/-
          </span>
          <span className="col" onClick={handleClick} value="%">
            %
          </span>
          <span className="col" onClick={handleClick} value="/">
            /
          </span>
        </div>
        <div className="row">
          <span className="col" onClick={handleClick} value="7">
            7
          </span>
          <span className="col" onClick={handleClick} value="8">
            8
          </span>
          <span className="col" onClick={handleClick} value="9">
            9
          </span>
          <span className="col" onClick={handleClick} value="x">
            x
          </span>
        </div>
        <div className="row">
          <span className="col" onClick={handleClick} value="4">
            4
          </span>
          <span className="col" onClick={handleClick} value="5">
            5
          </span>
          <span className="col" onClick={handleClick} value="6">
            6
          </span>
          <span className="col" onClick={handleClick} value="-">
            -
          </span>
        </div>
        <div className="row">
          <span className="col" onClick={handleClick} value="1">
            1
          </span>
          <span className="col" onClick={handleClick} value="2">
            2
          </span>
          <span className="col" onClick={handleClick} value="3">
            3
          </span>
          <span className="col" onClick={handleClick} value="+">
            +
          </span>
        </div>
        <div className="row">
          <span className="col" onClick={handleClick} value="0">
            0
          </span>
          <span
            className={isDot ? "col disable" : "col"}
            onClick={handleClick}
            disable="true"
            value="."
          >
            .
          </span>
          <span className="col" onClick={handleClick} value="<-">
            {"<-"}
          </span>
          <span className="col" onClick={handleClick} value="=">
            =
          </span>
        </div>
      </div>
    </section>
  );
}

export default App;
