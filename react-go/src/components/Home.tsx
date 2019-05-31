import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Post } from '../models/post';

interface Props {
    logedIn: boolean,
    posts: Post[],
    favoritePosts: number[],
    failedRequest: boolean,
}

class Home extends Component<Props> {
    render() {
        if (this.props.posts === undefined || this.props.posts.length == 0) {
            return (
                <div className="container addPadding">

                    <h2 className="red-text">
                        {
                            this.props.failedRequest ?
                                setTimeout(() => {
                                    return "Failed to connect to server"
                                }, 2000)
                                : ""
                        }
                    </h2>
                </div>
            )
        }
        else {
            return (
                <div className="container addPadding">
                    {this.props.posts.map((post: Post) =>
                        <div className="row" key={post.id}>
                            <div className="col s12 m8">
                                <div className="card">
                                    <div className="card-image">
                                        <img src={require(`../images/${post.imageUrl}`)}></img>
                                        {
                                            (this.props.favoritePosts.length !== 0 && this.props.favoritePosts.includes(post.id)) ?
                                                <a className="btn-floating halfway-fab green"><i className="material-icons">done</i></a> :
                                                <a className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">add</i></a>

                                        }
                                    </div>
                                    <div className="card-content">
                                        <span className="card-title"> {`${post.title}`} </span>
                                        <p>{`${post.body}`}</p>
                                    </div>
                                    <div className="card-content">
                                        <i className="material-icons red-text left">favorite</i>
                                        {`${post.numOfFavorties}`}
                                        {}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )
        }
    }
}

function mapStateToProps(state: any) {
    return {
        logedIn: state.user.logedIn,
        posts: state.post.posts,
        favoritePosts: state.user.favoritePosts,
        failedRequest: state.user.failedRequest
    }
}


export default connect(mapStateToProps)(Home);
