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
          <div className="card align-self-center mx-auto shadow-lg p-3 mb-5 bg-body-tertiary rounded" style={{width: "30rem"}}>
            <div className="align-self-center mx-auto text-center pb-3">
                <h3>Sign Up</h3>
            </div>
              <div className="card-body">
                  <form onSubmit={onSubmit}>
                      <div className="mb-2">
                          <label className="form-label">Name</label>
                          <input ref={nameRef} className="form-control"  />
                      </div>
                      
                      <div className="mb-2">
                          <label className="form-label">Email address</label>
                          <input ref={emailRef} type="email" className="form-control"  />
                      </div>

                      <div className="mb-2">
                          <label className="form-label">Password</label>
                          <input ref={passwordRef} type="password" className="form-control"  />
                      </div>

                      <div className="mb-2">
                          <label className="form-label">Confirm Password</label>
                          <input ref={confirmPasswordRef} type="password" className="form-control"  />
                      </div>
                      
                      <div className="d-grid gap-2 mt-4">
                          <button className="btn btn-primary btn">Register</button>
                      </div>
                      <p className="message text-center">
                        Already had an account? <Link to='/login' className="link-primary">Sign in.</Link>
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