import { useState, useEffect, FC } from 'react';
// import { useBreakpoint } from '../hooks/useBreakpoint';
import Accordion from '../blocks/Accordion';
import Card from '../blocks/Card';
import Icon from '../components/Icon';
import useAuth from '../hooks/useAuth';
import db from '../local-files/db.json'
import CourseDataService from "../services/course"
import Rating from '../components/Rating';

const Catalog = () => {
    const { getDB, setDB, currentUser } = useAuth();
    const [ courses, setCourses ] = useState();

    // const getCourses = async () => {
    //     try {       
    //         const items = await getDB(true, 'courses')
    //         const data = []
    //         items.forEach((item) => {
    //             data.push(item.data())
    //         })
    //         // setCourses(data)
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    // const addData = async (e) => {
    //     e.preventDefault()
    //     try {
    //         console.log('event is fired')
    //         await setDB('users', currentUser.uid, db)
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    const retriveCourses = () => {
        CourseDataService.getAll().then(res => {
            console.log(res.data.courses)
            setCourses(res.data.courses)
        }).catch(e => {
            console.log(e)
        })
    }

    useEffect(() => {
        retriveCourses()
        // getCourses()
    }, [])

    // console.log(courses)


    return (
        <>  
            <div className="cards">
                {
                    courses?.map((e, idx) => (
                        <div className="card card--course" key={idx}>
                            <div className="card_top">
                                <div className="card_cover">
                                    <img className="card_cover-img" src={e.coverURL} alt={e.title} />
                                    {e.isBestseller && <span className="card_cover-flag">Bestseller</span>}
                                </div>
                                <div className="card_details">
                                    <h3 className="card_title">
                                        <span className="card_title-text">{e.title}</span>
                                        {e.flag && <span className="card_title-flag">{e.flag}</span>}
                                    </h3>
                                    {e.rating && <Rating score={e.rating?.score} reviews={e.rating?.reviews}/>}
                                    <p className="card_desc">{e.desc}</p>
                                </div>
                            </div>
                            <div className="card_bottom">
                                <div className="card_metatags">
                                    {
                                        e.tutor &&
                                        <div className="card_tutor">
                                            <img className="card_tutor-photo" src={e.tutor.photoURL} alt={e.tutor.firstname + " " + e.tutor.lastname} />
                                            <span className="card_tutor-text">{e.tutor.firstname + " " + e.tutor.lastname}</span>
                                        </div>
                                    }
                                    {
                                        e.metatags?.map((metatag, idx) => 
                                            <div className="card_metatag" key={idx}>
                                                { metatag && <Icon classes={['metatag']} icon={metatag.icon} /> }
                                                <span className="card_metatag-text">{metatag.value}</span>
                                            </div>
                                        )
                                    }
                                </div>
                                <button className="button button--reset card_button">
                                    <Icon classes={['metatag']} icon={e.entrance === "Open" ? "faArrowRightLong" : e.entrance === "locked" ? "faLock" : "faCartShopping" } />
                                </button>
                            </div>
                        </div>
                        // <Card key={idx}>
                        //     <Card.Header><h3>{elem.title}</h3></Card.Header>
                        //     <Card.Body><p>{elem.description}</p></Card.Body>
                        // </Card>
                    ))
                }
            </div>
            {/* <button onClick={addData}>Modify db</button> */}
        </>
    )
}

export default Catalog
