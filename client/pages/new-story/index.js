import React, { useState } from 'react';
import { Form, Input, Button, Card, Select } from 'antd';

const { TextArea } = Input;

const index = () => {

    const [selectedContinent, setSelectedContinent] = useState([]);
    console.log(selectedContinent);

  return (
    <Card title="Create your travel story" style={{ width: '50%', margin: '0 auto', marginTop: 50 }}>
            <Form name='story-form'>
                <div>
                    <Form.Item name="title" label="Title" rules={[{ required: true, message: "Please input the title"}]}>
                        <Input placeholder='Title your story'/>
                    </Form.Item>
                    <Form.Item name="continent" label="Continent" rules={[{ required: true, message: "Please select the continent"}]}>
                    <Select placeholder="Please select" onChange={(value) => setSelectedContinent(value)}>
                        <Select.Option value="asia">Asia</Select.Option>
                        <Select.Option value="europe">Europe</Select.Option>
                        <Select.Option value="north-america">North-america</Select.Option>
                        <Select.Option value="south-america">South-america</Select.Option>
                        <Select.Option value="oceania">Oceania</Select.Option>
                        <Select.Option value="africa">Africa</Select.Option>
                    </Select>
                    </Form.Item>
                </div>
                <div>
                    <Form.Item name="date" label="Date" rules={[{ required: true, message: "Please input the date"}]}>
                        <Input placeholder='Date'/>
                    </Form.Item>
                    <Form.Item name="excerpt" label="Excerpt" rules={[{ required: true, message: "Please write the excerpt"}]}>
                        <TextArea rows={2} />
                    </Form.Item>
                </div>
                <Form.Item name="content" label="Content" rules={[{ required: true, message: "Please write the content"}]}>
                    <TextArea rows={10} />
                </Form.Item>
            </Form>
        </Card>
  )
}

export default index