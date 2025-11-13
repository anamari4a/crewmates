import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './routes/Layout.jsx'
import CreateCrew from './pages/CreateCrew.jsx'
import GetCrew from './pages/GetCrew.jsx'
import EditCrew from './pages/EditCrew.jsx'
import CrewDetail from './pages/CrewDetail.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="/CreateCrew" element={<CreateCrew />} />
          <Route path="/GetCrew" element={<GetCrew />} />
          <Route path="/GetCrew/view/:id" element={<CrewDetail />} />
          <Route path="/GetCrew/edit/:id" element={<EditCrew />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
