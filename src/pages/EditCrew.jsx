import './EditCrew.css'
import { supabase } from '../client'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import amongUS from '../assets/amongUS.png'

const EditCrew = ({ data }) => {
    const { id } = useParams()

    // current shows existing crewmate info (display only)
    const [current, setCurrent] = useState({ id: null, name: "", speed: "", color: "" })

    // form holds only new values the user types (starts empty)
    const [form, setForm] = useState({ name: "", speed: "", color: "" })
    const colors = ['Red', 'Blue', 'Yellow', 'Green', 'Orange', 'Pink', 'Purple']

    useEffect(() => {
        if (!id) return
        const fetchPost = async () => {
            const { data } = await supabase.from('Crewmates').select('*').eq('id', id).single()
            if (data) setCurrent({ id: data.id, name: data.name ?? '', speed: data.speed ?? '', color: data.color ?? '' })
        }
        fetchPost()
    }, [id])

    const handleChange = (event) => {
        const { name, value } = event.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const deletePost = async (event) => {
        event.preventDefault()

        await supabase
            .from('Crewmates')
            .delete()
            .eq('id', id)

        window.location = "/";

    }

    const updatePost = async (event) => {
        event.preventDefault()

        // build update object only with fields the user entered
        const updateData = {}
        if (form.name && form.name.trim() !== '') updateData.name = form.name
        if (form.speed && form.speed.trim() !== '') updateData.speed = form.speed
        if (form.color && form.color.trim() !== '') updateData.color = form.color

        // if nothing entered, do nothing
        if (Object.keys(updateData).length === 0) return

        await supabase
            .from('Crewmates')
            .update(updateData)
            .eq('id', id)

        // re-fetch the updated row so the page immediately shows server-saved values
        const { data } = await supabase.from('Crewmates').select('*').eq('id', id).single()
        if (data) {
            setCurrent({ id: data.id, name: data.name ?? '', speed: data.speed ?? '', color: data.color ?? '' })
            // clear form after successful update
            setForm({ name: "", speed: "", color: "" })
        }


    }

    return (
        <div>
            <h1>Update your Crewmate!</h1>
            <img src={amongUS} alt="Among Us" className="amongus" />
            <div className="current-info">
                <h2>Current Crewmate Info:</h2>
                <p>Name: {current.name}</p>
                <p>Speed: {current.speed} mph</p>
                <p>Color: {current.color}</p>
            </div>
            <form className="update-form">
                <div className="form-row">
                    <label htmlFor="name">New name</label> <br />
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                    /> <br />
                    <br />

                    <label htmlFor="speed">New speed in mph</label><br />
                    <input
                        type="text"
                        id="speed"
                        name="speed"
                        value={form.speed}
                        onChange={handleChange}
                    /> <br />
                </div>

                <div className="color-row">
                    <label className="color-label">Select the Crewmate Color</label><br />
                    <div className="color-options">
                        {colors.map((c) => (
                            <span key={c} style={{ marginRight: 12 }}>
                                <input
                                    type="radio"
                                    id={c}
                                    name="color"
                                    value={c}
                                    checked={form.color === c}
                                    onChange={handleChange}
                                />
                                <label htmlFor={c} style={{ textTransform: 'capitalize', marginLeft: 6 }}>{c}</label>
                            </span>
                        ))}
                    </div>
                </div>
                <br /><br />
                <div className="form-actions">
                    <button type="submit" onClick={updatePost}>Update!</button>
                    <button type="button" className="deleteButton" onClick={deletePost}>Delete</button>
                </div>
            </form >
        </div >
    )
}

export default EditCrew
