import React from 'react';


function withTestContext(Component, props, Consumer) {


    return function () {
        return (
            <Consumer>
                 {(test) => <Component {...props} context={test}/>}
            </Consumer>
        );
    }
}

export default withTestContext;