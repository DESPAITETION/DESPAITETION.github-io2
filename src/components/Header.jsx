import React from 'react';
import { Row, Col, Typography, Space, Image } from 'antd';

const { Title } = Typography;

const Header = () => {
  return (
    <div style={{ 
      backgroundColor: '#001529',
      color: 'white',
      padding: '16px 0'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
        {/* Верхняя часть шапки */}
        <Row align="middle" gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col xs={6} md={4}>
            <Image
              src="./image.png"
              alt="Логотип"
              width={50}
              height={50}
              preview={false}
              style={{ borderRadius: 6 }}
            />
          </Col>
          <Col xs={18} md={20}>
            <Space 
              direction="vertical" 
              size="small" 
              style={{ 
                width: '100%',
                alignItems: { xs: 'flex-start', md: 'flex-end' }
              }}
            >
              <Space 
                direction={{ xs: 'vertical', md: 'horizontal' }} 
                size="middle"
              >
                <a href="#links" style={{ color: 'white', textDecoration: 'none' }}>
                  Таблица
                </a>
                <a href="#table" style={{ color: 'white', textDecoration: 'none' }}>
                  Контакты
                </a>
                <a href="#form" style={{ color: 'white', textDecoration: 'none' }}>
                  И еще что то
                </a>
              </Space>
            </Space>
          </Col>
        </Row>
        
        {/* Заголовок сайта */}
        <Row>
          <Col span={24}>
            <Title 
              level={1} 
              style={{ 
                color: 'white', 
                textAlign: 'center', 
                margin: 0,
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)'
              }}
            >
              Название сайта
            </Title>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Header;