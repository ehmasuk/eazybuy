'use client';

import { message, Popconfirm, Table } from 'antd';
import axios from 'axios';
import { mutate } from 'swr';

function PopularCategoryTable({ data }) {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        return <p>{record.category?.name || record.subCategory?.name}</p>;
      },
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (text, record) => {
        return <p>{record.category ? 'Parent Category' : 'Sub Category'}</p>;
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => {
        return (
          <Popconfirm title="Are you sure to delete?" onConfirm={() => handleDelete(record.id)}>
            <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
          </Popconfirm>
        );
      },
    },
  ];

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/popular-categories?id=${id}`);
      mutate('/popular-categories');
      message.success('Category removed successfully');
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  return <Table dataSource={data} columns={columns} />;
}

export default PopularCategoryTable;
