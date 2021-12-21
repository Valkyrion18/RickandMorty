const API_URL = "https://rickandmortyapi.com/api/character/"
const SEARCH_URL = "https://rickandmortyapi.com/api/character/?name=" 

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')
const h2 = document.querySelector('h2')

h2.addEventListener('click', () => {
    obtenerDatos(API_URL)
})

const obtenerDatos = (url) => {

    const peticion = fetch(url)
    peticion.then(resp => {
        resp.json().then(data => {
            console.log(data.results)
            mostrarDatos(data.results)
        })
    })
}

// const obtenerDatosEpisodios = (url_e) => {

//     const pregunta = fetch(url_e)
//     pregunta.then(respuesta => {
//         respuesta.json().then(datos => {
//             console.log(datos.results)
//             return datos.results
//         })
//     })    
// }

obtenerDatos(API_URL)

const mostrarDatos = (series) => {

    if (series.length == 0) {
        Swal.fire({
            title: 'Personaje no encontrado',
            text: 'Intente con otro nombre',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        })
    } else {
        main.innerHTML = ''
        series.forEach(serie => {
            
            const { name, status, species, gender, episode, location, image } = serie

            // const API_EPISODE = episode[0]
            // obtenerDatosEpisodios(API_EPISODE)

            const division = document.createElement('div')
            division.classList.add('card')
            division.innerHTML = `
            <img src="${image}" alt="">
            <div class="card-info">
                <h3>${name}</h3>
                <div>
                    <li><b>Species: </b>${species}</li>
                    <li><b>Gender: </b>${gender}</li>
                    <li><b>Last known location: </b>${location.name}</li>
                    <li><b>Status:<span class=${obtenerStatus(status)}>${status}</span></li></b>
                </div>
            </div>

            `
            main.appendChild(division)
        })
    }
 }

const obtenerStatus = (estado) => {
    if (estado === 'Alive') {
        return "green"
    } else if (estado === 'unknown') {
        return "white"
    } else {
        return "red"
    }
}

form.addEventListener('submit', e => {
    e.preventDefault()
    const searchTerm = search.value
    if (searchTerm && searchTerm !== '') {
        obtenerDatos(SEARCH_URL + searchTerm)
        search.value = ""
    } else {
        window.location.reload()
    }
})