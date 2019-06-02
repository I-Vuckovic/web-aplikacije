import React, { Component, Dispatch } from 'react'
import { Post } from '../models/post';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { requestPost, deletePost } from '../Actions/postActions';
import CommentSection from './CommentSection';

interface Props {
    post: Post,
    requestPost: Function,
    match: any,
    userId: number,
    deletePost: Function,
    history: any,
    allPosts: Post[]
}

class PostPage extends Component<Props> {

    componentDidMount() {
        if (this.props.allPosts.length === 0) {
            setTimeout(() => {
                this.props.requestPost(this.props.match.params.postId);
                if (this.props.post === undefined) {
                    (document.getElementById("errorMessage") as HTMLHeadingElement).innerHTML = "Failed to load post, check your internet connection";
                }
            }, 1000);
        }
        else{
            this.props.requestPost(this.props.match.params.postId);
        }

    }

    componentWillUnmount() {

    }

    render() {
        if (this.props.post === undefined) {
            return (
                <div className="container addPadding">
                    <h3 id="errorMessage" className="red-text"></h3>
                </div>
            )
        }
        return (
            <div className="container addPadding">
                <h2 className="">{this.props.post.title}</h2>
                <p>{this.props.post.body}</p>
                {
                    this.props.post.authorId === this.props.userId ?
                        <div onClick={() => {
                            this.props.deletePost(this.props.post.id);
                            this.props.history.push("/");
                        }} className="btn indigo">Delete this post </div> :
                        null
                }
                <CommentSection postId={this.props.post.id}></CommentSection>
            </div>
        )
    }
}

function mapStateToProps(state: any) {
    return {
        post: state.post.post,
        userId: state.user.userId,
        allPosts: state.post.posts
    }
}

function dispatchToProps(dispatch: Dispatch<Action>) {
    return {
        requestPost: (postId: number) => dispatch(requestPost(postId)),
        deletePost: (postId: number) => dispatch(deletePost(postId))
    }
}

export default connect(mapStateToProps, dispatchToProps)(PostPage);