import React from 'react';
import {Message, botReceiveMessage} from './index';
import {db} from '../fire'

//export default () => <Chat room={db.collection('test-chat')}/>
//props: room

export default class Chat extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            messages: [],
            showChat: false,
            newMessage: '',
           // room: props.room
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        // this.addPin = this.addPin.bind(this);
    }

    componentDidMount() {
        this.unsubscribe = this.props.room.orderBy('time').onSnapshot((snapshot) => {
            this.setState({messages: snapshot.docs});
        });
        this.el && this.scrollToBottom();
    }

    componentWillReceiveProps(nextProps) {
        this.unsubscribe && this.unsubscribe();
        if(this.props !== nextProps) this.props = nextProps;
        this.unsubscribe = nextProps.room.orderBy('time')
            .onSnapshot((snapshot) => {
                this.setState({ messages: snapshot.docs });
            })

        this.el && this.scrollToBottom();
    }

    componentWillUnmount(){
        this.unsubscribe && this.unsubscribe();
    }

    componentDidUpdate() {
        this.el && this.scrollToBottom();
    }

    scrollToBottom() {
        this.el.scrollIntoView({ behaviour: 'smooth' });
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
        this.setState({ newMessage: '' });
        this.props.room.add({
             time: new Date(),
             text: this.state.newMessage,
             from: this.props.user.displayName
         });
    }

    // addPin(messageObj) {
    //     this.props.events.add(messageObj)
    // }

    render() { //pins work but formatting off
        return (
            this.state.showChat
                ? (
                    <div className="chatForm">
                        <div className="chatTitle">😀 {this.props.numOfUsers}</div>
                        <div className="chatMessage" >
                            {this.state.messages.map((message, index) => {
                                return <Message key={index} {...message.data()} eventref={this.props.events} />;
                            })}
                            <form onSubmit={this.handleSubmit}>
                            <div ref={el => { this.el = el; }}>
                                <input type="text" value={this.state.newMessage} onChange={this.handleChange} />
                                <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                                <i className="material-icons right">send</i>
                                </button>

                                <a className="toggleChat" onClick={this.handleClick}><i className="material-icons right">chat</i></a>
                            </div>
                            </form>
                        </div>
                    </div>
                    )
                : (
                    <a className="toggleChat" onClick={this.handleClick}><i className="material-icons right">chat_bubble_outline</i></a>
                    )
        );
    }
}



