import { useState, useEffect } from 'react'
import './GetCrew.css'
import { supabase } from '../client'
import Card from '../components/Card'

const GetCrew = (props) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const { data } = await supabase
                .from('Crewmates')
                .select()
                .order('created_at', { ascending: false }) // newest first

            // set state of posts (already ordered newest -> oldest)
            setPosts(data)
        }

        fetchPosts()
    }, [props])

    return (
        <div className="getCrew">
            {
                posts && posts.length > 0 ?
                    posts.map((post, index) =>
                        <Card
                            key={post.id}
                            id={post.id}
                            name={post.name}
                            speed={post.speed}
                            color={post.color}
                        />
                    ) : <h2>{'No crewmates yet'}</h2>
            }

        </div>

    )


}

export default GetCrew