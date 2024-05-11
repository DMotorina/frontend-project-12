import ReactDOM from 'react-dom/client';

import App from './App';

const index = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(await App());
};

index();
