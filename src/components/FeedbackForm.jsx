import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Checkbox, message, Typography, Alert } from 'antd';
import { MessageOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { TextArea } = Input;

const FeedbackForm = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'

  // Загрузка данных из LocalStorage
  useEffect(() => {
    const savedData = localStorage.getItem('feedbackFormData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        form.setFieldsValue(parsedData);
      } catch (e) {
        console.error('Ошибка загрузки данных:', e);
      }
    }
  }, [form]);

  const saveToLocalStorage = (values) => {
    try {
      localStorage.setItem('feedbackFormData', JSON.stringify(values));
    } catch (e) {
      console.error('Ошибка сохранения:', e);
    }
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('feedbackFormData');
  };

  const showModal = () => {
    setIsModalVisible(true);
    setSubmitStatus(null);
    window.history.pushState({ formOpen: true }, '', '#feedback');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSubmitStatus(null);
    form.resetFields();
    window.history.back();
  };

  // Обработчик кнопки "Назад"
  useEffect(() => {
    const handlePopState = () => {
      if (isModalVisible) {
        setIsModalVisible(false);
        setSubmitStatus(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isModalVisible]);

  const onFinish = async (values) => {
    setLoading(true);
    setSubmitStatus(null);

    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      // ДЕМО-РЕЖИМ: Всегда успешная отправка
      console.log('Данные формы для отправки:', values);
      
      // Имитация успешной отправки
      setSubmitStatus('success');
      message.success('Сообщение успешно отправлено!');
      
      // Очистка формы и localStorage
      form.resetFields();
      clearLocalStorage();
      
      // Закрытие формы через 2 секунды
      setTimeout(() => {
        setIsModalVisible(false);
        setSubmitStatus(null);
      }, 2000);

    } catch (error) {
      setSubmitStatus('error');
      message.error('Ошибка при отправке: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const onValuesChange = (changedValues, allValues) => {
    saveToLocalStorage(allValues);
  };

  return (
    <>
      {/* Плавающая кнопка */}
      <Button 
        type="primary" 
        icon={<MessageOutlined />}
        size="large"
        onClick={showModal}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 1000,
          borderRadius: '50px',
          height: '60px',
          width: '60px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}
      />

      {/* Модальное окно с формой */}
      <Modal
        title={
          <Title level={3} style={{ margin: 0, textAlign: 'center' }}>
            📧 Обратная связь
          </Title>
        }
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={400}
        style={{ maxWidth: '90vw' }}
        bodyStyle={{
          padding: '20px 0',
          maxHeight: '70vh',
          overflow: 'auto'
        }}
        centered
        destroyOnClose
      >
        {submitStatus === 'success' && (
          <Alert
            message="Успешно отправлено!"
            description="Ваше сообщение получено. Мы свяжемся с вами в ближайшее время."
            type="success"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        {submitStatus === 'error' && (
          <Alert
            message="Ошибка отправки"
            description="Пожалуйста, попробуйте еще раз позже."
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onValuesChange={onValuesChange}
          size="large"
          disabled={submitStatus === 'success'}
        >
          <Form.Item
            name="fio"
            label="ФИО"
            rules={[
              { required: true, message: 'Пожалуйста, введите ФИО' },
              { min: 2, message: 'ФИО должно содержать минимум 2 символа' }
            ]}
          >
            <Input placeholder="Иванов Иван Иванович" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Пожалуйста, введите email' },
              { type: 'email', message: 'Введите корректный email' }
            ]}
          >
            <Input placeholder="example@mail.ru" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Телефон"
            rules={[
              { required: true, message: 'Пожалуйста, введите телефон' }
            ]}
          >
            <Input placeholder="+7 (999) 999-99-99" />
          </Form.Item>

          <Form.Item
            name="organization"
            label="Организация (необязательно)"
          >
            <Input placeholder="Название вашей организации" />
          </Form.Item>

          <Form.Item
            name="message"
            label="Сообщение"
            rules={[
              { required: true, message: 'Пожалуйста, введите сообщение' },
              { min: 10, message: 'Сообщение должно содержать минимум 10 символов' }
            ]}
          >
            <TextArea
              placeholder="Ваше сообщение..."
              rows={4}
              style={{ resize: 'vertical' }}
            />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('Необходимо согласие с политикой')),
              },
            ]}
          >
            <Checkbox>
              Я согласен с политикой обработки персональных данных
            </Checkbox>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'center' }}>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              size="large"
              style={{ width: '100%' }}
              disabled={submitStatus === 'success'}
            >
              {submitStatus === 'success' ? 'Отправлено!' : 'Отправить'}
            </Button>
          </Form.Item>
        </Form>

        <div style={{ 
          marginTop: 16, 
          textAlign: 'center', 
          fontSize: '12px', 
          color: '#666',
          borderTop: '1px solid #f0f0f0',
          paddingTop: '12px'
        }}>
          Демо-режим: данные сохраняются локально
        </div>
      </Modal>
    </>
  );
};

export default FeedbackForm;