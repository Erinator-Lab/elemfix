// ==UserScript==
// @name         ElemFix
// @namespace    http://tampermonkey.net/
// @version      0.1.2
// @description  Скрипт исправляющий и добавляющий некоторое в Element
// @author       Erinator
// @match        *://elemsocial.com/*
// @grant        GM_download
// @grant        GM_xmlhttpRequest
// @icon         https://elemsocial.com/favicon.ico
// @updateURL      https://raw.githubusercontent.com/Erinator-Lab/elemfix/refs/heads/main/ElemFix.user.js
// @downloadURL    https://raw.githubusercontent.com/Erinator-Lab/elemfix/refs/heads/main/ElemFix.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Функция для скачивания файлов
    function downloadFile(url, filename) {
        const isAndroid = navigator.userAgent.toLowerCase().includes('android');
        const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');

        if (isAndroid && isFirefox) {
            // Android Firefox
            window.location.href = url;
        } else if (typeof GM_download === 'function') {
            // GM_download
            GM_download({ url: url, name: filename });
        } else {
            // PC Firefox
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    // Функция для добавления кнопки скачивания
    function addDownloadButton() {
        const controlButtons = document.querySelector('.Music-ControlButtons');
        const audioElement = document.querySelector('audio[src]');

        if (controlButtons && audioElement && !document.querySelector('.Download')) {
            const downloadButton = document.createElement('button');
            downloadButton.classList.add('Download');
            downloadButton.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M16.59 9H15V4c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v5H7.41c-.89 0-1.34 1.08-.71 1.71l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.63-.63.19-1.71-.7-1.71zM5 19c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1 .45-1 1z"></path></svg>';

            downloadButton.addEventListener('click', function() {
                if (audioElement.src) {
                    downloadFile(audioElement.src, 'music.mp3');
                } else {
                    alert('Аудио не найдено.');
                }
            });

            controlButtons.appendChild(downloadButton);
        }
    }

    // Функция для исправления стилей изображений
    function fixImageZoom() {
        const imageBoxes = document.querySelectorAll('.ImageBox');

        imageBoxes.forEach((box) => {
            const img = box.querySelector('img');

            // Устанавливаем новые стили для изображения
            if (img) {
                img.style.maxWidth = '100%'; // Ограничиваем ширину изображения
                img.style.height = 'auto';     // Сохраняем пропорции
                img.style.transform = 'scale(1)'; // Убираем масштабирование
                img.style.transition = 'none'; // Убираем анимацию при изменении
            }
        });
    }

    // Наблюдатель для динамически добавляемых элементов
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length || mutation.attributeName === 'src') {
                addDownloadButton();
                fixImageZoom(); // Исправляем изображения при добавлении кнопки
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true, attributes: true });

    window.addEventListener('load', function() {
        addDownloadButton(); // Добавляем кнопку при загрузке
        fixImageZoom();      // Исправляем изображения при загрузке
        addUpdateBlock();    // Добавляем блок обновлений при загрузке
    }, false);
})();
