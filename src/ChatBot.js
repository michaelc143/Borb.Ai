import React, { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import './ChatBot.css';

function ChatBot() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const secretKey = process.env.REACT_APP_SECRET_KEY;
  const configuration = new Configuration({
      organization: secretKey,
      apiKey: apiKey,
  });
  const openai = new OpenAIApi(configuration);
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [useImageBtn, setUseImageBtn] = useState(false);

  const handleImage = async (event) => {
    event.preventDefault();
    const response = await openai.createImage({
      prompt: input,
      n: 5,
      size: "1024x1024",
    });
    setResponse(response.data.data[0].url);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(apiKey);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: input,
      max_tokens: 500,
      temperature: 0,
    }); //response.data.choices[0].text
    setResponse(response.data.choices[0].text);
  };

  const submissionType = useImageBtn ? handleImage : handleSubmit;

  return (
    <div id='page'>
      <h1>Borb.AI</h1>
      <br />
      <span className='toggle-logo'>Toggle image mode (off by default):</span>
      <label class="toggle">
        <input type='checkbox' checked={useImageBtn} onChange={() => setUseImageBtn(!useImageBtn)} />
        <span class="slider"></span>
      </label>
      <form onSubmit={submissionType}>
        <label>
          Input:
          <input className='chat-input-box' type="text" value={input} onChange={(event) => setInput(event.target.value)} />
        </label>
        <button type="submit" className='submit-btn'>Submit</button>
      </form>
      <p className='response-field'>Response: {response}</p>
      <div className='prev-imgs'>
        <h2>Previously generated images</h2>
        
      </div>
    </div>
  );
}

export default ChatBot;