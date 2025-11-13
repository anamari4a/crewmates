import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Card.css'
import amongUSOutline from '../assets/amongUsOutline.jpg'

const Card = (props) => {

    return (
        <div className="Card">
            <img src={amongUSOutline} alt="crewmate" className="card-image" />

            <h2 className="name">{props.name}</h2>
            <h3 className="speed">{props.speed} mph</h3>
            <p className="color">{props.color}</p>

            <div className="card-actions">
                <Link className="btn view-btn" to={'view/' + props.id}>View</Link>
                <Link className="btn edit-btn" to={'edit/' + props.id}>Edit</Link>
            </div>
        </div>
    )


}

export default Card