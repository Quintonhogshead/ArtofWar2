document.addEventListener('DOMContentLoaded', () => {
    const unitList = document.getElementById('unit-list');
    const percentageSpan = document.getElementById('percentage');

    // Initialize unit boxes with default unit names
    const unitNames = [
        'Unit 1',
        'Unit 2',
        'Unit 3',
        'Unit 4',
        'Unit 5',
        'Unit 6',
        'Unit 7',
        'Unit 8',
        'Unit 9',
        'Unit 10',
    ];

    unitNames.forEach(name => {
        const unitBox = document.createElement('div');
        unitBox.classList.add('unit-box');
        unitBox.textContent = name;

        // Left-click to mark unit as eliminated
        unitBox.addEventListener('click', () => {
            unitBox.classList.toggle('struck');
            updatePercentage();
        });

        // Right-click to edit unit name
        unitBox.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            editUnitName(unitBox);
        });

        unitList.appendChild(unitBox);
    });

    // Function to update the percentage of units remaining
    function updatePercentage() {
        const totalUnits = unitList.children.length;
        let remainingUnits = 0;
        Array.from(unitList.children).forEach(box => {
            if (!box.classList.contains('struck')) {
                remainingUnits++;
            }
        });
        const percentage = ((remainingUnits / totalUnits) * 100).toFixed(0);
        percentageSpan.textContent = percentage + '%';
    }

    // Function to edit unit name
    function editUnitName(unitBox) {
        const currentName = unitBox.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentName;

        unitBox.textContent = '';
        unitBox.appendChild(input);
        input.focus();

        // Save the new name on blur or Enter key press
        const saveName = () => {
            const newName = input.value.trim() || 'Unnamed Unit';
            unitBox.removeChild(input);
            unitBox.textContent = newName;
        };

        input.addEventListener('blur', saveName);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                saveName();
            }
        });
    }

    // Initial percentage update
    updatePercentage();
});
