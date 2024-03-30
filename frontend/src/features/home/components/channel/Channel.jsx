import { Dropdown, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Channel = ({ channel, getClassName, changeActiveChannel, activeChannel, handleRemoveShow, handleRenameShow }) => {
    const { t } = useTranslation();

    const { name, id, removable } = channel;

    if (!removable) {
        return (
            <li key={id} className="nav-item w-100">
                <button 
                    id={id} 
                    type="button" 
                    className={getClassName(id)} 
                    onClick={() => changeActiveChannel(id, name)}
                >
                    <span className="me-1">#</span>
                    {name}
                </button>
            </li>
        );
    }

    return (
        <Dropdown key={id} className="d-flex" as={ButtonGroup}>
            <button 
                type="button" 
                id={id} 
                className={getClassName(id)} 
                onClick={() => changeActiveChannel(id, name)}
            >
                <span className="me-1">#</span>
                {name}
            </button>
            <Dropdown.Toggle 
                split 
                variant={activeChannel.id === id ? 'secondary' : 'none'} 
                id="dropdown-split-basic secondary" 
            />
            <Dropdown.Menu>
                <Dropdown.Item 
                    onClick={handleRemoveShow}
                >
                    {t('modals.buttons.remove')}
                </Dropdown.Item>
                <Dropdown.Item 
                    onClick={handleRenameShow}
                >
                    {t('modals.buttons.rename')}
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default Channel;