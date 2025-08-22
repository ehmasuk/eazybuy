'use client';

import { message, Popconfirm, Table } from 'antd';
import axios from 'axios';
import { mutate } from 'swr';

function HomeCategoryTable({ data }) {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        return <p>{record.category.name}</p>;
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
      await axios.delete(`/api/home-categories?id=${id}`);
      mutate('/home-categories');
      message.success('Category removed successfully');
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  return <Table dataSource={data} columns={columns} />;
}

export default HomeCategoryTable;
