"use client";
import usePost from "@/hooks/usePost";
import { Button, Form, message, Select, Upload } from "antd";
import FormItem from "antd/es/form/FormItem";
import { mutate } from "swr";

function SubCategoriesForm({ categoriesSelect }) {
  const { postData, loading } = usePost();

  const onSuccess = () => {
    message.success("Subcategory created successfully");
    form.resetFields();
    mutate("/sub-categories");
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
        postData("/subcategories", { ...values, image: fileReader.result }, onSuccess, onError);
      };
    } catch (error) {
      console.log(error);
      message.error("Cannot read image file");
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <div className="bg-white mb-10 px-8 py-8 rounded-md">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-10">Add sub category</h2>
        <div className="mb-6">
          <p className="mb-2 text-black">Upload Image</p>
          <FormItem name="image" valuePropName="image" rules={[{ required: true, message: "Please upload category image" }]}>
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button>Click to Upload</Button>
            </Upload>
          </FormItem>
        </div>
        {/* input */}
        <div className="mb-6">
          <p className="mb-2 text-black">Name</p>
          <FormItem name="name" rules={[{ required: true, message: "Please enter category name" }]}>
            <input className="input w-full outline-none h-[44px] rounded-md border border-gray6 px-6" type="text" placeholder="Name" />
          </FormItem>
        </div>
        {/* input */}
        <div className="mb-6">
          <p className="mb-2 text-black">Parent category</p>
          <FormItem name="parentCategoryId" rules={[{ required: true, message: "Please enter category name" }]}>
            <Select className="w-full" defaultValue="select" options={categoriesSelect} />
          </FormItem>
        </div>

        <button disabled={loading} type="submit" className="bg-violet-600 disabled:opacity-50 text-white rounded px-7 py-2">
          Add Category
        </button>
      </div>
    </Form>
  );
}

export default SubCategoriesForm;
