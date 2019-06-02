import React, { Component } from 'react'
import { Comment } from '../models/comment';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import { addComment } from '../Actions/postActions';
import M from 'materialize-css';

interface Props {
    postId?: number,
    comments?: Comment[],
    userId: number,
    addComment: Function,
    username: string,
    logedIn?: boolean
}

class CommentSection extends Component<Props> {

    sendComment() {
        
        if (this.props.logedIn === true) {
            const comment: Comment = {
                username: this.props.username,
                body: (document.getElementById("comment") as HTMLInputElement).value,
                dateCreated: new Date().toLocaleString(),
            }

            this.props.addComment(this.props.postId, comment);
        }
        else{
            this.toast();
        }
    }

    toast() {
        M.Toast.dismissAll();
        M.toast({ html: 'You have to login first to add a comment' });
    }

    componentWillUnmount() {
        M.Toast.dismissAll();
    }

    render() {
        return (
            <div className=" grey lighten-2">
                <ul className="collection with-header grey lighten-2">
                    <li className="collection-header"><h5>Comments:</h5></li>
                    <li className="input-field paddingBottom">
                        <i className="material-icons prefix">account_circle</i>
                        <input id="comment" type="text" className="validate"></input>
                        <label>Add you comment </label>
                        <div onClick={() => { this.sendComment() }} className="btn indigo ligten-1 right">Add comment</div>
                    </li>
                    {
                        this.props.comments!.map((comment: Comment) =>

                            <li className="collection-item avatar">
                                <img src={require(`../images/profileImage.png`)} alt="" className="circle"></img>
                                <span>{comment.username}: </span>
                                <p>{comment.body}</p>
                                <p className="grey-text ">{comment.dateCreated}</p>
                            </li>
                        ).reverse()
                    }
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state: any) {
    return {
        userId: state.user.userId,
        username: state.user.username,
        logedIn: state.user.logedIn,
        comments: state.post.post.comments
    }
}

function dispatchToProps(dispatch: Dispatch<Action>) {
    return {
        addComment: (postId: number, comment: Comment) => dispatch(addComment(postId, comment))
    }
}

export default connect(mapStateToProps, dispatchToProps)(CommentSection)
