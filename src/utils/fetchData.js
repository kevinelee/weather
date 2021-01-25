// import Promise from 'promise'

async function fetchData({ endpoint, data, headers: customHeaders, ...customConfig }) {
    const config = {
      method: data ? 'POST' : 'GET',
      body: data ? JSON.stringify(data) : undefined,
      headers: {
        ...customHeaders,
      },
      ...customConfig,
    };
    
    return window.fetch(endpoint, config).then(async response => {
      if (response.ok) {
          return response.json();     
      } else {
        return Promise.reject(data);
      }
    }).catch(error => {
      console.error(`${endpoint}: ${error}`);
    });
  }
  
  export default fetchData;
  