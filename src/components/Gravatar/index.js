import React from 'react'

export default function Gravatar({link, size, rounded}) {
    return(
        <img className={`block ${rounded && "radius-rounded"}`} src={size ? `${link}&s=${size}` : link} alt="Gravatar" />
    )
}