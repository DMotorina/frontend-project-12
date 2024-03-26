import { AppRoutes } from './AppRoutes'
import { Provider as StoreProvider } from 'react-redux'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css';
import initI18next from './initI18next';
import leoProfanity from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

import rollbarConfig from './rollbar/rollbarConfig';

export default async () => {
  await initI18next();

  const ruDict = leoProfanity.getDictionary('ru');
  leoProfanity.add(ruDict);

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
          <StoreProvider store={store}>
            <AppRoutes />
          </StoreProvider>
      </ErrorBoundary>
    </RollbarProvider>
  )
}