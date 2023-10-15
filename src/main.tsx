import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import "./index.css"
import '@fontsource-variable/inter/slnt.css';
import '@fontsource-variable/rubik';

import { Provider } from 'react-redux'
import store, { persistor } from './store/index.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import customTheme from './theme/index.ts';
import AppContextProvider from './contexts/AppContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <ChakraProvider theme={customTheme}>
          <CSSReset />
          <AppContextProvider>
            <App />
          </AppContextProvider>
        </ChakraProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
)
