import ReactDOM from 'react-dom/client'
import './index.css';
import App from './App';

const init = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(await App());
};

init();
