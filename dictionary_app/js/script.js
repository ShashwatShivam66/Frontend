document.addEventListener('DOMContentLoaded', () => {
            const body = document.body;
            const themeToggle = document.getElementById('themeToggle');
            const fontSelector = document.getElementById('fontSelector');
            const searchInput = document.getElementById('searchInput');
            const searchButton = document.getElementById('searchButton');
            const loader = document.getElementById('loader');
            const errorContainer = document.getElementById('errorContainer');
            const errorMessage = document.getElementById('errorMessage');
            const resultContainer = document.getElementById('resultContainer');
            const wordTitle = document.getElementById('wordTitle');
            const phonetic = document.getElementById('phonetic');
            const playButton = document.getElementById('playButton');
            const definitionsContainer = document.getElementById('definitionsContainer');
            const synonymsContainer = document.getElementById('synonymsContainer');
            const antonymsContainer = document.getElementById('antonymsContainer');
            const synonymsTab = document.getElementById('synonymsTab');
            const antonymsTab = document.getElementById('antonymsTab');
            const sourceLink = document.getElementById('sourceLink');
            
            let audioUrl = '';
            
            // Theme toggle
            themeToggle.addEventListener('change', () => {
                if (themeToggle.checked) {
                    body.classList.remove('light');
                    body.classList.add('dark');
                    updateDarkModeElements(true);
                } else {
                    body.classList.remove('dark');
                    body.classList.add('light');
                    updateDarkModeElements(false);
                }
            });

            function updateDarkModeElements(isDark) {
                // Update search input
                if (isDark) {
                    searchInput.classList.add('dark:bg-gray-700', 'dark:border-gray-600', 'dark:text-white');
                } else {
                    searchInput.classList.remove('dark:bg-gray-700', 'dark:border-gray-600', 'dark:text-white');
                }
            }
            
            // Font selector
            fontSelector.addEventListener('change', () => {
                const selectedFont = fontSelector.value;
                body.className = body.className.replace(/font-\w+/, '');
                body.classList.add(`font-${selectedFont}`);
                
                // Preserve dark/light mode
                if (themeToggle.checked) {
                    body.classList.add('dark');
                } else {
                    body.classList.add('light');
                }
            });
            
            // Search functionality
            searchButton.addEventListener('click', searchWord);
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    searchWord();
                }
            });
            
            // Tab switching
            synonymsTab.addEventListener('click', () => {
                synonymsTab.classList.add('bg-blue-500', 'text-white');
                synonymsTab.classList.remove('bg-gray-200', 'dark:bg-gray-700');
                antonymsTab.classList.remove('bg-blue-500', 'text-white');
                antonymsTab.classList.add('bg-gray-200', 'dark:bg-gray-700');
                synonymsContainer.classList.remove('hidden');
                antonymsContainer.classList.add('hidden');
            });
            
            antonymsTab.addEventListener('click', () => {
                antonymsTab.classList.add('bg-blue-500', 'text-white');
                antonymsTab.classList.remove('bg-gray-200', 'dark:bg-gray-700');
                synonymsTab.classList.remove('bg-blue-500', 'text-white');
                synonymsTab.classList.add('bg-gray-200', 'dark:bg-gray-700');
                antonymsContainer.classList.remove('hidden');
                synonymsContainer.classList.add('hidden');
            });
            
            // Play pronunciation
            playButton.addEventListener('click', () => {
                if (audioUrl) {
                    const audio = new Audio(audioUrl);
                    audio.play();
                }
            });
            
            function searchWord() {
                const word = searchInput.value.trim();
                if (!word) return;
                
                showLoader();
                
                // Clear previous results
                synonymsContainer.innerHTML = '';
                antonymsContainer.innerHTML = '';
                
                fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Word not found');
                        }
                        return response.json();
                    })
                    .then(data => {
                        displayResults(data);
                    })
                    .catch(error => {
                        showError(error.message);
                    });
            }
            
            function showLoader() {
                loader.classList.remove('hidden');
                errorContainer.classList.add('hidden');
                resultContainer.classList.add('hidden');
            }
            
            function showError(message) {
                loader.classList.add('hidden');
                errorContainer.classList.remove('hidden');
                resultContainer.classList.add('hidden');
                
                if (message === 'Word not found') {
                    errorMessage.textContent = `Sorry, we couldn't find definitions for "${searchInput.value}". Please check the spelling or try another word.`;
                } else {
                    errorMessage.textContent = 'An error occurred. Please try again later.';
                }
            }
            
            function displayResults(data) {
                loader.classList.add('hidden');
                errorContainer.classList.add('hidden');
                resultContainer.classList.remove('hidden');
                
                const wordData = data[0];
                
                // Set word and phonetic
                wordTitle.textContent = wordData.word;
                
                // Find phonetic text
                let phoneticText = wordData.phonetic || '';
                if (!phoneticText && wordData.phonetics && wordData.phonetics.length > 0) {
                    for (const p of wordData.phonetics) {
                        if (p.text) {
                            phoneticText = p.text;
                            break;
                        }
                    }
                }
                phonetic.textContent = phoneticText;
                
                // Find audio URL
                audioUrl = '';
                if (wordData.phonetics && wordData.phonetics.length > 0) {
                    for (const p of wordData.phonetics) {
                        if (p.audio) {
                            audioUrl = p.audio;
                            break;
                        }
                    }
                }
                
                // Enable/disable play button
                if (audioUrl) {
                    playButton.classList.remove('opacity-50', 'cursor-not-allowed');
                } else {
                    playButton.classList.add('opacity-50', 'cursor-not-allowed');
                }
                
                // Display definitions
                definitionsContainer.innerHTML = '';
                
                wordData.meanings.forEach(meaning => {
                    const meaningElement = document.createElement('div');
                    meaningElement.className = 'mb-8 slide-in';
                    
                    const partOfSpeech = document.createElement('div');
                    partOfSpeech.className = 'flex items-center mb-4';
                    partOfSpeech.innerHTML = `
                        <h3 class="text-lg italic font-semibold mr-2">${meaning.partOfSpeech}</h3>
                        <div class="flex-grow h-px bg-gray-300 dark:bg-gray-700"></div>
                    `;
                    meaningElement.appendChild(partOfSpeech);
                    
                    const definitionsList = document.createElement('div');
                    definitionsList.className = 'space-y-4';
                    
                    meaning.definitions.forEach((def, index) => {
                        const definitionItem = document.createElement('div');
                        definitionItem.className = 'ml-6';
                        
                        let definitionHtml = `
                            <div class="flex">
                                <span class="text-gray-400 mr-4">${index + 1}</span>
                                <p>${def.definition}</p>
                            </div>
                        `;
                        
                        if (def.example) {
                            definitionHtml += `
                                <p class="mt-2 ml-8 text-gray-600 dark:text-gray-400 italic">"${def.example}"</p>
                            `;
                        }
                        
                        definitionItem.innerHTML = definitionHtml;
                        definitionsList.appendChild(definitionItem);
                    });
                    
                    meaningElement.appendChild(definitionsList);
                    definitionsContainer.appendChild(meaningElement);
                    
                    // Collect synonyms and antonyms
                    if (meaning.synonyms && meaning.synonyms.length > 0) {
                        meaning.synonyms.forEach(synonym => {
                            const synonymTag = document.createElement('span');
                            synonymTag.className = 'px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors';
                            synonymTag.textContent = synonym;
                            synonymTag.addEventListener('click', () => {
                                searchInput.value = synonym;
                                searchWord();
                            });
                            synonymsContainer.appendChild(synonymTag);
                        });
                    }
                    
                    if (meaning.antonyms && meaning.antonyms.length > 0) {
                        meaning.antonyms.forEach(antonym => {
                            const antonymTag = document.createElement('span');
                            antonymTag.className = 'px-3 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-full cursor-pointer hover:bg-red-200 dark:hover:bg-red-800 transition-colors';
                            antonymTag.textContent = antonym;
                            antonymTag.addEventListener('click', () => {
                                searchInput.value = antonym;
                                searchWord();
                            });
                            antonymsContainer.appendChild(antonymTag);
                        });
                    }
                });
                
                // If no synonyms were found
                if (synonymsContainer.children.length === 0) {
                    const noSynonyms = document.createElement('p');
                    noSynonyms.className = 'text-gray-500 dark:text-gray-400';
                    noSynonyms.textContent = 'No synonyms found for this word.';
                    synonymsContainer.appendChild(noSynonyms);
                }
                
                // If no antonyms were found
                if (antonymsContainer.children.length === 0) {
                    const noAntonyms = document.createElement('p');
                    noAntonyms.className = 'text-gray-500 dark:text-gray-400';
                    noAntonyms.textContent = 'No antonyms found for this word.';
                    antonymsContainer.appendChild(noAntonyms);
                }
                
                // Set source link
                if (wordData.sourceUrls && wordData.sourceUrls.length > 0) {
                    sourceLink.href = wordData.sourceUrls[0];
                    sourceLink.textContent = wordData.sourceUrls[0];
                } else {
                    sourceLink.href = '#';
                    sourceLink.textContent = 'Not available';
                }
            }
            
            // Load a default word on page load
            searchInput.value = 'dictionary';
            searchWord();
        });