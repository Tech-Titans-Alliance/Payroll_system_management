import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const allowedEmails = [
  'ngwenyaasanda13@gmail.com',
  'rolivhuwamuzila@gmail.com',
  'Atlehangasemela@gmail.com',
  'xolanisyav04@gmail.com',
  'Palesaclaudia2@gmail.com',
  'Rokhuda.Tshitimbi@capaciti.org.za'
];

function generatePassword() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
}

const passwordStore = {}; // email-password mapping (in-memory for demo)

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [step, setStep] = useState(1); // 1 = enter email, 2 = enter password
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGenerate = () => {
    if (allowedEmails.includes(email)) {
      const pwd = generatePassword();
      passwordStore[email] = pwd;
      setGeneratedPassword(pwd);
      setStep(2);
      setError('');
    } else {
      setError('Email not recognized.');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordStore[email] === passwordInput) {
      setError('');
      onLoginSuccess(); // Call onLoginSuccess when login is successful
      navigate('/dashboard'); // Redirect to the dashboard
    } else {
      setError('Incorrect password.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Secure Login</h2>

      {step === 1 && (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button style={styles.button} onClick={handleGenerate}>
            Generate Access Password
          </button>
        </>
      )}

      {step === 2 && (
        <form onSubmit={handleLogin} style={styles.form}>
          <p><strong>Generated password:</strong> {generatedPassword}</p>
          <input
            type="password"
            placeholder="Enter generated password"
            style={styles.input}
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            required
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
      )}

      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#f2f2f2',
    padding: '2rem',
    maxWidth: '400px',
    margin: '5rem auto',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  heading: {
    color: '#000'
  },
  input: {
    padding: '0.6rem',
    width: '100%',
    margin: '1rem 0',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '0.7rem',
    backgroundColor: '#e30613',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    width: '100%',
    cursor: 'pointer'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  error: {
    color: 'red',
    marginTop: '1rem'
  }
};

export default Login;

