import React, { useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { Row, Col, Form, Tabs, Input, Button } from "antd";
import { useDispatch } from 'react-redux';
import { updateUser } from '../redux/actions/userAction';
const { TextArea } = Input;
const { TabPane } = Tabs;

const Profile = () => {
    const [activeTab, setActiveTab] = useState("1");
    const [personalInfo, setPersonalInfo] = useState();

    const dispatch = useDispatch()
    function onPersonInfoSubmit(values) {
        setPersonalInfo(values);
        setActiveTab("2");
    }

    function allDataFinish(values) {

        const finalObj = { ...personalInfo, ...values }


        dispatch(updateUser(finalObj))

    }
    const user = JSON.parse(localStorage.getItem('user'))
    return (
        <DefaultLayout>

            <Tabs defaultActiveKey="1" activeKey={activeTab} >
                <TabPane tab="Personal Info" key="1">
                    <Form layout="vertical" onFinish={onPersonInfoSubmit} initialValues={user}>
                        <Row gutter={16}>
                            <Col lg={8} sm={24}>
                                <Form.Item
                                    label="First name"
                                    required
                                    rules={[{ required: true }]}
                                    name="firstName"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col lg={8} sm={24}>
                                <Form.Item
                                    label="Last name"
                                    required
                                    rules={[{ required: true }]}
                                    name="lastName"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col lg={8} sm={24}>
                                <Form.Item
                                    label="Email"
                                    required
                                    rules={[{ required: true }]}
                                    name="email"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col lg={8} sm={24}>
                                <Form.Item
                                    label="Mobile Number"
                                    required
                                    rules={[{ required: true }]}
                                    name="mobileNumber"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col lg={8} sm={24}>
                                <Form.Item
                                    label="Portfolio"
                                    required
                                    rules={[{ required: true }]}
                                    name="portfolio"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col lg={24} sm={24}>
                                <Form.Item
                                    label="About"
                                    required
                                    rules={[{ required: true }]}
                                    name="about"
                                >
                                    <TextArea rows={4} />
                                </Form.Item>
                            </Col>
                            <Col lg={24} sm={24}>
                                <Form.Item
                                    label="Address"
                                    required
                                    rules={[{ required: true }]}
                                    name="address"
                                >
                                    <TextArea rows={4} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Button htmlType="submit">Next</Button>
                    </Form>
                </TabPane>


                <TabPane tab="Skills and Education" key="2">
                    <Form initialValues={user} layout="vertical" onFinish={allDataFinish}>
                        <Row>
                            <Col lg={24} sm={24}>
                                <Form.List name="education">
                                    {(education, { add, remove }) => (
                                        <div>
                                            {education.map((field, index) => (
                                                <div className="flex">
                                                    <Form.Item
                                                        required
                                                        {...field}
                                                        label="Education"
                                                        style={{ width: "80%" }}
                                                        rules={[{ required: true }]}
                                                    >
                                                        <TextArea rows={4} />
                                                    </Form.Item>
                                                    <Button onClick={() => { add() }}>Add more</Button>
                                                    {index !== 0 && (<Button onClick={() => { remove(index) }}>Delete</Button>)}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </Form.List>
                            </Col>

                            <Col lg={24} sm={24}>
                                <Form.List name="skills">
                                    {(skills, { add, remove }) => (
                                        <div>
                                            {skills.map((field, index) => (
                                                <div className="flex">
                                                    <Form.Item
                                                        required
                                                        {...field}
                                                        label="Skill"
                                                        style={{ width: "80%" }}
                                                        rules={[{ required: true }]}
                                                    >
                                                        <TextArea rows={4} />
                                                    </Form.Item>
                                                    <Button onClick={() => { add() }}>Add more</Button>
                                                    {index !== 0 && (<Button onClick={() => { remove(index) }}>Delete</Button>)}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </Form.List>
                            </Col>

                            <Col lg={24} sm={24}>
                                <Form.List name="projects">
                                    {(projects, { add, remove }) => (
                                        <div>
                                            {projects.map((field, index) => (
                                                <div className="flex">
                                                    <Form.Item
                                                        required
                                                        {...field}
                                                        label="Project"
                                                        style={{ width: "80%" }}
                                                        rules={[{ required: true }]}
                                                    >
                                                        <TextArea rows={4} />
                                                    </Form.Item>
                                                    <Button onClick={() => { add() }}>Add more</Button>
                                                    {index !== 0 && (<Button onClick={() => { remove(index) }}>Delete</Button>)}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </Form.List>
                            </Col>
                            <Col lg={24} sm={24}>
                                <Form.List name="experience">
                                    {(experience, { add, remove }) => (
                                        <div>
                                            {experience.map((field, index) => (
                                                <div className="flex">
                                                    <Form.Item
                                                        required
                                                        {...field}
                                                        label="Experience"
                                                        style={{ width: "80%" }}
                                                        rules={[{ required: true }]}
                                                    >
                                                        <TextArea rows={4} />
                                                    </Form.Item>
                                                    <Button onClick={() => { add() }}>Add more</Button>
                                                    {index !== 0 && (<Button onClick={() => { remove(index) }}>Delete</Button>)}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </Form.List>
                            </Col>
                        </Row>
                        <Button onClick={() => { setActiveTab("1") }}>Previous</Button>
                        <Button htmlType="submit">Update</Button>
                    </Form>
                </TabPane>

            </Tabs>
        </DefaultLayout >
    )
}

export default Profile