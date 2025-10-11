import React from 'react';
import { Layout, Row, Col, ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import Header from './components/Header';
import LinksSection from './components/LinksSection';
import TableSection from './components/TableSection';
import FormSection from './components/FormSection';

const { Content, Footer } = Layout;

const App = () => {
  return (
    <ConfigProvider locale={ruRU}>
      <Layout style={{ minHeight: '100vh' }}>
        {/* Шапка сайта */}
        <Header />
        
        {/* Основное содержимое */}
        <Content style={{ padding: '20px 0' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
            <Row gutter={[24, 24]}>
              {/* Блок с таблицей и ссылками */}
              <Col xs={24} lg={{ span: 18, order: 2 }} className="mobile-order-2">
                <LinksSection />
              </Col>
              
              <Col xs={24} lg={{ span: 6, order: 1 }} className="mobile-order-1">
                <TableSection />
              </Col>
            </Row>
            
            {/* Форма */}
            <Row style={{ marginTop: 24 }}>
              <Col xs={24}>
                <FormSection />
              </Col>
            </Row>
          </div>
        </Content>
        
        {/* Подвал сайта */}
        <Footer style={{ 
          backgroundColor: '#001529', 
          color: 'white', 
          textAlign: 'center',
          marginTop: 48 
        }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            &copy; Ханаху Каплан 2025
          </div>
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default App;