import { useState } from 'react';
import Panel from '../components/Panel';
import Logo from '../components/Logo';
import Navigation from '../blocks/Navigation';
import CalendarSchedule from '../components/CalendarSchedule';
import Search from '../blocks/Search';
import Cover from '../components/Cover';
import Button from '../components/Button';
import Icon from '../components/Icon';
import Badge from '../components/Badge';
import { Outlet } from "react-router-dom";
// import Dropdown from '../blocks/Dropdown';

import Dropdown from '../blocks/Dropdown';
import Card from '../blocks/Card';

import logoPath from '../assets/logo/logo-light.svg';
import coverURL from '../assets/profile/profile.jpg';

import useAuth from '../hooks/useAuth';


// interface IPropsLayout {
//     logo: Object;
//     navigation: Object;
//     timeline: Object;
//     search: Object;
//     notifications: Object;
//     messages: Object;
//     profile: Object;
// }

const Layout = (o:any) => {
    // const logoPath = require('../assets/logo/logo-light.svg')
    // const coverURL = require('../assets/profile/profile.jpg')
    const props = {
        logo: {
            classes: ['main'],
            url: logoPath,
            alt: 'Placeholder Logo',
            style: {
                width: '210px'
            }
        },
        navigation: {
            classes: ['main']
        },
        logout: {
            classes: ['logout', 'text', 'reset'],
            type: 'submit',
            size: 'medium',
            text: 'Submit',
            theme: 'primary'
        },
        timeline: {
            classes: ['schedule']
        },
        search: {       
            classes: ['search'],
            input: {
                classes: ['search'],
                id: 'search',
                type: 'text',
                size: 'medium',
                placeholder: 'Search...'
            },
            button: {
                classes: ['search', 'icon', 'reset'],
                type: 'submit',
                theme: 'primary',
                size: 'small',
                children: <Icon classes={['faMagnifyingGlass']} icon="faMagnifyingGlass" />
            }
            
        },
        notifications: {
            classes: ['notifications', 'icon', 'reset'],
            dropdownTrigger: {
                classes: ['icon', 'reset'],
                children: <Icon classes={['faBell']} icon="faBell" badge={<Badge classes={['notification']} maxValue={50} value={120} size="small" type="info" />} />
            },
            dropdownContent: <Navigation classes={['profile']} />
        },
        messages: {
            classes: ['messages', 'icon', 'reset'],
            dropdownTrigger: {
                classes: ['icon', 'reset'],
                children: <Icon classes={['faComment']} icon="faComment" badge={<Badge classes={['messages']} maxValue={99} value={52} size="small" type="info" />} />
            },
            dropdownContent: <Navigation classes={['profile']} />
        },
        profile: {
            classes: ['profile', 'cover', 'reset'],
            dropdownTrigger: {
                classes: ['cover', 'reset'],
                children: <Cover classes={['profile']} url={coverURL} alt="test"/>
            },
            dropdownContent: <Navigation classes={['profile']} />
        }
    }

    const [message, setMessage] = useState('')
    const { signout } = useAuth()

    const handleClick = async () => {
        try {
            await signout();
        } catch (error) {
            setMessage("Failed to log out")
        }
    }

    return (
        <> 
            <Panel classes="panel panel--left">
                <Panel classes="panel panel--top">
                    <Logo {...props.logo} />
                </Panel>
                <Panel classes="panel panel--bottom">
                    <Navigation {...props.navigation}/>
                    {/* <CalendarSchedule {...props.timeline}/> */}
                    <Button {...props.logout} onClick={handleClick}>Log out</Button>
                </Panel>
            </Panel>
            <Panel classes="panel panel--right">
                <Panel classes="panel panel--top">
                    <Search {...props.search}/>
                    <Panel classes="module module--tools">
                        <Dropdown {...props.notifications}/>
                        <Dropdown {...props.messages}/>
                        <Dropdown {...props.profile}/>
                        {/* <Dropdown>
                            <Card>
                                <Dropdown.Selector>test</Dropdown.Selector>
                                <Dropdown.Options>tes  test test tset</Dropdown.Options>
                            </Card>
                        </Dropdown> */}
                    </Panel>
                </Panel>
                <Panel classes="panel panel--bottom">
                    <Outlet />
                </Panel>
            </Panel>
        </>
    )
}

export default Layout;
