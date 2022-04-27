/*** Credentials */
const appId     = "67pH7x263gZazmpFRkslVZaKQcAlZnJl5ndBA4KE"
const serverUrl = "https://f6zhfhsmzlag.usemoralis.com:2053/server"

/*** RUN APP */
Moralis.start({serverUrl,appId})

async function logOut() {

    await Moralis.User.logOut();
    localStorage.removeItem('ethAddress')
    window.location.href = "/vanilla-casino"
    console.log("logged out");

}
  
/** EVENTS LISTENER */
document.querySelector('.logout_button').onclick = logOut
document.querySelector('#logout_button').onclick = logOut


