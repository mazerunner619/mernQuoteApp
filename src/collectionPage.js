import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {Button,Accordion, Form, Card, Container,Nav, Navbar} from 'react-bootstrap';
import { SiInstagram } from "react-icons/si";


//NXEBIkMsXHd74lW-HBHAOzj-ARwQY87vHKVujiRvARg => unsplash access key


function Quote() {

  const [quotes, setQuotes] = useState([{
    quote : "",
    author : "",
    bg : ""
  }]);

  const [bgd, setBgd] = useState("https://source.unsplash.com/random/cartoon");

  const [ quote, setQuote ] = useState({
    quote : "",
    author : "",
  });


  useEffect(async () => {
    try{
    // const quotes = await axios.get('/disp');
    const quotes = await axios.get('https://mernquoteappserver.herokuapp.com/disp');
    console.log('fetching...');
    console.log('data fetched : ',quotes.data);
    console.log('fetched...');
    setQuotes(quotes.data);
    }catch(err){
      console.log(err);
      alert(err);
    }
  });

  function handleChange(e){
    const {name, value} = e.target;

    setQuote(prev => {
      return{
        ...prev,
        [name] : value
      }
    })
  }

function handleClick(e){

  var pos = quote.quote;

  if(pos[0] != "\""){
pos = "\""+pos;
}
if(pos[pos.length] != "\""){
pos = pos+"\"";
}

if(quote.quote && quote.author){

  setBgd("https://source.unsplash.com/random/cartoon");
  e.preventDefault();
  axios.post('https://mernquoteappserver.herokuapp.com/post', {quote : pos, author : quote.author });
  setQuote({
    quote : "",
    author : "",
  });
  }
}


const quotesArray = quotes.slice(0).reverse().map((quot => 
  <div className="cards">
        <Card className="quoteCard" >
        <Card.Img className="card-img" src="https://fsb.zobj.net/crop.php?r=D4sr-PS5vNxOUQ9J63U4miy8wsc1D9TivO7azZGAyABpmHn1g-qZyBjOhJ_oz7WrHqo0bpDXflxQkHZpkEoHQjbSycHy5mNqqCLNb8QnTy49VllypyZLrriIS7DDpbr-auU50QY2xng7Zfqn" alt="quote-image" width="100%" height="100%"  />
    <Card.ImgOverlay>
    <Card.Body className="card-body" >

    <blockquote className="blockquote mb-0">
      <p>
      {quot.quote}
      </p> 

      <footer className="blockquote-footer" >
      <cite title="Source Title" >{quot.author}</cite>
    </footer>

    </blockquote>

    </Card.Body>

  
    </Card.ImgOverlay>
    </Card>
    </div>)
    );


return (
   < div className>
     
     <img className="body-img" src="https://images.unsplash.com/photo-1619484537774-7e7b877ae4b5?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max"/>

<Navbar bg="success" variant="dark" expand="lg" sticky="top" style={{marginBottom : "10px"}}>

<Navbar.Brand href="#home" style={{marginLeft : "auto"}}>The Quotes Blog</Navbar.Brand>

</Navbar>

<Accordion style = {{background : "green"}} >
  <Card className = "accor-card">
  <Card.Header>
      <Accordion.Toggle as={Button} variant="success" eventKey="0" className="Accor">
        Have a quote ! let's add into the collection   
      </Accordion.Toggle>
    </Card.Header>
      
    <Accordion.Collapse eventKey="0">
    <Form>
  
  <Form.Group controlId="formBasicPassword">
    <Form.Label>your name</Form.Label>
    <Form.Control type="text" placeholder="your name" required  autocomplete="off" name = "author" value = {quote.author}  onChange ={handleChange}/>
  </Form.Group>
    {/* <input placeholder="name" type="text" required autocomplete="off" name = "author" value = {quote.author}  onChange ={handleChange} /> */}
    
    <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label>Your content here</Form.Label>
    <Form.Control as="textarea" rows={3} placeholder="your content here" required cols="100"  autocomplete="off" name = "quote" value = {quote.quote} onChange ={handleChange} />
  </Form.Group>
    {/* <textarea placeholder="your content here" required cols="100" rows="10" autocomplete="off" name = "quote" value = {quote.quote} onChange ={handleChange}/> */}
    
    <Button variant="success" type = "submit" onClick = {handleClick} >Add Quote</Button>
   
   </Form> 

      </Accordion.Collapse>
      </Card>
 
</Accordion>

<hr style={{color : "green"}}/>
<blockquote className="blockquote mb-1" style={{textAlign : "center",padding :'0%', color : "green", fontSize : "150"} } >
  <p>Collection</p>
</blockquote>

<hr style={{ color : "green"}}/>

   {/* {quotes.slice(0).reverse().map((quot => 
    <div className="cards">
          <Card className="quoteCard" >
          <Card.Img className="card-img" src="https://fsb.zobj.net/crop.php?r=D4sr-PS5vNxOUQ9J63U4miy8wsc1D9TivO7azZGAyABpmHn1g-qZyBjOhJ_oz7WrHqo0bpDXflxQkHZpkEoHQjbSycHy5mNqqCLNb8QnTy49VllypyZLrriIS7DDpbr-auU50QY2xng7Zfqn" alt="quote-image" width="100%" height="100%"  />
      <Card.ImgOverlay>
      <Card.Body className="card-body" >

      <blockquote className="blockquote mb-0">
        <p>
        {quot.quote}
        </p> 

        <footer className="blockquote-footer" >
        <cite title="Source Title" >{quot.author}</cite>
      </footer>

      </blockquote>

      </Card.Body>

    
      </Card.ImgOverlay>
      </Card>
      </div>)
      )} */}

      {quotesArray}

<footer className="bg-dark text-center text-white">
 
  <div className="footer">
    © 2021 Copyright@ {' '}<a href="https://www.instagram.com/happiest_depressed_1/" style={{color : 'white'}}>happiest_depressed_1 <SiInstagram /> </a>
  </div>
</footer>


   </div>
      );
}

export default Quote;