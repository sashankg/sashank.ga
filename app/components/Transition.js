import React from 'react';
import { RouteTransition, presets } from 'react-router-transition';

class Transition extends React.Component {
    render() {
        console.log(presets);
        return <RouteTransition
            component={ false }
            pathname={ this.props.location.pathname }
            className="transition"
            { ...presets.fade }
        >
            { this.props.children }
        </RouteTransition>
    }
}

export default Transition;
