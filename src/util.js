import React from "react"
import numeral from "numeral"
import { Circle, Popup } from "react-leaflet"

const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        // multiplier: 800,
        multiplier: 100,
    },
    recovered: {
        hex: "#7dd71d",
        // multiplier: 1200,
        multiplier: 100,
    },
    deaths: {
        hex: "#000",
        // multiplier: 2000,
        multiplier: 500,
    },
};

// this is a helper function that I'll use to sort the data by case numbers
export const sortData = (data) => {
    const sortedData = [...data]

    return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1))
}

// format the number statistics to a more readable amount i.e. 7500000 becomes 7.5m
export const prettyPrintStat = (stat) => stat ? `+${numeral(stat).format("0.0a")}` : "0";

// draw circles on the map with interactive tooltips
export const showDataOnMap = (data, casesType = "cases") =>
    data.map((country) => (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            radius={Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}
        >
            <Popup>
                <div className="info-container">
                    <div
                        className="info-flag"
                        style={{ backgroundImage: `url(${country.countryInfo.flag})` }} />
                    <div className="info-name">{country.country}</div>
                    <div className="info-confirmed"><strong>Cases</strong><br/> {numeral(country.cases).format("0,0")}</div>
                    <div className="info-recovered"><strong>Recovered</strong><br/> {numeral(country.recovered).format("0,0")}</div>
                    <div className="info-deaths"><strong>Deaths</strong><br/> {numeral(country.deaths).format("0,0")}</div>
                </div>
            </Popup>
        </Circle>
    ))