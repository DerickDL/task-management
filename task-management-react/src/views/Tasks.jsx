import { useEffect, useState } from "react"
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

export default function Tasks() 
{
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState();

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = () => {
    setLoading(true);
    axiosClient.get('/tasks')
    .then((response) => {
      setTasks(response.data.data);
      setLoading(false);
    })
    .catch((error) => {
      // console.log(error)
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

    return (
          <div>
            <Link to='/task/new' className="btn-add">Add New</Link>
            <div className="card animated fadeInDown">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Date Created</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map(task => (
                    <tr key={task.id}>
                      <td key={task.id}>{task.id}</td>
                      <td key={task.title}>{task.title}</td>
                      <td key={task.description}>{task.description}</td>
                      <td key={task.status}>{task.status}</td>
                      <td key={task.created_at}>{task.created_at}</td>
                      <td>
                        <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" to={'/task/'+task.id}>Edit</Link>
                        &nbsp;
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" onClick={ev => onDelete(task)}>Delete</button>
                      </td>
                    </tr>
                  ))
                  }
                </tbody>
              </table>
            </div>
          </div>
      )
}