import React, { Component } from 'react'

export default class Event extends Component {
    constructor(props){
        super(props);
        this.state = {};
        // this.state = {
        //     viewComments: false,
        //     comments: props.comments,
        //     newComment: '',
        // }
        this.handleLike = this.handleLike.bind(this);
        // this.handleComment = this.handleComment.bind(this);
    }

    componentDidMount(){
        // console.log('props when event mounts are...', this.props.room, this.props.eventId)
        const evtComp = this;
        evtComp.setState({eventRef: this.props.room.doc(this.props.eventId)})
        this.props.room.doc(this.props.eventId)
            .onSnapshot(function (doc) {
                // console.log("Current data: ", doc && doc.data(), evtComp);
                evtComp.setState({event: doc.data()})
            });
    }

    handleLike (evt){
        evt.preventDefault();
        const {likes={}} = this.state.event
        const {eventRef} = this.state
        console.log('this state is: ',this.state)
        console.log('likes are...', likes, ' and eventRef is... ', eventRef)
        console.log('previous likes are...', likes[this.props.userId])
        eventRef.update({
            [`likes.${this.props.userId}`]: !likes[this.props.userId]
        })
    }

    // handleComment(evt){
    //     evt.preventDefault();
    //     const eventRef = this.props.room.doc(this.props.eventId)
    //     const comment = {[this.props.displayName]: this.state.newComment}
    //     eventRef.set({comments: this.state.comments.concat(comment)}, {merge: true})
    //     this.setState({viewComments: false})
    // }

    render() {
        const isItin = this.props.itineraryStatus;
        const {event, eventRef} = this.state;
        console.log('this.props.userId', this.props.userId, event ? event.likes : 'no event')
        return (
            event ? (isItin
            ?
                <li className="itin-event">{`${event.name} @ ${event.time.toLocaleTimeString()}`}</li>
            :
            <div className="pin-event">
                <span className={`badge ${event.likes[this.props.userId] ? 'red' : ''}`} onClick={this.handleLike}>{count(event.likes)} &hearts;</span>
                <p><b>{event.name }</b></p>
                <p>{event.description}</p>
            </div> )
            : <div />
        )
    }
}


function count(likes) {
    if (!likes) return 0
    return Object.keys(likes).reduce((num, uid) => num + likes[uid] ? 1 : 0, 0)
}

// <p>date {props.data.time.toDateString && props.data.time.toDateString()}</p>
