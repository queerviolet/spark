import React, { Component } from 'react'

export default class Event extends Component {
    constructor(props){
        super(props);
        // this.state = {};
        this.state = {
            // viewComments: false,
            // comments: props.comments,
            // newComment: '',
        }
        this.handleLike = this.handleLike.bind(this);
        // this.handleComment = this.handleComment.bind(this);
    }

    handleLike (evt){
        evt.preventDefault();
        const eventRef = this.props.room.doc(this.props.eventId)
        const {likes={}} = this.props
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
        // const {event, eventRef} = this.state;
        return (
            isItin
            ?
                <li className="itin-event">{`${this.props.name} @ ${this.props.time.toLocaleTimeString()}`}</li>
            :
            <div className="pin-event">
                <span className=" badge" onClick={this.handleLike}>{count(this.props.likes)} &hearts;</span>
                <p><b>{this.props.name}</b></p>
                <p>{this.props.description}</p>
            </div>
        )
    }
}


function count(likes) {
    if (!likes) return 0
    return Object.keys(likes).reduce((num, uid) => num + likes[uid] ? 1 : 0, 0)
}

// <p>date {props.data.time.toDateString && props.data.time.toDateString()}</p>
