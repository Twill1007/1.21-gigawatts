const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');
const Campground = require('../models/Campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewURLParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Databse connected');
});

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '639557b3f754b10763948e8f',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod numquam sed temporibus deleniti natus enim laborum tenetur. Itaque vel aut dolor quaerat ab sed ex minima! Maxime quas excepturi voluptate. Rerum unde ipsum accusantium est culpa ipsa temporibus atque voluptatem dolorem expedita, quo praesentium nostrum error, eligendi enim, soluta facere natus doloremque ducimus numquam quas vitae exercitationem nulla labore. Corrupti! Dolor consequuntur ipsam, ex molestiae iste eligendi corporis, facere tenetur, sit voluptate exercitationem soluta laudantium saepe magnam mollitia accusantium earum beatae consequatur atque fugiat. Nulla molestias aliquid voluptatem qui possimus?',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude

                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dfsgjpp7m/image/upload/v1671579901/YelpCamp/tpcfdhxvwaylivnao0nz.jpg',
                    filename: 'YelpCamp/rtgjyc1yxzebkz5ta9wg'

                },
                {
                    url: 'https://res.cloudinary.com/dfsgjpp7m/image/upload/v1671547890/YelpCamp/sqcjqfukumzjbhvpivdn.jpg',
                    filename: 'YelpCamp/qapfi8pcfu00ybgo42hk'

                },
                {
                    url: 'https://res.cloudinary.com/dfsgjpp7m/image/upload/v1671639566/YelpCamp/dnoflgwi7yyiikdgiehn.jpg',
                    filename: 'YelpCamp/iwuzlff7irm4qjacze9y'

                }
            ]

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})