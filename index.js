const { Telegraf, Markup } = require('telegraf')
const { message } = require('telegraf/filters')
require('dotenv').config()
const text = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN)

//Команда start начало работы бота, приветственное сообщение
bot.start((ctx) => ctx.replyWithHTML(`<b>Привет ${ctx.message.from.first_name ? ctx.message.from.first_name : 'друг'}!</b>
Добро пожаловать в <b>NETTLE</b>!💚 💚 💚

Перед началом обучения скачай: 

📒✏️Учебный материал📒✏️

➡️ <b>Меню</b> ➡️ <b>Основное меню</b>`))


bot.on(message('sticker'), (ctx) => ctx.reply('👍'))

// Команда Help отправляет список команд
bot.help((ctx) => ctx.reply(text.command)) 


// Клавиатура, пояляется при вызове команды menu
bot.command("menu", async ctx => {
	return await ctx.reply(
		"Выбери пункт из списка ⤵️",
		Markup.keyboard([
			["🔍 Библиотека", "😎 Тесты"], // 1 ряд с 2 кнопками
			["⭐️ Учебный материал"], // 2 ряд с 1 кнопкой 
			["📢 Технология продаж"], // 3 ряд с 1 кнопкой
		])
			.oneTime()
			.resize(),
	);
});

// При нажатии на кнопку "🔍 Библиотека" на клавиатуре бота, появляется меню "Библиотека"
bot.hears("🔍 Библиотека", async (ctx)=> {
  try {
    await ctx.replyWithPhoto({ source: 'img/Library1.jpg' });
    await ctx.replyWithHTML('✨ 🔮 🌠 🌟<b>Библиотека</b> ✨ 🔮 🌠 🌟', Markup.inlineKeyboard(
  [
      [Markup.button.url('О компании', 'https://disk.yandex.ru/i/j42dQBuFHJeV5w')],
      [Markup.button.url('Стандарты униформы', 'https://disk.yandex.ru/i/z0yWkNgtz6UOYg')],
      [Markup.button.url('Стандарты обслуживания', 'https://disk.yandex.ru/i/yj0_PU8Vov2Tnw')],
      [Markup.button.url('О товаре', 'https://disk.yandex.ru/i/zTe8h5L6_DUwBg')],
      [Markup.button.url('Мерчандайзинг', 'https://disk.yandex.ru/i/7-Ss-uQthXzO8A')],
      [Markup.button.callback('Технология продаж', 'sales_btn')],
      [Markup.button.callback('Задания', 'task_btn'), Markup.button.callback('Тесты', 'test_btn')]
  ]
))
} catch (e) {
  console.error(e)
}
})  

// При нажатии на кнопку "⭐️ Учебный материал" на клавиатуре бота, появляется меню "Учебный материал"
bot.hears("⭐️ Учебный материал", async (ctx)=> {
  try {
await ctx.replyWithHTML('🙋‍♂️ 🦄 🙋🏽‍♀️<b>Учебный материал</b>🦄 🙋🏽‍♀️', Markup.inlineKeyboard(
  [
      [Markup.button.callback('Дневник стажёра', 'frame_btn'), Markup.button.callback('Тетрадь стажёра', 'workbook_btn')],
      [Markup.button.callback('Шпаргалки', 'cheat_btn')],
      [Markup.button.callback('Уже!', 'menu_btn')]
  ]
))
} catch (e) {
  console.error(e)
}
})


