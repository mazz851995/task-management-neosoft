import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from "react-toastify"
import { SIGNUP_USER } from '../actions/actionTypes';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ResponsiveAppBar from './ResponsiveAppBar';
const Signup = () => {
    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
    const DisplayingErrorMessagesSchema = Yup.object().shape({
        fullname: Yup.string().matches(/^[a-zA-Z ]*$/, "Name can only have alphabet and spaces.").required('Required'),
        username: Yup.string().matches(/^[a-zA-Z0-9]*$/, "Username can only have alphabet and number.").required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        mobileNumber: Yup.string().matches(/^[0-9]*$/, "Number can only be numbers.").min(10, 'Phone number cannot be less than 10 digits')
            .max(10, 'Phone number cannot be less than 10 digits!').required('Required'),
        password: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
        proPic: Yup.mixed().required("Profile pic is required")
            .test("fileFormat", "Invalid file format", (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))),
    });
    const history = useHistory()
    const dispatch = useDispatch()
    const initialFormData = { id: Date.now().toString(), fullname: "", username: "", email: "", password: "", mobileNumber: "", proPic: "", isSignedIn: true }
    const [postData, setpostData] = useState(initialFormData);

    const users = useSelector(state => state.userReducer)

    const user = users.find(user => user.isSignedIn == true);

    const handleSubmit = (e) => {
        let { email } = e;
        const emailExist = users.find(user => user.email == email);
        if (emailExist != undefined) {
            return toast.error("Email already exist..!!");
        }
        e.proPic = postData.proPic;
        dispatch({ type: SIGNUP_USER, payload: e })
        history.push("/home");
        toast.success("Signed In Successfully..!!");
    }
    const resetForm = () => {
        // console.log("reset");
        // console.log(initialFormData);
        // setpostData(initialFormData)
    }
    useEffect(() => {
        if (user) {
            history.push("/home");
        }
    }, [dispatch, history, user])


    const encodeImageFileAsURL = (event, props) => {
        var file = event.currentTarget.files[0];
        if (file) {
            props.setFieldValue(event.target.name, file);
            var reader = new FileReader();
            reader.onloadend = function () {
                setpostData({ ...postData, proPic: reader.result })
            }
            reader.readAsDataURL(file);
        } else {
            props.setFieldValue(event.target.name, "");
            setpostData({ ...postData, proPic: "" })
        }
    }

    return (
        <>
            <ResponsiveAppBar></ResponsiveAppBar>
            <div className="logSignBox">
                <div className="container">
                    <h1 className="text-center" >SignUp</h1>
                    <Formik
                        initialValues={initialFormData}
                        validationSchema={DisplayingErrorMessagesSchema}
                        onSubmit={handleSubmit}>
                        {(props) => (
                            <Form className='row g-3'>
                                <div className="col-md-6">
                                    <label className="form-label">Name</label>
                                    <Field name="fullname" type="text" className="form-control" placeholder="Enter full name" />
                                    <ErrorMessage component="div" className="error" name="fullname" />

                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Username</label>
                                    <Field name="username" type="text" className="form-control" placeholder="Enter Username" />
                                    <ErrorMessage component="div" className="error" name="username" />
                                    {/* {touched.username && errors.username && <div className='error'>{errors.username}</div>} */}
                                </div>

                                <div className="col-6">
                                    <label className="form-label">Email</label>
                                    <Field name="email" type="text" className="form-control" placeholder="Enter email" />
                                    <ErrorMessage component="div" className="error" name="email" />
                                    {/* {touched.email && errors.email && <div className='error'>{errors.email}</div>} */}
                                </div>

                                <div className="col-6">
                                    <label className="form-label">Mobile Number</label>
                                    <Field name="mobileNumber" type="text" className="form-control" placeholder="Enter mobile number" />
                                    <ErrorMessage component="div" className="error" name="mobileNumber" />
                                    {/* {touched.mobileNumber && errors.mobileNumber && <div className='error'>{errors.mobileNumber}</div>} */}
                                </div>

                                <div className="col-6">
                                    <label className="form-label">Password</label>
                                    <Field name="password" type="password" className="form-control" placeholder="Enter mobile number" />
                                    <ErrorMessage component="div" className="error" name="password" />
                                    {/* {touched.password && errors.password && <div className='error'>{errors.password}</div>} */}
                                </div>
                                <div className="col-6">
                                    <label className="form-label">Profile Image</label>
                                    <br />
                                    {/* <FileBase ref={ref} type="file" multiple={false} onDone={(data) => setpostData({ ...postData, proPic: data.base64 })} /> */}
                                    <input accept="image/*" name="proPic" className='form-control' type="file"
                                        // onChange={(event) => {
                                        //     props.setFieldValue("proPic", event.currentTarget.files[0]);
                                        // }}
                                        onChange={(e) => encodeImageFileAsURL(e, props)}
                                    />
                                    <ErrorMessage component="div" className="error" name="proPic" />
                                    {
                                        postData.proPic && !props.errors.proPic && <img className='preview' src={postData.proPic} alt="" />
                                    }
                                </div>
                                <div className="col-12">
                                    <button disabled={!(props.isValid && props.dirty)} type="submit" className="btn btn-primary">  Signup</button>
                                    {/* <button type="button" onClick={resetForm} className="btn btn-info float-end"> Reset</button> */}

                                    <br />
                                    <hr />
                                    Already have an account? <br />
                                    <button className="btn btn-info" onClick={() => history.push("/login")} >login </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default Signup
