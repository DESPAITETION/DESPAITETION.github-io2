import React, { useState } from 'react';
import { Card, Form, Input, Select, Button, Typography, Alert } from 'antd';

const { Title } = Typography;
const { Option } = Select;

const Calculator = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const onFinish = (values) => {
    const { quantity, product } = values;
    
    // Проверка количества регулярным выражением
    const quantityRegex = /^\d+$/;
    if (!quantityRegex.test(quantity)) {
      setError('Количество должно быть целым числом');
      setResult(null);
      return;
    }

    setError('');
    
    // Цены товаров
    const prices = {
      laptop: 50000,
      phone: 25000,
      tablet: 35000,
      headphones: 5000,
      monitor: 15000
    };

    const total = parseInt(quantity) * prices[product];
    setResult(total);
  };

  return (
    <Card className="custom-card">
      <Title level={2} style={{ marginBottom: 24 }}>
        Калькулятор стоимости заказа
      </Title>
      
      <Form
        layout="vertical"
        onFinish={onFinish}
        size="large"
      >
        <Form.Item
          label="Количество товара"
          name="quantity"
          rules={[
            { required: true, message: 'Введите количество' },
            { pattern: /^\d+$/, message: 'Количество должно быть целым числом' }
          ]}
        >
          <Input 
            placeholder="Введите количество" 
            type="number"
            min="1"
          />
        </Form.Item>

        <Form.Item
          label="Выберите товар"
          name="product"
          rules={[{ required: true, message: 'Выберите товар' }]}
        >
          <Select placeholder="Выберите товар">
            <Option value="laptop">Ноутбук - 50,000 ₽</Option>
            <Option value="phone">Смартфон - 25,000 ₽</Option>
            <Option value="tablet">Планшет - 35,000 ₽</Option>
            <Option value="headphones">Наушники - 5,000 ₽</Option>
            <Option value="monitor">Монитор - 15,000 ₽</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Рассчитать стоимость
          </Button>
        </Form.Item>
      </Form>

      {error && (
        <Alert
          message="Ошибка"
          description={error}
          type="error"
          showIcon
          style={{ marginTop: 16 }}
        />
      )}

      {result !== null && !error && (
        <Alert
          message="Стоимость заказа"
          description={`${result.toLocaleString('ru-RU')} ₽`}
          type="success"
          showIcon
          style={{ marginTop: 16 }}
        />
      )}
    </Card>
  );
};

export default Calculator;