import { useState, useEffect } from 'react';
import Accordion from '../blocks/Accordion';
import Card from '../blocks/Card';
import RewardCard from '../components/RewardCard';
import useAuth from '../hooks/useAuth';

const Dashboard = () => {
    const { getDB, currentUser } = useAuth();
    const [rewards, setRewards] = useState();

    const getRewards = async () => {
        try {
            const getUser = await getDB(false, 'users', currentUser.uid)
            const getUserData = getUser.data()
            const getUserRewards = getUserData['rewards']
            setRewards(getUserRewards)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getRewards()
    }, [])

    return (
        <>        
            <div style={{display: 'flex', gap: '20px'}}> 
                <RewardCard classes={['achievements', 'primary']} title="Achievements" subtitle="Total" outerIcon="faTrophy" innerIcon="faCircleCheck" value={rewards?.achievements}/>
                <RewardCard classes={['skills', 'secondary']} title="Skills" subtitle="Total" innerIcon="faBrain" outerIcon="faBolt" value={rewards?.skills}/>
                <RewardCard classes={['certifications', 'secondary']} title="Certifications" subtitle="Total" outerIcon="faAward" innerIcon="faListCheck" value={rewards?.certifications}/>
            </div>
        </>
    )
}

export default Dashboard
