const countryNames = new URLSearchParams(location.search).get("name")
const flagImage = document.querySelector(".country-details img")
const countryName = document.querySelector(".details-txt-container h1")
const nativeName = document.querySelector(".native-name")
const population = document.querySelector(".population")
const region = document.querySelector(".region")
const subRegion = document.querySelector(".sub-region")
const capital = document.querySelector(".capital")
const topLevelDomain = document.querySelector(".top-level-domain")
const Currencies = document.querySelector(".currencies")
const Language = document.querySelector(".languages")
const borderCountries = document.querySelector(".border-countries")
const themeSwitch=document.querySelector(".theme-switch")
const headerContent=document.querySelector(".header-content")

fetch(`https://restcountries.com/v3.1/name/${countryNames}?fullText=true`)
    .then((res) => res.json())
    .then(([country]) => {
        console.log(country)
        flagImage.src = country.flags.svg
        countryName.innerText = country.name.common
        nativeName.innerText = country.nativeName
        population.innerText = country.population.toLocaleString('en-IN')
        region.innerText = country.region
        topLevelDomain.innerText = country.tld.join(', ')
        Currencies.innerText = country.currencies
        Language.innerText = country.languages


        if (country.capital) {
            capital.innerText = country.capital?.[0]
        }
        if (country.subregion) {
            subRegion.innerText = country.subregion
        }
        if (country.name.nativeName) {
            nativeName.innerText = Object.values(country.name.nativeName)[0].common;
        } else {
            nativeName.innerText = country.name.common;
        }

        if (country.currencies) {
            Currencies.innerText = Object.values(country.currencies).map((currency) => {
                return currency.name
            })
        }
        if (country.languages) {
            Language.innerText = Object.values(country.languages).join(', ')

        }
        if (country.borders) {
            country.borders.forEach((border) => {
                fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                    .then((res) => res.json())
                    .then(([borderCountry]) => {
                        // console.log(borderCountry) 
                        const borderCountrytag = document.createElement('a')
                        borderCountrytag.innerText = borderCountry.name.common
                        borderCountrytag.href = `country.html?name=${borderCountry.name.common}`
                        //    console.log(borderCountrytag)
                        borderCountries.append(borderCountrytag)
                    })
            })
        }

    })

    themeSwitch.addEventListener("click",()=>{
    document.body.classList.toggle("dark")

      if (document.body.classList.contains("dark")) {
  themeSwitch.innerHTML=`<i class="fa-solid fa-sun color"></i>&nbsp;&nbsp; Light Mode`
  } else {
 themeSwitch.innerHTML=`<i class="fa-regular fa-moon color"></i>&nbsp;&nbsp; Dark Mode`
  }
})
