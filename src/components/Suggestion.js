import React, { Component } from 'react';
import NewsList from './NewsList';
import axios from 'axios';
import {
    Pagination
} from 'react-bootstrap/dist/react-bootstrap.js';

class Suggestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            newsDetails: [],
            activePage: 1,
            totalPages: 1
        }
        this.handleGoClick = this.handleGoClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getInfo = this.getInfo.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentWillMount(){
        console.log('this  ',this.props)
        if (this.props.match.params.query){
            this.setState({
                query: this.props.match.params.query
            })
        }
        this.handleGoClick()
    }

    componentDidMount(){
        console.log('did mouint ', this.props)
        if (this.props.match.params.query) {
            this.setState({
                query: this.props.match.params.query
            })
        }
        this.handleGoClick()
    }

    getInfo = (pageSize) => {
        console.log('object. this.state.query', this.state.query)
        if(!pageSize){
            axios.get(`http://content.guardianapis.com/search?api-key=test&q=${this.state.query}&show-fields=thumbnail,headline&page=1&page-size=10`)
                .then(response => {
                    this.setState({
                        totalPages: response.data.response.pages
                    })
                    return response.data.response.results;
                }).then(data => {
                    let newsDetails = data;
                    this.setState({
                        newsDetails: newsDetails
                    })
                });
        } else {
            axios.get(`http://content.guardianapis.com/search?api-key=test&q=${this.state.query}&show-fields=thumbnail,headline&page=${pageSize}&page-size=10`)
                .then(response => {
                    return response.data.response.results;
                }).then(data => {
                    let newsDetails = data;
                    this.setState({
                        newsDetails: newsDetails
                    })
                });
        }
    }

    handleInputChange(e) {
        this.setState({ query: e.target.value })
    }

    handleGoClick() {
        console.log(' state:-- ', this.state)
        if (this.state.query && this.state.query.length > 1) {
            if (this.state.query.length % 2 === 0) {
                this.getInfo()
            }
        }
    }

    handleSelect(eventKey) {
        debugger;
        console.log('handle select', parseInt(eventKey.target.text));
        var that = this;
        var pageSize = parseInt(eventKey.target.text);
        this.getInfo(pageSize)
    }

    render(){
        console.log('this state:-- ',this.state)
        const {
            activePage,
            newsDetails,
            totalPages
        } = this.state;
        let totalItems = totalPages;
        return (
            <div>
                <NewsList newsDetails={this.state.newsDetails} searchquery={this.state.query} />
                
                {
                    [1,2,3,4,5,6,7,8,9,10].map((itm, index) => {
                        return <Pagination.Item key={itm} active={itm === activePage} onClick={(e) => this.handleSelect(e)}>
                            {itm}
                        </Pagination.Item>
                    })
                }
                <Pagination
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    items={10}
                    maxButtons={10}
                    activePage={this.state.activePage}
                    onSelect={this.handleSelect} />
            </div>
        )
    }
}

export default Suggestion;