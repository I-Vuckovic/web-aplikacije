import React, { Component, Dispatch } from 'react'
import { Post } from '../models/post';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { requestPost, deletePost } from '../Actions/postActions';
import CommentSection from './CommentSection';
import M from 'materialize-css';
import { addToFavorites, removeFromFavorites } from '../Actions/userActions';

interface Props {
    post: Post,
    requestPost: Function,
    match: any,
    userId: number,
    deletePost: Function,
    history: any,
    allPosts: Post[],
    addToFavorites: Function,
    logedIn: boolean,
    removeFromFavorites: Function,
    favoritePosts: number[]
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
        else {
            this.props.requestPost(this.props.match.params.postId);
        }

    }

    componentWillUnmount() {
        M.Toast.dismissAll();
    }

    toast() {
        M.Toast.dismissAll();
        M.toast({ html: 'You have to login first to add a post to favorites' });
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
                <div className="row">
                    <div className="col s12 m1">
                        {
                            this.props.logedIn ?
                                ((this.props.favoritePosts.length !== 0 && this.props.favoritePosts.includes(this.props.post.id!)) ?
                                    <div onClick={() => this.props.removeFromFavorites(this.props.post.id, this.props.userId)} className="btn-floating green"><i className="material-icons icon-hover"></i></div> :
                                    <div onClick={() => this.props.addToFavorites(this.props.post.id, this.props.userId)} className="btn-floating waves-effect waves-light red"><i className="material-icons">add</i></div>)
                                :

                                <button onClick={() => { this.toast() }} className="btn-floating waves-effect waves-light red"><i className="material-icons">add</i></button>
                        }
                    </div>
                    <div className="col s12 m1">
                        <i className="material-icons red-text left">favorite</i>
                        {`${this.props.post.numOfFavorites}`}
                    </div>
                </div>
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
        allPosts: state.post.posts,
        logedIn: state.user.logedIn,
        favoritePosts: state.user.favoritePosts
    }
}

function dispatchToProps(dispatch: Dispatch<Action>) {
    return {
        requestPost: (postId: number) => dispatch(requestPost(postId)),
        deletePost: (postId: number) => dispatch(deletePost(postId)),
        addToFavorites: (postId: number, userId: number) => dispatch(addToFavorites(postId, userId)),
        removeFromFavorites: (postId: number, userId: number) => dispatch(removeFromFavorites(postId, userId))
    }
}

export default connect(mapStateToProps, dispatchToProps)(PostPage);