import { useState } from 'react';
import axios, { Axios } from 'axios';
import { timeout } from '../config';
import {notification} from 'antd'
import { useEffect } from 'react';
import {useSelector} from "react-redux";
import { BACKEND_URL } from '../config';
import { Outlet, useNavigate } from 'react-router-dom';


axios.defaults.baseURL = BACKEND_URL;

export const useNotification = () => {
  const callNotification = (description,type) =>{
      notification.open({
        message: 'info',
        description: description,
        duration: 3, // Duration in seconds, 0 means the notification won't close automatically,
        type: type
        
      });
    }
  return { callNotification}  
}

const cache = {};


export const useApiPost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const postData = async (url, reqData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(url, reqData);
      setData(response.data);
      // alert(response.data.Code)
      return response.data;
    } catch (error) {
      setError(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, data, postData };
};

 const useFetch = (url, useCache=false) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const  {userInfo}  = useSelector((state) => state.user);
  useEffect(() => {
    const fetchData = async () => {
      if (useCache && cache[url]) {
        console.log("returning from cache")
        setData(cache[url]);
        setLoading(false);
        setError(null);
      } else {

      console.log(url+" is being called")
      try {
        const { data } = await axios.get(url,{headers: {
         'Authorization': `Bearer ${userInfo.token}`,
          'Content-Type': 'application/json',
        }});
        if (useCache) cache[url] = data;
        setData(data);
        setLoading(false);
        setError(null)
      } catch (err) {
        console.log(err)
        if (err.response.status ==='401'){
          console.log("unauthorised")
        }
        setError(err);
        setData(null)
        setLoading(false);
      }
    }};
    fetchData();
  }, [url]);
  
    
  return {data, loading, error}
};

export { useFetch };