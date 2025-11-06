const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  try {
    
    console.log('Contact form submission:', { name, email, message });
    
    res.json({ message: 'Your message has been received!' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: 'Server error while submitting contact form.' });
  }
});

module.exports = router;
