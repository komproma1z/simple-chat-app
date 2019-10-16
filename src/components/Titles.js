import React, { PureComponent } from 'react';

import Typography from '@material-ui/core/Typography';

class Titles extends PureComponent {
    render() {
        return (
            <>
                <Typography variant="h4" component="h4">
                    Chat app
                </Typography>
                <Typography variant="h5" component="h3">
                    {this.props.capitaliseFirstLetter(this.props.currentRoom)}
                </Typography>
            </>
        );
    }   
}

export default Titles;