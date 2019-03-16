import React from 'react';

const NewsListItem = ({ news }) => {
    const thumbnail = news.fields.thumbnail;
    const weburl = news.webUrl;
    return (
        <li className="list-group-item">
            <div className="video-list media">
                <div className="media-left">
                    <a href={weburl} target="_blank">
                        <img className="media-object" src={thumbnail || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'} />
                    </a>
                </div>
                <div className="media-body">
                    <a href={weburl} target="_blank">
                        <div className="media-heading">{news.fields.headline}</div>
                    </a>
                </div>
            </div>

        </li>
    )
}

export default NewsListItem;