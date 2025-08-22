'use client';
import usePost from '@/hooks/usePost';
import { Form, message, Popconfirm, Table } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { mutate } from 'swr';
import useSWR from 'swr';
function Colors() {
  const { data: allColors, isLoading } = useSWR('/colors');
  const { postData, loading } = usePost();

  const onSuccess = () => {
    message.success('Color created successfully');
    form.resetFields();
    mutate('/colors');
  };

  const onError = (err) => {
    console.log(err);
    message.error(err.message);
  };

  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    try {
      postData('/colors', values, onSuccess, onError);
    } catch (error) {
      console.log(error);
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      render: (text) => <div style={{ backgroundColor: text, width: 20, height: 20, borderRadius: '50%' }}></div>,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <Popconfirm title="Are you sure to delete?" onConfirm={() => {}}>
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
              <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-10">Add color</h2>
              {/* input */}
              <div className="mb-6">
                <p className="mb-2 text-black">Name</p>
                <FormItem name="name" rules={[{ required: true, message: 'Please enter color name' }]}>
                  <input className="w-full outline-none h-[44px] rounded-md border border-gray6 px-6" type="text" placeholder="Name" />
                </FormItem>
              </div>
              {/* input */}
              <div className="mb-6">
                <p className="mb-2 text-black">Select color</p>
                <FormItem name="code" rules={[{ required: true, message: 'Please select color code' }]}>
                  <input className="outline-none h-[44px] rounded-md border border-gray p-1" type="color" placeholder="Code" />
                </FormItem>
              </div>

              <button disabled={loading} type="submit" className="bg-violet-600 disabled:opacity-50 text-white rounded px-7 py-2">
                Add color
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
                    <h2 className="text-lg font-medium text-gray-800">Colors</h2>
                    <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">{allColors?.length}</span>
                  </div>
                  <div className="flex flex-col mt-6">
                    <Table dataSource={allColors} columns={columns} loading={isLoading} />
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

export default Colors;
