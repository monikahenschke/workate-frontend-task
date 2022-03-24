import { ErrorBoundary } from 'react-error-boundary';

import Layout from './components/Layout';
import { PhotosContextProvider } from './context/PhotosContext';
import { ErrorFallback } from './components/ErrorFallback';

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <PhotosContextProvider>
        <Layout />
      </PhotosContextProvider>
    </ErrorBoundary>
  );
}

export default App;
