import 'antd/dist/antd.css';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './containers/GlobalStyle';
import theme from './utils/theme';
import { GlobalProvider } from './context/global.state';

// 未登入
import Login from './pages/Login';

// 已登入
import Frame from './containers/Frame';
import Home from './pages/Home';
import Account from './pages/Account';

const PageRoute = () => {

    console.log('PageRoute')

    useEffect(() => {
        console.log('useEffect PageRoute')
    });

    return (

        <ThemeProvider theme={theme}>
            <GlobalProvider>
                <GlobalStyle />

                <Routes>
                    <Route path="login" element={<Login />} />

                    <Route element={<Frame />}>
                        <Route index element={<Home />} />
                        <Route path="admin_account" element={<Account />} />
                    </Route>
                </Routes>
            </GlobalProvider>
        </ThemeProvider>

    );

};

export default PageRoute;

// example
// https://codesandbox.io/s/react-router-v6-auth-demo-4jzltb?file=/src/App.js
