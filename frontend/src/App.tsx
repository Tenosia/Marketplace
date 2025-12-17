import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Spinner from './components/loaders/Spinner';

const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const NFTDetailPage = lazy(() => import('./pages/NFTDetailsPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const MarketPlacePage = lazy(() => import('./pages/MarketPlacePage'));
const CollectionNFTsPage = lazy(() => import('./pages/CollectionNFTsPage'));
const RankingsPage = lazy(() => import('./pages/RankingsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const CreateNFTPage = lazy(() => import('./pages/CreateNFTPage'));

function App() {
  return (
    <div className='bg-background'>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/nft/:id" element={<NFTDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/marketplace" element={<MarketPlacePage />} />
          <Route path="/collection/:collectionName" element={<CollectionNFTsPage />} />
          <Route path="/create" element={<CreateNFTPage />} /> 
          <Route path="/rankings" element={<RankingsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App
