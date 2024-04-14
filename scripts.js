function botApp() {
    const answers = {
        'kto' : 'Z matki obcej; krew jego dawne bohatery, A imię jego będzie czterdzieści i cztery',
        'czemu' : 'Bo serce nie jest sługa, nie zna, co to pany, I nie da się przemocą okuwać w kajdany.',
        'gdzie' : 'Tam sięgaj, gdzie wzrok nie sięga; Łam, czego rozum nie złamie',
        'czy' : 'Czucie i wiara silniej mówią do mnie niż mędrca, szkiełko i oko',
        'kiedy' : 'O! luba, zginąłem w niebie, Kiedym raz pierwszy pocałował ciebie!',
        'jak' : 'Szabel nam nie zabraknie, szlachta na koń wsiędzie, Ja z synowcem na czele, i jakoś to będzie!',
        'jaki' : 'Nie dbam, ku jakim brzegom popłynę, Bylebym nazad nie płynął',
        'jaka' : 'Człowieku, gdybyś ty wiedział, jaka twoja władza',
        'co' : 'Ciemno wszędzie, głucho wszędzie, Co to będzie, co to będzie?',
        'czym' : 'Czym jest me życie? Ach, jedną chwilką!',
        'skąd' : 'Skąd Litwini wracali? – Z nocnej wracali wycieczki.',
        'standard': 'I znowu sobie powtarzam pytanie Czy to jest przyjaźń? czy to jest kochanie?...',
    };

    const questionWords = ['kto', 'czemu', 'gdzie', 'czy', 'kiedy', 'jak', 'jaki', 'jaka', 'co', 'czym', 'skąd'];
    const vulgarisms = ['kurw', 'jeb', 'pierd', 'chuj', 'suk', 'sra', 'pizd', 'cip', 'dziwk', 'zaj', 'motyla noga'];

    const commands = {
        'version': 'Wersja oprogramowania: 1.0.0',
        'author': 'Adam Mickiewicz',
        'pogoda': 'W %city% jest piękny dzień!',
    }

    const question = document.getElementById('question');
    const button = document.getElementById('button');
    const dialogWrapper = document.getElementById('dialog-wrapper');

    let exitIntentShown = false;

    const getAnswer = (questionValue) => {
        const filteresWords = questionWords.filter((word) => questionValue.includes(word));
        const answer = filteresWords.length ? answers[filteresWords[0]] : answers['standard'];
        return answer;
    };

    const prepareQuestionHtml = (questionValue) => {
        const newQuestion = document.createElement('div');
        newQuestion.innerHTML = questionValue;
        newQuestion.classList.add('dialog-question');
        newQuestion.classList.add('dialog-line');
        dialogWrapper.append(newQuestion);
    };

    const prepareAnswerHtml = (answer) => {
        const newAnswer = document.createElement('div');
        newAnswer.innerText = answer;
        newAnswer.classList.add('dialog-bot');
        newAnswer.classList.add('dialog-line');
        dialogWrapper.append(newAnswer);
    };

    const hasVulgarism = (questionValue) => {
        return vulgarisms.some((vulgarism) => questionValue.includes(vulgarism));
    };

    const handleCommand = (command) => {
        const unifiedCommand = command.toLowerCase().replace(/[\n\r]+/g, '');
        if (unifiedCommand .includes('pogoda')) {
            const city = unifiedCommand.replace('pogoda', '');
            const commandAnswer = commands['pogoda'].replace('%city%', city);
            prepareAnswerHtml(commandAnswer);
            return;
        }
        const answer = commands[command];

        if (!answer) {
            prepareAnswerHtml('Nie znam takiej komendy');
        } else {
            prepareAnswerHtml(answer);
        }

        document.querySelector('.dialog-bot:last-child').classList.add('dialog-bot-command');
    }


    const handleQuestion = (question) => {
        if (hasVulgarism(question)) {
            alert('"Grzeczność nie jest nauką łatwą ani małą." proszę, nie używaj takich słów!');
            return;
        }

        if (question.charAt(0) === '/') {
            handleCommand(question.slice(1));
            return;
        }

        dialogWrapper.classList.add('loading');
        prepareQuestionHtml(question);
        const unifiedQuestion = question.toLowerCase().replace(/[\n\r]+/g, '');
        const answer = getAnswer(unifiedQuestion);
        prepareAnswerHtml(answer);

        setTimeout(() => {
            dialogWrapper.classList.remove('loading');
        }, 3000);
    }; 
    
    const mouseEvent = e => {
        const shouldShowExitIntent = 
            !e.toElement && 
            !e.relatedTarget &&
            e.clientY < 10;
    
        if (shouldShowExitIntent && !exitIntentShown) {
            document.removeEventListener('mouseout', mouseEvent);
            alert('Niewdzięczny! Szukałeś wzroku mego, teraz go unikasz, Szukałeś rozmów ze mną, dziś uszy zamykasz, Jakby w słowach, we wzroku mym, była trucizna!');
            exitIntentShown = true;
        }
    };

    const init = () => {
        button.addEventListener('click', () => {
            handleQuestion(question.value);
            question.value = '';
        });
        question.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                handleQuestion(question.value);
                question.value = '';
            }
        });

        document.addEventListener('mouseout', mouseEvent);
    };

    init();
};

botApp();