import telebot

bot = telebot.TeleBot("6552550937:AAEtYxc7BAtRBiS_m0Y_noQQGwYGRzfcDB4") 

products = {
    1: {'name': 'Apples', 'price': 1.99},
    2: {'name': 'Oranges', 'price': 2.49},
    3: {'name': 'Bananas', 'price': 0.99},
    4: {'name': 'Strawberries', 'price': 3.99}
}

@bot.message_handler(commands=['start'])
def start(message):
    bot.send_message(message.chat.id, "Welcome! Please choose a product:", reply_markup=product_keyboard())

def product_keyboard():
    keyboard = telebot.types.ReplyKeyboardMarkup(resize_keyboard=True)
    for product_id in products:
        keyboard.add(products[product_id]['name'])
    return keyboard

@bot.message_handler(func=lambda message: message.text in [p['name'] for p in products.values()])
def buy(message):
    product_name = message.text
    product = list(filter(lambda p: p['name'] == product_name, products.values()))[0]
    bot.send_message(message.chat.id, f"Great, you bought {product['name']} for {product['price']}$")

bot.polling()
