import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

export default function Login() 
{
    const emailRef = useRef();
    const passwordRef = useRef();

    const {setUserName, setUserId, setToken} = useStateContext();
    const [errors, setErrors] = useState();

    const onSubmit = (event) => {
        event.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
          }
        setErrors(null);
        axiosClient.post('auth/login', payload)
        .then((response) => {
            const data = response.data;
            setToken(data.token)
            console.log(data.user);
            setUserName(data.user.name)
            setUserId(data.user.id)
        })
        .catch((err) => {
            console.log(err.response);
            const response = err.response;
            if (response && response.status === 422) {
                if (response.data.errors) {
                    setErrors(response.data.errors);
                }
                if (response.data.error) {
                    setErrors({
                        invalid_credential: [response.data.error]
                    });
                }
                
            }
        })
        
    }

    return (
        <div className="login-signup-form animated fadeInDown"> 
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Login to your Account</h1>
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input ref={passwordRef} type="password" placeholder="Password" />
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not Registered? <Link to='/signup'>Create an account.</Link>
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