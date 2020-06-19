import React, { Component } from 'react';
import { SocketContext } from '../context/socket-context';
import {
    Wrapper, 
    Heading,
    ScrollView,
    Tweet
} from './styles';


export default class ScrollData extends Component {
    
    constructor() {
        super();
        this.tweets = [];
    }

    clickHandler(author_id, tweet_id) {
        window.open(`https://twitter.com/${author_id}/status/${tweet_id}`,"_blank")
    }
    
    render() {

        return (
            <Wrapper>
                <Heading>Tweets</Heading>
                <ScrollView>
                    <SocketContext.Consumer>
                        {(context) => {
                            const { tweet, getHoveredTweet } = context;
                            if (tweet) {
                                this.tweets.unshift(tweet);
                            }
                            return this.tweets.map(tweet => {
                                const { author_id , id : tweet_id} = tweet.data;
                                const hoveredTweet = getHoveredTweet();
                                const isActive = hoveredTweet && hoveredTweet.id === tweet_id;
                                return <Tweet key={tweet_id} data={tweet.data.text} active={isActive}
                                             clickHandler={() => { this.clickHandler(author_id, tweet_id)}} />
                            });
                        }}
                    </SocketContext.Consumer>
                </ScrollView>
            </Wrapper>
        );
    }
}