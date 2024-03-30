import { useTranslation } from 'react-i18next';

import imagePath from '../../assets/img/notFound.jpg';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img alt="Страница не найдена" className="img-fluid h-25" src={imagePath} />
      <h1 className="h4 text-muted">{t('pages.notFound.notFound')}</h1>
      <p className="text-muted">
        {t('pages.notFound.youCanGo')}
        {' '}
        <a href="/">{t('pages.notFound.toHomePage')}</a>
      </p>
    </div>
  );
};

export default NotFound;
