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
        this.handleSubmit(evt);
        botReceiveMessage(this.state.newMessage, this.props.room.id);
    }

    handleChange(evt) {
        this.setState({newMessage: evt.target.value});
    }

    handleSubmit(evt) {
        evt.preventDefault();
        //db.collection('test-chat')
         db.collection(this.props.room.id).add({
             time: new Date(),
             text: this.state.newMessage,
             from: this.props.user.displayName
         });
        this.setState({newMessage: ''});
    }

    render() {
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
                        <button className='toggleChat fa fa-commenting-o' onClick={this.handleClick} />
                    </form>
                    )
                : (
                    <button className="toggleChat fa fa-commenting-o" onClick={this.handleClick} />
                    )
        );
    }
}
