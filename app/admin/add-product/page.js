'use client';

import { convertToSelectInputPattern } from '@/helpers/convertToSelectInputPattern';
import { imageToBase64 } from '@/helpers/imageToBase64';
import usePost from '@/hooks/usePost';
import { Button, Form, InputNumber, message, Select, Upload } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import { mutate } from 'swr';
import useSWR from 'swr';

const sectionTypes = [
  { label: 'Popular', value: 'POPULAR' },
  { label: 'New Arrival', value: 'NEW_ARRIVAL' },
  { label: 'Featured', value: 'FEATURED' },
  { label: 'Flash Sale', value: 'FLASH_SALE' },
  { label: 'Trending', value: 'TRENDING' },
];

function AddProducts() {
  const { data: allCategories } = useSWR('/categories');
  const { data: allSubCategories } = useSWR('/subcategories');
  const { data: allColors } = useSWR('/colors');
  const { data: allSizes } = useSWR('/sizes');
  const { postData, loading } = usePost();

  const [showAbleSubCategories, setShowAbleSubCategories] = useState([]);

  const handleChangeCategory = (value) => {
    const result = allSubCategories.filter((subcat) => subcat.parentCategoryId === value);
    setShowAbleSubCategories(result);
  };

  const onSuccess = () => {
    message.success('Product created successfully');
    form.resetFields();
    mutate('/products');
  };

  const onError = (err) => {
    console.log(err);
    message.error(err.message);
  };

  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      let imageInBase64 = await imageToBase64(values.image.fileList[0].originFileObj);

      let galleryOfFiles = [];

      for (const file of values.gallery.fileList) {
        const imageInBase64 = await imageToBase64(file.originFileObj);
        galleryOfFiles.push(imageInBase64);
      }

      postData('/products', { ...values, image: imageInBase64, gallery: galleryOfFiles }, onSuccess, onError);
    } catch (error) {
      console.log(error);
      message.error('Cannot read image file');
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <div className="bg-gray-50 mb-10 px-8 py-8 rounded-md">
        <h2 className="text-lg font-medium text-gray-800 mb-10">Add product</h2>
        <div className="grid lg:grid-cols-2 gap-x-20">
          {/* title */}
          <div>
            <p className="mb-2 text-black">Title</p>
            <FormItem name="title" rules={[{ required: true, message: 'Please enter title' }]}>
              <input className="w-full outline-none h-[44px] rounded-md border border-gray6 px-6" type="text" placeholder="Title" />
            </FormItem>
          </div>
          <div className="flex gap-x-20">
            {/* New price */}
            <div>
              <p className="mb-2 text-black">New Price</p>
              <FormItem name="newPrice" rules={[{ required: true, message: 'Please enter new price' }]}>
                <InputNumber size="large" min={1} />
              </FormItem>
            </div>
            {/* Old price */}
            <div>
              <p className="mb-2 text-black">
                Old price <span className="text-gray-500 text-sm">(optional)</span>
              </p>
              <FormItem name="oldPrice">
                <InputNumber size="large" min={1} />
              </FormItem>
            </div>
          </div>
          {/* Colors */}
          <div>
            <p className="mb-2 text-black">
              Colors <span className="text-gray-500 text-sm">(optional)</span>
            </p>
            <FormItem name="colorIds">
              <Select mode="multiple" allowClear size="large" className="w-full" placeholder="Select" options={convertToSelectInputPattern(allColors)} />
            </FormItem>
          </div>
          {/* Sizes */}
          <div>
            <p className="mb-2 text-black">
              Sizes <span className="text-gray-500 text-sm">(optional)</span>
            </p>
            <FormItem name="sizeIds">
              <Select mode="multiple" allowClear size="large" className="w-full" placeholder="Select" options={convertToSelectInputPattern(allSizes)} />
            </FormItem>
          </div>

          {/* Category */}
          <div>
            <p className="mb-2 text-black">Category</p>
            <FormItem name="categoryId" rules={[{ required: true, message: 'Select product category' }]}>
              <Select size="large" onChange={handleChangeCategory} className="w-full" placeholder="Select" options={convertToSelectInputPattern(allCategories)} />
            </FormItem>
          </div>

          {/* Sub categories */}
          <div>
            <p className="mb-2 text-black">
              Sub category <span className="text-gray-500 text-sm">(optional)</span>
            </p>
            <FormItem name="subCategoryId">
              <Select size="large" disabled={!showAbleSubCategories.length} className="w-full" placeholder="Select" options={convertToSelectInputPattern(showAbleSubCategories)} />
            </FormItem>
          </div>

          {/* quantity */}
          <div>
            <p className="mb-2 text-black">Quantity </p>
            <FormItem name="quantity" rules={[{ required: true, message: 'Enter product quantity' }]}>
              <InputNumber size="large" min={1} max={10000} />
            </FormItem>
          </div>
          {/* shipping */}
          <div>
            <p className="mb-2 text-black">
              Shipping cost <span className="text-gray-500 text-sm">(keep 0 if shipping is free)</span>
            </p>
            <FormItem name="shipping" rules={[{ required: true, message: 'Enter shipping cost' }]}>
              <InputNumber size="large" defaultValue={0} min={0} max={10000} />
            </FormItem>
          </div>

          {/* Section types */}
          <div>
            <p className="mb-2 text-black">
              Section type <span className="text-gray-500 text-sm">(optional)</span>
            </p>
            <FormItem name="sectionTypes">
              <Select mode="multiple" allowClear size="large" className="w-full" placeholder="Select" options={sectionTypes} />
            </FormItem>
          </div>

          <div className="col-span-2">
            <div className="grid lg:grid-cols-2 gap-x-20">
              <div>
                {/* Description */}
                <div>
                  <p className="mb-2 text-black">Description</p>
                  <FormItem name="description" rules={[{ required: true, message: 'Please enter description' }]}>
                    <TextArea placeholder="Write here..." autoSize={{ minRows: 2, maxRows: 10 }} />
                  </FormItem>
                </div>
              </div>
              <div>
                {/* image */}
                <p className="mb-2 text-black">Product Image</p>
                <FormItem name="image" valuePropName="image" rules={[{ required: true, message: 'Please upload product image' }]}>
                  <Upload beforeUpload={() => false} accept="image/*" maxCount={1}>
                    <Button>Click to Upload</Button>
                  </Upload>
                </FormItem>
                {/* Gallery */}
                <div>
                  <p className="mb-2 text-black">
                    Product images gallery <span className="text-gray-500 text-sm">(minimum 2 images, maximum 5)</span>
                  </p>
                  <FormItem name="gallery" valuePropName="image">
                    <Upload beforeUpload={() => false} multiple accept="image/*" maxCount={5}>
                      <Button>Click to Upload</Button>
                    </Upload>
                  </FormItem>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button disabled={loading} type="submit" className="bg-violet-600 disabled:opacity-50 text-white rounded px-7 py-2">
          Add Product
        </button>
      </div>
    </Form>
  );
}

export default AddProducts;
