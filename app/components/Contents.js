import React from 'react';
import { connect } from 'react-redux';

import Tile from './Tile';

class Contents extends React.Component {
    render() {
        if(this.props.loading) {
            return <div>
                <span>loading</span>
            </div>
        }
        else if(this.props.error){
            return <div>
                { this.props.error }
            </div>
        }
        else {
            const contents = this.props.elements.map((content, i) => <Tile key={ i } content={ content }/>);
            return <div className="postList">
                { contents }
            </div>
        }
    }
}

function mapStateToProps(state) {
    return state.contents; 
}

export default connect(mapStateToProps)(Contents);
