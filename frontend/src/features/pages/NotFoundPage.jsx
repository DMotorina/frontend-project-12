import { useTranslation } from 'react-i18next';

import notFoundImg from '../../assets/images/notFound.jpg';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img alt="Страница не найдена" className="img-fluid h-25" src={notFoundImg} />
      <h1 className="h4 text-muted">{t('pages.notFound.notFound')}</h1>
      <p className="text-muted">
        {t('pages.notFound.youCanGo')}
        {' '}
        <a href="/">{t('pages.notFound.toHomePage')}</a>
      </p>
    </div>
  );
};

export default NotFoundPage;
