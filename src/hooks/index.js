import { useState } from 'react';
import axios, { Axios } from 'axios';
import { timeout } from '../config';
import { Alert, notification } from 'antd'
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import { BACKEND_URL } from '../config';
import { Outlet, useNavigate } from 'react-router-dom';



axios.defaults.baseURL = BACKEND_URL;
axios.defaults.timeout = 50000;

export const useNotification = () => {
  const callNotification = (description, type) => {
    notification.open({
      message: 'info',
      description: description,
      duration: 3, // Duration in seconds, 0 means the notification won't close automatically,
      type: type

    });
  }
  return { callNotification }
}

const cache = {};


 const useApiPost = (url,  data) => {
  const [isLoading, setIsLoading] = useState(false);
  const [postError, setPostError] = useState(null);
  const [response, setResponse] = useState(null);

  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {

    if (!url){
      return 
    }

    const postData = async () => {
     
      try {
        setIsLoading(true);
        const resdata = await axios.post(url,  data,  {
          headers: {
            'Authorization': `Bearer ${userInfo.token}`,
            'Content-Type': 'application/json',
        }});
        setResponse(resdata?.data);
   
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            alert("unauthorised")
          }
        }
        setPostError(error);      
      } finally {
        setIsLoading(false);
      }
    };

   postData();
  }, [url])

  return [ isLoading, response, postError ];
};




const useFetch =  (url, useCache = false) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInfo } = useSelector((state) => state.user);
  
  useEffect(() => {
    if (!url){
      return
    }
    const fetchData = async () => {
      if (useCache && cache[url]) {
        setData(cache[url]);
     
      } else {
        try {
          const { data } = await axios.get(url, {
            headers: {
              'Authorization': `Bearer ${userInfo.token}`,
              'Content-Type': 'application/json',
            }
          });
          if (useCache) cache[url] = data;
          setData(data);
  
        } catch (err) {
          console.log(err)
          if (err) {           
              if (err.response?.status === 401) {
              //handle unauthenticated flow
              }
          }
          setError(err);
       
        }finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [url]);


  return [data, loading, error ]
};

export { useFetch, useApiPost };