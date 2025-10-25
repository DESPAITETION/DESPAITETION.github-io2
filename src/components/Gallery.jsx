import React, { useState } from 'react';
import { Card, Carousel, Typography, Row, Col } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Gallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Массив изображений (8 штук) - используем локальные пути
  const images = [
    {
      id: 1,
      src: './images/image2.jpg',
      alt: 'Изображение 1'
    },
    {
      id: 2,
      src: './images/image3.jpg',
      alt: 'Изображение 2'
    },
    {
      id: 3,
      src: './images/image4.jpg',
      alt: 'Изображение 3'
    },
    {
      id: 4,
      src: './images/image5.jpg',
      alt: 'Изображение 4'
    },
    {
      id: 5,
      src: './images/image6.jpg',
      alt: 'Изображение 5'
    },
    {
      id: 6,
      src: './images/image7.jpg',
      alt: 'Изображение 6'
    },
    {
      id: 7,
      src: './images/image8.jpg',
      alt: 'Изображение 7'
    },
    {
      id: 8,
      src: './images/image9.jpg',
      alt: 'Изображение 8'
    }
  ];

  // Количество слайдов в зависимости от размера экрана
  const getSlidesToShow = () => {
    if (window.innerWidth < 768) return 1; // мобильные
    if (window.innerWidth < 1200) return 2; // планшеты
    return 3; // десктоп
  };

  const totalSlides = Math.ceil(images.length / getSlidesToShow());

  const handleBeforeChange = (current, next) => {
    setCurrentSlide(next);
  };

  const customArrowStyles = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 2,
    fontSize: '24px',
    color: '#1890ff',
    background: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: '2px solid #1890ff'
  };

  const NextArrow = ({ onClick }) => (
    <div
      style={{ ...customArrowStyles, right: '10px' }}
      onClick={onClick}
    >
      <RightOutlined />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      style={{ ...customArrowStyles, left: '10px' }}
      onClick={onClick}
    >
      <LeftOutlined />
    </div>
  );

  return (
    <Card className="custom-card">
      <Title level={2} style={{ marginBottom: 24, textAlign: 'center' }}>
        Галерея изображений
      </Title>

      {/* Карусель */}
      <div style={{ position: 'relative', marginBottom: 24 }}>
        <Carousel
          arrows
          prevArrow={<PrevArrow />}
          nextArrow={<NextArrow />}
          beforeChange={handleBeforeChange}
          slidesToShow={3}
          slidesToScroll={1}
          responsive={[
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]}
          dots={false}
        >
          {images.map((image) => (
            <div key={image.id} style={{ padding: '0 8px' }}>
              <div
                style={{
                  height: '200px',
                  background: `url(${image.src}) center/cover no-repeat`,
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}
              >
                {image.alt}
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Пейджер */}
      <Row justify="center" align="middle" gutter={[16, 0]}>
        <Col>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px',
            padding: '12px 24px',
            background: '#f0f8ff',
            borderRadius: '25px',
            border: '1px solid #1890ff'
          }}>
            <span style={{ fontWeight: 'bold', color: '#1890ff' }}>
              Страница:
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {Array.from({ length: totalSlides }, (_, index) => (
                <div
                  key={index}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: currentSlide === index ? '#1890ff' : '#d9d9d9',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
            <span style={{ color: '#666', fontSize: '14px' }}>
              {currentSlide + 1} из {totalSlides}
            </span>
          </div>
        </Col>
      </Row>

      {/* Информация о галерее */}
      <div style={{ 
        marginTop: 16, 
        textAlign: 'center', 
        color: '#666',
        fontSize: '14px'
      }}>
        Всего изображений: {images.length} • На экране: {getSlidesToShow()} изображения
      </div>
    </Card>
  );
};

export default Gallery;