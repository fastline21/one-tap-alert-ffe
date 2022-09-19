import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

import HomePage from 'Pages/Home';
import LoginPage from 'Pages/Login';
import NotFound from 'Pages/NotFound';

import PrivateRoute from 'Routes/PrivateRoute';

const App = () => {
  return (
    <Provider store={configureStore}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
