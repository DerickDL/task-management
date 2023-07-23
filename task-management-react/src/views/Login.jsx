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
        console.log('ASDSAD');
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
        <div className="card align-self-center mx-auto shadow-lg p-3 mb-5 bg-body-tertiary rounded" style={{width: "30rem"}}>
            <div className="align-self-center mx-auto text-center pb-3">
                <h3>Login</h3>
            </div>
            <div className="card-body">
                <form onSubmit={onSubmit}>
                    <div className="mb-2">
                        <label className="form-label">Email address</label>
                        <input ref={emailRef} type="email" className="form-control"  />
                    </div>

                    <div className="mb-2">
                        <label className="form-label">Password</label>
                        <input ref={passwordRef} type="password" className="form-control"  />
                    </div>
                    <div className="d-grid gap-2">
                        <button className="btn btn-primary btn">Login</button>
                    </div>
                    <p className="message text-center">
                        Not Registered? <Link className="link-primary" to='/signup'>Create an account.</Link>
                    </p>
                    {errors && 
                        Object.keys(errors).map(key => (
                            <div className="bg-danger p-2 text-white my-1" key={key}>{errors[key][0]}</div>
                            ))
                        
                    }
                </form> 
            </div>
        </div>    
      )
}