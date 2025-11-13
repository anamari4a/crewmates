import { Outlet, Link } from "react-router-dom"

function Layout() {
    return (
        <div className="app-layout">
            <aside className="sidebar">
                <nav className="nav" key="home-button">
                    <Link className="nav-link" to="/">Home</Link>
                    <Link className="nav-link" to="/CreateCrew">Create Crew</Link>
                    <Link className="nav-link" to="/GetCrew">Your Crewmates!</Link>
                </nav>
            </aside>

            <main className="content">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout