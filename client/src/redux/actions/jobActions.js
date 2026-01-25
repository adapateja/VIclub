import axios from 'axios';
import { message } from "antd";


//  To Get ALl Jobs From DataBase 

export const getAlljobs = () => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })
    try {
        const response = await axios.get('/api/jobs/getalljobs')

        dispatch({ type: "GET_ALL_JOBS", payload: response.data });
        dispatch({ type: 'LOADING', payload: false })

    } catch (error) {
        dispatch({ type: 'LOADING', payload: false })


    }
}

//  To Post Jobs To DataBase 


export const postJob = (values) => async (dispatch) => {
    values.postedBy = JSON.parse(localStorage.getItem("user"))._id;

    dispatch({ type: "LOADING", payload: true });
    try {
        await axios.post("/api/jobs/postjob", values);

        dispatch({ type: "LOADING", payload: false });
        message.success("Job Posted Successfully");

        setTimeout(() => {
            window.location.href = "/";
        }, 1000);
    } catch (error) {
        dispatch({ type: "LOADING", payload: false });
    }
};



// Edit Job


export const editJob = (values) => async (dispatch) => {
    dispatch({ type: "LOADING", payload: true });
    try {
        await axios.post("/api/jobs/editjob", values);

        dispatch({ type: "LOADING", payload: false });
        message.success("Job Updated Successfully");

        setTimeout(() => {
            window.location.href = "/";
        }, 1000);
    } catch (error) {
        dispatch({ type: "LOADING", payload: false });
    }
};


//  Apply Job


export const applyJob = (job) => async (dispatch) => {


    const user = JSON.parse(localStorage.getItem("user"))

    dispatch({ type: "LOADING", payload: true });
    try {
        await axios.post("/api/jobs/applyjob", { job, user });

        dispatch({ type: "LOADING", payload: false });
        message.success("Job applied Successfully");

        setTimeout(() => {
            window.location.href = "/";
        }, 1000);
    } catch (error) {
        dispatch({ type: "LOADING", payload: false });
    }
};




// Searh Job

export const searchJobs = (searchKey) => async (dispatch) => {
    dispatch({ type: "LOADING", payload: true });
    try {
        const response = await axios.get("/api/jobs/getalljobs");

        const jobs = response.data

        const filteredJobs = jobs.filter(job => job.title.toLowerCase().includes(searchKey.toLowerCase()))

        dispatch({ type: "GET_ALL_JOBS", payload: filteredJobs });
        dispatch({ type: "LOADING", payload: false });
    } catch (error) {
        dispatch({ type: "LOADING", payload: false });
    }
};


// Sort Job

export const sortJobs = (values) => async (dispatch) => {
    dispatch({ type: "LOADING", payload: true });
    try {
        const response = await axios.get("/api/jobs/getalljobs");

        const jobs = response.data

        var filteredJobs = jobs

        if (values.experience !== undefined) {

            filteredJobs = jobs.filter(job => job.experience <= values.experience)

        }
        if (values.salary !== undefined) {
            filteredJobs = jobs.filter(job => job.salaryTo >= values.salary)
        }

        dispatch({ type: "GET_ALL_JOBS", payload: filteredJobs });
        dispatch({ type: "LOADING", payload: false });
    } catch (error) {
        dispatch({ type: "LOADING", payload: false });
    }
};