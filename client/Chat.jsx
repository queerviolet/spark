import React from 'react';
import Message from './Message';
import {db} from '../fire'

export default class Chat extends React.Component {
    constructor(){
        super();
        this.state = {
            messages: [],
            showChat: false,
            newMessage: ''
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.room.onSnapshot((snapshot) => {
            this.setState({messages: snapshot.docs});
        });
    }

    handleClick(evt) {
        evt.preventDefault();
        this.setState({showChat: !this.state.showChat});
    }

    handleChange(evt) {
        this.setState({newMessage: evt.target.value});
    }

    handleSubmit(evt) {
        evt.preventDefault();
         db.collection(this.props.room.id).add({
             time: new Date(), // how do we add a valid time?
             text: this.state.newMessage,
             from: 'Unidentified User' // how do we get a user?
         });
        this.setState({newMessage: ''});
    }

    render() { // HOW DO WE RENDER THESE BY TIMESTAMP OR GET THEM FROM THE FIRESTORE BY TIMESTAMP
        console.log(this.props.room.id);
        return (
            this.state.showChat
                ? (<form className="chatForm" onSubmit={this.handleSubmit}>
                        <div className="chatMessage">
                            <div>{this.state.messages.map((message, index) => {
                                return <Message key={index} data={message.data()} {...message.data()} />;
                            })}</div>
                        </div>
                        <input type="text" value={this.state.newMessage} onChange={this.handleChange} />
                        <input type="submit" />
                        <button className='toggleChat fa fa-commenting-o' onClick={this.handleClick} >Chat</button>
                    </form>)
                : (
                    <button className="toggleChat fa fa-commenting-o" onClick={this.handleClick} />
            )
        );
    }
}


