import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadUser, logoutUser } from 'Services/Actions/auth';

import Sidebar from 'Layouts/Sidebar';
import Header from 'Layouts/Header';

import DashboardPage from 'Pages/Dashboard';
import UserTypesPage from 'Pages/UserTypes';
import EmergencyTypesPage from 'Pages/EmergencyTypes';
import EmergencyStatusesPage from 'Pages/EmergencyStatuses';
import EmergencyCategoriesPage from 'Pages/EmergencyCategories';
import BarangaysPage from 'Pages/Barangays';
import NotFound from 'Pages/NotFound';

const Home = ({ authState: { user, loading }, loadUser, logoutUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    loadUser();

    // eslint-disable-next-line
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate('/login', { replace: true });
  };

  return (
    <>
      <Header logoutUser={() => handleLogout()} />
      <Container fluid className="pt-5">
        <Row>
          <Sidebar />
          <main className="col-md-9 ms-lg-auto col-lg-10 px-md-4">
            <div
              className="position-relative"
              style={{ height: 'calc(85vh - 3rem)' }}
            >
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/user-types" element={<UserTypesPage />} />
                <Route
                  path="/emergency-types"
                  element={<EmergencyTypesPage />}
                />
                <Route
                  path="/emergency-statuses"
                  element={<EmergencyStatusesPage />}
                />
                <Route
                  path="/emergency-categories"
                  element={<EmergencyCategoriesPage />}
                />
                <Route path="/barangays" element={<BarangaysPage />} />
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </div>
          </main>
        </Row>
      </Container>
    </>
  );
};

Home.propTypes = {
  authState: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authState: state.authState,
});

export default connect(mapStateToProps, { loadUser, logoutUser })(Home);
