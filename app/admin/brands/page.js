'use client';

import usePost from '@/hooks/usePost';
import { Button, Form, Image, message, Popconfirm, Table, Upload } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import axios from 'axios';
import { mutate } from 'swr';
import useSWR from 'swr';

function Brands() {
  const { data: allBrands, error, isLoading } = useSWR('/brands');
  const { postData, loading } = usePost();

  const onSuccess = () => {
    message.success('Brand created successfully');
    form.resetFields();
    mutate('/brands');
  };

  const onError = (err) => {
    console.log(err);
    message.error(err.message);
  };

  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    try {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(values.image.fileList[0].originFileObj);
      fileReader.onload = () => {
        postData('/brands', { ...values, image: fileReader.result }, onSuccess, onError);
      };
    } catch (error) {
      console.log(error);
      message.error('Cannot read image file');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/brands/${id}`);
      mutate('/brands');
      message.success('Brand deleted successfully');
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
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <Popconfirm title="Are you sure to delete?" onConfirm={() => handleDelete(record.id)}>
          <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4">
          <Form form={form} onFinish={handleSubmit}>
            <div className="bg-white mb-10 px-8 py-8 rounded-md">
              <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-10">Add brand</h2>
              <div className="mb-6">
                <p className="mb-2 text-black">Upload image</p>
                <FormItem name="image" valuePropName="image" rules={[{ required: true, message: 'Please upload brand image' }]}>
                  <Upload beforeUpload={() => false} maxCount={1}>
                    <Button>Click to Upload</Button>
                  </Upload>
                </FormItem>
              </div>
              {/* input */}
              <div className="mb-6">
                <p className="mb-2 text-black">Name</p>
                <FormItem name="name" rules={[{ required: true, message: 'Please enter brand name' }]}>
                  <input className="input w-full outline-none h-[44px] rounded-md border border-gray6 px-6" type="text" placeholder="Name" />
                </FormItem>
              </div>

              <button disabled={loading} type="submit" className="bg-violet-600 disabled:opacity-50 text-white rounded px-7 py-2">
                Add Brand
              </button>
            </div>
          </Form>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <div className="relative overflow-x-auto bg-white px-8 py-4 rounded-md">
            <div className="overflow-scroll 2xl:overflow-visible">
              <div className="w-[975px] 2xl:w-full">
                <section className="container px-4 mx-auto">
                  <div className="flex items-center gap-x-3">
                    <h2 className="text-lg font-medium text-gray-800 dark:text-white">Brands</h2>
                    <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">{allBrands?.length}</span>
                  </div>
                  <div className="flex flex-col mt-6">
                    <Table dataSource={allBrands} columns={columns} loading={isLoading} />
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Brands;