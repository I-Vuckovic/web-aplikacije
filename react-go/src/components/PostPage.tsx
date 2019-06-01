import React, { Component, Dispatch } from 'react'
import { Post } from '../models/post';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { requestPost, deletePost } from '../Actions/postActions';

interface Props {
    post: Post,
    requestPost: Function,
    match: any,
    userId: number,
    deletePost: Function,
    history: any
}

class PostPage extends Component<Props> {

    componentDidMount() {
        setTimeout(() => {
            this.props.requestPost(this.props.match.params.postId); 
        }, 500);
        
    }
    
    render() {
        if (this.props.post === undefined) {
            return (
                <div className="container addPadding">
                    <h3 className="red-text">Failed to load post, check your internet connection</h3>
                </div>
            )
        }
        return (
            <div className="container addPadding">
                <h2 className="red-text">{this.props.post.title}</h2>
                <p>{this.props.post.body}</p>
                {
                    this.props.post.authorId === this.props.userId ?
                    <div onClick={() => {
                        this.props.deletePost(this.props.post.id);
                        this.props.history.push("/");
                    }} className="btn indigo">Delete this post </div>:
                    null
                }
            </div>
        )
    }
}

function mapStateToProps(state: any){
    return{
        post: state.post.post,
        userId: state.user.userId
    }
}

function dispatchToProps(dispatch: Dispatch<Action>){
    return{
        requestPost: (postId: number) => dispatch(requestPost(postId)),
        deletePost: (postId:number) => dispatch(deletePost(postId))
    }
}

export default connect(mapStateToProps, dispatchToProps)(PostPage);