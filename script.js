const countriesContainer = document.querySelector('.countries-container')
const filterByregion = document.querySelector(".filter-by-region")
const seacrhInput=document.querySelector(".search-container input")
const themeSwitch=document.querySelector(".theme-switch")

let allCountriesData
fetch('https://reallstcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data)=>{
    renderCountries(data)
allCountriesData=data
}) 


filterByregion.addEventListener('change', (e) => {

    fetch(`https://restcountries.com/v3.1/region/${filterByregion.value}`)
        .then((res) => res.json())
        .then(renderCountries)
})

function renderCountries(data){
     countriesContainer.innerText= ""
            data.forEach((country) => {
                const countryCard = document.createElement('a')
                countryCard.classList.add('country-card')
                countryCard.href = `/country.html?name=${country.name.common}`

                const cardHtml = `
                    <img src="${country.flags.svg}" alt="flag">
                        <div class="card-txt">
                            <h3 class="card-title">${country.name.common}</h3>
                            <p><b>Population: </b> ${country.population.toLocaleString('en-IN')}</p>
                            <p><b>Region: </b>${country.region}</p>
                            <p><b>Capital: </b>${country.capital?.[0]}</p>
                            `
                countryCard.innerHTML = cardHtml

                countriesContainer.append(countryCard)
            })
        }

        seacrhInput.addEventListener('input',(e)=>{
            console.log(e.target.value)
            const filteredCountries =allCountriesData.filter((country)=>country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
            console.log(filteredCountries)
            renderCountries(filteredCountries)
        })


themeSwitch.addEventListener("click",()=>{
    document.body.classList.toggle("dark")
          if (document.body.classList.contains("dark")) {
    themeSwitch.innerHTML=`<i class="fa-solid fa-sun"></i>&nbsp;&nbsp; light Mode`
  } else {
 themeSwitch.innerHTML=`<i class="fa-regular fa-moon color"></i>&nbsp;&nbsp; Dark Mode`
  }
})


