import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

  const notify = () => {

    toast.success('Success!', {
      autoClose: 500
    })

  }

const Toast = ({status}) => {
    if(status === 200){
        notify()
    }
  return (
    <>
          <ToastContainer />
    </>

  )
}

export default Toast