async function getKey() {
  let authToken = localStorage.getItem("authToken");
  if (authToken === null) {
    // This means that there ISN'T JWT and no user is logged in.
    var response = await fetch(
      `${process.env.REACT_APP_API_URL}modules/RestfulApi/index.php?module=Auth&key=${process.env.REACT_APP_API_KEY}`
    );
    var data = await response.json();
    authToken = data.result;
    localStorage.setItem("authToken", authToken);
  } else {
    return authToken;
  }
}
const Key = await getKey();
export default Key;
