import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';


const Todo = props => (
    <tr>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
        <td>
        <Link to={"/edit/"+props.todo._id} className="btn btn-info">
            Edit
        </Link>
        </td>
        <td>
        <Button variant="danger" onClick={ () =>
            axios.delete('http://localhost:4000/todos/delete/' + props.todo._id)
                .then(() => props.deleteItem(props.todo._id))                    
                .catch(err => console.log(err))
            }
        >Delete</Button>
        </td>
    </tr>
    )

export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = 
        {
            todos: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/')
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    componentWillUnmount(){
        this._isMounted = false;
      }

    componentDidUpdate() {
        axios.get('http://localhost:4000/todos/')
        .then(response => {
            this.setState({ todos: response.data });
        })
        .catch(function (error){
            console.log(error);
        })
    }

    deleteItemHandler = (id) => {
        const updatedTodos = this.state.todos.filter(todo => todo.id !== id);
        this.setState({todos: updatedTodos})
       }

    todoList() {
        return this.state.todos.map((currentTodo, i) => {
            return <Todo todo={currentTodo} deleteItem={this.deleteItemHandler} key={i} />;
        })
    }
       
    render() {
        return (
            <div>
                <h3>Todos List</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Utilisateur</th>
                            <th>Priorité</th>
                            <th>Action 1</th>
                            <th>Action 2</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </Table>
            </div>
        )
    }
}