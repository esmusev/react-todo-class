import React from "react"
import TodoItem from "./TodoItem";

const Data = [
    {id: 1, title:'title number 1', status: 'todo', text:'lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
    {id: 2, title:'title number 2', status: 'in-progress', text:'lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
    {id: 3, title:'title number 3', status: 'done', text:'lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
    {id: 4, title:'title number 4', status: 'todo', text:'lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
    {id: 5, title:'title number 5', status: 'done', text:'lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
    ];

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: {title: '', description: ''},
            data : Data};
        this.item = null;
        this.startX = null;
        this.lastX = null;
        this.itemId = null;
        this.targetId = null;
    }

    drag = e => {
        e.preventDefault();
        e.stopPropagation();
        this.startX = e.clientX;
        this.itemId = e.target.id;
        let item = e.target;
        e.dataTransfer.setData('Text', item.id);
    }

    dragEnter = e => {
        e.preventDefault();
        if (e.target.id === ""){
            this.targetId = e.target.parentNode.id;
        } else {
            this.targetId = e.target.id;
        }
    };

     drop = e => {
         e.stopPropagation();
         e.preventDefault();
         this.lastX = e.clientX;
         this.sortTodos(this.itemId, this.targetId)
    };

    allowDrag = e => {
        e.stopPropagation();
        e.preventDefault();
    };

    handleChange = event => {
        event.preventDefault();
        let newValue = this.state.value;
        newValue[event.target.name] = event.target.value
        this.setState(prev => ({...prev, value: newValue }))};

    handleSubmit = event => {
        event.preventDefault();
        this.addTodo(this.state.value);
    }

    addTodo = value => {
        this.setState((prev) => ({...prev, data: [
            ...prev.data, { id: this.state.data.length+1, title:value.title, status: 'todo', text:value.description}]}))
    }

    sortTodos = (itemId, targetId) => {
        const itemIndex = this.state.data.findIndex(item => item.id === +itemId);
        if ( this.lastX <= window.innerWidth*0.3 ){
            const newData = this.state.data;
            newData[itemIndex].status = 'todo';
            this.setState((prev) => ({...prev, data: newData}))
        } else if ( this.lastX >= window.innerWidth*0.7 ){
            const newData = this.state.data;
            newData[itemIndex].status = 'done';
            this.setState((prev) => ({...prev, data: newData}))
        } else {
            const newData = this.state.data;
            newData[itemIndex].status = 'in-progress';
            this.setState((prev) => ({...prev, data: newData}))
        }
        if (itemId !== targetId) {
            const newArr = this.state.data;
            const removed = newArr.splice(itemIndex, 1)
            const targetIndex = this.state.data.findIndex(item => item.id === +targetId);
            newArr.splice(targetIndex, 0, ...removed)
            this.setState((prev) => ({...prev, data: newArr}))
        }
    }

    render() {
        const todos = {
          todo: this.state.data.filter(x => x.status === "todo"),
          inProgress: this.state.data.filter(x => x.status === "in-progress"),
          done: this.state.data.filter(x => x.status === "done"),
        }
        return (
            <div className="container " onDrop={this.drop} onDragOver={this.allowDrag}>
                <div className="new-todo">
                    <input className="new-todo-title" type="text" placeholder="Todo title" name="title" onChange={this.handleChange} />
                    <input className="new-todo-description" type="text" placeholder="Text here" name="description" onChange={this.handleChange} />
                    <button className="submit-button" onClick={this.handleSubmit}> Add new todo</button>
                </div>
                <div className="itemsList">
                    <div className="todo-column column" onDrop={this.drop} onDragOver={this.allowDrag}>
                        {todos.todo.map(item => <TodoItem key={item.id} item={item} drag={this.drag} dragEnter={this.dragEnter}/>)}
                    </div>
                    <div className="in-progress-column column" onDrop={this.drop} onDragOver={this.allowDrag}>
                        {todos.inProgress.map(item => <TodoItem key={item.id} item={item} drag={this.drag} dragEnter={this.dragEnter}/>)}
                    </div>
                    <div className="done-column column" onDrop={this.drop} onDragOver={this.allowDrag}>
                        {todos.done.map(item => <TodoItem key={item.id} item={item} drag={this.drag} dragEnter={this.dragEnter}/>)}
                    </div>
                </div>


            </div>
        );
    }
}

export  default  TodoList;
