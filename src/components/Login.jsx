import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from "react-toastify"
import { LOGIN_USER } from '../actions/actionTypes';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';



const Login = () => {
    const DisplayingErrorMessagesSchema = Yup.object().shape({
        password: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        result: Yup.string().matches(/^[0-9]*$/, "Result can only be numbers.").required('Required'),
    });

    const initialFormData = { email: "", password: "", first: "", second: "", result: "" }
    const [postData, setpostData] = useState(initialFormData);

    const dispatch = useDispatch()
    const history = useHistory()

    const users = useSelector(state => state.userReducer)

    const user = users.find(user => user.isSignedIn == true);


    const handleSubmit = (e) => {
        let { first, second } = postData;
        if ((first + second) !== parseInt(e.result)) {
            return toast.error("Invalid captcha");
        }
        const user = users.find(user => user.email == e.email && user.password == e.password);
        if (!user) {
            return toast.error("Credentials Not found..!!");
        }
        dispatch({ type: LOGIN_USER, payload: user.id })
        history.push("/home");
        toast.success("Logged In Successfully..!!");
    }
    useEffect(() => {
        const first = Math.ceil(Math.random() * 10);
        const second = Math.ceil(Math.random() * 10);
        setpostData({ ...postData, first, second })
        if (user) {
            history.push("/home");
        }
    }, [dispatch, history, user, toast])
    return (
        <div className="logSignBox">

            <div className='container'>
                <h2 className="text-center" >Login</h2>

                <div className="row">
                    <div className="col-sm-8 offset-2">
                        <Formik
                            initialValues={initialFormData}
                            validationSchema={DisplayingErrorMessagesSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    <div className="mb-3 row">
                                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                                        <div className="col-sm-10">
                                            <Field name="email" type="email" className="form-control" placeholder="Enter Email" />
                                            {touched.email && errors.email && <div className='error'>{errors.email}</div>}
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                                        <div className="col-sm-10">
                                            <Field name="password" type="password" className="form-control" placeholder="Enter Password" />
                                            {touched.password && errors.password && <div className='error'>{errors.password}</div>}
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Captcha</label>
                                        <div className="col-sm-10">
                                            What is {postData.first} + {postData.second} = ?
                                            <Field type="number" placeholder="Enter captcha result" name="result" className="form-control" />
                                            {touched.result && errors.result && <div className='error'>{errors.result}</div>}
                                        </div>
                                    </div>
                                    <button className='btn btn-success' type="submit">Login</button>
                                </Form>
                            )}
                        </Formik>
                        <hr />
                        No Account?
                        <br />
                        <button className="btn btn-info" onClick={() => history.push("/")} >Sign up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
