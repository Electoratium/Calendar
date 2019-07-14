import React from 'react';

function Test({context, prop}) {
    return (
        <>
            <h1>{context.theme.background}</h1>
            <h5>{prop}</h5>


            {/* CHANGE CONTEXT!!!!! */}

            <button onClick={ () => context.setTheme({foreground: 'll', background: 'bbf'})}>Change ME</button>
        </>
    );
}

export default Test;
