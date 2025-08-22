'use client';

import { Image, message, Popconfirm, Table } from 'antd';
import axios from 'axios';
import Link from 'next/link';
import { mutate } from 'swr';
import useSWR from 'swr';

function Products() {
  const { data: allProducts, isLoading, error } = useSWR('/products');

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/products?id=${id}`);
      mutate('/products');
      message.success('Product deleted successfully');
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <Image src={text} alt="image" width={50} height={50} />,
    },
    {
      title: 'Name',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Price',
      dataIndex: 'newPrice',
      key: 'newPrice',
    },
    {
      title: 'Old price',
      dataIndex: 'oldPrice',
      key: 'oldPrice',
    },
    {
      title: 'Category',
      dataIndex: ['category', 'name'],
      key: 'category',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Shipping',
      dataIndex: 'shipping',
      key: 'shipping',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <div className="flex gap-2">
          <Popconfirm title="Are you sure to delete?" onConfirm={() => handleDelete(record.id)}>
            <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
          </Popconfirm>
          <Link href={`/admin/products/view/${record.id}`}>
            <button className="bg-green-500 text-white px-3 py-1 rounded">View</button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div>
      <section className="container px-4 mx-auto">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800">Products</h2>
          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">{allProducts?.products?.length}</span>
        </div>
        <div className="flex flex-col mt-6">
          <Table dataSource={allProducts?.products} columns={columns} loading={isLoading} />
        </div>
      </section>
    </div>
  );
}

export default Products;
