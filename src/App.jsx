import { Provider } from 'react-redux'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import ProfilePage from './pages/ProfilePage'
import SideBar from './cmps/SideBar'
import HomePage from './pages/HomePage'
import { store } from './store/store'

import './assets/style/main.css'
import PostDetails from './cmps/PostDetails'

function App() {


  return (
    <Provider store={store}>
      <Router>
        <div className="main-layout app">
          <aside>
            <SideBar />
          </aside>
          <main>
            <Routes>
              <Route element={<HomePage />} path='/'>
                <Route path='p/:postId' element={<PostDetails />} />
              </Route>
              <Route element={<ProfilePage />} path='/:username' />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  )
}

export default App
