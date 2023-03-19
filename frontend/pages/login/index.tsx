import { useState } from 'react';
import Router from 'next/router';
import styles from '@/styles/Login.module.css'
import Link from 'next/link';
import Image from 'next/image'
import fb from '../../public/lFb.png';
import twitter from '../../public/l-twitter.png';
import gmail from '../../public/l-gmail.png';

const Login = () => {
  const [email, setEmail] = useState('mdsayedurr@missionreadyhq.com');
  const [password, setPassword] = useState('mdsayedur');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send a login request to your backend API
      const response = await fetch('http://localhost:5000/api/v1/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const result = await response.json()
        setError('')
        setSuccess(result.message)
        console.log(result)
        // Router.push('/'); // Redirect to dashboard page on success
      } else {
        const result = await response.json()
        setError(result.message)
        setSuccess('');
        throw new Error(await response.text());
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className={styles.login}>
         <div className={styles.loginContainer}>
         <div className={styles.logo}>
         <Image
              src="/logo.png"
              alt="banner"
              fill
            />
         </div>
         <div className={styles.social}>
            <div className={styles.socialIcon}>
                <Image
                    src={fb}
                    alt="banner"
                    fill
                    priority
                />
            </div>
            <div className={styles.socialIcon}>
                <Image
                    src={twitter}
                    alt="banner"
                    fill
                    priority
                />
            </div>
            <div className={styles.socialIcon}>
                <Image
                    src={gmail}
                    alt="banner"
                    fill
                    priority
                />
            </div>
         </div>
         <div className={styles.or}></div>
         <div className={styles.success}>
          {success? (
            <p>{success}</p>
          ): null}
         </div>
         <div className={styles.error}>
          {error? (
            <p>{error}</p>
          ): null}
         </div>
         <form onSubmit={handleSubmit}>
            <label>
                <input type="email"  placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <br />
            <label>
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <br />
            <button type="submit" className={styles.loginBtn}>Login</button>
            <h4><Link href='#'>Forgot Password</Link></h4>
            <div  className={styles.newUserdivider}></div>
            <h4><Link href='#'>New user ? Sign up</Link></h4>
            </form>
         </div>
    </div>
  );
};

export default Login;