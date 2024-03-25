import { AppRoutes } from './AppRoutes'
import { Provider } from 'react-redux'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css';
import initI18next from './initI18next';
import leoProfanity from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

export default async () => {
  await initI18next();

  const ruDict = leoProfanity.getDictionary('ru');
  leoProfanity.add(ruDict);

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
    payload: {
      environment: 'production',
    },
    captureUncaught: true,
    captureUnhandledRejections: true,
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  )
}