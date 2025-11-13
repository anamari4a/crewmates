import './CreateCrew.css'
import { supabase } from '../client'
import { useState } from 'react'
import amongUS from '../assets/amongUS.png'


const CreateCrew = () => {
    const [post, setPost] = useState({ name: "", speed: "", color: "" })

    const colors = ['Red', 'Blue', 'Yellow', 'Green', 'Orange', 'Pink', 'Purple']

    const handleChange = (event) => {
        const { name, value } = event.target
        setPost((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const createCrew = async (event) => {
        event.preventDefault()

        await supabase
            .from('Crewmates')
            .insert({ name: post.name, speed: post.speed, color: post.color })
            .select();

        // on success redirect home
        window.location = '/';
    }

    return (
        <div className="create-page">
            <h1>Create a New Crewmate!</h1>
            <img src={amongUS} alt="Among Us" className="amongus" />

            <form className="create-form" onSubmit={createCrew}>
                <div className="form-row">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={post.name}
                        onChange={handleChange}
                    />

                    <label htmlFor="speed">Speed in mph</label>
                    <input
                        type="text"
                        id="speed"
                        name="speed"
                        value={post.speed}
                        onChange={handleChange}
                    />
                </div>

                <div className="color-row">
                    <label className="color-label">Select Color</label>
                    <div className="color-options">
                        {colors.map((c) => (
                            <label key={c} className="color-option">
                                <input
                                    type="radio"
                                    id={c}
                                    name="color"
                                    value={c}
                                    checked={post.color === c}
                                    onChange={handleChange}
                                />
                                <span className="color-name">{c}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-primary">Create Crewmate</button>
                </div>
            </form>
        </div>
    )
}

export default CreateCrew