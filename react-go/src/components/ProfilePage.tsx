import React, { Component } from 'react'
import { Post } from '../models/post';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

interface Props {
    username: string;
    getFavoritePosts: Function;
    posts: Post[];
    favoritePosts: number[]
}

interface State {
    prevRecievedPosts: Post[]
    filteredPosts: Post[]
}

class ProfilePage extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            filteredPosts: [],
            prevRecievedPosts: []
        }
    }

    componentDidMount() {
        this.setState({
            filteredPosts: []
        })
    }

    // static getDerivedStateFromProps(nextProps : Props , prevState : State){
    //     if (nextProps.posts !== prevState.prevRecievedPosts) {
    //         return {
    //             prevRecievedPosts: nextProps.posts
    //         }
    //     }
    //     else return null;
    // }

    componentDidUpdate(prevProps: Props, prevState : State) {
        if (prevProps.posts !== prevState.prevRecievedPosts){

            let pom: Post[] = [];
            this.props.favoritePosts.forEach(val => { pom = [...pom, ...this.props.posts.filter((post: Post) => post.id == val)] })

            this.setState({
                filteredPosts: pom,
                prevRecievedPosts: prevProps.posts
            })
        }

        // if (prevProps.posts.length !== 0 && !(this.props.posts !== prevProps.posts)) {
        //     let pom: Post[] = [];
        //     this.props.favoritePosts.forEach(val => { pom = [...pom, ...this.props.posts.filter((post: Post) => post.id == val)] })

        //     this.setState({
        //         filteredPosts: pom
        //     })
        // }
    }

    render() {
        return (
            <div className="container addPadding">
                <div className="row">
                    <div className="col s12 m4">
                        <img src={require(`../images/profileImage.png`)} alt="Profile Picture" />
                    </div>
                    <h2 className="col s12 m6">Welcome {`${this.props.username.charAt(0).toUpperCase()}${this.props.username.slice(1)}`} </h2>
                </div>

                <ul className="collection with-header">
                    <li className="collection-header"><h5> Favorite posts: </h5></li>
                    {
                        this.state.filteredPosts === null ?
                            ""
                            :  (this.state.filteredPosts!.map((post: Post) =>
                            <Link to={`/post/${post.id}`} className="collection-item" style={{ textDecoration: 'none' }}>{`${post.title}`}</Link>))
                    }
                </ul>

            </div>
        )
    }
}

function mapStateToProps(state: any) {
    return {
        username: state.user.username,
        posts: state.post.posts,
        favoritePosts: state.user.favoritePosts,
    }
}

export default connect(mapStateToProps)(ProfilePage);
