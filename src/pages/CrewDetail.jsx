import { useParams, Link } from 'react-router-dom'
import './CrewDetail.css'
import { supabase } from '../client'
import { useEffect, useState } from 'react'

const CrewDetail = () => {
    const { id } = useParams()
    const [crew, setCrew] = useState({ name: '', speed: '', color: '' })

    useEffect(() => {
        if (!id) return
        const fetchCrew = async () => {
            const { data } = await supabase.from('Crewmates').select('*').eq('id', id).single()
            if (data) setCrew({ name: data.name ?? '', speed: data.speed ?? '', color: data.color ?? '' })
        }
        fetchCrew()
    }, [id])

    return (
        <div className="crew-detail-page">
            <img src={"/src/assets/amongUS.png"} alt="crewmate" className="detail-image" />
            <h1 className="detail-title">Crewmate details</h1>

            <div className="detail-attrs">
                <div className="attr"><span className="label">Name</span><span className="value">{crew.name}</span></div>
                <p className="detail-title">Stats:</p>
                <div className="attr"><span className="label">Speed</span><span className="value">{crew.speed} mph</span></div>
                <div className="attr"><span className="label">Color</span><span className="value">{crew.color}</span></div>
            </div>

            <div className="detail-actions">
                <Link className="btn edit-btn" to={`/GetCrew/edit/${id}`}>Edit Crewmate</Link>
            </div>
        </div>
    )
}

export default CrewDetail
