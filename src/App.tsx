import { Route, Routes } from 'react-router-dom'
import routes from './routes'

function App() {
  return (
    <Routes>
      {routes.map(route => <Route key={route.name} {...route} />)}
    </Routes>
  )
}

export default App
