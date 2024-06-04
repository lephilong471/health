import './App.css';
import './assets/Responsive.css';
// import Sidebar from './components/Sidebar'
// import Header from './components/Header'
// import Footer from './components/Footer';
import PageEyes from './pages/PageEyes';
import PageChild from './pages/PageChild';
import PageOther from './pages/PageOther'
import PageDetail from './pages/PageDetail';
import PageAbout from './pages/PageAbout';
import PageInfo from './pages/PageInfo';
import PageMain from './pages/PageMain';
import Page404 from './pages/Page404';
import PageIntroduce from './pages/PageIntroduce';
import PageSupport from './pages/PageSupport'
import PageTermOfUse from './pages/PageTermOfUse'
import PageService from './pages/PageService'
import PageSecurePolicy from './pages/PageSecurePolicy'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GlobalProvider } from './store/GlobalProvider';

// Admin
import AdminLogin from './components/admin/AdminLogin'
import AdminPageMain from './pages/admin/AdminPageMain'
import AdminProduct from './pages/admin/AdminProduct'
import AdminSupport from './pages/admin/AdminSupport'
import AdminChatRoom from './pages/admin/AdminChatRoom'

import { config } from './config';

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
      <div className="App">
          <Routes>
            <Route path="*" element={<Page404/>}/>
            <Route path="/" element = {<PageMain/>}/>
            <Route path="/pages/eyes" element = {<PageMain component={<PageEyes/>}/>}/>
            <Route path="/pages/other" element = {<PageMain component={<PageOther/>}/>}/>
            <Route path="/pages/product/detail/:id" element={<PageMain component={<PageDetail/>}/>}/>
            <Route path="/pages/child" element = {<PageMain component={<PageChild/>}/>}/>
            <Route path="/pages/about" element = {<PageIntroduce component={<PageAbout/>}/>}/>
            <Route path="/pages/info" element = {<PageIntroduce component={<PageInfo/>}/>}/>
            <Route path="/pages/support" element = {<PageMain component={<PageSupport/>}/>}/>
            <Route path="/pages/term-of-use" element={<PageIntroduce component={<PageTermOfUse/>}/>}/>
            <Route path="/pages/secure-policy" element={<PageIntroduce component={<PageSecurePolicy/>}/>}/>
            <Route path="/pages/service" element={<PageMain component={<PageService/>}/>}/>


            {/* Admin */}
            <Route path={`/${config.admin_path}`} element = {<AdminLogin/>}/>
            <Route path={`/${config.admin_path}/pages/all-products`} element = {<AdminPageMain component={<AdminProduct/>}/>}/>
            <Route path={`/${config.admin_path}/pages/support`} element = {<AdminPageMain component={<AdminSupport/>}/>}/>
            <Route path={`/${config.admin_path}/pages/support-room-chat/:clientID`} element={<AdminPageMain component={<AdminChatRoom/>}/>}/>
          </Routes>
          {/* <Header />
          <div className="pageContent">
              <Sidebar />
              <Routes>
                <Route path="/pages/eyes" element = {<PageEyes/>}/>
                <Route path="/pages/child" element = {<PageChild/>}/>
                <Route path="/pages/other" element = {<PageOther/>}/>
                <Route path="/pages/product/detail/:id" element ={<PageDetail/>}/>
                <Route path="/pages/about" element = {<PageAbout/>}/>
                <Route path="/pages/info" element = {<PageInfo/>}/>
              </Routes>
          </div>
          <Footer/> */}
      </div>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