// При нажатии на кнопку "😎 Тесты" на клавиатуре бота, появляется меню "Тесты"
bot.hears("😎 Тесты", async (ctx)=> {
  try {
      await ctx.replyWithPhoto({ source: 'img/test.jpg' });
      await ctx.replyWithHTML('💻 📚 🥤<b>Тесты</b> 💻 📚 🥤', Markup.inlineKeyboard(
  [
    [Markup.button.url('Клиентский сервис', 't.me/QuizBot?start=xE3q41fN')],
    [Markup.button.url('Правила мерчандайзинга', 't.me/QuizBot?start=3tnIbqbw')], 
    [Markup.button.url('Ассортимент', 't.me/QuizBot?start=7nWNe9YI')],
    [Markup.button.url('Итоговый тест', 't.me/QuizBot?start=2OL6y6Id')],
    [Markup.button.callback('В меню', 'menu_btn')]
  ]

))
} catch (e) {
  console.error(e)
}
})

// При нажатии на кнопку "📢 Технология продаж" на клавиатуре бота, появляется меню "Технология продаж"
bot.hears("📢 Технология продаж", async (ctx)=> {
  try {
      await ctx.replyWithPhoto({ source: 'img/sale-technik.jpg' });
      await ctx.replyWithHTML('👩🏽‍🎓 📚 ✍ 🧠<b>Технология продаж</b>', Markup.inlineKeyboard(
  [
      [Markup.button.url('Часть 1', 'https://disk.yandex.ru/i/Wp8m8Jp2u-28qA')],
      [Markup.button.url('Часть 2', 'https://disk.yandex.ru/i/q3-r4qZvrjhTuw')],
      [Markup.button.url('Часть 3', 'https://disk.yandex.ru/i/8bKChocwvhBvnw')],
      [Markup.button.callback('В меню', 'menu_btn')]
  ]
))
} catch (e) {
  console.error(e)
}
})


// При отправке рандомного сообщения, пользователь получает данное сообщение
bot.on(message('text'), (ctx) => ctx.replyWithHTML(`<b>${ctx.message.from.first_name ? ctx.message.from.first_name : 'друг'}, рад тебе всегда!❤️  

Но сейчас, предлагаю продолжить обучение! 
Так... на чем мы остановились?</b>👀✨👇🏽`))


//Действие вызывающая меню Библиотека, при нажатии на кнопку "Уже!" и "В меню"
bot.action('cheat_btn', async (ctx)=> {
  try {
      await ctx.replyWithPhoto({ source: 'img/library.jpg' });
      await ctx.replyWithHTML('<b>👀 Шпаргалки в помощь 👀</b>', Markup.inlineKeyboard(
  [
    [Markup.button.url('Активное слушание', 'https://disk.yandex.ru/i/EzY_7Bsd5rfvTg')],
    [Markup.button.url('Отработка возражений', 'https://disk.yandex.ru/i/7ThbdkUZ_H_X7A')],
    [Markup.button.url('Эпитеты в продажах', 'https://disk.yandex.ru/i/Vcj2fHEWY-PTIA')],
    [Markup.button.url('Работа с возвратами', 'https://disk.yandex.ru/i/Bl3d-VIAuBFzzg')], 
    [Markup.button.callback('В меню', 'menu_btn')]
  ]
))
} catch (e) {
  console.error(e)
}
})     


//Действие вызывающая меню Библиотека, при нажатии на кнопку "Уже!" и "В меню"
  bot.action('menu_btn', async (ctx)=> {
    try {
        await ctx.replyWithPhoto({ source: 'img/Library1.jpg' });
        await ctx.replyWithHTML('✨ 🔮 🌠 🌟<b>Библиотека</b> ✨ 🔮 🌠 🌟', Markup.inlineKeyboard(
    [
      [Markup.button.url('О компании', 'https://disk.yandex.ru/i/j42dQBuFHJeV5w')],
      [Markup.button.url('Стандарты униформы', 'https://disk.yandex.ru/i/z0yWkNgtz6UOYg')],
      [Markup.button.url('Стандарты обслуживания', 'https://disk.yandex.ru/i/yj0_PU8Vov2Tnw')],
      [Markup.button.url('О товаре', 'https://disk.yandex.ru/i/zTe8h5L6_DUwBg')],
      [Markup.button.url('Мерчандайзинг', 'https://disk.yandex.ru/i/7-Ss-uQthXzO8A')],
      [Markup.button.callback('Технология продаж', 'sales_btn')],
      [Markup.button.callback('Задания', 'task_btn'), Markup.button.callback('Тесты', 'test_btn')]

    ]
 ))
} catch (e) {
    console.error(e)
 }
})


