import React from "react";

import Layout from "../components/layout";
import altaree from "../images/altaree.jpg";
import depah from "../images/depah.jpg";
import napa from "../images/napa.jpg";
import jokpah from "../images/jokpah.jpg";

function ImagesPage() {
  return (
    <Layout>
      <section>
        <img src={altaree} />
        <img src={depah} />
        <img src={napa} />
        <img src={jokpah} />
      </section>
    </Layout>
  );
}

export default ImagesPage;
