// inflect.js
export function inflectWord(word) {
    // Правила для склонения в родительный падеж множественного числа
    const genitivePluralRules = [
        { regex: /а$/, replacement: 'ов' },
        { regex: /я$/, replacement: 'ев' },
        { regex: /ь$/, replacement: 'ей' },
        { regex: /и$/, replacement: 'ей' },
        { regex: /ы$/, replacement: 'ов' },
        { regex: /о$/, replacement: 'ов' },
        { regex: /е$/, replacement: 'ев' },
        { regex: /у$/, replacement: 'ев' },
        { regex: /ю$/, replacement: 'ев' },
    ];

    // Правила для склонения в именительный падеж единственного числа
    const nominativeSingularRules = [
        { regex: /ы$/, replacement: 'а' },
        { regex: /и$/, replacement: 'а' },
        { regex: /а$/, replacement: 'а' },
        { regex: /я$/, replacement: 'я' },
        { regex: /ь$/, replacement: 'ь' },
        { regex: /о$/, replacement: 'о' },
        { regex: /е$/, replacement: 'е' },
        { regex: /у$/, replacement: 'у' },
        { regex: /ю$/, replacement: 'ю' },
    ];

    // Функция для применения правил склонения
    function applyRules(word, rules) {
        for (const rule of rules) {
            if (rule.regex.test(word)) {
                return word.replace(rule.regex, rule.replacement);
            }
        }
        return word;
    }

    // Разбиваем строку на слова
    const words = word.split(' ');

    // Склоняем каждое слово
    const genitivePluralWords = words.map(w => applyRules(w, genitivePluralRules));
    const nominativeSingularWords = words.map(w => applyRules(w, nominativeSingularRules));

    // Собираем слова обратно в строку
    const genitivePlural = genitivePluralWords.join(' ');
    const nominativeSingular = nominativeSingularWords.join(' ');

    return {
        original: word,
        genitivePlural: genitivePlural,
        nominativeSingular: nominativeSingular
    };
}
