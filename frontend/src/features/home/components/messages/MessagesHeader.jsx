import { useTranslation } from 'react-i18next';

const MessagesHeader = ({ activeChannel, activeChannelMessages }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          #
          {activeChannel.name}
        </b>
      </p>
      <span className="text-muted">
        {activeChannelMessages.length}
        {' '}
        {t('pages.chat.messages')}
      </span>
    </div>
  );
};

export default MessagesHeader;
