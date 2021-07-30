import React from "react"

class Todos extends React.Component {

    render() {
        this.classNames = [
            'listItem',
            this.props.item.status
        ]
        this.classNames = this.classNames.join(' ');
        return (
                <div
                    className = {this.classNames}
                    id={this.props.item.id}
                    draggable={true}
                    onDragStart={(e) => this.props.drag(e)}
                    onDragEnter={(e) =>this.props.dragEnter(e)}
                >
                    <p>ID: {this.props.item.id}</p>
                    <h2>{this.props.item.title}</h2>
                    <p>{this.props.item.text}</p>
                </div>
        );
    }
}

export  default  Todos;
