const mongoose = require('mongoose')


const eventModel = new mongoose.Schema({
    eventType:{
        type:String,
        enum:['Birthday', 'Wedding', 'Engagement Party', 'Concert', 'Party'],
        required: true
    },
    eventDate: {
      type: String,
      match: /^\d{2}-\d{2}-\d{4}$/, // "dd-mm-yyyy"
      required: true
    },
    eventLocation: {
      type: String,
      validate: {
        validator: function(value) {
          const validDistricts = [
            'Adalar', 'Arnavutköy', 'Ataşehir', 'Avcılar', 'Bağcılar', 'Bahçelievler', 'Bakırköy', 
            'Başakşehir', 'Bayrampaşa', 'Beşiktaş', 'Beykoz', 'Beylikdüzü', 'Beyoğlu', 'Büyükçekmece', 
            'Çatalca', 'Çekmeköy', 'Esenler', 'Esenyurt', 'Eyüp', 'Fatih', 'Gaziosmanpaşa', 'Güngören', 
            'Kadıköy', 'Kağıthane', 'Kartal', 'Küçükçekmece', 'Maltepe', 'Pendik', 'Sancaktepe', 
            'Sarıyer', 'Silivri', 'Sultanbeyli', 'Sultangazi', 'Şile', 'Şişli', 'Tuzla', 'Ümraniye', 
            'Üsküdar', 'Zeytinburnu'
          ];
          const [district, city] = value.split(',').map(s => s.trim());
          return city === 'Istanbul' && validDistricts.includes(district);
        },
        message: 'Enter a valid city'
      },
      required: true
    },
    eventBudget: {
      type: Number,
      validate: {
        validator: function(value) {
          return value >= 0 && value <= 999000000;
        },
        message: 'Budget must be between 0 and 999 million.'
      }
    },
    eventDecors: {
      type: Array,
      of: new mongoose.Schema({
        name: { type: String, required: true },
        detail: { type: String, required: true },
        price: {type:Number}
      }),
      default: []
    },
    eventAttendees: {
      type: [String],
      validate: {
        validator: function(value) {
          return value.every(name => /^[a-zA-ZçÇğĞıİöÖşŞüÜ ]+$/.test(name));
        },
        message: 'Format: "Name Surname"'
      },
      default: []
    },
    eventManager: {
      type: String,
      default: 'Zeynep Elmacı'
    },
    eventOrganizers: {
      type: [
        {
          role: { type: String, enum: ['Lead', 'Helper'], required: true },
          name: { type: String, required: true }
        }
      ],
      validate: {
        validator: function(value) {
          return value.length === 2 && value.some(o => o.role === 'Lead') &&
                 value.some(o => o.role === 'Helper');
        },
        message: 'Must be 2 organizer: Lead-Helper'
      },
      default: [
        { role: 'Lead', name: 'Barış Arduç' },
        { role: 'Helper', name: 'Gupse Özay' }
      ]
    },
    eventStatus: {
      type: String,
      enum: ['Planning Stage', 'Planned', 'In Progress', 'Completed'], 
      default: 'planlanma aşaması'
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      required: true
    }
  }, {
    timestamps: true 
  });

const Event = mongoose.model('Event', eventModel);
module.exports = Event

