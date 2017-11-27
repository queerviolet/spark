import React, { Component } from 'react'

export default class Event extends Component {
    constructor(props){
        super(props);
        this.state = {
            viewComments: false,
            comments: props.comments,
            newComment: '',
        }
        this.handleLike = this.handleLike.bind(this);
        this.handleComment = this.handleComment.bind(this);
    }

    handleLike (evt){
        evt.preventDefault();
        const eventRef = this.props.room.doc(this.props.eventId);
        let likes;
        eventRef.get().then(function (event) {
            if (event.exists) {
                likes = event.data().likes;
            } else {
                likes = {counter: 0};
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        })
        .then( () => {
            const userBefore = likes[this.props.userId] || false;
            if (!userBefore) {
                eventRef.set({ likes: Object.assign({}, likes, { [this.props.userId]: !userBefore, counter: likes.counter + 1 }) }, { merge: true });
            } else {
                eventRef.set({ likes: Object.assign({}, likes, { [this.props.userId]: !userBefore, counter: likes.counter - 1 }) }, { merge: true });
            }
        })
    }

    handleComment(evt){
        evt.preventDefault();
        const eventRef = this.props.room.doc(this.props.eventId)
        const comment = {[this.props.displayName]: this.state.newComment}
        eventRef.set({comments: this.state.comments.concat(comment)}, {merge: true})
        this.setState({viewComments: false})
    }

    render() {
        const isItin = this.props.itineraryStatus;
        return (
            isItin
            ?
                <li className="itin-event">{`${this.props.name} @ ${this.props.time.toLocaleTimeString()}`}</li>
            :
            <div className="pin-event">
                <span className=" badge" onClick={this.handleLike}>{this.props.likes ? this.props.likes.counter : 0 } &hearts;</span>
                <p><b>{this.props.name}</b></p>
                <p>{this.props.description}</p>
                <div className="bottom-align">
                    <p
                    className="center-self"
                    onClick={() => this.setState({viewComments: !this.state.viewComments})}>Comments</p>
                    {this.state.viewComments && this.props.comments && this.props.comments.map((comment, index) => {
                        const name = Object.keys(comment)[0]
                        return ( <p key={index}>{`${name}: ${comment[name]}`}</p> )
                    }) }
                    {this.state.viewComments &&
                    <form onSubmit={this.handleComment}>
                        <input type="text" onChange={evt => this.setState({newComment: evt.target.value})}/>
                        <input type="submit" value="submit" />
                    </form>}
                </div>
            </div>
        )
    }
}


// <p>date {props.data.time.toDateString && props.data.time.toDateString()}</p>
