import React from 'react';
import { Card, Table, Typography } from 'antd';

const { Title } = Typography;

const TableSection = () => {
  const columns = [
    {
      title: 'Колонка 1',
      dataIndex: 'col1',
      key: 'col1',
      onCell: (record) => {
        if (record.rowSpan || record.colSpan) {
          return {
            rowSpan: record.rowSpan,
            colSpan: record.colSpan,
          };
        }
        return {};
      },
    },
    {
      title: 'Колонка 2',
      dataIndex: 'col2',
      key: 'col2',
      onCell: (record) => {
        if (record.rowSpan || record.colSpan) {
          return {
            rowSpan: record.rowSpan,
            colSpan: record.colSpan,
          };
        }
        return {};
      },
    },
    {
      title: 'Колонка 3',
      dataIndex: 'col3',
      key: 'col3',
      onCell: (record) => {
        if (record.rowSpan || record.colSpan) {
          return {
            rowSpan: record.rowSpan,
            colSpan: record.colSpan,
          };
        }
        return {};
      },
    },
    {
      title: 'Колонка 4',
      dataIndex: 'col4',
      key: 'col4',
      onCell: (record) => {
        if (record.rowSpan || record.colSpan) {
          return {
            rowSpan: record.rowSpan,
            colSpan: record.colSpan,
          };
        }
        return {};
      },
    },
  ];

  const dataSource = [
    {
      key: '1',
      col1: 'Ячейка 11 объединенная с 12',
      col2: 'Ячейка 11 объединенная с 12',
      col3: 'Ячейка 13',
      col4: 'Ячейка 14',
      colSpan: 2,
    },
    {
      key: '2',
      col1: 'Ячейка 21',
      col2: 'Ячейка 22',
      col3: 'Ячейка 23',
      col4: 'Ячейка 24',
    },
    {
      key: '3',
      col1: 'Ячейка 31',
      col2: 'Объединенная ячейка 32-33 и 42-43',
      col3: 'Объединенная ячейка 32-33 и 42-43',
      col4: 'Ячейка 34',
      rowSpan: 2,
      colSpan: 2,
    },
    {
      key: '4',
      col1: 'Ячейка 41',
      col4: 'Ячейка 44',
    },
    {
      key: '5',
      col1: 'Ячейка 51',
      col2: 'Ячейка 52',
      col3: 'Ячейка 53',
      col4: 'Ячейка 54',
    },
    {
      key: '6',
      col1: 'Объединенная ячейка 61-64 на всю ширину таблицы',
      col2: 'Объединенная ячейка 61-64 на всю ширину таблицы',
      col3: 'Объединенная ячейка 61-64 на всю ширину таблицы',
      col4: 'Объединенная ячейка 61-64 на всю ширину таблицы',
      colSpan: 4,
    },
  ];

  return (
    <Card 
      id="table"
      className="custom-card"
    >
      <Title level={2} style={{ marginBottom: 24 }}>
        Таблица
      </Title>
      
      <div style={{ overflowX: 'auto' }}>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          size="middle"
          style={{ minWidth: 400 }}
        />
      </div>
    </Card>
  );
};

export default TableSection;