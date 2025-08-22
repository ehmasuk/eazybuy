'use client';

import { Image, Rate, Table } from 'antd';
import useSWR from 'swr';

function ProductView({ params }) {
  const { id } = params;
  const { data: product, isLoading,error } = useSWR(`/products/${id}`);

  console.log(product);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if(error){
    return <div>Error: {error.message}</div>;
  }

  const reviewColumns = [
    {
      title: 'User',
      dataIndex: ['user', 'name'],
      key: 'user',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => <Rate disabled defaultValue={rating} />,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
        title: 'Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (text) => new Date(text).toLocaleDateString(),
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{product?.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image src={product?.image} alt={product?.title} width="100%" />
          <div className="flex gap-2 mt-2">
            {product?.gallery?.map((img, index) => (
              <Image key={index} src={img} alt={product?.title} width={100} />
            ))}
          </div>
        </div>
        <div>
          <p className="text-lg mb-2">
            <span className="font-semibold">Price:</span> ${product?.newPrice}
            {product?.oldPrice && <span className="line-through ml-2 text-gray-500">${product?.oldPrice}</span>}
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold">Category:</span> {product?.category?.name}
          </p>
          {product?.subCategory && (
            <p className="text-lg mb-2">
              <span className="font-semibold">Sub Category:</span> {product?.subCategory?.name}
            </p>
          )}
          <p className="text-lg mb-2">
            <span className="font-semibold">Quantity:</span> {product?.quantity}
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold">Shipping:</span> ${product?.shipping}
          </p>
          <div className="text-lg mb-2">
            <span className="font-semibold">Colors:</span>
            <div className="flex gap-2 mt-1">
              {product?.colors?.map((color) => (
                <div key={color.id} style={{ backgroundColor: color.code, width: '20px', height: '20px', borderRadius: '50%' }} />
              ))}
            </div>
          </div>
          <div className="text-lg mb-2">
            <span className="font-semibold">Sizes:</span>
            <div className="flex gap-2 mt-1">
              {product?.sizes?.map((size) => (
                <span key={size.id} className="border px-2 py-1 rounded">{size.name}</span>
              ))}
            </div>
          </div>
          <p className="text-lg mb-2">
            <span className="font-semibold">Description:</span> {product?.description}
          </p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        <Table dataSource={product?.reviews} columns={reviewColumns} rowKey="id" />
      </div>
    </div>
  );
}

export default ProductView;
