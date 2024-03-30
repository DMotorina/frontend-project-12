import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider as StoreProvider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import leoProfanity from 'leo-profanity';

import initI18next from './initI18next';
import AppRoutes from './AppRoutes';
import rollbarConfig from './rollbar/rollbarConfig';
import { ruDict, enDict } from './locales/dict';

import store from './store';

const App = async () => {
  await initI18next();

  leoProfanity.add(ruDict);
  leoProfanity.add(enDict);

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <StoreProvider store={store}>
          <AppRoutes />
        </StoreProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default App;
