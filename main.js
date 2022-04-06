

/*** Credentials */
const appId = "67pH7x263gZazmpFRkslVZaKQcAlZnJl5ndBA4KE"
const serverUrl = "https://f6zhfhsmzlag.usemoralis.com:2053/server"

/*** RUN APP */
Moralis.start({serverUrl,appId})


/* AUTH */
async function login() {
    let user = Moralis.User.current();
    console.log(user)
    if (!user) {
      user = await Moralis.authenticate({
        signingMessage: "Log in using Moralis",
      })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
}
  
async function logOut() {
await Moralis.User.logOut();
console.log("logged out");
}

/** EVENTS */
document.querySelector('#login_button').onclick = login
document.querySelector('#logout_button').onclick = logOut