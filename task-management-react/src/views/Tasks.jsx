import { useEffect, useState } from "react"
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

export default function Tasks() 
{
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState();
  const [searchTitleParams, setSearchTitleParams] = useState('');
  const [sortOrderParams, setSortOrderParams] = useState('asc');
  const [sortByParams, setSortByParams] = useState('created_at');

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = (params) => { 
    axiosClient.get(`/tasks?${params}`)
    .then((response) => {
      setTasks(response.data.data);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error)
      setLoading(true);
    })
  }

  const onDelete = (ev) => {
    if (!window.confirm(`Are you sure you want to delete task ${ev.title}?`)) {
      return;
    }

    axiosClient.delete('/task/' + ev.id)
      .then(() => {
        window.alert(`Task ${ev.title} deleted successfully`);
          getTasks();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleSearch = (ev) => {
      setSearchTitleParams(ev.target.value)
  }

  const onSearch = (ev) => {
    getTasks(`title=${searchTitleParams}`)
  }

  const changeOrder = (ev) => {
    console.log('change sort');
    setSortOrderParams(sortOrderParams === 'asc' ? 'desc' : 'asc')
    getTasks(`sortBy=${sortByParams}&&sortOrder=${sortOrderParams}`)

  }

    return (
      <div>
        <div className="container mt-5">
          <div className="row">
            <div className="col align-self-start">
            <Link to='/task/new'><button className="btn btn-primary">Add Task</button></Link>
            </div>
            <div className="col align-self-end text-end">
            <div className="input-group mb-3">
              <input type="text"  className="form-control" placeholder="Task Title" onChange={handleSearch}/>
              <button className="btn btn-outline-secondary" onClick={onSearch}>Search</button>
            </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <table className="table">
                <thead className="text-center">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Title</th>
                    <th scope="col" >Description</th>
                    <th scope="col">Status</th>
                    <th scope="col" onClick={() => changeOrder()} style={{cursor: 'pointer'}}>Date Created</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    tasks.map(task => (
                        <tr key={task.id}>
                          <td>{task.id}</td>
                          <td>{task.title}</td>
                          <td>{task.description}</td>
                          <td>{task.status}</td>
                          <td>{task.created_at}</td>
                          <td>
                            <div className="d-flex justify-content-between">
                              <div>
                                <Link to={'/task/'+task.id}><button className="btn btn-info">Edit</button></Link>
                              </div>
                              <div className="ms-2">
                                <button className="btn btn-danger" onClick={ev => onDelete(task)}>Delete</button>
                              </div>
                            
                            
                            </div>
                          </td>
                        </tr>
                      ))
                    }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
}