"use client";
import usePost from "@/hooks/usePost";
import { Form, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import { mutate } from "swr";

function SizesForm() {
  const { postData, loading } = usePost();

  const onSuccess = () => {
    message.success("Size created successfully");
    form.resetFields();
    mutate("/sizes");
  };

  const onError = (err) => {
    console.log(err);
    message.error(err.message);
  };

  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    try {
      postData("/sizes", values, onSuccess, onError);
    } catch (error) {
      console.log(error);
      message.error(error.message);
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <div className="bg-white mb-10 px-8 py-8 rounded-md">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-10">Add size</h2>
        {/* input */}
        <div className="mb-6">
          <p className="mb-2 text-black">Name</p>
          <FormItem name="name" rules={[{ required: true, message: "Please enter size name" }]}>
            <input className="w-full outline-none h-[44px] rounded-md border border-gray6 px-6" type="text" placeholder="Name" />
          </FormItem>
        </div>

        <button disabled={loading} type="submit" className="bg-violet-600 disabled:opacity-50 text-white rounded px-7 py-2">
          Add size
        </button>
      </div>
    </Form>
  );
}

export default SizesForm;
