import { useState } from 'react';
import axios, { Axios } from 'axios';
import { timeout } from '../config';
import { Alert, notification } from 'antd'
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import { BACKEND_URL } from '../config';
import { Outlet, useNavigate } from 'react-router-dom';

const RequestMethod = {

  GET: "GET",
  POST:""

}


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


export const useApiPost = (url,  reqData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [postError, setPostError] = useState(null);
  const [response, setResponse] = useState(null);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (!url){
      console.log('returnnnnnnn')
      return 
    }

    const postData = async () => {
     
      try {
        setIsLoading(true);

        const response = await axios.post(url,  reqData, {
          headers: {
            'Authorization': `Bearer ${userInfo.token}`,
            'Content-Type': 'application/json',
          }});
        setResponse(response);
        setIsLoading(false);
        setPostError(null);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            alert("unauthorised")
          }
        }
        else if (error.request) {
          console.log('Error request', error.request);
        }
        else {
          console.log("error final uncached")
        }

        setIsLoading(false);
        setPostError(error);
        setResponse(null)
      } finally {
        setIsLoading(false);
      }
    };
    postData();
  }, [url])

  return { isLoading, postError, response };
};

const useFetch =  ( url, useCache = false) => {
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
        console.log("returning from cache")
        setData(cache[url]);
        setLoading(false);
        setError(null);
      } else {

        console.log(url + " is being called")
        try {
          const { data } = await axios.get(url, {
            headers: {
              'Authorization': `Bearer ${userInfo.token}`,
              'Content-Type': 'application/json',
            }
          });
          if (useCache) cache[url] = data;
          setData(data);
          setLoading(false);
          setError(null)
        } catch (err) {
          console.log(err)
          if (err) {
            if (err.response) {
              if (err.response.status === 401) {
                console.log("unauthorised.")
                alert("unauthorised")
              }
            }
            else if (err.request) {
              console.log('Error request', err.request);
            }
            else {
              console.log('Error', err.message);
            }

          }

          setError(err);
          setData(null)
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [url]);


  return { data, loading, error }
};

export { useFetch };