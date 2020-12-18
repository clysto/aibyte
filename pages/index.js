import { Swiper, SwiperSlide } from 'swiper/react';
import style from '../styles/home.module.css';

export default function Home() {
  const data = [
    {
      title: '数据',
      subtitle: 'Data',
      img: '/slides/1.jpg',
    },
    {
      title: '智能',
      subtitle: 'Intelligence',
      img: '/slides/2.jpg',
    },
    {
      title: '工程',
      subtitle: 'Engineering',
      img: '/slides/3.jpg',
    },
    {
      title: '通讯',
      subtitle: 'Communication',
      img: '/slides/4.jpg',
    },
  ];
  return (
    <div>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        style={{ height: '75vh' }}
        loop
      >
        {data.map((slide) => (
          <SwiperSlide
            key={slide.title}
            style={{ backgroundImage: `url(${slide.img})` }}
            className="bg-cover bg-center flex items-center justify-center"
          >
            <div className="text-white font-bold text-shadow">
              <div className="text-9xl">{slide.title}</div>
              <div className="text-6xl">{slide.subtitle}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
