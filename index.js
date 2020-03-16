const Telegraf = require('telegraf');
const dotenv = require('dotenv');
const fetchCasesData = require('./asyncApi');

dotenv.config({ path: './config/config.env' });

const bot = new Telegraf(process.env.BOT_TOKEN);

try {
  bot.start(ctx => {
    ctx.reply(`
     أكتب أحرف ترميز الدولة المراد معرفة إحصائيات انتشار الفايروس فيها 
    من الممكن معرفة ترميز الدول من خلال زيارة هذا الموقع:https://www.iban.com/country-codes
    `);
  });
  bot.on('message', async ctx => {
    try {
      const data = await fetchCasesData(ctx.message.text);
      ctx.reply(`
          **تقرير الحالات:**
          الحالات المُسجلة: ${data.confirmed.value} حالة
          حالات التعافي: ${data.recovered.value} حالة
          حالات الوفاة: ${data.deaths.value} حالة
          `);
    } catch (err) {
      const ISO3 = err.response.data.error.message.match(/`(.*?)`/gm)[0];
      ctx.reply(`الترميز غير صحيح تأكد من إدخال ترميز صحيح (${ISO3})`);
    }
  });

  bot.launch(); // start
} catch (error) {
  console.log(error);
}
