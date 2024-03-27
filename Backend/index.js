import express from 'express'

const app = express();

app.get("/",(req,res)=>{
    res.json({msg:"Doy raite | Quiero Raite"})
})

app.get('/login', (req, res) => {
  res.json({msg:'Sign In'});
});

app.get('/signup', (req, res) => {
  res.json({msg:'SignUp'});
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
