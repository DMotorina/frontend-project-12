import { AppRoutes } from './AppRoutes'
import { Provider } from 'react-redux'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css';
import initI18next from './initI18next';

export default async () => {
  await initI18next();

  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  )
}