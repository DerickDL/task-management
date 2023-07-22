import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios-client";
import { useEffect, useState } from "react";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
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

  if (id) {
    useEffect(() => {
      axiosClient.get(`/tasks/${id}`)
      .then((response) => {
        setTask(response.data.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        setErrors(error);
      })
    }, []);
  }



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
      })
    } else {
      console.log(userId);
      setTask({user_id: userId})
      axiosClient.post(`/task/`, task)
      .then(response => {
        console.log(response);
        window.alert('Task created updated');
        navigate('/tasks');
      })
      .catch((error) => {
        console.log(error);
      })
    }
    
  }

    // return (
    //   <>
    //     <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    //       <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    //         <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
    //           {id && 'Update Task'}
    //           {!id && 'Create Task'}
    //         </h2>
    //       </div>

    //       <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    //         <form>
    //           <div className="space-y-12">
    //             <div className="border-b border-gray-900/10 pb-12">
    //               <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
    //                 <div className="sm:col-span-4">
    //                   <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
    //                     Title
    //                   </label>
    //                   <div className="mt-2">
    //                     <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
    //                       <input
    //                         value={task.title}
    //                         onChange={ev => setTask({title: ev.target.value})}
    //                         type="text"
    //                         name="title"
    //                         id="title"
    //                         className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
    //                       />
    //                     </div>
    //                   </div>
    //                 </div>

    //                 <div className="col-span-full">
    //                     <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
    //                       Description
    //                     </label>
    //                     <div className="mt-2">
    //                       <textarea
    //                         id="description"
    //                         name="description"
    //                         rows={3}
    //                         className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //                         value={task.description}
    //                         onChange={ev => setTask({description: ev.target.description})}
    //                       />
    //                     </div>
    //                   <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about the task.</p>
    //                 </div>

    //                 <div className="sm:col-span-3">
    //                   <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
    //                     Status
    //                   </label>
    //                   <div className="mt-2">
    //                     <select
    //                       value={task.status}
    //                       onChange={ev => setTask({status: ev.target.status})}
    //                       id="status"
    //                       name="status"
    //                       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
    //                     >
    //                       <option value='TODO'>Todo</option>
    //                       <option value='INPROGRESS'>In Progress</option>
    //                       <option value='COMPLETED'>Completed</option>
    //                     </select>
    //                   </div>
    //                 </div>

    //               </div>
    //             </div>
    //           </div>

    //           <div className="mt-6 flex items-center justify-end gap-x-6">
    //             <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
    //             Cancel
    //             </button>
    //             <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //   </>
    //   )

    return (
      <>
        <div className="card animated fadeDownIn">
          {loading && (
            <div className="text-center">Loading...</div>
          )}
          <div className="login-signup-form animated fadeInDown"> 
            <div className="form">
                <form onSubmit={onSubmit}>
                  {!task.id && <h1 className="title">Create Task</h1>}
                  {task.id && <h1 className="title">Update Task</h1>}
                    <input value={task.title} onChange={ev => setTask({...task, title: ev.target.value})} type="text" placeholder="Title" />
                    <textarea value={task.description} onChange={ev => setTask({...task, description: ev.target.value})} placeholder="Description" />
                    <select value={task.status} onChange={ev => setTask({...task, status: ev.target.value})}>
                      Status
                      <option value="TODO">TODO</option>
                      <option value="INPROGRESS">IN PROGRESS</option>
                      <option value="COMPLETED">COMPLETED</option>
                    </select>
                    <button className="btn btn-block">Save</button>

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
        </div>
      </>
    )
}