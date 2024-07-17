'use client'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { getUser } from "./_libs/clientCrud";

import Button from "./_components/Button/Button";
import FormField from "./_components/FormField/FormField";

export default function Home() {
  const router = useRouter();
  const [userObject, setUserObject] = useState(null);
  

  const verifyUser = async (event) => {
    event.preventDefault();
    const formUsername = event.target.username.value || 'silvhua'; /////
    
    if (formUsername?.length > 1) {
      const response = await getUser(formUsername);
      if (response)  {
        setUserObject(response);
      }
    }
  }

  useEffect(() => {
    // useEffect is required to access localStorage
    if (userObject) {
      localStorage.setItem('userDetails', JSON.stringify(userObject));
      router.push('/dashboard');
    }
  }, [userObject]);

  const buttonProps = {
    text: 'Login',
    className: 'login-button'
  }

  const usernameInputProps = {
    type: 'text',
    className: 'input--wide',
    name: 'username',
    placeholder: 'username'
  }
  const passwordInputProps = {
    type: 'password',
    className: 'input--wide',
    name: 'password',
    placeholder: 'password'
  }
  return (
    <section className="login">
      <form onSubmit={verifyUser}
      >
        <FormField formFieldProps={usernameInputProps} />
        <FormField formFieldProps={passwordInputProps} />
        <Button buttonProps={buttonProps} />
      </form>
    </section>
  );
}
