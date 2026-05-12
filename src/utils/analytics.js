import ReactGA from 'react-ga';
import { isMockMode } from 'mocks';

const TRACKING_ID = 'UA-230695609-1';

let initialized = false;

export function initializeAnalytics() {
  if (isMockMode || initialized) {
    return;
  }

  ReactGA.initialize(TRACKING_ID);
  initialized = true;
}

export function trackPageview(path) {
  if (isMockMode) {
    return;
  }

  initializeAnalytics();
  ReactGA.pageview(path);
}

export function trackGa(...args) {
  if (isMockMode) {
    return;
  }

  initializeAnalytics();
  ReactGA.ga(...args);
}