// Действие вызывающее меню курса Технология продаж, при нажатии на кнопку "Технология продаж" в основном меню "Библиотека"
bot.action('sales_btn', async (ctx)=> {
    try {
        await ctx.replyWithPhoto({ source: 'img/sale-technik.jpg' });
        await ctx.replyWithHTML('👩🏽‍🎓 📚 ✍ 🧠<b>Технология продаж</b> 👩🏽‍🎓', Markup.inlineKeyboard(
    [
      [Markup.button.url('Часть 1', 'https://disk.yandex.ru/i/Wp8m8Jp2u-28qA')],
      [Markup.button.url('Часть 2', 'https://disk.yandex.ru/i/q3-r4qZvrjhTuw')],
      [Markup.button.url('Часть 3', 'https://disk.yandex.ru/i/8bKChocwvhBvnw')],
      [Markup.button.callback('В меню', 'menu_btn')]
    ]
 ))
} catch (e) {
    console.error(e)
 }
})


// Действие вызывающее меню с тестами, при нажатии на кнопку "Тесты" в основном меню "Библиотека"
bot.action('test_btn', async (ctx)=> {
  try {
      await ctx.replyWithPhoto({ source: 'img/test.jpg' });
      await ctx.replyWithHTML('💻 📚 🥤<b>Тесты</b> 💻 📚 🥤', Markup.inlineKeyboard(
  [
    [Markup.button.url('Клиентский сервис', 't.me/QuizBot?start=xE3q41fN')],
    [Markup.button.url('Правила мерчандайзинга', 't.me/QuizBot?start=3tnIbqbw')], 
    [Markup.button.url('Ассортимент', 't.me/QuizBot?start=7nWNe9YI')],
    [Markup.button.url('Итоговый тест', 't.me/QuizBot?start=2OL6y6Id')],
    [Markup.button.callback('В меню', 'menu_btn')]
  ] 

))
} catch (e) {
  console.error(e)
}
})

// Действие вызывающее меню с проверочными заданиями, при нажатии на кнопку "Проверочные задания" в основном меню "Библиотека"
bot.action('task_btn', async (ctx)=> {
  try {
      await ctx.replyWithPhoto({ source: 'img/task.jpg' });
      await ctx.replyWithHTML('<b>Проверочные задания</b> 🧑🏾 ☕ 👀 ✍', Markup.inlineKeyboard(
  [
  
      [Markup.button.url('Установление контакта', 'https://forms.yandex.ru/u/6579d8c7c09c026a283a268f/')],
      [Markup.button.url('Мерчандайзинг', 'https://forms.yandex.ru/u/6579b75402848f6675b48663/')],
      [Markup.button.url('Выявление потребности', 'https://forms.yandex.ru/u/6579d69484227c694114f785/')],
      [Markup.button.url('Стандарты обслуживания', 'https://forms.yandex.ru/u/6579d3b7eb614668f4e18d51/')],
      [Markup.button.url('Презентация', 'https://forms.yandex.ru/u/6579d7a2f47e736b26167df2/')],
      [Markup.button.url('Работа с возражениями', 'https://forms.yandex.ru/u/6579d99d69387266ed69a1ae/')],
      [Markup.button.url('Завершение сделки', 'https://forms.yandex.ru/u/6579db2469387266c969a1ab/')],
      [Markup.button.callback('В меню', 'menu_btn')]

  ]
))
} catch (e) {
  console.error(e)
}
})

  function addActionBot(name, src, text, workButton = true, backButton = true) {
    bot.action(name, async (ctx) => {
        try {
            await ctx.answerCbQuery();
            if (src !== false) {
                if (typeof src === 'string') {
                    // если источник - строка, то это путь к изображению
                    await ctx.replyWithPhoto({ source: src });
                } else {
                    // иначе, это объект с метаданными о ресурсе
                    if (src.type === 'photo') {
                        await ctx.replyWithPhoto(src);
                    } else if (src.type === 'document') {
                        await ctx.replyWithDocument(src);
                    }
                }
            }
            await ctx.replyWithHTML(text, { disable_web_page_preview: true });

            const buttons = [];
            if (workButton) {
                buttons.push(Markup.button.callback('На проверку', 'work_btn'));
            }
            if (backButton) {
                buttons.push(Markup.button.callback('В меню', 'menu_btn'));
            }
            if (buttons.length > 0) {
                await ctx.reply('Выбери действие: 🚀🔎', Markup.inlineKeyboard([buttons]));
            }

        } catch (e) {
            console.error(e);
        }
    });

        // Обработчик кнопки 'work_btn'
        bot.action('work_btn', async (ctx) => {
          await ctx.replyWithHTML('<a href="http://www.example.com">Отправить задание на проверку</a>', { disable_web_page_preview: true });
        });
      }


