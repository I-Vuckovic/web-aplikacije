import React, { Component, Dispatch } from 'react'
import { connect } from 'react-redux';
import { Post } from '../models/post';
import { Action } from 'redux';
import { addToFavorites, removeFromFavorites } from '../Actions/userActions';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import { News } from '../models/news';

interface Props {
    logedIn: boolean,
    posts: Post[],
    favoritePosts: number[],
    failedRequest: boolean,
    addToFavorites: Function,
    removeFromFavorites: Function,
    userId: number,
    news: News[]
}

class Home extends Component<Props> {

    componentDidMount() {
    }

    componentWillUnmount() {
        M.Toast.dismissAll();
    }

    toast() {
        M.Toast.dismissAll();
        M.toast({ html: 'You have to login first to add a post to favorites' });
    }


    render() {
        if (this.props.posts === undefined || this.props.posts.length == 0) {
            return (
                <div className="container addPadding">

                    <h2 className="red-text">
                        {
                            this.props.failedRequest ?
                                "Failed to connect to server"
                                : ""
                        }
                    </h2>
                </div>
            )
        }
        else {
            return (
                <div className="container addPadding">
                    <div className="row" >
                        <ul className="collection with-header col s12 m4 right indigo ">
                            <li className="collection-header indigo white-text"><h5>News</h5></li>
                            {
                                this.props.news.map((news:News) => 
                                    <li className="collection-item">
                                       <span>{` ${news.author} ${news.body} `}</span> 
                                       <p>{` ${news.time}`}</p>
                                    </li>
                                )
                            }
                            <li className="collecion-item indigo ligten-2">  </li>
                        </ul>
                        <div className="col s12 m8">

                            {this.props.posts.map((post: Post) =>

                                <div className="card" key={post.id}>
                                    <div className="card-image">
                                        <img src={require(`../images/${post.imageUrl}`)}></img>
                                        {
                                            this.props.logedIn ?
                                                ((this.props.favoritePosts.length !== 0 && this.props.favoritePosts.includes(post.id!)) ?
                                                    <div onClick={() => this.props.removeFromFavorites(post.id, this.props.userId)} className="btn-floating halfway-fab green"><i className="material-icons icon-hover"></i></div> :
                                                    <div onClick={() => this.props.addToFavorites(post.id, this.props.userId)} className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">add</i></div>)
                                                :

                                                <button onClick={() => { this.toast() }} className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">add</i></button>
                                        }
                                    </div>
                                    <div className="card-content black-text">
                                        <Link to={`/post/${post.id}`} style={{ textDecoration: 'none' }}><span className="card-title black-text"> {`${post.title}`} </span></Link>
                                        <p>{`${post.body.slice(0,100)}`} {post.body.length > 100 ? "...": ""}</p>
                                    </div>
                                    <div className="card-content">
                                        <i className="material-icons red-text left">favorite</i>
                                        {`${post.numOfFavorites}`}
                                    </div>
                                </div>

                            )}

                        </div>
                    </div>
                </div>

            )
        }
    }
}

function mapStateToProps(state: any) {
    return {
        logedIn: state.user.logedIn,
        favoritePosts: state.user.favoritePosts,
        failedRequest: state.user.failedRequest,
        userId: state.user.userId,
        posts: state.post.posts,
        news: state.post.news,
    }
}

function dispatchToProps(dispatch: Dispatch<Action>) {
    return {
        addToFavorites: (postId: number, userId: number) => dispatch(addToFavorites(postId, userId)),
        removeFromFavorites: (postId: number, userId: number) => dispatch(removeFromFavorites(postId, userId))
    }
}

export default connect(mapStateToProps, dispatchToProps)(Home);
