//app.use(express.json());
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware per analizzare il corpo delle richieste JSON
app.set('view engine', 'ejs'); // Configura EJS come motore di template
app.listen(port, () => {
    console.log('Server is running on http://localhost:${port}');
});
// Connessione al database MySQL
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Sqlaferdita.02',
  database: 'mywebapp'
});

connection.connect((err) => {
  if (err) {
    console.error('Errore nella connessione al database:', err);
    return;
  }
  console.log('Connesso al database MySQL!');
});

// Gestione della registrazione
app.get('/', (req, res) => {
  res.send('Benvenuto nella mia app Node.js!');
});

app.post('/registrazione', (req, res) => {
  const datiUtente = req.body; // Dati inviati dal modulo HTML

  // Esegui una query SQL per inserire i dati nel database
  const query = 'INSERT INTO utenti (nome, email, password) VALUES (?, ?, ?)';
  const values = [datiUtente.nome, datiUtente.email, datiUtente.password];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Errore nell\'inserimento dei dati nel database:', err);
      res.status(500).send('Errore nel salvataggio dei dati');
    } else {
      console.log('Dati utente registrati con successo nel database');
      res.send('Registrazione completata con successo');
    }
  });
});

// Visualizzazione dei dati registrati
app.get('/visualizza-dati', (req, res) => {
  // Esegui una query SQL per ottenere i dati registrati nel database
  connection.query('SELECT * FROM utenti', (err, results) => {
    if (err) {
      console.error('Errore nella query SQL:', err);
      res.status(500).send('Errore nel recupero dei dati');
    } else {
      res.json(results);
    }
  });
});

app.listen(3000, () => {
  console.log(`Il server è in esecuzione su http://127.0.0.1:3000`);
});
