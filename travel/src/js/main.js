
document.addEventListener('DOMContentLoaded', () => {

    // Мобильное меню
    const navToggle = document.querySelector('.nav__toggle');
    const navList = document.querySelector('.nav__list');

    if (navToggle && navList) {
        navToggle.addEventListener('click', () => {
            navList.classList.toggle('nav__list--open');
            navToggle.setAttribute('aria-expanded',
                navList.classList.contains('nav__list--open')
            );
        });
    }

    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    const languageSwitcher = () => {
        const switcherBtn = document.querySelector('.language-switcher__btn');
        const dropdown = document.querySelector('.language-switcher__dropdown');
        const options = document.querySelectorAll('.language-switcher__option');
        const currentLang = document.querySelector('.language-switcher__current');

        if (!switcherBtn || !dropdown) return;

        switcherBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = switcherBtn.getAttribute('aria-expanded') === 'true';
            switcherBtn.setAttribute('aria-expanded', !isExpanded);
            dropdown.setAttribute('data-visible', !isExpanded);
        });

        options.forEach(option => {
            option.addEventListener('click', () => {
                const lang = option.dataset.lang;
                const text = option.textContent.trim();

                // Обновляем текущий язык
                currentLang.textContent = text;

                // Обновляем активный элемент
                options.forEach(opt => {
                    opt.setAttribute('data-active', opt.dataset.lang === lang);
                });

                // Закрываем выпадающий список
                switcherBtn.setAttribute('aria-expanded', 'false');
                dropdown.setAttribute('data-visible', 'false');

                // Здесь можно добавить логику смены языка на сайте
                console.log('Язык изменен на:', lang);

                // Пример: обновление атрибута lang у html
                // document.documentElement.lang = lang;
            });
        });

        document.addEventListener('click', (e) => {
            if (!switcherBtn.contains(e.target) && !dropdown.contains(e.target)) {
                switcherBtn.setAttribute('aria-expanded', 'false');
                dropdown.setAttribute('data-visible', 'false');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                switcherBtn.setAttribute('aria-expanded', 'false');
                dropdown.setAttribute('data-visible', 'false');
            }
        });
    };

    languageSwitcher();

});