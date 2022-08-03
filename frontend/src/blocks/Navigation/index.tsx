import { useState, useEffect, FC } from 'react';
import NavLink from '../../components/NavLink';
// import useNavigation from '../hooks/useNavigation';
import { addClass, classModifier } from '../../functions/utils';
import useAuth from '../../hooks/useAuth';
import './style.scss';

import { IPropsNavigation } from './interface';

const Navigation:FC<IPropsNavigation> = ({classes}) => {
    const { getDB } = useAuth()
    const [navigation, setNavigation] = useState<Object[]>()
    
    const getNavigation = async () => {
        try {       
            const links = await getDB(false, 'navigation', 'default')
            if (links.exists()) {
                setNavigation(links.data().main)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getNavigation()
    }, [])

    return (
        <nav className={addClass(classModifier('nav', classes))}>
            <ul>
                {
                    navigation?.map((e:any, idx: number) => {
                        return (
                            <li key={idx}>
                                <NavLink to={e.link} classes={e.class} iconBefore={e.icon} text={e.title} />
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}

export default Navigation