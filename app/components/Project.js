import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import isURL from 'is-url'; 

class Project extends React.Component {
    render() {
        const style = isURL(this.props.background) ? 
            { backgroundImage: 'url(' + this.props.background + ')' } :
            { backgroundColor: this.props.background }
        return <Link className="projectLink" to={ this.props.path }>
            <div className="projectBackground" style={ style }>
                <span className="projectName">
                    { this.props.data.name == "hashtag helladeep" ? "#helladeep" : this.props.data.name }
                </span>
            </div>
        </Link>
    }
}

function mapStateToProps(state, props) {
    return {
        path: state.routing.locationBeforeTransitions.pathname + '/' + props.data.path,
        background: props.data.background,
    }
} 

export default connect(mapStateToProps)(Project);
