import React from 'react'
import "./styles/InfoBox.css"
import { Card, CardContent, Typography } from '@mui/material';

function InfoBox({ title, cases, active, total, isRed, isGreen, isBlack, ...props }) {
    return (
        <Card
            onClick={props.onClick}
            className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"} ${isBlack && "infoBox--black"}`}
        >
            <CardContent>
                <Typography
                    className="infoBox__title"
                    color="textSecondary"
                >
                    <strong>{title}</strong>
                </Typography>

                <h2 className={`infoBox__cases ${isGreen && "text--green"} ${isBlack && "text--black"}`}>{cases}</h2>

                <Typography
                    className="infoBox__total"
                    color="textSecondary"
                >
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox;