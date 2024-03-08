import { AppRoutes } from './AppRoutes'
import { Provider } from 'react-redux'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css';


export const App = () => {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  )
}