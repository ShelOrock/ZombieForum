import React, { useState } from 'react';

import { Button } from '../styled/Button.js';

import CodeConsole from './CodeConsole.js';

export default ({ reply, idx }) => {
  const [isRunning, setIsRunning] = useState(false);

  const handleOnClick = () => {
    setIsRunning(!isRunning);
  }

  return (
    <div>
      { isRunning ? (
        <div>
          <CodeConsole reply={reply} idx={idx}/>
          <Button onClick={handleOnClick}>Hide Code</Button>
        </div>
      ) : <Button onClick={handleOnClick}>Run Code</Button>}
    </div>
  )
}