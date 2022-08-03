import { FC, useState, useRef } from 'react';
import useAuth from '../hooks/useAuth';
import Form from '../blocks/Form';
import Label from '../components/Label';
import Input from '../components/Input';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';
import Icon from '../components/Icon';
import { Location } from "history";
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Signin:FC = (o: any) => {
    const emailRef = useRef<null | HTMLInputElement>(null)
    const passwordRef = useRef<null | HTMLInputElement>(null)

    const { signin, getDB, setDB, setCurrentUser } = useAuth()

    const [message, setMessage] = useState('')
    const [type, setType] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const location:any = useLocation()

    console.log(location)

    const from = location.state?.from?.pathname || '/'

    const props = {
        email: {
            classes: ['email'],
            id: 'email',
            label: <Label htmlFor="email">Email</Label>,
            placeholder: 'Enter your email',
            outerRef: emailRef,
            required: true
        },
        password: {
            classes: ['password'],
            id: 'password',
            label: <Label htmlFor="password">Password</Label>,
            placeholder: 'Enter your password',
            outerRef: passwordRef,
            required: true
        },
        checkbox: {
            classes: ['checkbox'],
            id: 'show-password',
            label: 'Show Password',
            checkmark: <Icon classes={['faCheck']} icon='faCheck'/>
        },
        button: {
            classes: ['submit', 'text', 'reset'],
            type: 'submit',
            size: 'medium',
            text: 'Submit',
            theme: 'primary',
            disabled: loading
        }
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        try {
            setLoading(true)

            const res = await signin(emailRef?.current?.value, passwordRef?.current?.value)
            const user = res.user
            const db = await getDB(false, 'users', user.uid)

            if (db.exists()) {
                setCurrentUser({
                    ...user,
                    roles: db.data().roles
                })
                switch (db.data().roles[0]) {
                    case 100: navigate('/', { replace: true })
                        break;
                    case 200: navigate('/', { replace: true })
                        break;
                    case 900: navigate('/', { replace: true })
                        break;
                    default: navigate(from, { replace: true })
                        break;
                }
            }

            await setDB('roles', db.data().roles[0].toString(), {
                active: true
            })
       
        } catch (error) {
            setMessage('Failed to sign in')
            console.log(error)
        }
    }

    const handleCheckbox = (e: { target: { checked: any; }; }) => {
        console.log(e)
        e.target.checked ? setType('text') : setType('password')
    }

    return (
        <>
        <div className="module module--left"></div>
        <div className="module module--right">
            <Form classes={['signin']} onSubmit={handleSubmit}>
                <Input {...props.email} type="email"/>
                <Input {...props.password} type={type === '' ? 'password' : type}/>
                <Checkbox {...props.checkbox} type="checkbox" onClick={handleCheckbox}/>
                <Button {...props.button}>Sign In</Button>
            </Form>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
        </div>
        </>
    )
}

export default Signin