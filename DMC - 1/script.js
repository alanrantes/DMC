// Adiciona um evento para buscar a peça ao pressionar "Enter"
 document.getElementById('searchNumber').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        searchPiece();
    }
});

// Classe que representa um tipo de aço com o preço por kg
class Steel {
    constructor(pricePerKg) {
        this.PricePerKg = pricePerKg;
    }
}

// Classe que representa uma peça com várias propriedades e métodos
class Piece {
    constructor(drawingNumber, pieceName, materialType, thickness, width, length, blankNumber, line) {
        this.DrawingNumber = drawingNumber;
        this.PieceName = pieceName;
        this.MaterialType = materialType;
        this.Thickness = thickness;
        this.Width = width;
        this.Length = length;
        this.BlankNumber = blankNumber;
        this.Line = line;
        this.Weight = this.calculateWeight();
    }
// Método para calcular o peso da peça baseado na densidade do material
    calculateWeight() {
        const density = 7.85; // Densidade do aço em kg/dm³
        return (this.Thickness * this.Width * this.Length) / 1000000 * density;
    }
}

// Simulação de um banco de dados para testes
const piecesDatabase = [
    new Piece(522170712, 'PEÇA EXEMPLO', 'FEPO4', 0.75, 1310, 1900, 630028628, 7)
];

// Função para buscar uma peça pelo número do desenho e preencher os campos do formulário
function searchPiece() {
    const searchNumber = document.getElementById('searchNumber').value;
    const piece = piecesDatabase.find(p => p.DrawingNumber == searchNumber);

    if (piece) {
        document.getElementById('drawingNumber').value = piece.DrawingNumber;
        document.getElementById('pieceName').value = piece.PieceName;
        document.getElementById('line').value = piece.Line;
        document.getElementById('materialType').value = piece.MaterialType;
        document.getElementById('thickness').value = piece.Thickness;
        document.getElementById('width').value = piece.Width;
        document.getElementById('length').value = piece.Length;
        document.getElementById('blankNumber').value = piece.BlankNumber;
    } else {
        alert('Peça não encontrada.');
    }
}

// Função para calcular o custo da peça com base nos dados inseridos e reduções aplicadas
function calculate() {
    const drawingNumber = document.getElementById('drawingNumber').value;
    const pieceName = document.getElementById('pieceName').value;
    const line = document.getElementById('line').value;
    const materialType = document.getElementById('materialType').value;
    const thickness = parseFloat(document.getElementById('thickness').value);
    const width = parseFloat(document.getElementById('width').value);
    const length = parseFloat(document.getElementById('length').value);
    const blankNumber = document.getElementById('blankNumber').value;
    const pricePerKg = parseFloat(document.getElementById('pricePerKg').value);
    const amountParts = parseInt(document.getElementById('amountParts').value, 10);

    const piece = new Piece(drawingNumber, pieceName, materialType, thickness, width, length, blankNumber, line);
    const weightCurrent = piece.calculateWeight();

    const reductionWidth = parseFloat(document.getElementById('reductionWidth').value) || 0;
    const reductionLength = parseFloat(document.getElementById('reductionLength').value) || 0;
    const reductionThickness = parseFloat(document.getElementById('reductionThickness').value) || 0;

    const newWidth = width - reductionWidth;
    const newLength = length - reductionLength;
    const newThickness = thickness - reductionThickness;

    const weightProposed = (newThickness * newWidth * newLength) / 1000000 * 7.85;
    const weightDifference = weightCurrent - weightProposed;

    // Ajustando cálculo do custo para maior precisão
    const cost = Math.round((weightDifference * pricePerKg * amountParts) * 100) / 100;

    // Verifica o material selecionado no dropdown
    const selectedMaterial = document.getElementById('materialAlteration').value || materialType;

    document.getElementById('pieceInfo').innerHTML = `
    <p><strong>Nome da Peça:</strong> ${pieceName}</p>
    <p><strong>Linha:</strong> ${line}</p>
    <p><strong>Material:</strong> ${selectedMaterial}</p>
`;

    document.getElementById('pieceInfo').innerHTML += `
    <p><strong>Largura:</strong> ${newWidth} mm</p>
    <p><strong>Comprimento:</strong> ${newLength} mm</p>
    <p><strong>Espessura:</strong> ${newThickness} mm</p>
`;
    document.getElementById('costs').innerHTML = `
    <p><strong>Peso Atual:</strong> ${weightCurrent.toFixed(2)} kg</p>
    <p><strong>Peso Proposto:</strong> ${weightProposed.toFixed(2)} kg</p>
    <p><strong>Diferença de Peso:</strong> ${weightDifference.toFixed(2)} kg</p>
    <p><strong>Custo Total:</strong> R$ ${cost.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
`;
}

// Função para resetar os valores dos campos de redução
function resetValues() {
    document.getElementById('reductionLength').value = '';
    document.getElementById('reductionThickness').value = '';
    document.getElementById('reductionWidth').value = '';
    document.getElementById('materialAlteration').value = '';
    document.getElementById('amountParts').value = '';
    document.getElementById('pricePerKg').value = '';
    document.getElementById('pieceInfo').innerHTML = '';
    document.getElementById('costs').innerHTML = '';
}