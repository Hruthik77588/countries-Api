const countryNames = new URLSearchParams(location.search).get("name")
const flagImage = document.querySelector(".country-details img")
const countryName = document.querySelector(".details-txt-container h1")
const countryDetailscon = document.querySelector(".country-details-coutainer")

fetch(`https://restcountries.com/v3.1/name/${countryNames}?fullText=true`)
    .then((res) => res.json())
    .then(([country]) => {
        console.log(country)
        // flagImage.src=country.flags.svg;
        // countryName.innerText=country.name.common

        if (country.name.nativeName) {
            Object.values(country.name.nativeName)[0].common;
        } else {
            country.name.nativeName;
        }

        const countrydetails = document.createElement('div')
        countrydetails.classList.add('.country-details')
        const cardHtml = `
 <div class="country-details">

            <img src="${country.flags.svg}" alt="flag">

            <div class="details-txt-container">
                <h1>${country.name.common}</h1>
                <div class="details-txt">
                    <p><b>Native Name: </b>${Object.values(country.name.nativeName)[0].common}</p>
                    <p><b>Population: </b>  ${country.population}</p>
                    <p><b>Region: </b> ${country.region}</p>
                    <p><b>sub Region:</b> ${country.subregion}</p>
                    <p><b>Capital: </b> ${country.capital}</p>
                    <p><b>Top Level Domain: </b>be</p>
                    <p><b>Currencies:</b> ${Object.keys(country.currencies)[0].name}</p>
                    <p><b>language: </b> ${Object.values(country.languages)[0]},
                    ${Object.values(country.languages)[1]},
                    ${Object.values(country.languages)[2]}</p>
                </div>
                <div class="border-countries">
                <p><b>Border Countries: </b>&nbsp; <a href="#">${country.borders[0]}</a><a href="#"> Russia</a></p>
            </div>
                     
 `
        countrydetails.innerHTML = cardHtml

        countryDetailscon.append(countrydetails)

    })






