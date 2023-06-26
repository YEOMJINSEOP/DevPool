import { useCallback, useEffect } from 'react';
import {Configuration, OpenAIApi} from 'openai';

function ProjectRecom(props) {
  return (
    <div>
      <div>
        <div>
          <img src="/image/server.png" alt="" />
          <p>WEB</p>
        </div>
        <div>
          <img src="/image/android.png" alt="" />
          <p>MOBILE APP</p>
        </div>
        <div>
          <p>AI</p>
        </div>
        <div>
          <p>BIG DATA</p>
        </div>
      </div>
    </div>
  )
}

export default ProjectRecom;