const mongoose = require('mongoose');

const clientModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    match: /^[a-zA-ZçÇğĞıİöÖşŞüÜ]+ [a-zA-ZçÇğĞıİöÖşŞüÜ]+$/ // Türkçe karakter desteği
  },
  bday: {
    type: Date, // bday alanını Date türüne değiştirdik
    required: true,
    validate: {
      validator: function(value) {
        // Tarihin geçerli bir tarih olup olmadığını doğrular
        return !isNaN(value.getTime());
      },
      message: 'Invalid date format.'
    }
  },
  age: {
    type: Number,
    default: function() {
      const today = new Date();
      const birthDate = new Date(this.bday);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }
  },
  budget: {
    type: Number,
    required: true,
    validate: {
      validator: function(value) {
        return value >= 0 && value <= 999000000;
      },
      message: 'Budget must be between 0 and 999 million.'
    }
  },
  phone: {
    type: String,
    required: true,
    match: /^0\d{10}$/, 
    validate: {
      validator: function(value) {
        return /^0\d{10}$/.test(value);
      },
      message: 'Phone number must be in the format 0XXXXXXXXXX.'
    }
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    validate: {
      validator: function(value) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      },
      message: 'Invalid email format.'
    }
  }
}, {
  timestamps: true
});

const Client = mongoose.model('Client', clientModel);
module.exports = Client;