//Подключение кнопок к функции описывающей Действие кнопки при нажатии

 addActionBot('frame_btn', false, text.frame, false, 'menu_btn')
 addActionBot('workbook_btn', false, text.workbook, false, 'menu_btn')

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

    
        //[Markup.button.callback('Компания', 'btn_1')], 
        //[Markup.button.callback('Стандарты униформы', 'btn_3')],
        //[Markup.button.callback('Стандарты обслуживания', 'btn_4')],
        //[Markup.button.callback('Мерчандайзинг', 'btn_5')],

    //[Markup.button.callback('Стандарты обслуживания', 'test_btn1') ],
    //[Markup.button.callback('Мерчандайзинг', 'test_btn2'), Markup.button.callback('О товаре', 'test_btn3')],
    //[Markup.button.callback('Итоговый тест', 'test_btn4')],


     //[Markup.button.callback('Часть 1', 'category2_btn1'), Markup.button.callback('Часть 2', 'category2_btn2'), Markup.button.callback('Часть 3', 'category2_btn3')],


     //addActionBot('test_btn1', false, text.test1, false, 'menu_btn')
     //addActionBot('test_btn2', false, text.test2, false, 'menu_btn')
     //addActionBot('test_btn3', false, text.test3, false, 'menu_btn')
     //addActionBot('test_btn4', 'img/Yoda.jpg', text.test4, false, 'menu_btn')

      //addActionBot('category2_btn1', false, text.sales1, false, 'menu_btn')
      //addActionBot('category2_btn2', false, text.sales2, false, 'menu_btn')
      //addActionBot('category2_btn3', false, text.sales3, false, 'menu_btn')


       //addActionBot('btn_1', 'img/team.jpg', text.text1, false, 'menu_btn')
 //addActionBot('btn_2', 'img/product.jpg', text.text2, false, 'menu_btn')
 //addActionBot('btn_3', 'img/uniform.jpg', text.text3, false, 'menu_btn')
 //addActionBot('btn_4', 'img/service.jpg', text.text4, false, 'menu_btn')
 //addActionBot('btn_5', 'img/merch.jpg', text.text5, false, 'menu_btn')



 //addActionBot('task_btn1', false, text.task1, 'work_btn', 'menu_btn')
 //addActionBot('task_btn2', false, text.task2, 'work_btn', 'menu_btn')
 //addActionBot('task_btn3', false, text.task3, 'work_btn', 'menu_btn')
 //addActionBot('task_btn4', false, text.task4, 'work_btn', 'menu_btn')
 //addActionBot('task_btn5', false, text.task5, 'work_btn', 'menu_btn')




  