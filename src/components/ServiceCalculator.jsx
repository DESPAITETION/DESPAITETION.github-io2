import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Radio, Select, Checkbox, Typography, Alert } from 'antd';

const { Title } = Typography;
const { Option } = Select;

const ServiceCalculator = () => {
  const [serviceType, setServiceType] = useState('basic');
  const [quantity, setQuantity] = useState(1);
  const [option, setOption] = useState('');
  const [property, setProperty] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  // Базовая цена для каждого типа услуги
  const basePrices = {
    basic: 1000,      // Базовая услуга
    standard: 2000,   // Стандартная услуга
    premium: 3500     // Премиум услуга
  };

  // Опции для стандартной услуги
  const standardOptions = {
    option1: { price: 500, label: 'Расширенная поддержка (+500 ₽)' },
    option2: { price: 1000, label: 'Приоритетное обслуживание (+1000 ₽)' },
    option3: { price: 0, label: 'Базовая опция (без доплаты)' }
  };

  // Свойство для премиум услуги
  const premiumProperty = {
    price: 1500,
    label: 'Экспресс-доставка (+1500 ₽)'
  };

  // Расчет общей стоимости
  useEffect(() => {
    calculatePrice();
  }, [serviceType, quantity, option, property]);

  const calculatePrice = () => {
    let price = basePrices[serviceType] * quantity;

    // Добавляем стоимость опции для стандартной услуги
    if (serviceType === 'standard' && option) {
      price += standardOptions[option].price * quantity;
    }

    // Добавляем стоимость свойства для премиум услуги
    if (serviceType === 'premium' && property) {
      price += premiumProperty.price * quantity;
    }

    setTotalPrice(price);
  };

  const handleServiceTypeChange = (e) => {
    setServiceType(e.target.value);
    // Сбрасываем опции и свойства при смене типа услуги
    setOption('');
    setProperty(false);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(Math.max(1, value));
  };

  return (
    <Card className="custom-card">
      <Title level={2} style={{ marginBottom: 24 }}>
        Калькулятор стоимости услуги
      </Title>
      
      <Form layout="vertical" size="large">
        {/* Поле для ввода количества */}
        <Form.Item label="Количество:" style={{ marginBottom: 16 }}>
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            style={{ width: '100%' }}
          />
        </Form.Item>

        {/* Выбор типа услуги радиокнопками */}
        <Form.Item label="Тип услуги:" style={{ marginBottom: 16 }}>
          <Radio.Group value={serviceType} onChange={handleServiceTypeChange}>
            <Radio value="basic" style={{ display: 'block', marginBottom: 8 }}>
              Базовая услуга - 1,000 ₽
            </Radio>
            <Radio value="standard" style={{ display: 'block', marginBottom: 8 }}>
              Стандартная услуга - 2,000 ₽
            </Radio>
            <Radio value="premium" style={{ display: 'block', marginBottom: 8 }}>
              Премиум услуга - 3,500 ₽
            </Radio>
          </Radio.Group>
        </Form.Item>

        {/* Опции для стандартной услуги (отображаются только для standard) */}
        {serviceType === 'standard' && (
          <Form.Item label="Дополнительные опции:" style={{ marginBottom: 16 }}>
            <Select
              value={option}
              onChange={setOption}
              placeholder="Выберите опцию"
              style={{ width: '100%' }}
            >
              <Option value="option3">{standardOptions.option3.label}</Option>
              <Option value="option1">{standardOptions.option1.label}</Option>
              <Option value="option2">{standardOptions.option2.label}</Option>
            </Select>
          </Form.Item>
        )}

        {/* Свойство для премиум услуги (отображается только для premium) */}
        {serviceType === 'premium' && (
          <Form.Item style={{ marginBottom: 16 }}>
            <Checkbox
              checked={property}
              onChange={(e) => setProperty(e.target.checked)}
            >
              {premiumProperty.label}
            </Checkbox>
          </Form.Item>
        )}

        {/* Отображение итоговой стоимости */}
        <Alert
          message="Итоговая стоимость"
          description={`${totalPrice.toLocaleString('ru-RU')} ₽`}
          type="info"
          showIcon
          style={{ marginTop: 16, fontSize: '16px', fontWeight: 'bold' }}
        />

        {/* Информация о текущем выборе */}
        <div style={{ marginTop: 16, padding: '12px', background: '#f0f8ff', borderRadius: '6px' }}>
          <strong>Текущий расчет:</strong><br />
          • Услуга: {serviceType === 'basic' ? 'Базовая' : serviceType === 'standard' ? 'Стандартная' : 'Премиум'}<br />
          • Количество: {quantity}<br />
          {serviceType === 'standard' && option && (
            <>• Опция: {standardOptions[option].label.split(' (')[0]}<br /></>
          )}
          {serviceType === 'premium' && property && (
            <>• Свойство: {premiumProperty.label.split(' (')[0]}<br /></>
          )}
          • Базовая стоимость: {(basePrices[serviceType] * quantity).toLocaleString('ru-RU')} ₽
        </div>
      </Form>
    </Card>
  );
};

export default ServiceCalculator;