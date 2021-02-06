import React, { Component } from 'react';

const AppearanceContext = React.createContext(null);

class AppearenceProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flipped: false,
        };
    }

    flipBoard = ()=>{this.setState({flipped:!this.state.flipped})}


    render() {
        return (
            <AppearenceContext.Provider
                value={this.state.flipped,flipBoard}
            >
            {this.props.children}
          </AppearenceContext.Provider>
        );
    }
}

export default { AppearenceProvider, AppearanceContext };
