/* eslint react/prop-types: 0 */
import React from "react";

const CalendarInput = ({ id, onChange }) => {
  return (
    <input className="m-2" onChange={onChange} type="date" id={id} name={id} />
  );
};

function App() {
  const [firstDate, setFirstDate] = React.useState(null);
  const [secondDate, setSecondDate] = React.useState(null);
  const [thirdDate, setThirdDate] = React.useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    const { first, second, third } = event.target.elements;

    setFirstDate(first?.value);
    setSecondDate(second?.value);
    setThirdDate(third?.value);
  }

  function handleChange(event) {
    // const { first, second, third } = event.target.id;
    console.log(event.target.value);

    console.log(event.target.id);

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

    // setFirstDate(first?.value);
    // setSecondDate(second?.value);
    // setThirdDate(third?.value);
  }

  return (
    <div className="App flex justify-center items-center h-screen">
      <header className=" ">
        <div className="text-5xl font-bold p-4">Time Availability</div>
        <form onSubmit={handleSubmit}>
          <CalendarInput onChange={handleChange} id="first" />
          <CalendarInput onChange={handleChange} id="second" />
          <CalendarInput onChange={handleChange} id="third" />
        </form>

        <div id="final" className="h-42 w-screen text-red-500 p-4 text-xl">
          <span className="text-red-400">{firstDate ? `${firstDate} 12PM-8PM` : null}</span>
          <span className="text-blue-400">{secondDate ? `, ${secondDate} 12PM-8PM` : null}</span>
          <span className="text-green-500">{thirdDate ? `, ${thirdDate} 12PM-8PM` : null}</span>
        </div>
        <button
          className="border border-black py-2 px-4 rounded-lg"
          onClick={() => {
            navigator.clipboard.writeText(
              document.getElementById("final").textContent
            );
          }}
        >
          Click to Copy
        </button>
      </header>
    </div>
  );
}

export default App;
