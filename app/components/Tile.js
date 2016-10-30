import React from 'react';

import Directory from './Directory';
import Project from './Project';
import Video from './Video';
import ImageZoom from 'react-medium-image-zoom';

class Tile extends React.Component {
    render() {
        return <div className="post">
            { this.renderContent(this.props.content) }
        </div>
    }

    renderContent(content) {
        switch(content.type) {
            case 'image':
                return <ImageZoom image={{ src: content.url, alt: content.name, className: 'content' }} />
            case 'video':
                return <Video url={ content.url } name={ content.name }/>
            case 'dir':
                return <Directory name={ content.name } />
            case 'project':
                return <Project data={ content }/>
            default:
                return content.name
        }
    }
}

export default Tile;
