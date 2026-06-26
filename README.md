# 🚀 Nginx-Fancyindex-Theme
Forked from <https://github.com/Naereen/Nginx-Fancyindex-Theme>

A more morden Nginx-Fancyindex-Theme with high performance

## 🔧 How to use
> You need Nginx, and a depend (Example using Debian Sid 2026-06-26-08:00)
```
apt update
apt install nginx libnginx-mod-http-fancyindex
cd /var/www/html
# Default Nginx website files path, you can change it if you need
git clone https://github.com/mokanove/Nginx-Fancyindex-Theme.git fancyindex-theme
```
> Nginx config part
>
> WARN: The alias must be change to a real path, else be fatal.
```
location / {
    alias /var/www/html;
    fancyindex on;
    fancyindex_localtime on;
    fancyindex_exact_size off;
    fancyindex_header "/fancyindex-theme/header.html";
    fancyindex_footer "/fancyindex-theme/footer.html";
    fancyindex_ignore "fancyindex-theme";
}
```

## ⚖️ LICENSE
> The source LICENSE was under MIT with Copyright © 2016-17 Lilian Besson [Naereen](https://github.com/Naereen)
>
> This version licensed under the [MoPL](https://867678.xyz/doc/MoPL)