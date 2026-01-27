import './App.css'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Blogs from './pages/Blogs';
import Blog from './pages/Blog';
import Subscribers from './pages/Subscribers';

import MainLayout from './layouts/MainLayout';
function App() {
  return (
    <>
    {/* Routes start here */}
      <Routes>
        <Route path='/login' element={<Login/>}/>
        {/* Main Layout renders the following */}
        <Route path='/blog' element={<MainLayout/>}>
          <Route path='posts' element={<Blogs/>}/>
          <Route path='posts/:id' element={<Blog/>}/>
        </Route>
        <Route path='/subscribers' element={<MainLayout/>}>
          <Route index element={<Subscribers/>}/>
        </Route>
      </Routes>
      {/* Routes End */}
    </>
  )
}

export default App
