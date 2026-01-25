import React, { useEffect } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useSelector, useDispatch } from "react-redux";
import { getAlljobs } from '../redux/actions/jobActions';
import moment from "moment";

// Import From Antd
import { Row, Col, Button } from "antd";
import { Link } from "react-router-dom";

const Home = () => {

    const { jobs } = useSelector(state => state.jobsReducer);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAlljobs())
    }, [])
    return (

        <div>
            <DefaultLayout>
                <Row gutter={16}>
                    {jobs.map((job) => {
                        return <Col lg={12} sm={24} classNamevisible="containerres" key={job._id}>
                            <div className="job-div bs m-2 p-2" key={job._id}>
                                <h4>{job.title}</h4>
                                <p>{job.company}</p>
                                <hr />
                                <p>
                                    {job.smallDescription.slice(0, 150)}
                                    {job.smallDescription.length < 150 ? '' : <text>...view More</text>}</p>
                                <div className="flex">
                                    <p>Salary : <b>{job.salaryFrom} - {job.salaryTo}</b> , </p>
                                    <p style={{ marginLeft: 20 }}>Experience : <b>{job.experience} Years</b> </p>

                                </div>
                                <hr />

                                <div className="flex justify-content-between">
                                    <Link to={`/jobs/${job._id}`}><Button>View</Button></Link>
                                    <p>Posted on : {moment(job.createdAt).format('MMM DD yyyy')}</p>
                                </div>

                            </div>
                        </Col>;
                    })}
                </Row>
            </DefaultLayout>
        </div>
    )
}

export default Home