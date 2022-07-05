import { useState, useEffect, FC } from 'react';
// import { useBreakpoint } from '../hooks/useBreakpoint';
import Accordion from '../blocks/Accordion';
import Card from '../blocks/Card';
import useAuth from '../hooks/useAuth';

const Catalog = () => {
    const { getDB } = useAuth();
    const [ courses, setCourses ] = useState();

    const getCourses = async () => {
        try {       
            const items = await getDB(true, 'courses')
            const data = []
            items.forEach((item) => {
                data.push(item.data())
            })
            setCourses(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getCourses()
    }, [])

    console.log(courses)

    return (
        <>        
            <h2>Catalog</h2>
            <div className="cards">
                {
                    courses?.map((elem, idx) => (
                        <Card key={idx}>
                            <Card.Header><h3>{elem.title}</h3></Card.Header>
                            <Card.Body><p>{elem.description}</p></Card.Body>
                        </Card>
                    ))
                }
            </div>
        </>
    )
}

export default Catalog
