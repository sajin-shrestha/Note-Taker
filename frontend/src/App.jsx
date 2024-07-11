import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import NotFoundPage from './pages/NotFoundPage'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import HomePage from './pages/actualPages/HomePage'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/sign-in"
            element={<SignIn />}
          />
          <Route
            path="/sign-up"
            element={<SignUp />}
          />

          <Route element={<LandingPage />}>
            <Route
              path="/"
              element={<HomePage />}
            />
          </Route>

          {/* Catch-all route for 404 page */}
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}
