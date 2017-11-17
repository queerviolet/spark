import React from 'react';
import {Message, botReceiveMessage} from './index';
import {db} from '../fire'

//export default () => <Chat room={db.collection('test-chat')}/>
//props: room

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
        this.handleBot = this.handleBot.bind(this);
    }

    componentDidMount() {
        this.props.room.orderBy('time').onSnapshot((snapshot) => {
            this.setState({messages: snapshot.docs});
        });
    }

    handleClick(evt) {
        evt.preventDefault();
        this.setState({showChat: !this.state.showChat});
    }

    handleBot(evt){
        evt.preventDefault();
        botReceiveMessage(this.state.newMessage);
        this.setState({newMessage: ''});
    }

    handleChange(evt) {
        this.setState({newMessage: evt.target.value});
    }

    handleSubmit(evt) {
        evt.preventDefault();
        //db.collection('test-chat')
         db.collection(this.props.room.id).add({
             time: new Date(), // how do we add a valid time?
             text: this.state.newMessage,
             from: 'Unidentified User' // how do we get a user?
         });
        this.setState({newMessage: ''});
    }

    render() { // HOW DO WE RENDER THESE BY TIMESTAMP OR GET THEM FROM THE FIRESTORE BY TIMESTAMP
        console.log("this.props.ROOM:", this.props.room);

        return (
            this.state.showChat
                ? (
                    <form className="chatForm" onSubmit={this.handleSubmit}>
                        <div className="chatMessage" scrolltop="scrollHeight">
                            <div>{this.state.messages.map((message, index) => {
                                return <Message key={index} data={message.data()} {...message.data()} />;
                            })}</div>
                        </div>
                        <input type="text" value={this.state.newMessage} onChange={this.handleChange} />
                        <input type="submit" />
                        <button className='bot' onClick={this.handleBot} >Bot</button>
                        <button className='toggleChat fa fa-commenting-o' onClick={this.handleClick} >Chat</button>
                    </form>
                    )
                : (
                    <button className="toggleChat fa fa-commenting-o" onClick={this.handleClick} />
                    )
        );
    }
}


