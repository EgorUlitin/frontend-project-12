import React, { ReactNode } from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react';

const { REACT_APP_ROLLBAR_TOKEN } = process.env;

const rollbarConfig = {
  accessToken: REACT_APP_ROLLBAR_TOKEN,
  environment: 'production',
};

const RollbarProvider = ({ children }: { children: ReactNode }) => (
  <Provider config={rollbarConfig}>
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  </Provider>
);

export default RollbarProvider;
