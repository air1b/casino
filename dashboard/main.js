/*** Credentials */
const appId     = "67pH7x263gZazmpFRkslVZaKQcAlZnJl5ndBA4KE"
const serverUrl = "https://f6zhfhsmzlag.usemoralis.com:2053/server"
const server    = "http://localhost/casino"

/*** RUN APP */
Moralis.start({serverUrl,appId})


if(!localStorage.getItem('ethAddress')){
    window.location.href = `${server}/`
}

async function logOut() {

    await Moralis.User.logOut();
    localStorage.removeItem('ethAddress')
    window.location.href = `${server}/`
    console.log("logged out");

}
  
/** EVENTS LISTENER */
document.querySelector('.logout_button').onclick = logOut
document.querySelector('#logout_button').onclick = logOut


