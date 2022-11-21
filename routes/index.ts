import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
  console.log('got request');
  res.send({ message: 'Welcome newcomer, nice to meet you' })
});

router.get('/products', (req, res) => {

});
router.put('/products', (req, res) => {
  
});
router.post('/products', (req, res) => {
  
});
router.delete('/products', (req, res) => {
  
});

export { router };
