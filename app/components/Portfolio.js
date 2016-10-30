import React from 'react';

import Breadcrumbs from './Breadcrumbs';
import Contents from './Contents';

class Portfolio extends React.Component {
    render() {
        return <div className="portfolio">
            <div className="heading">
                <h1 className="name">Sashank Gogula</h1>
                <h2 className="subject">Portfolio</h2>
            </div>
            <Breadcrumbs />
            { this.props.children || <Contents /> }
        </div>
    }
}

export default Portfolio;
