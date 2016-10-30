import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Directory extends React.Component {
    render() {
        const backgroundImage = this.props.name == "animation" ? 'url(/images/animation.gif)' : 'url(/images/' + this.props.name + '.png)';
        return <Link to={ this.props.path } className="directory" style={{ backgroundImage }}>
            <span className="directoryName">{ this.props.name }</span> 
        </Link>
    }
}

function mapStateToProps(state, props) {
    return {
        path: state.routing.locationBeforeTransitions.pathname + '/' + props.name,
    }
} 

export default connect(mapStateToProps)(Directory);
