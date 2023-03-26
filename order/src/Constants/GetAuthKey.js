async function getKey() {
    var response = await fetch(`${process.env.REACT_APP_API_URL}modules/RestfulApi/index.php?module=Auth&key=${process.env.REACT_APP_API_KEY}`);
    var data = await response.json();
    return data.result
  }
  const Key = await getKey
  
  export default Key