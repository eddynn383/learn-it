import classNames from 'classnames/bind';
import styles from './style.scss';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import { IPropsCard } from './interface';

const cx = classNames.bind(styles);

const Card = ({ children, className }:IPropsCard) => {
    return <div className={cx('card', className)}>{children}</div>;
};

Card.Header = CardHeader;
Card.Body = CardBody;

export default Card;
