import React from 'react'

export default class Messages extends React.Component {

    state = {
        messages: []
    }
    
    componentDidMount() {
        this.props.room.onSnapshot((snapshot) => {
            this.setState({messages:snapshot.docs})
        })
    }

    render() {
        return(
            <div>{this.state.messages.map((message) => {
                return <Message data={message.data()} {...message.data()} />
            })}</div>
        )
    }
}

const Message = (props) =>

<pre>{JSON.stringify(props.data, 0, 2)}</pre> //renders all messages



