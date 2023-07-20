import React from 'react'

const LogInForm = ({
  handleLogIn,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
}) => {
  return (
    <form onSubmit={handleLogIn}>
      <div>
        <span>username</span>
        <input
          id='logInUsername'
          type='text'
          name='username'
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <span>password</span>
        <input
          id='logInPassword'
          type='password'
          name='password'
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button type='submit'>Log in</button>
    </form>
  )
}

export default LogInForm
