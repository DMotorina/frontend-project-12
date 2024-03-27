import ReactDOM from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css';

import { App } from './App';

const index = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(await App());
};

index();
