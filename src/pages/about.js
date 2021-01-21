import React, { useState, useEffect } from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";


function AboutPage() {

  const [itemInput, setItemInput] = useState('');
  const [list, setList] = useState([]);

  function getList() {
    return fetch('http://localhost:3333/list')
      .then(data => data.json())
  }

  useEffect(() => {
    let mounted = true;
    getList()
      .then(items => {
        if (mounted) {
          setList(items)
        }
      })
    return () => mounted = false;
  }, [])


  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="About"
      />

      <section className="flex flex-col items-center md:flex-row">
        <div className="wrapper">
          <h1>My Grocery List</h1>
          <ul>
            {list.map(item => <li key={item.item}>{item.item}</li>)}
          </ul>
          <form>
            <label>
              <p>New Item</p>
              <input type="text" onChange={event => setItemInput(event.target.value)} value={itemInput} />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      </section>
    </Layout>
  );
}

export default AboutPage;
