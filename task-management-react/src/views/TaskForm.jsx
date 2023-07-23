import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios-client";
import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";

export default function TaskForm() 
{
  const {id} = useParams()

  const [task, setTask] = useState({
    id: null,
    user_id: null,
    title: '',
    description: '',
    status: 'TODO'
  });

  const {userId} = useStateContext();

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      setTask((prevTask) => ({ ...prevTask, user_id: userId }));
    }

    if (id) {
      setLoading(true);
      axiosClient.get(`/tasks/${id}`)
      .then((response) => {
        setTask(response.data.data);
        console.log(response);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setErrors(error);
      })
    }

  }, [userId, id]);



  const onSubmit = (e) => {
    e.preventDefault();

    if (task.id) {
      axiosClient.put(`/task/${task.id}`, task)
      .then(response => {
        console.log(response);
        window.alert('Task successfully updated');
        navigate('/tasks');
      })
      .catch((error) => {
        console.log(error);
        const response = error.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      })
    } else {
      console.log(userId);
      setTask(prevTask => ({ ...prevTask, user_id: userId }));
      axiosClient.post(`/task/`, task)
      .then(response => {
        console.log(response);
        window.alert('Task created updated');
        navigate('/tasks');
      })
      .catch((error) => {
        console.log(error);
        const response = error.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      })
    }
    
  }

    return (
      <>
        <div className="container-fluid">
          <div className="container mt-5 pt-5">
            <div className="row">
              <div className="col-12 col-md-8 col-sm-8 m-auto">
                {!loading &&
                  <div className="card align-self-center mx-auto shadow-lg p-3 mb-5 bg-body-tertiary rounded" style={{width: "30rem"}}>
                    <div className="align-self-center mx-auto text-center pb-3">
                      {!task.id && <h1 className="title">Create Task</h1>}
                      {task.id && <h1 className="title">Update Task</h1>}
                    </div>
                      <div className="card-body">
                          <form onSubmit={onSubmit}>
                              <div className="mb-2">
                                  <label className="form-label">Title</label>
                                  <input className="form-control"  value={task.title} onChange={ev => setTask({...task, title: ev.target.value})}/>
                              </div>
                              
                              <div className="mb-2">
                                  <label className="form-label">Description</label>
                                  <textarea className="form-control" value={task.description} onChange={ev => setTask({...task, description: ev.target.value})}></textarea>
                              </div>

                              <div className="mb-2">
                                  <label className="form-label">Status</label>
                                  <select className="form-select" value={task.status} onChange={ev => setTask({...task, status: ev.target.value})}>
                                    <option value="TODO">TODO</option>
                                    <option value="INPROGRESS">IN PROGRESS</option>
                                    <option value="COMPLETED">COMPLETED</option>
                                  </select>
                              </div>
                              
                              <div className="d-grid gap-2 mt-4">
                                  <button className="btn btn-primary btn">
                                    {!task.id && 'Create'}
                                    {task.id && 'Update'}
                                  </button>
                              </div>
                              {errors && 
                                  Object.keys(errors).map(key => (
                                      <div className="bg-danger p-2 text-white my-1" key={key}>{errors[key][0]}</div>
                                      ))
                                  
                              }
                          </form> 
                      </div>
                  </div> 
                }
              </div>
            </div>
          </div>
        </div>     
      </>
    )
}