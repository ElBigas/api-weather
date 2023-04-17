const api = {
    key: 'd8bfd2898285d74ba1e7eb88c842efa5',
    base: 'https://api.openweathermap.org/data/2.5/',
    lang: 'pt_br',
    units: 'metric'
}

const city = document.querySelector('.city')
const date = document.querySelector('.date')
const containerImg = document.querySelector('.container-img')
const containerTemp = document.querySelector('.container-temp')
const tempNumber = document.querySelector('.container-temp div')
const tempUnit = document.querySelector('.container-temp span')
const weatherT = document.querySelector('.weather')
const searchInput = document.querySelector('.form-control')
const searchButton = document.querySelector('.btn')
const lowHigh = document.querySelector('.low-high')

//Adiciona um evento ao clicar no botão de pesquisar
searchButton.addEventListener('click', () => {
    serchResults(searchInput.value)
})

//Adiciona um evento ao apetar enter
searchInput.addEventListener('keypress', e => {
    key = e.keyCode

    if (key === 13) {
        serchResults(searchInput.value)
    }
})

//Função para ativar Geolocalização
window.addEventListener('load', () => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(setPosition, showError)
    } else {
        alert('Navegador não suporta Geolocalização')
    }

    function setPosition(position) {
        console.log(position)

        let lat = position.coords.latitude
        let long = position.coords.longitude
        coorResults(lat, long)
    }

    function showError(error) {
        alert(`erro ${error.message}`)
    }
})

//Função de chamada da API
function serchResults(city) {
    fetch(
        `${api.base}weather?q=${city}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`
    )
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw new Error(`http error : status ${response.status}`)
            }
            return response.json()
        })
        .catch(error => {
            alert(error.message)
        })
        .then(response => {
            displayResults(response)
        })
}

//Função de chamada da API com a Geolocalização
function coorResults(lat, long) {
    fetch(
        `${api.base}weather?lat=${lat}&lon=${long}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`
    )
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw new Error(`http error : status ${response.status}`)
            }
            return response.json()
        })
        .catch(error => {
            alert(error.message)
        })
        .then(response => {
            displayResults(response)
        })
}

function displayResults(weather) {
    console.log(weather)

    city.innerText = `${weather.name}, ${weather.sys.country}`

    let now = new Date()
    date.innerText = dateBuilder(now)

    let iconName = weather.weather[0].icon
    containerImg.innerHTML = `<img src='img/icons/${iconName}.png' >`

    let temperature = `${Math.round(weather.main.temp)}`
    tempNumber.innerHTML = temperature
    tempUnit.innerHTML = '°C'

    weatherT.innerHTML = weather.weather[0].description

    lowHigh.innerHTML = `${Math.round(weather.main.temp_min)}°C / ${Math.round(
        weather.main.temp_max
    )}°C`
}

function dateBuilder(d) {
    let days = [
        'Domingo',
        'Segunda',
        'Terça',
        'Quarta',
        'Quinta',
        'Sexta',
        'Sábado'
    ]

    let months = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julio',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
    ]

    let day = days[d.getDay()] //getDay: 0-6
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day}, ${date} de ${month} de ${year}`
}
