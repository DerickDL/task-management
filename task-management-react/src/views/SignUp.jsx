import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function SignUp() 
{
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const {setUserName, setUserId, setToken} = useStateContext();
    const [errors, setErrors] = useState();

    const onSubmit = (event) => {
        event.preventDefault();
        setErrors(null);
        const payload = {
          name: nameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          confirmPassword: confirmPasswordRef.current.value
        }

        axiosClient.post('auth/signup', payload)
          .then((response) => {
            const data = response.data;
            setToken(data.token)
            setUserName(data.user.name)
            setUserId(data.user.id)
          })
          .catch((err) => {
            console.log(err.response);
            const response = err.response;
            if (response && response.status === 422) {
              setErrors(response.data.errors);
            }
          })
        
    }

    return (
        <div className="login-signup-form animated fadeInDown"> 
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Create your account</h1>
                    <input ref={nameRef} type="text" placeholder="Full Name" />
                    <input ref={emailRef} type="email" placeholder="Email Address" />
                    <input ref={passwordRef} type="password" placeholder="Password" />
                    <input ref={confirmPasswordRef} type="password" placeholder="Confirm Password" />
                    <button className="btn btn-block">Register</button>
                    <p className="message">
                        Already had an account? <Link to='/login'>Sign in.</Link>
                    </p>

                    {errors && <div className="alert">
                      {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                      ))
                      }
                    </div>
                    }
                </form>
            </div>
        </div>
      )
}