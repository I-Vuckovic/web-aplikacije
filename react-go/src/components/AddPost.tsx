import React, { Component, Dispatch } from 'react'
import { Action } from 'redux';
import { Post } from '../models/post';
import { addPost } from '../Actions/postActions';
import { connect } from 'react-redux';
import M from 'materialize-css';

interface Props {
    userId: number,
    addPost: Function,
    history: any,
    username: string
}

class AddPost extends Component<Props> {

    sendNewPost() {
        const title = (document.getElementById("title") as HTMLInputElement).value;
        const body = (document.getElementById("body") as HTMLInputElement).value;
        const imageUrl = (document.getElementById("imageUrl") as HTMLInputElement).value;

        if (title === "") {
            (document.getElementById("title") as HTMLInputElement).placeholder = "Please input a title first";
            this.toast("You have to insert a title first");
        }
        else {
            if (body.length < 250) {
                this.toast("Body has to be at least 250 characters");
            }
            else {
                if (imageUrl === "") {
                    this.toast("Insert and image url");
                }
                else {
                    const post: Post = {
                        title,
                        body,
                        numOfFavorites: 0,
                        comments: [],
                        imageUrl,
                        dateCreated: new Date().toLocaleString(),
                        author: this.props.username,
                        authorId: this.props.userId
                    }

                    this.props.addPost(post);
                    this.props.history.push("/");
                }
            }
        }


    }

    toast(message: string) {
        M.Toast.dismissAll();
        M.toast({ html: message });
    }

    componentWillUnmount() {
        M.Toast.dismissAll();
    }

    render() {
        return (
            <div className="container">
                <h1>Title</h1>
                <input type="text" id="title"></input>
                <h2>Body</h2>
                <textarea id="body" className="" minLength={250}></textarea>
                <h3>Image url (relative for src folder)</h3>
                <input type="text" id="imageUrl"></input>
                <div onClick={() => { this.sendNewPost() }} className="btn indigo paddingBottom marginBottom">Add post</div>
            </div>
        )
    }
}

function mapStateToProps(state: any) {
    return {
        userId: state.user.userId,
        username: state.user.username
    }
}

function dispatchToProps(dispatch: Dispatch<Action>) {
    return {
        addPost: (post: Post) => dispatch(addPost(post))
    }
}

export default connect(mapStateToProps, dispatchToProps)(AddPost);