import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import leoProfanity from 'leo-profanity';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import { io } from 'socket.io-client';

import resources from './locales/index.js';
import AppRoutes from './AppRoutes';
import rollbarConfig from './rollbar/rollbarConfig';
import { ruDict, enDict } from './locales/dict';
import ApiProvider from './context/ApiProvider.jsx';
import store from './slices/store';

import {
  addChannel, removeChannel, changeChannel, updateChannel,
} from './slices/channelsSlice.js';
import { addMessage } from './slices/messagesSlice.js';

const App = async () => {
  const i18n = i18next.createInstance();

  const socket = io();

  socket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload));
  });

  socket.on('removeChannel', ({ id }) => {
    store.dispatch(removeChannel(id));
    store.dispatch(changeChannel({ id: '1' }));
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(changeChannel(payload));
    store.dispatch(updateChannel({ id: payload.id, changes: { name: payload.name } }));
  });

  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });

  leoProfanity.add(ruDict);
  leoProfanity.add(enDict);

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <ApiProvider>
              <AppRoutes />
            </ApiProvider>
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default App;
