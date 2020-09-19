## Veresiye - basit bir ödeme takibi uygulaması

![veresiye-gif](https://raw.githubusercontent.com/abidinkofficial/veresiye-app/master/presentation/veresiye.gif)

💡 Bu proje, sunucu tarafında uygulama geliştirmeyi öğrenebilmek adına oluşturduğum basit bir veresiye defteri uygulamasıdır.

💻 Sunucu tarafı Express frameworkü ile oluşturuldu, veriler için Mongoose, kullanıcı doğrulaması için JWT kullanıldı. Ön yüz ise React arayüz kütüphanesi kullanılarak geliştirildi.

⚠ Oluştuduğum ilk sunucu uygulaması olması sebebiyle genel design patternların içinden geçmiş, güvenliği (farkında olmadan) hiçe saymış olabilirim.

## Ekranlar

| Giriş ekranı | Ana sayfa |
|--------------|-----------|
|![login-screen](https://raw.githubusercontent.com/abidinkofficial/veresiye-app/master/presentation/login-screen.png)|![home-screen](https://raw.githubusercontent.com/abidinkofficial/veresiye-app/master/presentation/home-screen.png)


| Hesap detayları | Kayıt ekleme ekranı |
|-----------------|---------------------|
|![details-screen](https://raw.githubusercontent.com/abidinkofficial/veresiye-app/master/presentation/details-screen.png)|![add-screen](https://raw.githubusercontent.com/abidinkofficial/veresiye-app/master/presentation/add-screen.png)

## Not

Uygulama çalıştırılmak istendiği taktirde buraya yüklemediğim bir '.env' dosyası gerektirir. Kendi dosyanızı oluşturup içerisine DB_URL adı altında bir MongoDB bağlantı dizgesi, bir de rastgele TOKEN_SECRET dizgesi ekleyebilirsiniz. Sunucu ve istemci uygulamalarını ayrı ayrı başlatmanız gerekir, '$ npm start' komutu ile sunucu 5000; istemci ise 3000 portunda ayağa kalkar.