import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NewsList from './NewsList';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            newsDetails: []
        }
        this.handleGoClick = this.handleGoClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getInfo = this.getInfo.bind(this);
    }

    getInfo = () => {
        axios.get(`http://content.guardianapis.com/search?api-key=test&q=${this.state.query}&show-fields=thumbnail,headline&page=1&page-size=10`)
            .then(response => {
                return response.data.response.results;
            }).then(data => {
                let newsDetails = data;
                this.setState({
                    newsDetails: newsDetails
                })
            });
    }

    handleInputChange(e) {
        this.setState({ query: e.target.value })
    }

    handleGoClick() {
        if (this.state.query && this.state.query.length > 1) {
            if (this.state.query.length % 2 === 0) {
                this.getInfo()
            }
        }
    }

    render() {
        const a = 'hello'
        return (
            <div>

                <div>
                    <h1>Enter Search Text</h1>
                    <form className="container" onSubmit={e => e.preventDefault()}>
                        <input className="search-bar"
                            type='text'
                            placeholder='Search for...'
                            onChange={this.handleInputChange}
                            value={this.state.query} />
                        <button type="button">
                            <Link to={`/search/${this.state.query}`}>Search</Link>
                        </button>
                    </form>
                </div>
                <NewsList newsDetails={this.state.newsDetails} searchquery={this.state.query} />
            </div>

        )
    }
}
export default SearchBar;