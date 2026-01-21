// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import ClientsPage from './pages/ClientList';
import ClientDetailPage from './pages/ClientDetailPage';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="container py-4">
          <h1 className="mb-4">Project Management System</h1>

          <Routes>
            <Route path="/" element={<ClientsPage />} />
            <Route path="/clients/:id" element={<ClientDetailPage />} />
            <Route path="*" element={<h2>404 - Page Not Found</h2>} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;