import React from 'react';
import {
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import routes from '../routes';
import { useAuth } from '../contexts/AuthProvider';

import LoginPage from './LoginPage';
import NotFoundPage from './NotFoundPage';
import Layout from './Layout';
import ChatPage from './ChatPage/ChatPage';
import SignupPage from './SignupPage';
import ModalComponent from './Modals/index';
import { IChildren } from '../interfaces';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function PrivetRoute({ children }: IChildren): IChildren | any {
  const { user } = useAuth();

  const location = useLocation();

  return (
    Object.hasOwn(user, 'token') ? children : <Navigate to={routes.loginPage()} state={{ state: location }} />
  );
}

function App() {
  return (
    <Routes>
      <Route path={routes.indexPage()} element={<Layout />}>
        <Route
          index
          element={(
            <PrivetRoute>
              <ChatPage />
              <ModalComponent />
            </PrivetRoute>
          )}
        />
        <Route path={routes.loginPage()} element={<LoginPage />} />
        <Route path={routes.signupPage()} element={<SignupPage />} />
        <Route path={routes.notfoundPage()} element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;