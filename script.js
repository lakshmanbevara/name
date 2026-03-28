document.addEventListener('DOMContentLoaded', () => {
    const calcBtn = document.getElementById('calculate-btn');
    const name1Input = document.getElementById('name1');
    const name2Input = document.getElementById('name2');
    const resultContainer = document.getElementById('result-container');
    const resultText = document.getElementById('result-text');
    const resultDesc = document.getElementById('result-desc');

    const flamesData = {
        'F': { title: 'Friends', desc: 'You two are bound to be great friends, sharing secrets and laughter!', emoji: '🤝' },
        'L': { title: 'Lovers', desc: 'A deep, passionate romantic connection exists between you two.', emoji: '💖' },
        'A': { title: 'Affection', desc: 'There is a strong, fond affection and deep caring for each other.', emoji: '🥰' },
        'M': { title: 'Marriage', desc: 'Wedding bells! You are perfectly suited for a lifelong journey together.', emoji: '💍' },
        'E': { title: 'Enemies', desc: 'Watch out! Sparks might fly in the wrong direction.', emoji: '⚔️' },
        'S': { title: 'Siblings', desc: 'You share a strong, protective, and playful sibling-like bond.', emoji: '🧬' }
    };

    calcBtn.addEventListener('click', calculateFlames);

    // Allow hitting 'Enter' to calculate
    [name1Input, name2Input].forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                calculateFlames();
            }
        });
    });

    function calculateFlames() {
        let name1 = name1Input.value.toLowerCase().replace(/[^a-z]/g, '');
        let name2 = name2Input.value.toLowerCase().replace(/[^a-z]/g, '');

        if (!name1 || !name2) {
            showError("Please enter valid alphabetic names in both fields.");
            return;
        }

        // Change button text briefly
        const originalBtnText = calcBtn.textContent;
        calcBtn.textContent = 'Analyzing...';
        calcBtn.style.opacity = '0.8';

        setTimeout(() => {
            // Remove common characters
            let name1Arr = name1.split('');
            let name2Arr = name2.split('');
            
            for (let i = 0; i < name1Arr.length; i++) {
                let char = name1Arr[i];
                let indexInName2 = name2Arr.indexOf(char);
                
                if (indexInName2 !== -1) {
                    name1Arr[i] = '*'; // Mark as removed in name1
                    name2Arr[indexInName2] = '*'; // Mark as removed in name2
                }
            }
            
            // Count remaining characters
            let count1 = name1Arr.filter(c => c !== '*').length;
            let count2 = name2Arr.filter(c => c !== '*').length;
            let totalCount = count1 + count2;

            if (totalCount === 0) {
                showError("The names share identical letters. Try slightly different variations!");
                calcBtn.textContent = originalBtnText;
                calcBtn.style.opacity = '1';
                return;
            }

            // FLAMES logic
            let flamesWord = ['F', 'L', 'A', 'M', 'E', 'S'];
            let currentIndex = 0;

            while (flamesWord.length > 1) {
                let removeIndex = (currentIndex + totalCount - 1) % flamesWord.length;
                flamesWord.splice(removeIndex, 1);
                currentIndex = removeIndex; 
            }

            displayResult(flamesWord[0]);

            calcBtn.textContent = originalBtnText;
            calcBtn.style.opacity = '1';
        }, 600); // 600ms delay for visual dramatic effect
    }

    function displayResult(resultChar) {
        const resultInfo = flamesData[resultChar];
        
        resultContainer.classList.remove('hidden');
        resultContainer.classList.remove('show');
        
        // Timeout ensures the DOM registers the removal of 'show' class before adding it back
        setTimeout(() => {
            resultText.innerHTML = `<span class="emoji">${resultInfo.emoji}</span><br>${resultInfo.title}`;
            resultDesc.textContent = resultInfo.desc;
            
            resultContainer.classList.add('show');
        }, 50);
    }

    function showError(msg) {
        resultContainer.classList.remove('hidden');
        resultContainer.classList.remove('show');
        
        setTimeout(() => {
            resultText.innerHTML = '';
            resultDesc.innerHTML = `<span style="color: #ff4d4d;">${msg}</span>`;
            
            resultContainer.classList.add('show');
        }, 50);
    }
});
