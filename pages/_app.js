import 'tailwindcss/tailwind.css';
import '../styles/global.css';
import 'swiper/swiper-bundle.css';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  EffectCoverflow,
  Autoplay,
} from 'swiper';

SwiperCore.use([Navigation, Pagination, Scrollbar, EffectCoverflow, Autoplay]);

import Layout from '../components/layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
