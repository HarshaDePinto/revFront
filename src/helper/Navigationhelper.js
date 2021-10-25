import React, { Component, Fragment } from 'react';

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationmethod: false,
            cartmethod: false,
            usermethod: false,
            searchshow: false,
            locationshow: false,
        };
        this.toggleLoc = this.toggleLoc.bind(this);
        this.toggleCart = this.toggleCart.bind(this);
        this.toggleUser = this.toggleUser.bind(this);
        this.searchShow = this.searchShow.bind(this);
        this.searchClose = this.searchClose.bind(this);
        this.locationShow = this.locationShow.bind(this);
        this.locationClose = this.locationClose.bind(this);
    }
    // Modal
    searchShow() {
        this.setState({ searchshow: true });
    }
    searchClose() {
        this.setState({ searchshow: false });
    }
    locationShow() {
        this.setState({ locationshow: true });
    }
    locationClose() {
        this.setState({ locationshow: false });
    }
    // Navigation
    toggleLoc() {
        this.setState({
            locationmethod: !this.state.locationmethod
        });
    }
    // Cart
    toggleCart() {
        this.setState({
            cartmethod: !this.state.cartmethod
        });
    }
    // User
    toggleUser() {
        this.setState({
            usermethod: !this.state.usermethod
        });
    }
    render() {
        return (
           <Fragment/>
        );
    }
}

export default HeaderComponent;