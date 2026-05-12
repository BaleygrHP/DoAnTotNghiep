//Admin
import { ThemeProvider } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { useEffect, useState } from 'react';
import DashboardNavbar from 'components/admin/DashboardNavbar';
import DashboardSidebar from 'components/admin/DashboardSidebar';
import GlobalStyles from 'components/admin/GlobalStyles';
import NotFoundA from 'features/admin/NotFound';
import theme2 from './theme';
import pageAdmin from 'features/admin/page';
import { useSelector } from 'react-redux';
//User
import DefaultLayout from 'components/web/layout/HomePage/DefaultLayout';
import pageGuest from 'features/web/index';
import pageUser from 'features/web/pageUser';
import NotFound from 'features/web/NotFound';
import React, { Suspense } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { initializeAnalytics, trackPageview } from 'utils/analytics';

initializeAnalytics();
//admin
const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  height: '100%',
  overflow: 'hidden',
  width: '100%',
}));
const DashboardLayoutWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 256,
  },
}));

const DashboardLayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
});

const DashboardLayoutContent = styled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto',
});

function App() {
  //admin
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  // create State
  const user = useSelector((state) => state.user.current);
  const isLoggedIn = !!user._id;


  useEffect(() => {
    trackPageview(window.location.pathname + window.location.search);
  }, []);
  // function
  const showPageGuest = (page) => {
    if (page.length > 0) {
      return page.map((page, index) => <Route key={index} exact={page.exact} path={page.path} component={page.main} />);
    }
  };
  const showPageUser = (page) => {
    if (page.length > 0) {
      if (!isLoggedIn) {
        return <Redirect to="/login" />;
      }
      return page.map((page, index) => <Route key={index} exact={page.exact} path={page.path} component={page.main} />);
    }
  };
  const showPageAdmin = (page) => {
    if (page.length > 0) {
      return page.map((page, index) => <Route key={index} exact={page.exact} path={page.path} component={page.main} />);
    }
  };
  return (
    <Router>
      <Suspense fallback>
        {user.role !== 'admin' && (
          <DefaultLayout>
            <Switch>
              {showPageGuest(pageGuest)}
              {showPageUser(pageUser)}
              <Route path="/*" component={NotFound} exact />
              <Redirect to="/" from="/" />
            </Switch>
          </DefaultLayout>
        )}
        {user.role === 'admin' && (
          <ThemeProvider theme={theme2}>
            <GlobalStyles />
            <DashboardLayoutRoot>
              <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
              <DashboardSidebar onMobileClose={() => setMobileNavOpen(false)} openMobile={isMobileNavOpen} />
              <DashboardLayoutWrapper>
                <DashboardLayoutContainer>
                  <DashboardLayoutContent>
                    <Router>
                      <Switch>
                        {showPageAdmin(pageAdmin)}
                        <Route path="/*" component={NotFoundA} exact />
                        <Redirect to="/" from="/" />
                      </Switch>
                    </Router>
                  </DashboardLayoutContent>
                </DashboardLayoutContainer>
              </DashboardLayoutWrapper>
            </DashboardLayoutRoot>
          </ThemeProvider>
        )}
      </Suspense>
    </Router>
  );
}

export default App;
