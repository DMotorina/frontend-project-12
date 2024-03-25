import { AppRoutes } from './AppRoutes'
import { Provider } from 'react-redux'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css';
import initI18next from './initI18next';
import leoProfanity from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

const rollbarConfig = {
  accessToken: 'POST_CLIENT_ITEM_ACCESS_TOKEN',
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: 'production',
} 

const ruDict = leoProfanity.getDictionary('ru');
leoProfanity.add(ruDict);

export default async () => {
  await initI18next();

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