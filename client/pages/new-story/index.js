import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Form, Input, Button, Card, Select } from 'antd';
import { getStoryDetails, ADD_STORY } from '../../services';
import { useMutation } from '@apollo/client';
import Link from 'next/link';

const { TextArea } = Input;

const index = () => {

    const [id, setId] = useState(uuidv4());
    // const [AddStory] = useMutation(ADD_STORY);

    const [selectedContinent, setSelectedContinent] = useState([]);
    console.log(selectedContinent);

    const onFinish = values => {
        const { title, slug, continent, date, excerpt, content, featuredImage } = values;
        setId(uuidv4());

        AddStory({
            variables: {
                id, title, slug, continent, date, excerpt, content, featuredImage
            }, 
        update: (cache, { data: { addStory } }) => {
            const data = cache.readQuery({ query: getStoryDetails });
            cache.writeQuery({ query: getStoryDetails, data: { ...data, story: [...data.story, addStory] } });
        }
        })
    }

  return (
    <Card title="Create your travel story" style={{ width: '50%', margin: '0 auto', marginTop: 50 }}>
            <Form name='story-form' onFinish={onFinish}>
                <div>
                    <Form.Item name="title" label="Title" rules={[{ required: true, message: "Please input the title"}]}>
                        <Input placeholder='Ex. Seattle Space Niddle'/>
                    </Form.Item>
                    <Form.Item name="slug" label="Slug" rules={[{ required: true, message: "Please input the slug"}]}>
                        <Input placeholder='seattle-space-niddle'/>
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
                        <Input placeholder='2022-12-10'/>
                    </Form.Item>
                    <Form.Item name="excerpt" label="Excerpt" rules={[{ required: true, message: "Please write the excerpt"}]}>
                        <TextArea rows={2} />
                    </Form.Item>
                </div>
                <Form.Item name="content" label="Content" rules={[{ required: true, message: "Please write the content"}]}>
                    <TextArea rows={10} />
              </Form.Item>
              <div className="text-center"> 
                <Link href={`/home`}>
                    <Button className="bg-blue-500" type="primary" size="large" block>Create</Button>
                </Link>
              </div>
            </Form>
        </Card> 
)
}

export default index