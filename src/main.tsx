import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import "./index.css"
import '@fontsource-variable/inter/slnt.css';
import '@fontsource-variable/rubik';

import { Provider } from 'react-redux'
import store, { persistor } from './store/index.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import customTheme from './theme/index.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <ChakraProvider theme={customTheme}>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
)
