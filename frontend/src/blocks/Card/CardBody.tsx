import classNames from 'classnames/bind';
import styles from './style.scss';
import { IPropsCard } from './interface';

const cx = classNames.bind(styles);

const CardBody = ({ children, className, ...props }:IPropsCard) => {
  return (
    <div className={cx('card_body', className)} {...props}>
      {children}
    </div>
  );
};

export default CardBody;
