import React from 'react';
import { Card, Form, Input, Button, Select, DatePicker, Radio, Checkbox, Typography, Row, Col } from 'antd';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const FormSection = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form values:', values);
  };

  return (
    <Card id="form" className="custom-card">
      <Title level={2} style={{ marginBottom: 24 }}>
        Форма
      </Title>
      
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        size="large"
      >
        <Row gutter={[16, 0]}>
          <Col xs={24} md={12}>
            <Form.Item
              label="ФИО"
              name="fio"
              rules={[{ required: true, message: 'Пожалуйста, введите ФИО' }]}
            >
              <Input placeholder="Введите ваше ФИО" />
            </Form.Item>
          </Col>
          
          <Col xs={24} md={12}>
            <Form.Item
              label="Телефон"
              name="phone"
              rules={[{ required: true, message: 'Пожалуйста, введите телефон' }]}
            >
              <Input placeholder="Введите ваш телефон" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 0]}>
          <Col xs={24} md={12}>
            <Form.Item
              label="E-mail"
              name="email"
              rules={[
                { required: true, message: 'Пожалуйста, введите email' },
                { type: 'email', message: 'Введите корректный email' }
              ]}
            >
              <Input placeholder="Введите ваш email" />
            </Form.Item>
          </Col>
          
          <Col xs={24} md={12}>
            <Form.Item
              label="Дата рождения"
              name="birthdate"
              rules={[{ required: true, message: 'Пожалуйста, выберите дату рождения' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Пол"
          name="gender"
          rules={[{ required: true, message: 'Пожалуйста, выберите пол' }]}
        >
          <Radio.Group>
            <Radio value="male">Мужской</Radio>
            <Radio value="female">Женский</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Любимый язык программирования"
          name="language"
        >
          <Select mode="multiple" placeholder="Выберите языки программирования">
            <Option value="pascal">Pascal</Option>
            <Option value="c">C</Option>
            <Option value="cpp">C++</Option>
            <Option value="javascript">JavaScript</Option>
            <Option value="php">PHP</Option>
            <Option value="python">Python</Option>
            <Option value="java">Java</Option>
            <Option value="haskel">Haskel</Option>
            <Option value="clojure">Clojure</Option>
            <Option value="prolog">Prolog</Option>
            <Option value="scala">Scala</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Биография"
          name="bio"
        >
          <TextArea
            rows={4}
            placeholder="Расскажите о себе"
          />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[{ required: true, message: 'Необходимо согласие с контрактом' }]}
        >
          <Checkbox>
            С контрактом ознакомлен(а)
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large">
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default FormSection;