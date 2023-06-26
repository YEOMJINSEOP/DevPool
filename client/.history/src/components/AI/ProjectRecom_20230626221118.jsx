import { useCallback, useEffect } from 'react';
import {Configuration, OpenAIApi} from 'openai';

function ProjectRecom(props) {
  return (
    <div>
      <div>
        <div>
          <img src="/image/internet.png" alt="Web" />
          <p>WEB</p>
        </div>
        <div>
          <img src="/image/mobile-app.png" alt="Mobile App" />
          <p>MOBILE APP</p>
        </div>
        <div>
          <img src="/image/ai.png" alt="AI" />
          <p>AI</p>
        </div>
        <div>
          <img src="/image/big-data.png" alt="Big Data" />
          <p>BIG DATA</p>
        </div>
      </div>
    </div>
  )
}

export default ProjectRecom;