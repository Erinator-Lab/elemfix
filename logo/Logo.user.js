// ==UserScript==
// @name         Возрат лого
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  думаю объяснчть не надо
// @author       Erinator
// @match        https://elemsocial.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Проверяем наличие темной или амоледной темы
    const isDarkOrAmoledTheme = () => {
        const stylesheets = Array.from(document.styleSheets);
        return stylesheets.some(sheet =>
            sheet.href && (sheet.href.includes('/System/UI/DarkStyle.css') || sheet.href.includes('/System/UI/AmoledStyle.css'))
        );
    };

    // Функция для установки логотипа
    const setLogo = () => {
        const logo = document.querySelector('a.UI-Logo');
        if (logo && isDarkOrAmoledTheme()) {
            // Устанавливаем новую ссылку на логотип
            logo.style.backgroundImage = "url('https://raw.githubusercontent.com/Erinator-Lab/elemfix/refs/heads/main/logo/DarkLogo.svg')";
            logo.style.backgroundSize = "contain";
            logo.style.backgroundRepeat = "no-repeat";
        }
    };

    // Функция для установки логотипа для страницы Gold
    const setGoldLogo = () => {
        const goldLogo = document.querySelector('img.GoldSub-Logo');
        if (goldLogo) {
            // Заменяем старую ссылку на логотип на новый URL
            goldLogo.src = "https://raw.githubusercontent.com/Erinator-Lab/elemfix/refs/heads/main/logo/SubscriptionLogo.svg";
        }
    };

    // Запускаем скрипт при загрузке страницы
    setLogo();
    setGoldLogo();

    // Следим за изменениями на странице (вдруг тема переключится)
    const observer = new MutationObserver(() => {
        setLogo();
        setGoldLogo();
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();
