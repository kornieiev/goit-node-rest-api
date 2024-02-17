ошибка в логике.
При ре-верификации:
verify: false >>>> verify: true
verificationToken: "UNNaFe00SPTxC5GJLwhiz" >>>> verificationToken: ""

1. Надо создать новую почту на мета для отправки с нее сообщений

2. Убрать из ре-верификации

   await User.findByIdAndUpdate(user.\_id, {
   verify: true,
   verificationToken: "",
   });
