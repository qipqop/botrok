import TelegramBot from 'node-telegram-bot-api';

const token = '6552550937:AAEtYxc7BAtRBiS_m0Y_noQQGwYGRzfcDB4';

const bot = new TelegramBot(token, {polling: true});

const products = {
  1: {name: 'Apples', price: 1.99},
  2: {name: 'Oranges', price: 2.49},
  3: {name: 'Bananas', price: 0.99},
  4: {name: 'Strawberries', price: 3.99}  
};

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Welcome! Please choose a product:', {
    reply_markup: {
      keyboard: Object.values(products).map(p => p.name),
      resize_keyboard: true
    }
  });
});

bot.onText(new RegExp(Object.values(products).map(p => p.name).join('|')), async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;

  const product = products[Object.keys(products).find(key => products[key].name === text)];

  bot.sendMessage(chatId, `Great, you bought ${product.name} for ${product.price}$`); 
});

export default bot;
