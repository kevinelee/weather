import React from "react";

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

  return (
    <div className="App flex justify-center items-center h-screen">
      <header className=" ">
        <form onSubmit={handleSubmit}>
          <label htmlFor="birthday">date: </label>
          <input type="date" id="first" name="first" />
          <input type="date" id="second" name="second" />
          <input type="date" id="third" name="third" />
          <input className="py-2 px-4 " type="submit" />
        </form>

        <div
          id="final"
          style={{
            height: "100px",
            width: "100%",
            color: "red",
            padding: "20px",
            fontSize: "40px"
          
          }}
        >
          {firstDate} 12PM-8PM, {secondDate} 12PM-8PM, {thirdDate} 12PM-8PM
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
