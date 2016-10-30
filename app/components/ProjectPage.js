import React from 'react';
import { connect } from 'react-redux';

import Markdown from 'react-markdown';

class ProjectPage extends React.Component {
    render() {
        if(this.props.loading) {
            return <span>loading</span>
        }
        else {
            return <Markdown className="markdown" source={ this.props.markdown } />
        }
    }
}

function mapStateToProps(state) {
    return state.openProject;
}

export default connect(mapStateToProps)(ProjectPage);
