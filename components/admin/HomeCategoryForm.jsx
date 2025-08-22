'use client';
import { convertToSelectInputPattern } from '@/helpers/convertToSelectInputPattern';
import usePost from '@/hooks/usePost';
import { Button, Form, message, Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { mutate } from 'swr';

function HomeCategoryForm({ allCategories }) {
  const { postData, loading } = usePost();

  const onSuccess = () => {
    message.success('Category added successfully');
    form.resetFields();
    mutate('/home-categories');
  };

  const onError = (err) => {
    message.error(err.message);
  };

  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    postData('/home-categories', values, onSuccess, onError);
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <div className="bg-gray-50 mb-10 px-8 py-8 rounded-md">
        <h2 className="text-lg font-medium text-gray-800 mb-10">Add Home Category</h2>
        <div className="grid lg:grid-cols-2 gap-x-20">
          <div>
            <p className="mb-2 text-black">Category</p>
            <FormItem name="categoryId" rules={[{ required: true, message: 'Select product category' }]}>
              <Select size="large" className="w-full" placeholder="Select" options={convertToSelectInputPattern(allCategories)} />
            </FormItem>
          </div>
        </div>

        <button disabled={loading} type="submit" className="bg-violet-600 disabled:opacity-50 text-white rounded px-7 py-2">
          Add Category
        </button>
      </div>
    </Form>
  );
}

export default HomeCategoryForm;
