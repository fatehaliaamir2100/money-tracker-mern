import './App.css';
import {useState, useEffect} from "react";

function App() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    getTransactions().then(transaction => {
      setTransaction(transaction);
    });
   }, []);

  async function getTransactions() {
    const url = 'http://localhost:3001/api/transactions';
    const response = await fetch(url);
    return await response.json();
  }

  function addNewTransaction(ev){
    ev.preventDefault();
    const url = "http://localhost:3001/api/transaction";
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        name: name, date: date, description: description, price: price})
      }).then(response => {
        response.json().then(json => {
          setName();
          setPrice();
          setDescription();
          setDate();
        });
      });
  }

  let balance = 0;
  transaction.forEach(transaction => {
    balance += transaction.price;
  });
  
  // Separate integer and fractional parts
  const integerPart = Math.floor(balance);
  const fractionalPart = (balance - integerPart).toFixed(2);
  

  return (
    <main>
      <h1>${integerPart}<span>.{fractionalPart}</span></h1>
      <form onSubmit={addNewTransaction}>
        
        <div className = "basic">
          <input  type = "text" 
                  value = {name}
                  onChange = {ev => setName(ev.target.value)}
                  placeholder = "New Samsung TV" />
          <input  type = "datetime-local"  
                  value = {date}
                  onChange = {ev => setDate(ev.target.value)}
                  placeholder = "2021-01-01T15:45" /> {/* Adjusted placeholder */}
        </div>

        <div className = "detailed">
          <input  type = "text"
                  value = {description}
                  onChange = {ev => setDescription(ev.target.value)}
                  placeholder = "Description" />
          <input  type = "number"
                  value = {price}
                  onChange = {ev => setPrice(ev.target.value)}
                  placeholder = "Price" />
        </div>

        <button type="submit">Add new transaction</button>
      </form>
      <div className="transactions">
        {transaction.length > 0 && transaction.map(transaction => {
          return (
            <div className="transaction">
              <div className="right">
                <div className="name">{transaction.name}</div>
                <div className="description">{transaction.description}</div>
              </div>
              <div className="left">
                <div className="date">{transaction.date}</div>
                <div className={"price " +(transaction.price<0)?'red':'green'}>{transaction.price}</div>
              </div>
            </div>
          )
        }
      )};
      </div>
    </main>
  );
}

export default App;
