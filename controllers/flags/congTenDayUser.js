congTenDayUser

function congTenDayUser (user) {
    if (!user.tenDayFlag) {
      const registrationDate = user.createdAt; // Предполагается, что у вас есть поле createdAt, которое хранит дату регистрации пользователя
      const currentDate = new Date();
      const TEN_DAYS_IN_MS = 10 * 24 * 60 * 60 * 1000; // 10 дней в миллисекундах
      if (currentDate - registrationDate >= TEN_DAYS_IN_MS) {
        console.log('Поздравляем пользователя ' + user.username + ' с 10 днями использования приложения!');
        user.tenDayFlag = true;
        user.save(); // Сохраняем изменения в базе данных
      }
    }
  }