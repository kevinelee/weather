/* eslint react/prop-types: 0 */
import React from "react";

const CalendarInput = ({ id, onChange, removeDate }) => {
  return (
    <div>
      <input
        className="m-2"
        onChange={onChange}
        type="date"
        id={id}
        name={id}
      />
      <button
        id={id}
        onClick={removeDate}
        className="text-2xl font-bold mr-1 p-2 cursor-pointer focus:text-red-500 focus:outline-none"
      >
        &#215;
      </button>
    </div>
  );
};

function App() {
  const [firstDate, setFirstDate] = React.useState(null);
  const [secondDate, setSecondDate] = React.useState(null);
  const [thirdDate, setThirdDate] = React.useState(null);
  const [copyTextColor, setCopyTextColor] = React.useState("white");

  function handleChange(event) {
    switch (event.target.id) {
      case "first":
        setFirstDate(event.target.value);
        break;
      case "second":
        setSecondDate(event.target.value);
        break;
      case "third":
        setThirdDate(event.target.value);
        break;
      case "fourth":
        break;
    }
  }

  function removeDate(event) {
    event.preventDefault();
    switch (event.target.id) {
      case "first":
        setFirstDate("");
        break;
      case "second":
        setSecondDate("");
        break;
      case "third":
        setThirdDate("");
        break;
      case "fourth":
        break;
    }
  }

  function copyTextColorFn() {
    setCopyTextColor("black");

    setTimeout(() => {
      setCopyTextColor("white");
    }, 2000);
  }

  return (
    <div className="App flex justify-center items-center h-screen">
      <header className=" ">
        <div className="text-5xl font-bold p-4">Time Availability</div>
        <form>
          <CalendarInput
            onChange={handleChange}
            removeDate={removeDate}
            id="first"
          />
          <CalendarInput
            onChange={handleChange}
            removeDate={removeDate}
            id="second"
          />
          <CalendarInput
            onChange={handleChange}
            removeDate={removeDate}
            id="third"
          />
        </form>

        <div id="final" className="h-42 w-screen text-red-500 p-4 text-xl">
          <span className="text-red-400">
            {firstDate ? `${firstDate} 12PM-8PM` : null}
          </span>
          <span className="text-blue-400">
            {secondDate
              ? `${firstDate ? "," : ""} ${secondDate} 12PM-8PM`
              : null}
          </span>
          <span className="text-green-500">
            {thirdDate ? `${firstDate || secondDate ? "," : ""} ${thirdDate} 12PM-8PM` : null}
          </span>
        </div>
        <button
          className="border border-black py-2 px-4 rounded-lg hover:bg-gray-200 ease-in-out transition focus:outline-none"
          onClick={() => {
            navigator.clipboard.writeText(
              document.getElementById("final").textContent
            );
            copyTextColorFn();
          }}
        >
          Click to Copy
        </button>
        <div
          className={`text-${copyTextColor} font-semibold mt-2 transition ease-in-out`}
        >
          Copied!
        </div>
      </header>
    </div>
  );
}

export default App;
