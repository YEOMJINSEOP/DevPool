import { useCallback, useEffect } from 'react';
import {Configuration, OpenAIApi} from 'openai';

function ProjectRecom(props) {
  
  const fetchOpenApi = useCallback(() => {
    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });

    new OpenAIApi(configuration)
      .createCompletion({
        model: 'text-davinci-003',
        prompt: 'Say this is a test',
        temperature: 0,
        max_tokens: 7,
      })
      .then((res) => {
        const { data } = res;

        console.log(data);
      });
  }, []);

  useEffect(() => {
    fetchOpenApi(); // Mount 시 호출한다.
  }, []);

  return <div>openai</div>;
}

export default ProjectRecom;