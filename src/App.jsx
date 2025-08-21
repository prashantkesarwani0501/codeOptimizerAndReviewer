import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios';
import { useState ,useEffect } from 'react'
import './App.css'

function App() {
  const [code, setcode] = useState("");
  const [review,setReview]=useState(``);
  const [isFocused, setIsFocused] = useState(false);
 
  useEffect(()=>{
    prism.highlightAll()
  },[code]);
  const placeholder = "Write your code here...";
  async function reviewCode(){
    const res=await axios.post('http://localhost:3000/ai/get-review', {code})
      setReview(res.data)
  }
  return (
    <>
     <div>
      <h1 className="h1">CODE REVIEWER</h1>
      <h2 className="h2">using gemini</h2>
     </div>
     <main>
      
      <div className="left">
        <div className="code">
        { !isFocused && <div className="placeholder">{placeholder}</div>}
        <Editor
  value={code}
  onValueChange={code => setcode(code)}
  highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
  padding={10}
  style={{
    fontFamily: 'Poppins, sans-serif',
    fontSize: 20,
    border: "1px solid #ddd",
    borderRadius: "5px",
    height: "100%",
    width: "100%"
  }}
     />

        
        </div>
        <div onClick={reviewCode} className="button" id='but1'>Review</div>
      </div>
      <div className="right">
      <Markdown
      rehypePlugins={[ rehypeHighlight ]}
      >{review}</Markdown>
      </div>
     </main>
    </>
  )
}

export default App
