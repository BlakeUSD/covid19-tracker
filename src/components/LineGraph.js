import React, { useState, useEffect } from 'react';
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0")
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
}

const buildChartData = (data, casesType) => {
    let chartData = [];
    let lastDataPoint;

    for (let date in data.cases) {
        if (lastDataPoint) {
            let newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataPoint,
            }
            chartData.push(newDataPoint);
        }
        lastDataPoint = data[casesType][date];
    }
    return chartData;
}

function LineGraph({ casesType = 'cases', ...props }) {
    const [data, setData] = useState({});
    const [backgroundColor, setbackgroundColor] = useState("cases")
    const [borderColor, setborderColor] = useState()

    useEffect(() => {
        const fetchData = async () => {
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=360")
                .then((response) => response.json())
                .then((data) => {
                    let chartData = buildChartData(data, casesType);
                    setData(chartData);
                });
        }
        // change the line graph's colors to match casesType
        if (casesType === "cases") {
            setbackgroundColor("rgba(204, 16, 52, 0.7)")
            setborderColor("rgba(204, 16, 52)")
        } else if (casesType === "recovered") {
            setbackgroundColor("rgb(111, 216, 0, .7)")
            setborderColor("rgb(111, 216, 0)")
        } else {
            setbackgroundColor("rgb(0, 0, 0, .7)")
            setborderColor("rgb(0, 0, 0)")
        }
        fetchData();
    }, [casesType]);

    return (
        <div className={props.className}>
            {data?.length > 0 && (
                <Line
                    options={options}
                    data={{
                        datasets: [
                            {
                                backgroundColor: backgroundColor,
                                borderColor: borderColor,
                                data: data,
                            },
                        ],
                    }}
                />
            )}
        </div>
    )
}

export default LineGraph