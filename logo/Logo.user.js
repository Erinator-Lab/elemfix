// ==UserScript==
// @name         Восстановление лого
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  ^•w•^
// @author       Erinator
// @match        https://elemsocial.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Проверка, подключен ли CSS файл темы
    const isThemeActive = (themePath) => {
        const stylesheets = Array.from(document.styleSheets);
        return stylesheets.some(sheet => sheet.href && sheet.href.includes(themePath));
    };

    // Определяем текущую тему
    const getCurrentThemeLogo = () => {
        if (isThemeActive('/System/UI/DarkStyle.css') || isThemeActive('/System/UI/AmoledStyle.css')) {
            return "https://raw.githubusercontent.com/Erinator-Lab/elemfix/refs/heads/main/logo/DarkLogo.svg";
        }
        if (
            isThemeActive('/System/UI/GoldStyle.css') ||
            isThemeActive('/System/UI/GoldDarkStyle.css') ||
            isThemeActive('/System/UI/AmoledGoldStyle.css')
        ) {
            return "https://raw.githubusercontent.com/Erinator-Lab/elemfix/refs/heads/main/logo/GoldStar.svg";
        }
        return null; // Если тема не распознана
    };

    // Функция для установки логотипа
    const setLogo = () => {
        const logo = document.querySelector('a.UI-Logo');
        const logoUrl = getCurrentThemeLogo();
        if (logo && logoUrl) {
            logo.style.backgroundImage = `url('${logoUrl}')`;
            logo.style.backgroundSize = "contain";
            logo.style.backgroundRepeat = "no-repeat";
            logo.style.display = "block"; // Убедиться, что логотип видим
        }
    };

    // Функция для установки логотипа на странице Подписки Gold
    const setGoldLogo = () => {
        const goldLogo = document.querySelector('img.GoldSub-Logo');
        if (goldLogo) {
            goldLogo.src = "https://raw.githubusercontent.com/Erinator-Lab/elemfix/refs/heads/main/logo/SubscriptionLogo.svg";
        }
    };

    // Запуск изменений
    setLogo();
    setGoldLogo();

    // Следим за изменениями на странице
    const observer = new MutationObserver(() => {
        setLogo();
        setGoldLogo();
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();
