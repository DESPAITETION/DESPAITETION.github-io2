import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Radio, Checkbox, Typography, Alert } from 'antd';

const { Title } = Typography;

const ServiceCalculator = () => {
  const [serviceType, setServiceType] = useState('laptop');
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Конфигурация услуг с уникальными опциями для каждого типа
  const serviceConfig = {
    laptop: {
      basePrice: 50000,
      name: 'Ремонт ноутбука',
      description: 'Базовая диагностика и ремонт',
      options: [
        { id: 'cpu', name: 'Улучшенный процессор', price: 20000 },
        { id: 'gpu', name: 'Улучшенная видеокарта', price: 25000 },
        { id: 'ram', name: 'Дополнительная оперативная память (16GB)', price: 8000 },
        { id: 'ssd', name: 'SSD накопитель (1TB)', price: 12000 },
        { id: 'cooling', name: 'Улучшенная система охлаждения', price: 5000 }
      ]
    },
    phone: {
      basePrice: 15000,
      name: 'Ремонт смартфона',
      description: 'Диагностика и базовый ремонт',
      options: [
        { id: 'screen', name: 'Замена экрана на оригинальный', price: 10000 },
        { id: 'battery', name: 'Замена батареи на усиленную', price: 5000 },
        { id: 'camera', name: 'Улучшенная камера', price: 8000 },
        { id: 'housing', name: 'Замена корпуса на новый', price: 3000 },
        { id: 'waterproof', name: 'Водозащита', price: 4000 }
      ]
    },
    tablet: {
      basePrice: 20000,
      name: 'Ремонт планшета', 
      description: 'Диагностика и восстановление',
      options: [
        { id: 'digitizer', name: 'Замена дигитайзера', price: 7000 },
        { id: 'stylus', name: 'Стилус в подарок', price: 2000 },
        { id: 'case', name: 'Защитный чехол премиум', price: 1500 },
        { id: 'film', name: 'Защитная пленка антиблик', price: 500 },
        { id: 'keyboard', name: 'Bluetooth клавиатура', price: 3500 }
      ]
    }
  };

  // Расчет общей стоимости
  useEffect(() => {
    calculatePrice();
  }, [serviceType, quantity, selectedOptions]);

  const calculatePrice = () => {
    const config = serviceConfig[serviceType];
    let price = config.basePrice * quantity;

    // Добавляем стоимость выбранных опций
    selectedOptions.forEach(optionId => {
      const option = config.options.find(opt => opt.id === optionId);
      if (option) {
        price += option.price * quantity;
      }
    });

    setTotalPrice(price);
  };

  const handleServiceTypeChange = (e) => {
    const newType = e.target.value;
    setServiceType(newType);
    // Сбрасываем выбранные опции при смене типа услуги
    setSelectedOptions([]);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(Math.max(1, value));
  };

  const handleOptionChange = (optionId, checked) => {
    if (checked) {
      setSelectedOptions(prev => [...prev, optionId]);
    } else {
      setSelectedOptions(prev => prev.filter(id => id !== optionId));
    }
  };

  const currentConfig = serviceConfig[serviceType];

  return (
    <Card className="custom-card">
      <Title level={2} style={{ marginBottom: 24 }}>
        Калькулятор
      </Title>
      
      <Form layout="vertical" size="large">
        {/* Поле для ввода количества */}
        <Form.Item label="Количество:" style={{ marginBottom: 24 }}>
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            style={{ width: '100%' }}
            placeholder="Введите количество"
          />
        </Form.Item>

        {/* Выбор типа услуги радиокнопками */}
        <Form.Item label="Выберите тип услуги:" style={{ marginBottom: 24 }}>
          <Radio.Group value={serviceType} onChange={handleServiceTypeChange}>
            <Radio value="laptop" style={{ display: 'block', marginBottom: 12 }}>
              <strong>Ноутбук</strong><br />
              <span style={{ fontSize: '12px', color: '#666' }}>Базовая стоимость: 50,000 ₽</span>
            </Radio>
            <Radio value="phone" style={{ display: 'block', marginBottom: 12 }}>
              <strong>Смартфон</strong><br />
              <span style={{ fontSize: '12px', color: '#666' }}>Базовая стоимость: 15,000 ₽</span>
            </Radio>
            <Radio value="tablet" style={{ display: 'block', marginBottom: 12 }}>
              <strong>Планшет</strong><br />
              <span style={{ fontSize: '12px', color: '#666' }}>Базовая стоимость: 20,000 ₽</span>
            </Radio>
          </Radio.Group>
        </Form.Item>

        {/* Индивидуальные опции для выбранного товара */}
        <Form.Item 
          label={`Дополнительные опции для ${currentConfig.name}:`} 
          style={{ marginBottom: 24 }}
        >
          <div style={{ border: '1px solid #d9d9d9', borderRadius: '8px', padding: '20px', background: '#fafafa' }}>
            <div style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>
              {currentConfig.description}
            </div>
            {currentConfig.options.map(option => (
              <Checkbox
                key={option.id}
                checked={selectedOptions.includes(option.id)}
                onChange={(e) => handleOptionChange(option.id, e.target.checked)}
                style={{ 
                  display: 'block', 
                  marginBottom: '16px',
                  padding: '12px',
                  border: '1px solid #e8e8e8',
                  borderRadius: '6px',
                  background: 'white'
                }}
              >
                <div style={{ fontWeight: 'bold' }}>{option.name}</div>
                <div style={{ color: '#1890ff', fontSize: '14px' }}>
                  +{option.price.toLocaleString('ru-RU')} ₽
                </div>
              </Checkbox>
            ))}
          </div>
        </Form.Item>

        {/* Отображение итоговой стоимости */}
        <Alert
          message="Итоговая стоимость заказа"
          description={`${totalPrice.toLocaleString('ru-RU')} ₽`}
          type="success"
          showIcon
          style={{ 
            marginTop: 16, 
            fontSize: '20px', 
            fontWeight: 'bold',
            textAlign: 'center'
          }}
        />

        {/* Детали расчета */}
        {totalPrice > 0 && (
          <div style={{ marginTop: 20, padding: '16px', background: '#f0f8ff', borderRadius: '8px' }}>
            <Title level={4} style={{ marginBottom: 12, color: '#1890ff' }}>Детали расчета:</Title>
            
            <div style={{ lineHeight: '1.8' }}>
              <div><strong>Услуга:</strong> {currentConfig.name}</div>
              <div><strong>Количество:</strong> {quantity} шт</div>
              <div><strong>Базовая стоимость:</strong> {(currentConfig.basePrice * quantity).toLocaleString('ru-RU')} ₽</div>
              
              {selectedOptions.length > 0 && (
                <div>
                  <strong>Выбранные опции:</strong>
                  {selectedOptions.map(optionId => {
                    const option = currentConfig.options.find(opt => opt.id === optionId);
                    return (
                      <div key={optionId} style={{ marginLeft: '16px' }}>
                        • {option.name} (+{(option.price * quantity).toLocaleString('ru-RU')} ₽)
                      </div>
                    );
                  })}
                </div>
              )}
              
              <div style={{ 
                marginTop: '12px', 
                paddingTop: '12px', 
                borderTop: '2px solid #1890ff', 
                fontWeight: 'bold',
                fontSize: '16px',
                color: '#1890ff'
              }}>
                ИТОГО: {totalPrice.toLocaleString('ru-RU')} ₽
              </div>
            </div>
          </div>
        )}
      </Form>
    </Card>
  );
};

export default ServiceCalculator;