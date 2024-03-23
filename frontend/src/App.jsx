import { AppRoutes } from './AppRoutes'
import { Provider } from 'react-redux'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css';
import initI18next from './initI18next';
import leoProfanity from 'leo-profanity';

export default async () => {
  await initI18next();

  const ruDict = leoProfanity.getDictionary('ru');
  leoProfanity.add(ruDict);

  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  )
}