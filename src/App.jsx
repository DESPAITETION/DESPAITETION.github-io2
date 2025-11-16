import React from 'react';
import { Layout, Row, Col, ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import Header from './components/Header';
import LinksSection from './components/LinksSection';
import TableSection from './components/TableSection';
import FormSection from './components/FormSection';
import ServiceCalculator from './components/ServiceCalculator';
import Gallery from './components/Gallery';
import FeedbackForm from './components/FeedbackForm'; // ← НОВЫЙ КОМПОНЕНТ

const { Content, Footer } = Layout;

const App = () => {
  return (
    <ConfigProvider locale={ruRU}>
      <Layout style={{ minHeight: '100vh' }}>
        <Header />
        <Content style={{ padding: '20px 0' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={{ span: 18, order: 2 }} className="mobile-order-2">
                <LinksSection />
              </Col>
              <Col xs={24} lg={{ span: 6, order: 1 }} className="mobile-order-1">
                <TableSection />
              </Col>
            </Row>
            
            <FormSection />
            <Gallery />
            <ServiceCalculator />
          </div>
        </Content>
        <Footer>
          &copy; Ханаху Каплан 2025
        </Footer>

        {/* Плавающая кнопка обратной связи */}
        <FeedbackForm /> {/* ← ДОБАВЛЕНО ЗДЕСЬ */}
      </Layout>
    </ConfigProvider>
  );
};

export default App;