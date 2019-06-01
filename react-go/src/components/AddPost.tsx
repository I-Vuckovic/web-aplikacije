import React, { Component, Dispatch } from 'react'
import { Action } from 'redux';
import { Post } from '../models/post';
import { addPost } from '../Actions/postActions';
import { connect } from 'react-redux';

interface Props{
    userId: number,
    addPost: Function,
    history: any
}

class AddPost extends Component<Props> {

    sendNewPost(){
        const title = (document.getElementById("title") as HTMLInputElement).value;
        const body = (document.getElementById("body") as HTMLInputElement).value;

        const post: Post = {
            title,
            body,
            numOfFavorites: 0,
            comments: [],
            imageUrl: "image1.jpg",
            dateCreated: new Date().toLocaleString(),
            author: localStorage.getItem("username")!,
            authorId: this.props.userId
        }

        this.props.addPost(post);
        this.props.history.push("/");
    }

    render() {
        return (
            <div className="container">
                <h1>Title</h1>
                <input type="text" id="title"/>
                <h2>Body</h2>
                <textarea name="" id="body" rows={50}></textarea>
                
                <div onClick={()=>{ this.sendNewPost() }} className="btn indigo ">Add post</div>
            </div>
        )
    }
}

function mapStateToProps(state :any){
    return{
        userId: state.user.userId
    }
}

function dispatchToProps(dispatch : Dispatch<Action>){
    return{
        addPost: (post: Post) => dispatch(addPost(post))
    }
}

export default connect(mapStateToProps, dispatchToProps )(AddPost);