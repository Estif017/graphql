import React from 'react'
import gql from 'graphql-tag'
import {useQuery}from '@apollo/client'
import { Grid } from 'semantic-ui-react'
import PostCards from '../components/PostCards'

const HomePage = () => {
    const {loading,data}=useQuery(FETCH_POST_QUERY)
    if (loading===true){
        return <h1>Loading.....</h1>
    }if (loading===false ){
        const {getPosts:posts}=data
        return (
         <Grid columns={3}>
             <Grid.Row className='page-title'>Recent Posts</Grid.Row>
             <Grid.Row>
                 {
                     posts &&
                        posts.map((post)=>(
                            <Grid.Column key={post.id} style={ { marginBottom:20 }}>
                                <PostCards post={post}/>
                            </Grid.Column>
                        ))
                 }
             </Grid.Row>
         </Grid>
        )
    }
}
const FETCH_POST_QUERY=gql`
    {
    getPosts{
        id
        username,
        body,
        likeCount,
        commentCount
        comments{
            id
            username,
            body
            createdAt
        }
        likes{
            username
            createdAt
        }
        createdAt
     }
    }
`
export default HomePage
