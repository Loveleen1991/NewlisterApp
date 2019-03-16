import React from 'react';
import NewsListItem from './NewsListItem';

const NewsList = (props) => {
    const newsItems = props.newsDetails.map((news) => {
        return <NewsListItem key={news.id} news={news} />
    })
    return (
        <div>
            {
                props.searchquery ? <h1>Results for {props.searchquery}</h1> : ''
            }
            
            <br />
            <ul>{newsItems}</ul>
        </div>
    )
}

export default NewsList;