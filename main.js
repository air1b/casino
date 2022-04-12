/*** Credentials */
const appId     = "67pH7x263gZazmpFRkslVZaKQcAlZnJl5ndBA4KE"
const serverUrl = "https://f6zhfhsmzlag.usemoralis.com:2053/server"

/*** RUN APP */
Moralis.start({serverUrl,appId})

/** AUTH ? GET WALLET : LOGIN() */
if(localStorage.getItem('ethAddress')){
    document.querySelector('#login_button').style.display = "none"
    document.querySelector('#logout_button').parentNode.style.display = "block"
    document.querySelector('#wallet').textContent = localStorage.getItem('ethAddress')
    document.querySelector('#walletWrapper').style.display = "block"
    document.querySelector('.welcome').style.display = "block"
    window.location.href = "http://localhost:5500/vanilla-casino/dashboard/"
}

/* AUTH ? Login = display-wallet : Logout = display-login */
async function login() {

    let user = Moralis.User.current();
    console.log(user)
  
    if (!user) {
      user = await Moralis.authenticate({
        signingMessage: "Log in using Moralis",
      })
      .then( async function (user) {
          console.log("logged in user:", user);
          console.log(user.get("ethAddress"));
          document.querySelector('#login_button').style.display = "none"
          document.querySelector('#logout_button').parentNode.style.display = "block"
          document.querySelector('#wallet').textContent = user.get('ethAddress')
          localStorage.setItem('ethAddress',user.get('ethAddress'))
          document.querySelector('#walletWrapper').style.display = "block"
          document.querySelector('.welcome').style.display = "block"
          user.set('msg','information about the user')
          await user.save()
          window.location.href = "http://localhost:5500/vanilla-casino/dashboard/"

        })
      .catch(function (error) {
          console.log(error);
        });
    }
}

async function logOut() {
  await Moralis.User.logOut();
  document.querySelector('#login_button').style.display = "block"
  document.querySelector('#logout_button').parentNode.style.display = "none"
  localStorage.removeItem('ethAddress')
  document.querySelector('#wallet').textContent = ''
  document.querySelector('#walletWrapper').style.display = "none"
  document.querySelector('.welcome').style.display = "none"
  console.log("logged out");
}

/** EVENTS LISTENER */
document.querySelector('#login_button').onclick = login
document.querySelector('#logout_button').onclick = logOut
document.querySelector('.logout_button').onclick = logOut