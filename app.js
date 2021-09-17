
const author = document.getElementById("author")
const topPart = document.getElementById("top")
const currencyDisplay = document.getElementById("crypto")
const currencyPriceDisplay = document.getElementById("crypto-price")
const timeDisplay = document.getElementById("the-time");
let lat
let longi
const weatherDisplay = document.getElementById("weather")
const quote = document.getElementById("quote")
const coinsType = getRandomCoinsType()

function getRandomCoinsType(){
    let coinsArr = ["bitcoin","dogecoin", "ethereum", "litecoin"]

    return coinsArr[Math.floor(Math.random() * coinsArr.length)]
}
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(response => response.json())
    .then(data => {
        let imgUrl = data.urls.full
        document.body.style.backgroundImage = `url(${imgUrl})`
        author.textContent = `Photo by: ${data.user.name}`
    })
    .catch(err => {
        console.log("error occured")
        document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDE2NzA&ixlib=rb-1.2.1&q=80&w=1080")`
        document.getElementById("author").textContent = `By: undefined`
    })


fetch(`https://api.coingecko.com/api/v3/coins/${coinsType}`)
    .then(res => res.json())
    .then(data => {

        currencyDisplay.innerHTML = `<img src=${data.image.small} ><span>${data.name}</span>`
        currencyPriceDisplay.innerHTML = `
        <p>🎯:  ${data.market_data.current_price.sek} kr</p>
        <p>👆: ${data.market_data.high_24h.sek} kr</p>
        <p>👇: ${data.market_data.low_24h.sek} kr</p>
        
        `


    })
    .catch(err =>{
        console.log("Error occured")
    })
setInterval(displayTime, 1000)
function displayTime(){
    let d = new Date();
    timeDisplay.innerHTML = `${d.toLocaleTimeString({timeStyle: "medium"})}`


}
navigator.geolocation.getCurrentPosition(position => {
    lat = position.coords.latitude
    longi = position.coords.longitude
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${lat}&lon=${longi}&units=metric `)
        .then(res => {
           if(!res.ok){
               throw Error("Weather data not available")
           }else{
               return res.json()
           }

        })
        .then(data => {

            let icon = data.weather[0].icon
            let iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            weatherDisplay.innerHTML = `
                <img src="${iconUrl}">
                <p class="temp">${Math.floor(data.main.temp)}º</p>
                <p class="city">${data.name}</p>`


        })
        .catch(err =>{
        console.log(err)
    })
});
//CHUCK NORRIS JOKES API
fetch("https://api.icndb.com/jokes/random")
    .then(res => res.json())
    .then(data => {
        quote.innerHTML = `
        <p>${data.value.joke}</p>
        `

    })
    .catch(err =>{
    console.log(err)
})

