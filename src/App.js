import React, { useState } from 'react';
import Calendar from './components/Calendar';

import TestContext from './context/testContext';
import withTestContext from './hoc/withTestContext';

import Test from './components/Test';

function App() {
    const {Provider, Consumer} = TestContext,
        WithContextTest = withTestContext(Test, {prop: 'frog'}, Consumer);

    const [theme, setTheme] = useState({foreground: '#ff', background: '#ddd'});

    return (
        <main>
            {/* В ПРОВАЙДЕР ЗАКИДЫАЕМ НЕ ТОКО ЗНАЧЕНИЕ НО Ф-ИЮ ИЗМЕНЯЮЩЮЮ ЕГО (МОЖНО И БЕЗ ЭТОГО ПРОСТО БЕЗ ОБЬЕКТА КИНУТЬ ЗНАЧЕНИЕ)*/}
            <Provider value={{theme, setTheme}}>
                {/*<Calendar />*/}
                <WithContextTest />
            </Provider>
        </main>
    );
}

export default App;
