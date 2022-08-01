import classNames from 'classnames/bind';
import styles from './style.scss';
import { IPropsCard } from './interface';

const cx = classNames.bind(styles);

const CardHeader = ({ children, className, ...props }:IPropsCard) => {
  return (
    <div className={cx('card_header', className)} {...props}>
      {children}
    </div>
  );
};

export default CardHeader;