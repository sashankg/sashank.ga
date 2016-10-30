import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Breadcrumbs extends React.Component {
    render() {
        if(this.props.crumbs.length < 2) {
            return null;
        }
        const crumbs = this.props.crumbs.slice(0, -1).map((crumb, i) => {
            return <div className="crumb" key={ i }>
                <Link className="crumbLink" to={ crumb.url }>{ crumb.name || "Home" }</Link>
                <span className="slash">/</span>
            </div>
        })
        return <div className="breadcrumbs">
            { crumbs }
            <span className="current">{ this.props.crumbs[this.props.crumbs.length -1].name }</span>
        </div>
    }
}

function mapStateToProps(state) {
    const paths = state.routing.locationBeforeTransitions.pathname.split("/");
    const crumbs = paths.map((path, i) => {
        return {
            url: paths.slice(0, i).join("/") + "/" + path,
            name: path,
        }
    }).slice(1);
    return {
        crumbs, 
    }
}
export default connect(mapStateToProps)(Breadcrumbs);
