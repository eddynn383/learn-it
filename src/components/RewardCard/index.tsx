import { FC } from 'react';
import Icon from '../Icon';
import { IRewardCard } from './interface';
import { addClass, classModifier } from '../../functions/utils';
import './style.scss'


const RewardCard:FC<IRewardCard> = ({classes, outerIcon, innerIcon, title, subtitle, value }) => {
    const attrs = {
        className: addClass(classModifier('reward-card', classes))
    }

    // console.log(value ? value : '')

    return (
        <div {...attrs}>
            <div className="reward-card_top">
                <Icon classes={["box"]} icon={innerIcon} />
                <div className="reward-card_titles">
                    <h3 className="reward-card_title">{title}</h3>
                    <span className="reward-card_subtitle">{subtitle}</span>
                </div>
            </div>
            <div className="reward-card_middle">
                <span className="reward-card_value">{value?.length}</span>
            </div>
            <div className="reward-card_bottom">
                <div className="reward-card_dropdown-header">
                    <span>Last year</span> 
                    <Icon classes={["dropdown"]} icon="faChevronDown" />
                </div>
                <div className="reward-card_dropdown-body"></div>
            </div>
            <div className="reward-card_overlap-icon">
                <Icon classes={["overlap"]} icon={outerIcon} />
            </div>
        </div>
    )
}

export default RewardCard
