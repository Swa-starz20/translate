document.getElementById('translate-button').addEventListener('click', function () {
    const inputText = document.getElementById('input-text').value;
    const sourceLang = document.getElementById('source-language').value;
    const targetLang = document.getElementById('target-language').value;

    if (!inputText) {
        alert('Please enter some text to translate');
        return;
    }

    const apiUrl = 'http://localhost:5000/translate';

    const data = {
        q: inputText,
        source: sourceLang,
        target: targetLang,
        format: 'text',
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log('API Response:', data);
            if (data.translatedText) {
                document.getElementById('translated-text').textContent = data.translatedText;
            } else {
                document.getElementById('translated-text').textContent = 'Translation failed. Please try again.';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            document.getElementById('translated-text').textContent = 'Error: ' + error.message;
        });
});
